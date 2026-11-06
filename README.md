# NWatch ESP32-C3 Web Installer — 6.7.2

Trang web tĩnh để cài NWatch cho ESP32-C3 Super Mini trực tiếp bằng ESP Web Tools.

## Chạy cục bộ

```bash
python3 -m http.server 4173
```

Mở `http://localhost:4173`. Web Serial hoạt động trên localhost hoặc HTTPS; bản triển khai chính nên dùng GitHub Pages.

## Triển khai GitHub Pages

Đưa toàn bộ nội dung thư mục này lên nhánh `main`, sau đó chọn **Settings → Pages → Deploy from a branch → main / root**.

## Firmware 6.7.2

- Chip: ESP32-C3
- GPIO20 Back hold: **400 ms**, doubled from 200 ms. Triggers while held.
- Native NimBLE + existing UI and low-power settings retained (80MHz, -6dBm,
  modem sleep, ~24FPS cap and bounded OLED pairing/discovery quiet window).
- Installer uses separate version-prefixed files in `firmware/`: bootloader at 0x0,
  partitions at 0x8000, OTA selector at 0xe000, application at 0x10000.
  These parts do not overwrite NVS at 0x9000–0xdfff.
- **Leave "Erase device" UNCHECKED** to retain settings/bonds. The manifest
  deliberately prompts: ESP Web Tools' false option would erase by default
  when Improv is unavailable. Do not change this flag to false to hide it.
- Manual app-only update: `firmware/nwatch-esp32c3-stage6.7.2-app-only.bin`
  at **0x10000**, never 0x0; DIO, 40MHz, 4MB, no Erase All.
- Keep a working 6.7/6.7.1 NimBLE pairing. Migration from older Bluedroid ROMs
  may require Forget on iPhone and Reset Pairing on watch once.
- Source: `downloads/nwatch-esp32c3-stage6.7.2-source.zip` (PlatformIO project,
  sdkconfig, watch assets, tests, GPL license). Small link under install button.
- Legacy 5.30 artifacts remain archived, but are no longer offered by the page
  or selected by the manifest. Their merged-image padding overwrites NVS.

## Language

Vietnamese by default for `Asia/Ho_Chi_Minh` / `Asia/Saigon`; English for other
time zones or unavailable zone. VI/EN button overrides and persists in browser
localStorage. Storage being blocked does not disable the switch. No geolocation
or external location request. The bundled ESP Web Tools dialog remains in its
upstream language; the surrounding site/instructions are bilingual.

## Verification

`node site.test.cjs` checks translation coverage, time-zone defaults,
overrides, local download paths and sector-aligned flash ranges avoiding NVS.
Firmware build passed; 6.7.1 reconnect was confirmed by the user, but no device
flash/Back-hold hardware test has been performed for 6.7.2.

## Credits

- Original NWatch: Zak Kemble
- ESP32-C3 rebuild: Huy Vector
