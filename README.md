# MikroTik Tools (Zakshin)

| [Tiếng Việt](#tiếng-việt) | [English](#english) |

---

## Tiếng Việt

### MikroTik Tools là gì?

Website chạy ngay trong trình duyệt để **tạo script RouterOS** dạng **copy/paste** vào Terminal MikroTik.

### Có những tính năng gì?

- **WireGuard**: tạo script router + file client `.conf` + QR.
- **Hairpin NAT**: hairpin/loopback NAT + port-forward.
- **DoH DNS**: cấu hình DNS over HTTPS (RouterOS 7+) với nhiều provider, tuỳ chọn DHCP DNS và NAT redirect DNS.
- **IPTV**: mẫu VLAN/DHCP/IGMP proxy (tham khảo nhà mạng Việt Nam).
- **Firewall**: khung firewall/hardening cơ bản (tham khảo).
- **Cloudflare DDNS**: cập nhật record A/AAAA qua Cloudflare API + scheduler.
- **Routing (Policy Routing)**: định tuyến theo nguồn/subnet (v7 routing rule / v6 mangle).

### Cách sử dụng (nhanh)

1. Mở `https://mikrotik.hainghia.net`.
2. Chọn công cụ.
3. Điền form → **Copy script** → dán vào Terminal MikroTik.

### SEO hardening check

- Chạy local trước khi deploy: `python scripts/seo_guard.py`
- Script kiểm tra mapping `sitemap.xml` → file HTML nguồn và canonical trùng URL chuẩn.
- Meta tiếng Anh (title/description/OG/Twitter) được áp qua `assets/seo-i18n.js` khi ngôn ngữ là EN (ưu tiên `localStorage`, sau đó `navigator.language`).

### Danh sách URL (clean)

- `/wireguard`
- `/wireguard-site-to-site`
- `/eoip-tunnel`
- `/hairpin-nat`
- `/doh`
- `/iptv`
- `/firewall`
- `/cloudflare-ddns`
- `/startup`
- `/social-block`
- `/routing`

### Lưu ý bảo mật

- Tất cả dữ liệu/script được tạo **trên trình duyệt của bạn** (client-side).
- **Không chia sẻ** private key/token (WireGuard/Cloudflare/Telegram…).
- Khi dán script vào router, khuyến nghị bật **Safe Mode** để tránh tự khoá mình.

### Ủng hộ (Donate)

Trang chủ có mục **Ủng hộ tác giả** tại `https://mikrotik.hainghia.net/`: chuyển khoản MB Bank (STK `0968884946`), PayPal [paypal.me/Zakshin](https://paypal.me/Zakshin), hoặc liên hệ qua [Facebook tác giả](https://www.facebook.com/profile.php?id=100006985387032).

<p align="center">
  <img src="https://img.vietqr.io/image/MB-0968884946-compact.png?addTag=ZakshinTools" alt="VietQR MB Bank — 0968884946" width="220">
  &nbsp;&nbsp;
  <a href="https://paypal.me/Zakshin" title="paypal.me/Zakshin"><img src="Paypal.png" alt="PayPal — paypal.me/Zakshin" width="220"></a>
  &nbsp;&nbsp;
  <a href="https://www.facebook.com/profile.php?id=100006985387032" title="Facebook Zakshin"><img src="Logo.png" alt="Zakshin — Facebook" width="220"></a>
</p>

### Ghi nhận & giấy phép

- **Tác giả**: [Nghĩa Zakshin](https://github.com/ZakShinn)
- **WireGuard (MT-WG Gen)**: tham chiếu / tối ưu từ [markeclaudio/mikrotik-wireguard-config-generator](https://github.com/markeclaudio/mikrotik-wireguard-config-generator)
- **Giấy phép**: **Apache License 2.0** — xem `[LICENSE](LICENSE)`

---

## English

### What is MikroTik Tools?

A static website that runs in your browser to **generate RouterOS scripts** for **copy/paste** into MikroTik Terminal.

### Features

- **WireGuard**: router scripts + client `.conf` + QR.
- **Hairpin NAT**: loopback/hairpin NAT + port-forward.
- **DoH DNS**: DNS over HTTPS on RouterOS 7+ with multiple providers, optional DHCP DNS + DNS redirect.
- **IPTV**: sample VLAN/DHCP/IGMP proxy templates.
- **Firewall**: starter firewall/hardening reference.
- **Cloudflare DDNS**: update A/AAAA via Cloudflare API + scheduler.
- **Policy Routing**: route by source/subnet (v7 rules / v6 mangle).

### Quick usage

1. Open `https://mikrotik.hainghia.net`.
2. Pick a tool.
3. Fill the form → copy the script → paste into MikroTik Terminal.

### SEO hardening check

- Run before deploy: `python scripts/seo_guard.py`
- The script fails if a sitemap URL does not map to a source HTML file or if canonical does not match the URL.
- English meta tags are applied via `assets/seo-i18n.js` when language is EN (`localStorage` first, then `navigator.language`).

### Support / donate

The home page has a **Support the author** section at `https://mikrotik.hainghia.net/`: MB Bank transfer (`0968884946`), PayPal [paypal.me/Zakshin](https://paypal.me/Zakshin), or the [author’s Facebook page](https://www.facebook.com/profile.php?id=100006985387032).

<p align="center">
  <img src="https://img.vietqr.io/image/MB-0968884946-compact.png?addTag=ZakshinTools" alt="VietQR MB Bank — 0968884946" width="220">
  &nbsp;&nbsp;
  <a href="https://paypal.me/Zakshin" title="paypal.me/Zakshin"><img src="Paypal.png" alt="PayPal — paypal.me/Zakshin" width="220"></a>
  &nbsp;&nbsp;
  <a href="https://www.facebook.com/profile.php?id=100006985387032" title="Facebook Zakshin"><img src="Logo.png" alt="Zakshin — Facebook" width="220"></a>
</p>

### Credits & license

- **Author**: [Nghĩa Zakshin](https://github.com/ZakShinn)
- **WireGuard generator**: builds on [markeclaudio/mikrotik-wireguard-config-generator](https://github.com/markeclaudio/mikrotik-wireguard-config-generator)
- **License**: **Apache License 2.0** — see `[LICENSE](LICENSE)`

