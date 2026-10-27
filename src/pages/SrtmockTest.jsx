import { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
// import '@/styles/sections/mock-srt.css';

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

const TOTAL = 30 * 60;


const MOCKS = [ 
  { id: 1, title: 'SRT Practice Test 01', pdf: '../../src/assets/images/srt/srt-mock-1.pdf' },
  { id: 2, title: 'SRT Practice Test 02', pdf: '../../src/assets/images/srt/srt-mock-2.pdf' },
];

const RULES = [
  { n: '01', t: '60 Situations / 30 Mins', d: 'A total of 60 situations will be given. You must respond to all of them within a 30-minute time limit.' },
  { n: '02', t: 'Bottom-Left Timer', d: 'There will be a timer at the bottom-left of the screen to help you track your 30 minutes.' },
  { n: '03', t: 'React Naturally', d: 'React naturally. For example, if the situation says "He saw someone smoking in public. He...", complete the action practically.' },
  { n: '04', t: 'Print & Attempt (Recommended)', d: 'You can download the PDF and attempt the test after printing it out.' },
];

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

const errText = (e) => {
  if (e?.name === 'MissingPDFException') return 'PDF file was not found at this path. Please check the file path.';
  if (e?.name === 'InvalidPDFException') return 'This file is not a valid PDF (the server may be returning a web page instead).';
  return 'The PDF could not be loaded. It may be blocked by the server (CORS) or the link is broken.';
};

/* ---------- Timer ---------- */
function useTimer(total) {
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const end = Date.now() + left * 1000; // timestamp based, tab background me bhi sahi chalega
    const t = setInterval(() => {
      const l = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setLeft(l);
      if (l === 0) setRunning(false);
    }, 250);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const reset = () => { setRunning(false); setLeft(total); };
  return { left, running, setRunning, reset };
}

/* ---------- PDF viewer (pdf.js) ---------- */
function PdfPage({ doc, n, width }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!width) return undefined;
    let task;
    (async () => {
      const page = await doc.getPage(n);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const base = page.getViewport({ scale: 1 });
      const vp = page.getViewport({ scale: (width / base.width) * dpr });
      const c = ref.current;
      if (!c) return;
      c.width = vp.width;
      c.height = vp.height;
      c.style.width = `${width}px`;
      c.style.height = `${vp.height / dpr}px`;
      task = page.render({ canvasContext: c.getContext('2d'), viewport: vp });
      await task.promise.catch(() => {});
    })();
    return () => task?.cancel();
  }, [doc, n, width]);

  return <canvas ref={ref} className="srt-canvas" aria-label={`Page ${n}`} />;
}

