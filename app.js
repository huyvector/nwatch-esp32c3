'use strict';
const english = {
  nav: 'Main navigation', navInstall: 'Install ROM', navWiring: 'Wiring',
  heroEyebrow: '<span></span> OPEN HARDWARE / COMMUNITY BUILD', heroTitle: 'One NWatch.<br /><em>One click.</em>',
  heroLead: 'Install NWatch on your ESP32-C3 Super Mini directly from your browser. OLED watch faces, animations, DS3231 RTC and iPhone notifications over Bluetooth LE.',
  heroAction: 'Install firmware <span>→</span>', specs: 'Hardware specifications', rtcLabel: 'Real-time clock', watchPreview: 'NWatch interface preview', previewCaption: '<span>●</span> OLED CONCEPT / 128 × 64',
  installEyebrow: '<span></span> WEB FLASHER', installTitle: 'Connect USB.<br />Flash in your browser.',
  installLead: 'Use desktop Chrome or Edge and a USB data cable. Version 6.7.2 keeps the existing interface and native NimBLE, with a longer 400 ms Back-button hold.',
  releaseLabel: 'LATEST RELEASE', targetLabel: 'Target', backLabel: 'Hold for Back',
  step1: '<strong>Connect your device</strong>Close Serial Monitor, then connect the ESP32-C3 with a USB data cable.',
  step2: '<strong>Select the USB port</strong>Click below and choose the USB/JTAG or ESP32 port.',
  step3: '<strong>Install NWatch</strong>Leave “Erase device” unchecked to keep settings/pairing. Wait for verification, then press RESET once.',
  flashAction: 'CONNECT &amp; INSTALL ROM', sourceDownload: 'Download source code ↓',
  unsupported: 'Web Serial is unavailable in this browser. Use Chrome or Edge on a desktop computer.',
  httpsRequired: 'Web Serial requires HTTPS. Open the GitHub Pages site instead of a local file.',
  preserveNote: 'Separate flash parts avoid overwriting NVS. Leave “Erase device” unchecked to keep settings/pairing from versions 6.7 / 6.7.1.',
  helpTitle: "Can't find your device?", helpBody: 'Close Serial Monitor. Hold BOOT, press and release RESET, then release BOOT and try connecting again.',
  pairTitle: 'First iPhone connection', pairBody: 'Pair with NWatch C3 and enable Share System Notifications. When migrating from older Bluedroid firmware, forget the device on iPhone and use Reset Pairing on the watch once. The screen may go dark for up to 20 seconds during pairing/service discovery; press any button to restore it.',
  wiringEyebrow: '<span></span> HARDWARE MAP', wiringTitle: 'Current wiring.', wiringLead: 'OLED and DS3231 share the I²C bus. Power compatible modules from 3V3 and share GND. Connect each button between its GPIO and GND.',
  pinTable: 'GPIO wiring table', signalLabel: 'Signal', deviceLabel: 'Device', upLabel: 'Up button', selectLabel: 'Select / Back 400 ms', downLabel: 'Down button',
  creditsTitle: 'Built on open ideas.', creditsBody: 'Original project by <a href="https://github.com/ZakKemble/NWatch" target="_blank" rel="noreferrer">Zak Kemble</a>. ESP32-C3 rebuild and extensions by <strong>Huy Vector</strong>.',
  footerLabel: 'ESP32-C3 COMMUNITY BUILD · 2026', flashAgain: 'FLASH AGAIN ↑',
  browserReady: 'Your browser is ready to connect to the ESP32-C3.', switchLanguage: 'Switch to Vietnamese', pageTitle: 'NWatch C3 — Web Installer', description: 'Install NWatch ESP32-C3 in your browser: OLED watch faces and iPhone ANCS notifications.'
};
function chooseLanguage(timeZone, saved) {
  if (saved === 'vi' || saved === 'en') return saved;
  return ['Asia/Ho_Chi_Minh', 'Asia/Saigon'].includes(timeZone) ? 'vi' : 'en';
}
if (typeof module !== 'undefined' && module.exports) module.exports = { english, chooseLanguage };
if (typeof document !== 'undefined') {
  // Vietnamese is the readable/no-JS HTML fallback; capture it before switching.
  const vi = {
    browserReady: 'Trình duyệt đã sẵn sàng để kết nối ESP32-C3.',
    switchLanguage: 'Chuyển sang tiếng Anh', pageTitle: 'NWatch C3 — Nạp ROM trực tuyến',
    description: document.querySelector('meta[name="description"]').content
  };
  document.querySelectorAll('[data-i18n]').forEach(el => { vi[el.dataset.i18n] = el.innerHTML; });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { vi[el.dataset.i18nAria] = el.getAttribute('aria-label'); });
  let saved = null, timeZone = '';
  try { saved = localStorage.getItem('nwatch-language'); } catch { /* Storage may be disabled. */ }
  try { timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { /* Fall back to English. */ }
  let language = chooseLanguage(timeZone, saved);
  function renderLanguage() {
    const t = language === 'vi' ? vi : english;
    document.documentElement.lang = language; document.title = t.pageTitle;
    document.querySelector('meta[name="description"]').content = t.description;
    // These HTML strings come only from the bundled dictionary / original HTML.
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t[el.dataset.i18n]; });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t[el.dataset.i18nAria]); });
    const toggle = document.querySelector('#language-toggle');
    toggle.innerHTML = language === 'vi' ? 'VI <span aria-hidden="true">/ EN</span>' : 'EN <span aria-hidden="true">/ VI</span>';
    toggle.setAttribute('aria-label', t.switchLanguage); toggle.title = t.switchLanguage;
    const note = document.querySelector('#browser-note'), serial = 'serial' in navigator;
    note.classList.toggle('supported', serial && window.isSecureContext);
    note.classList.toggle('unsupported-browser', !serial || !window.isSecureContext);
    document.querySelector('#browser-message').textContent = !serial ? t.unsupported : window.isSecureContext ? t.browserReady : t.httpsRequired;
  }
  document.querySelector('#language-toggle').addEventListener('click', () => {
    language = language === 'vi' ? 'en' : 'vi';
    try { localStorage.setItem('nwatch-language', language); } catch { /* Toggle still works. */ }
    renderLanguage();
  });
  renderLanguage();
}
