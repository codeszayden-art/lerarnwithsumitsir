import { useEffect, useRef, useState } from 'react';
// import '@/styles/sections/personal-interview.css';

const QUESTIONS = [
  'Please introduce yourself.',
  'Why do you want to join the armed forces?',
  'Tell me about your hobbies and interests.',
  'Describe a time when you led a team.',
  'How do you handle failure?',
  'What are your strengths and weaknesses?',
];
const SCORE_KEYS = ['Confidence', 'Communication', 'Clarity of thought', 'Body language', 'Officer-like qualities'];

const JOIN_BEFORE = 5 * 60 * 1000;   // join opens 5 min before slot
const JOIN_AFTER = 30 * 60 * 1000;   // join closes 30 min after slot
const MIN_WORDS = 3;                 // minimum words to count as an answer
const STORE_KEY = 'pi_booking';

const wordCount = (s) => s.trim().split(/\s+/).filter(Boolean).length;

/* ✅ user khud date + time chunega — koi fixed TIMES nahi */
const todayStr = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
};

/* "HH:MM" (24h input value) -> Date object */
function slotToDate(dateStr, timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  const d = new Date(dateStr);
  d.setHours(h, m, 0, 0);
  return d;
}

function fmtCountdown(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [d && `${d}d`, `${h}h`, `${m}m`, `${sec}s`].filter(Boolean).join(' ');
}

const loadBooking = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY));
  } catch {
    return null;
  }
};
const saveBooking = (b) => {
  try {
    b ? localStorage.setItem(STORE_KEY, JSON.stringify(b)) : localStorage.removeItem(STORE_KEY);
  } catch { /* ignore */ }
};