function PdfViewer({ url, zoom, onPages }) {
  const boxRef = useRef(null);
  const [doc, setDoc] = useState(null);
  const [err, setErr] = useState('');
  const [w, setW] = useState(0);

  useEffect(() => {
    let dead = false;
    setDoc(null);
    setErr('');
    const task = pdfjs.getDocument({ url });
    task.promise
      .then((d) => { if (!dead) { setDoc(d); onPages(d.numPages); } })
      .catch((e) => { if (!dead) setErr(errText(e)); });
    return () => { dead = true; task.destroy(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    const el = boxRef.current;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const pageW = Math.min(w - 32, 900) * zoom;

  return (
    <div className="srt-view" ref={boxRef}>
      {err && (
        <div className="srt-err">
          <b>⚠ {err}</b>
          <div>
            <a className="srt-btn" href={url} target="_blank" rel="noopener noreferrer">Open in new tab</a>
            <a className="srt-btn ghost" href={url} download>Download PDF</a>
          </div>
        </div>
      )}
      {!doc && !err && <div className="srt-load"><i />Loading test paper…</div>}
      {doc && (
        <div className="srt-pages">
          {Array.from({ length: doc.numPages }, (_, i) => (
            <PdfPage key={i} doc={doc} n={i + 1} width={pageW} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Test screen ---------- */
function TestScreen({ mock, onBack }) {
  const [zoom, setZoom] = useState(1);
  const [pages, setPages] = useState(0);
  const { left, running, setRunning, reset } = useTimer(TOTAL);
  const done = left === 0;
  const pct = (left / TOTAL) * 100;

  return (
    <div className="srt-test">
      <div className="srt-bar">
        <button className="srt-back" onClick={onBack}>← SRT Hub</button>
        <div className="srt-bt">
          <small>MOCK {mock.id}</small>
          <h2>{mock.title}</h2>
        </div>
        <a className="srt-btn" href={mock.pdf} download>⬇ Download PDF</a>
      </div>

      <div className="srt-tools">
        <span>{pages ? `${pages} pages` : ''}</span>
        <div>
          <button onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.2).toFixed(1)))} aria-label="Zoom out">−</button>
          <b>{Math.round(zoom * 100)}%</b>
          <button onClick={() => setZoom((z) => Math.min(2, +(z + 0.2).toFixed(1)))} aria-label="Zoom in">+</button>
        </div>
        <a href={mock.pdf} target="_blank" rel="noopener noreferrer">Open in new tab ↗</a>
      </div>

      <PdfViewer url={mock.pdf} zoom={zoom} onPages={setPages} />

      {/* bottom-left timer */}
      <div className={`srt-timer${left <= 300 ? ' low' : ''}${running ? ' run' : ''}`}>
        <small>Timer</small>
        <b>{fmt(left)}</b>
        <i><u style={{ width: `${pct}%` }} /></i>
        <div>
          <button onClick={() => setRunning((r) => !r)} disabled={done}>
            {running ? '⏸ Pause' : left < TOTAL ? '▶ Resume' : '▶ Start'}
          </button>
          <button onClick={reset}>↻ Reset</button>
        </div>
      </div>

      {done && (
        <div className="srt-up" role="alertdialog" aria-label="Time up">
          <div>
            <div className="srt-upi">!</div>
            <h3>Time Up – Pens Down</h3>
            <p>The 30-minute SRT is over. Stop writing and review your responses.</p>
            <button className="srt-btn" onClick={reset}>Restart Mock</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Hub ---------- */
export default function MockSrt() {
  const [active, setActive] = useState(null);

  const open = (m) => { setActive(m); window.scrollTo({ top: 0 }); };

  if (active) return <section className="srt"><TestScreen mock={active} onBack={() => setActive(null)} /></section>;

  return (
    <section className="srt">
      <header className="srt-hero">
        <span className="srt-pill">⭐ SRT · Free Mock Series</span>
        <h1>Situation Reaction <em>Test (SRT)</em></h1>
        <p>60 situations, 30 minutes. Practise reacting naturally and practically, just like the real SSB.</p>
        <div className="srt-stats"><div><b>60</b>Situations</div><div><b>30</b>Minutes</div><div><b>{MOCKS.length}</b>Mock Tests</div></div>
      </header>

      <div className="srt-w">
        <h3 className="srt-h">How the test works</h3>
        <div className="srt-rules">
          {RULES.map((r) => (
            <article key={r.n}>
              <span>{r.n}</span>
              <h4>{r.t}</h4>
              <p>{r.d}</p>
            </article>
          ))}
        </div>

        <div className="srt-hd">
          <h3 className="srt-h">SRT Practice Test Papers</h3>
          <a href="#ssb-tests">All SSB Tests →</a>
        </div>
        <div className="srt-list">
          {MOCKS.map((m) => (
            <button key={m.id} className="srt-mock" onClick={() => open(m)}>
              <span className="srt-mn">{String(m.id).padStart(2, '0')}</span>
              <span className="srt-mt">
                <b>SRT Mock Test {m.id}</b>
                <small>60 Situations · 30 Mins · PDF</small>
              </span>
              <span className="srt-go">Start →</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}