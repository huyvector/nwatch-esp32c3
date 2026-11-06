# NWatch ESP32-C3 Web Installer

Trang web tĩnh để cài NWatch cho ESP32-C3 Super Mini trực tiếp bằng ESP Web Tools.

## Chạy cục bộ

```bash
python3 -m http.server 4173
```

Mở `http://localhost:4173`. Web Serial hoạt động trên localhost hoặc HTTPS; bản triển khai chính nên dùng GitHub Pages.

## Triển khai GitHub Pages

Đưa toàn bộ nội dung thư mục này lên nhánh `main`, sau đó chọn **Settings → Pages → Deploy from a branch → main / root**.

## Firmware

- Chip: ESP32-C3
- Full merged ROM: `firmware/nwatch-esp32c3-stage5.30-ble-stable.bin`
- Flash offset: `0x0`
- SHA-256: `be0e12f445126f1ea54a219934f5eb44024e7602e6dafd2094f2cd50c53bd9ed`

## Credits

- Original NWatch: Zak Kemble
- ESP32-C3 rebuild: Huy Vector