async function api(path, body) {
  const r = await fetch(`/api/pi/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error('api');
  return r.json();
}

export default function PersonalInterview() {
  const saved = useRef(loadBooking()).current;
  const [step, setStep] = useState(saved ? 'check' : 'book'); // book | check | room | result
  const [form, setForm] = useState({ name: '', phone: '' });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [booking, setBooking] = useState(saved);
  const [now, setNow] = useState(Date.now());
  const [camErr, setCamErr] = useState('');
  const [qs, setQs] = useState(QUESTIONS);
  const [qi, setQi] = useState(0);
  const [live, setLive] = useState('');
  const [aiTalking, setAiTalking] = useState(false);
  const [result, setResult] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recRef = useRef(null);
  const listeningRef = useRef(false);
  const answersRef = useRef([]);
  const textRef = useRef('');
  const baseRef = useRef('');

  const canBook = form.name.trim() && /^\d{10}$/.test(form.phone) && date && time;

  /* clock for countdown */
  useEffect(() => {
    if (step !== 'check') return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [step]);

  const startAt = booking ? new Date(booking.startAt).getTime() : 0;
  const opensIn = startAt - JOIN_BEFORE - now;
  const missed = booking && now > startAt + JOIN_AFTER;
  const canJoin = booking && opensIn <= 0 && !missed;

  /* 1. Book slot */
  const book = async () => {
    const startAtDate = slotToDate(date, time);
    const slot = {
      ...form,
      date: startAtDate.toDateString(),
      time,
      startAt: startAtDate.toISOString(),
    };
    let id;
    try {
      id = (await api('book', slot)).id;
    } catch {
      id = 'DEMO-' + Date.now(); // demo mode if no backend
    }
    const b = { ...slot, id };
    saveBooking(b);
    setBooking(b);
    setStep('check');
  };

  const rebook = () => {
    saveBooking(null);
    setBooking(null);
    setDate('');
    setTime('');
    setStep('book');
  };

  /* 2. Camera + mic (only inside the join window) */
  const startCamera = async () => {
    if (!canJoin) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setCamErr('Speech recognition is not supported in this browser. Please use Google Chrome.');
      return;
    }
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setCamErr('');
      answersRef.current = [];
      setQi(0);
      setStep('room');
    } catch {
      setCamErr('Please allow camera and microphone access to start the interview.');
    }
  };

  useEffect(() => {
    if (step === 'room' && videoRef.current) videoRef.current.srcObject = streamRef.current;
  }, [step]);

  useEffect(() => {
    if (step !== 'room') return;
    api('questions', { bookingId: booking?.id }).then((d) => d.questions?.length && setQs(d.questions)).catch(() => {});
  }, [step, booking]);

  /* 3. AI asks the question, then listens to the answer */
  useEffect(() => {
    if (step !== 'room') return;
    stopListening();
    textRef.current = '';
    setLive('');
    const u = new SpeechSynthesisUtterance(qs[qi]);
    u.lang = 'en-IN';
    u.onstart = () => setAiTalking(true);
    u.onend = () => {
      setAiTalking(false);
      startListening();
    };
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    return () => speechSynthesis.cancel();
  }, [step, qi, qs]);

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    baseRef.current = '';
    listeningRef.current = true;
    const rec = new SR();
    rec.lang = 'en-IN';
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      const t = Array.from(e.results).map((r) => r[0].transcript).join(' ');
      const full = `${baseRef.current} ${t}`.trim();
      textRef.current = full;
      setLive(full);
    };
    rec.onend = () => {
      baseRef.current = textRef.current;
      if (listeningRef.current) {
        try { rec.start(); } catch { /* ignore */ }
      }
    };
    try { rec.start(); } catch { /* ignore */ }
    recRef.current = rec;
  };

  const stopListening = () => {
    listeningRef.current = false;
    try { recRef.current?.stop(); } catch { /* ignore */ }
    recRef.current = null;
  };

  const goNext = async (skipped) => {
    stopListening();
    answersRef.current.push({ q: qs[qi], a: skipped ? '' : textRef.current });
    if (qi < qs.length - 1) return setQi(qi + 1);

    streamRef.current?.getTracks().forEach((t) => t.stop());
    setStep('result');
    saveBooking(null);

    const answers = answersRef.current;
    const answered = answers.filter((x) => wordCount(x.a) >= MIN_WORDS);

    /* no answers -> zero marks, no backend call */
    if (!answered.length) {
      const scores = {};
      SCORE_KEYS.forEach((k) => (scores[k] = 0));
      return setResult({
        scores,
        answered: 0,
        total: answers.length,
        feedback: 'No answers were recorded, so no marks could be awarded. Please try again and answer every question aloud.',
      });
    }

    try {
      const r = await api('evaluate', { bookingId: booking.id, answers });
      setResult({ ...r, answered: answered.length, total: answers.length });
    } catch {
      /* demo estimate from answer length (not random) */
      const avgWords = answered.reduce((a, x) => a + wordCount(x.a), 0) / answered.length;
      const base = Math.min(8, Math.round((avgWords / 40) * 8));
      const ratio = answered.length / answers.length;
      const scores = {};
      SCORE_KEYS.forEach((k) => (scores[k] = Math.round(base * ratio)));
      setResult({
        scores,
        answered: answered.length,
        total: answers.length,
        feedback: 'Demo estimate based on answer length only. Real marks will come from the backend evaluate API.',
        demo: true,
      });
    }
  };

  useEffect(() => () => {
    speechSynthesis.cancel();
    stopListening();
    streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  const total = result ? Object.values(result.scores).reduce((a, b) => a + b, 0) : 0;
  const max = SCORE_KEYS.length * 10;
  const canNext = wordCount(live) >= MIN_WORDS;

  return (
    <section className="pi" aria-label="Personal interview">
      <div className="pi-w">
        <ol className="pi-steps">
          {['Book Slot', 'Check', 'Interview', 'Result'].map((s, i) => (
            <li key={s} className={['book', 'check', 'room', 'result'].indexOf(step) >= i ? 'on' : ''}>
              <b>{i + 1}</b>{s}
            </li>
          ))}
        </ol>

        {step === 'book' && (
          <div className="pi-card">
            <h2>Book Your Personal Interview</h2>
            <p className="pi-sub">Choose your own date and time. Your video interview with the AI interviewer will start at that time.</p>
            <div className="pi-row">
              <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input placeholder="Mobile (10 digits)" inputMode="numeric" maxLength={10} value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })} />
            </div>

            <h4>Date</h4>
            <div className="pi-row">
              <input
                type="date"
                value={date}
                min={todayStr()}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <h4>Time</h4>
            <div className="pi-row">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <button className="pi-cta" disabled={!canBook} onClick={book}>Confirm Slot</button>
          </div>
        )}

        {step === 'check' && booking && (
          <div className="pi-card pi-center">
            <div className="pi-ok">✓</div>
            <h2>Slot Booked!</h2>
            <div className="pi-slot">
              <span>📅 {booking.date}</span>
              <span>🕒 {booking.time}</span>
            </div>
            <p className="pi-sub">Booking ID: {booking.id}</p>

            {missed ? (
              <>
                <p className="pi-err">Your slot time has passed. Please book a new slot.</p>
                <button className="pi-cta" onClick={rebook}>Book Again</button>
              </>
            ) : canJoin ? (
              <>
                <p className="pi-ready">Your interview room is open. You can join now.</p>
                <ul className="pi-tips">
                  <li>Sit in a quiet place with good light on your face.</li>
                  <li>Camera and microphone access is required.</li>
                  <li>Chrome browser is required.</li>
                </ul>
                {camErr && <p className="pi-err">{camErr}</p>}
                <button className="pi-cta" onClick={startCamera}>Join Interview Room</button>
              </>
            ) : (
              <>
                <div className="pi-cd">
                  <small>Interview starts in</small>
                  <b>{fmtCountdown(startAt - now)}</b>
                </div>
                <p className="pi-sub">The room opens 5 minutes before your slot.</p>
                <button className="pi-cta" disabled>Join Interview Room</button>
                <div><button className="pi-link" onClick={rebook}>Change slot</button></div>
              </>
            )}
          </div>
        )}

        {step === 'room' && (
          <div className="pi-room">
            <div className={`pi-ai${aiTalking ? ' talk' : ''}`}>
              <div className="pi-avatar">AI</div>
              <small>AI Interviewer</small>
              <p className="pi-q">{qs[qi]}</p>
              <span className="pi-count">Question {qi + 1} / {qs.length}</span>
            </div>
            <div className="pi-me">
              <video ref={videoRef} autoPlay muted playsInline />
              <span className="pi-live">● LIVE</span>
              <div className="pi-tr">{live || (aiTalking ? 'AI is speaking…' : 'Listening to your answer…')}</div>
            </div>
            <div className="pi-actions">
              <button className="pi-cta" disabled={!canNext} onClick={() => goNext(false)}>
                {qi < qs.length - 1 ? 'Done → Next Question' : 'Finish Interview'}
              </button>
              <button className="pi-link" onClick={() => goNext(true)}>Skip</button>
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="pi-card">
            {!result ? (
              <p className="pi-sub pi-center">The AI is evaluating your interview…</p>
            ) : (
              <>
                <h2>Your Interview Result</h2>
                <p className="pi-sub">Answered {result.answered} of {result.total} questions</p>
                <div className="pi-total"><b>{total}</b> / {max}</div>
                {SCORE_KEYS.map((k) => (
                  <div className="pi-bar" key={k}>
                    <span>{k}</span>
                    <i><u style={{ width: `${(result.scores[k] || 0) * 10}%` }} /></i>
                    <b>{result.scores[k] || 0}/10</b>
                  </div>
                ))}
                <p className="pi-fb">{result.feedback}</p>
                <button className="pi-cta" onClick={rebook}>Book Another Interview</button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}