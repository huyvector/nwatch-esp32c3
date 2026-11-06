const browserNote = document.querySelector('#browser-note');

if (browserNote) {
  const text = browserNote.querySelector('span:last-child');
  if ('serial' in navigator && window.isSecureContext) {
    browserNote.classList.add('supported');
    text.textContent = 'Trình duyệt đã sẵn sàng để kết nối ESP32-C3.';
  } else if ('serial' in navigator && !window.isSecureContext) {
    browserNote.classList.add('unsupported-browser');
    text.textContent = 'Web Serial cần HTTPS. Hãy dùng đường dẫn GitHub Pages.';
  } else {
    browserNote.classList.add('unsupported-browser');
    text.textContent = 'Hãy mở trang bằng Chrome hoặc Edge trên máy tính để cài ROM.';
  }
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = 'ĐÃ SAO CHÉP ✓';
    } catch {
      button.textContent = 'KHÔNG THỂ SAO CHÉP';
    }
    window.setTimeout(() => {
      button.textContent = original;
    }, 1600);
  });
});
