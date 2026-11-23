/* ==========================================================================
   Vukuzenzele Granite Design - Apple HIG & Fluid Theme for Hakili Chat Widget
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const THEME_CSS = `
    *{touch-action:manipulation;-webkit-tap-highlight-color:transparent}
    .launch{background:#1c1a17!important;border:1px solid rgba(200,164,107,.45)!important;box-shadow:0 12px 32px rgba(0,0,0,.55)!important;transition:transform .28s cubic-bezier(.32,.72,0,1)}
    .launch:hover{transform:scale(1.06)}.launch:active,.chip:active,.in button:active,.hd button:active{transform:scale(.96)!important;transition-duration:120ms!important}
    .panel{background:rgba(20,20,22,.92)!important;backdrop-filter:blur(24px) saturate(180%);-webkit-backdrop-filter:blur(24px) saturate(180%);color:#ede9e2!important;border:1px solid rgba(200,164,107,.28)!important;border-radius:20px!important;box-shadow:0 24px 64px rgba(0,0,0,.7)!important;transition:transform .35s cubic-bezier(.32,.72,0,1),opacity .25s ease}
    .hd{position:relative;background:rgba(28,26,23,.85)!important;border-bottom:1px solid rgba(237,233,226,.09);padding:16px 18px!important}
    .hd small{color:#c8a46b!important;opacity:1!important}
    .hd button{min-width:44px;min-height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:transform 120ms cubic-bezier(.32,.72,0,1),background .2s}
    .hd button:hover{background:rgba(255,255,255,.08)}
    .msgs{background:rgba(11,11,12,.72)!important;padding:16px!important;gap:10px!important}
    .m.bot{background:#1c1c20!important;color:#ede9e2!important;border:1px solid rgba(237,233,226,.09)!important;border-radius:16px 16px 16px 4px!important}
    .m.me{background:#c8a46b!important;color:#0b0b0c!important;font-weight:500;border-radius:16px 16px 4px 16px!important}
    .chips{flex-wrap:wrap!important;overflow-x:visible!important;gap:8px!important;padding:10px 14px!important;background:rgba(20,20,22,.9)!important;border-top:1px solid rgba(237,233,226,.08)!important}
    .chip{min-height:38px;padding:7px 13px!important;background:rgba(200,164,107,.1)!important;border:1px solid rgba(200,164,107,.35)!important;color:#ede9e2!important;font-size:12.5px!important;transition:transform 120ms cubic-bezier(.32,.72,0,1),background .2s}
    .chip:hover{background:#c8a46b!important;border-color:#c8a46b!important;color:#0b0b0c!important}
    .in{background:rgba(20,20,22,.95)!important;border-top:1px solid rgba(237,233,226,.08)!important;padding:10px 14px!important;gap:8px!important}
    .in input{min-height:44px;font-size:16px!important;background:#0b0b0c!important;color:#ede9e2!important;border:1px solid rgba(237,233,226,.14)!important;border-radius:12px!important;outline:none!important}
    .in input:focus{border-color:#c8a46b!important;box-shadow:0 0 0 3px rgba(200,164,107,.2)}
    .in button{min-height:44px;padding:0 18px!important;background:#c8a46b!important;color:#0b0b0c!important;font-weight:600;border-radius:12px!important;transition:transform 120ms cubic-bezier(.32,.72,0,1),background .2s}
    .in button:hover{background:#dfc08d!important}
    .lf{background:#141416!important;border-color:rgba(200,164,107,.4)!important;color:#ede9e2!important;border-radius:14px!important}
    .lf input,.lf textarea{font-size:16px!important;min-height:44px;background:#0b0b0c!important;color:#ede9e2!important;border-color:rgba(237,233,226,.15)!important}
    .ft{background:rgba(20,20,22,.95)!important;color:#9a9892!important;padding:4px 14px calc(12px + env(safe-area-inset-bottom,0px))!important;line-height:1.4}
    .ft a{color:#c8a46b!important;text-decoration:none}
    @media (max-width:480px){.panel{height:88dvh!important;border-radius:22px 22px 0 0!important}.hd{padding-top:22px!important}.hd::before{content:'';position:absolute;top:8px;left:50%;transform:translateX(-50%);width:36px;height:4px;border-radius:999px;background:rgba(237,233,226,.28)}}
  `;
  const apply = () => {
    const sr = document.getElementById('hakili-chat-root')?.shadowRoot;
    if (!sr) return false;
    if (!sr.querySelector('.panel')) {
      if (!sr.__vkObs) {
        sr.__vkObs = true;
        const srObs = new MutationObserver(() => { if (apply()) srObs.disconnect(); });
        srObs.observe(sr, { childList: true });
      }
      return false;
    }
    if (!sr.querySelector('#vk-chat-theme')) {
      const s = document.createElement('style');
      s.id = 'vk-chat-theme';
      s.textContent = THEME_CSS;
      sr.appendChild(s);
    }
    return true;
  };
  if (apply()) return;
  const obs = new MutationObserver(() => { if (apply()) obs.disconnect(); });
  obs.observe(document.body, { childList: true });
  setTimeout(apply, 1200);
});
