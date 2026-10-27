.abt{--n:#01094f;--g:#f4a31b;--bg:#eef1ff;--card:#fff;--tx:#0f1b33;--tx2:#4b566f;--ln:rgba(1,9,79,.12);
  background:var(--bg);color:var(--tx);font-family:Inter,system-ui,sans-serif;min-height:100vh;padding-bottom:70px}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .abt{--bg:#0d1236;--card:#141a4d;--tx:#eaf0ff;--tx2:#b3bfdc;--ln:rgba(255,255,255,.14)}}
:root[data-theme="dark"] .abt{--bg:#0d1236;--card:#141a4d;--tx:#eaf0ff;--tx2:#b3bfdc;--ln:rgba(255,255,255,.14)}
.abt *{box-sizing:border-box}
.abt-w{max-width:1200px;margin:0 auto;padding:0 20px}

/* reveal */
.abt-rv{opacity:0;transform:translateY(30px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.8,.2,1)}
.abt-rv.in{opacity:1;transform:none}

/* banner */
.abt-hero{display:flex;align-items:center;min-height:clamp(300px,36vw,400px);padding:60px 20px;color:#fff;
  background:linear-gradient(90deg,rgba(1,9,79,.95) 28%,rgba(1,9,79,.5) 80%),linear-gradient(0deg,rgba(1,9,79,.7),transparent 50%),var(--hero) center 25%/cover no-repeat}
.abt-hero-in{width:100%;max-width:1200px;margin:0 auto;padding:0 20px}
.abt-hero-in>*{max-width:640px}
.abt-pill{display:inline-block;padding:7px 16px;border-radius:99px;font-size:13px;font-weight:600;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px)}
.abt-hero h1{margin:16px 0 10px;font-size:clamp(30px,5vw,54px);font-weight:800;line-height:1.1;letter-spacing:-.025em}
.abt-hero em,.abt-welcome em,.abt-head em{font-style:normal;background:linear-gradient(100deg,#ff8a00,#f4a31b 55%,#ffd27a);-webkit-background-clip:text;background-clip:text;color:transparent}
.abt-hero p{margin:0 0 18px;font-size:clamp(14.5px,1.4vw,17px);line-height:1.6;opacity:.88}
.abt-crumb{font-size:13px;opacity:.85}.abt-crumb a{color:var(--g);text-decoration:none}.abt-crumb span{margin:0 6px;opacity:.6}

.abt-tag{display:inline-block;padding:5px 14px;border-radius:99px;background:var(--g);color:var(--n);font-weight:800;font-size:12px;letter-spacing:.12em;text-transform:uppercase}

/* welcome (banner ke baad gap) */
.abt-welcome{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(28px,5vw,64px);align-items:center;margin-top:clamp(56px,7vw,90px)}
.abt-welcome h2{margin:12px 0 18px;font-size:clamp(28px,3.8vw,44px);font-weight:800;line-height:1.1;letter-spacing:-.02em}
.abt-wtxt p{margin:0 0 14px;color:var(--tx2);font-size:15.5px;line-height:1.75}
.abt-wtxt b{color:var(--tx)}
.abt-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
.abt-chips span{padding:7px 14px;border-radius:99px;background:var(--card);color:var(--tx);font-size:13px;font-weight:600;box-shadow:0 0 0 1px var(--ln);transition:.2s}
.abt-chips span:hover{background:var(--n);color:var(--g);transform:translateY(-2px)}
.abt-wimg{position:relative;padding:0 0 26px 26px}
.abt-wimg::before{content:"";position:absolute;inset:26px 26px 0 0;border-radius:28px;background:linear-gradient(135deg,var(--g),#ff8a00);transform:translate(-18px,18px)}
.abt-frame{position:relative;border-radius:28px;overflow:hidden;aspect-ratio:16/11;box-shadow:0 34px 60px -26px rgba(1,9,79,.6)}
.abt-frame img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .8s}
.abt-frame:hover img{transform:scale(1.06)}
.abt-float{position:absolute;right:-6px;bottom:0;display:flex;align-items:center;gap:12px;padding:12px 18px;border-radius:18px;background:var(--n);color:#fff;
  font-size:13px;font-weight:600;line-height:1.3;box-shadow:0 20px 36px -14px rgba(1,9,79,.7);animation:abtBob 4.5s ease-in-out infinite}
.abt-float b{font-size:26px}

/* stats */
.abt-stats{margin:clamp(60px,8vw,96px) 0;padding:44px 0;color:#fff;background:radial-gradient(60% 120% at 90% 0,rgba(244,163,27,.35),transparent 70%),linear-gradient(120deg,#01094f,#1b2a8c)}
.abt-stats-in{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:26px;text-align:center}
.abt-stat b{display:block;font-size:clamp(30px,4vw,44px);font-weight:800;color:var(--g);line-height:1.1}
.abt-stat span{display:block;margin-top:6px;font-size:13.5px;opacity:.88}

/* leaders */
.abt-head{text-align:center;margin-bottom:46px}
.abt-head h2{margin:12px 0 0;font-size:clamp(28px,3.8vw,44px);font-weight:800;letter-spacing:-.02em}
.abt-lead{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(24px,4vw,52px);align-items:center;margin-bottom:clamp(50px,6vw,80px)}
.abt-lead.rev{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)}
.abt-lead.rev .abt-photo{order:2}
.abt-lead.rev{grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr)}
.abt-ph-card{position:relative;border-radius:28px;overflow:hidden;aspect-ratio:4/4.4;background:linear-gradient(160deg,#1b2a8c,#01094f);box-shadow:0 34px 60px -26px rgba(1,9,79,.65),0 0 0 1px var(--ln)}
.abt-ph-card img{width:100%;height:100%;object-fit:cover;object-position:center 20%;display:block}
.abt-ph-card::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(1,9,79,.9),transparent 45%)}
.abt-name{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:22px;color:#fff}
.abt-name b{display:block;font-size:20px;font-weight:800}
.abt-name small{color:var(--g);font-weight:600;font-size:13px}
.abt-avatar{position:absolute;inset:0;display:grid;place-items:center;
  background:radial-gradient(circle at 70% 20%,rgba(244,163,27,.4),transparent 60%),linear-gradient(160deg,#2230a8,#01094f)}
.abt-avatar span{display:grid;place-items:center;width:46%;aspect-ratio:1;border-radius:50%;background:linear-gradient(145deg,#ffd27a,var(--g));color:var(--n);font-size:clamp(38px,6vw,64px);font-weight:800;box-shadow:0 0 0 12px rgba(255,255,255,.12)}

.abt-card{padding:clamp(24px,3.4vw,40px);border-radius:28px;background:var(--card);box-shadow:0 24px 50px -30px rgba(1,9,79,.5),0 0 0 1px var(--ln)}
.abt-role{display:inline-block;padding:5px 14px;border-radius:99px;background:var(--n);color:var(--g);font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
.abt-card h3{margin:12px 0 4px;font-size:clamp(24px,3vw,34px);font-weight:800;letter-spacing:-.015em}
.abt-sub{margin:0 0 16px;color:var(--g);font-weight:700;font-size:14.5px}
.abt-card p{margin:0 0 13px;color:var(--tx2);font-size:15px;line-height:1.75}
.abt-card b{color:var(--tx)}
.abt-card blockquote{margin:18px 0 0;padding:16px 20px;border-left:4px solid var(--g);border-radius:0 16px 16px 0;background:var(--bg);color:var(--tx);font-weight:600;font-style:italic;line-height:1.6;font-size:14.5px}
.abt-lbl{margin-bottom:10px!important;color:var(--tx)!important;font-weight:600}
.abt-pts{list-style:none;margin:0 0 16px;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.abt-pts li{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;background:var(--bg);font-size:13.5px;font-weight:600;transition:.2s}
.abt-pts li:hover{transform:translateX(4px);box-shadow:inset 3px 0 0 var(--g)}
.abt-pts i{flex:none;display:grid;place-items:center;width:32px;height:32px;border-radius:10px;background:var(--n);font-style:normal;font-size:15px}
.abt-pts li:last-child{grid-column:1/-1}

/* cta */
.abt-cta{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;padding:clamp(26px,3.6vw,40px);border-radius:28px;color:#fff;
  background:radial-gradient(60% 120% at 100% 0,rgba(244,163,27,.4),transparent 70%),linear-gradient(120deg,#01094f,#1b2a8c)}
.abt-cta h3{margin:0 0 4px;font-size:clamp(20px,2.6vw,29px);font-weight:800}
.abt-cta p{margin:0;opacity:.85;font-size:14.5px}
.abt-cta a{padding:13px 28px;border-radius:99px;background:#fff;color:var(--n);font-weight:700;text-decoration:none;transition:.25s}
.abt-cta a:hover{transform:translateY(-3px);box-shadow:0 14px 26px -10px rgba(0,0,0,.5)}

@keyframes abtBob{50%{transform:translateY(-8px)}}
@media (max-width:860px){
  .abt-welcome,.abt-lead,.abt-lead.rev{grid-template-columns:1fr}
  .abt-lead.rev .abt-photo{order:0}
  .abt-wimg{padding:0 0 22px 18px}
  .abt-ph-card{aspect-ratio:4/3.6;max-width:520px;margin:0 auto}
}
@media (max-width:520px){.abt-pts{grid-template-columns:1fr}.abt-float{right:0;padding:10px 14px}}
@media (prefers-reduced-motion:reduce){.abt-rv{opacity:1;transform:none;transition:none}.abt *{animation:none!important}}