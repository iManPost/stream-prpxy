# Stream Player

เพลเยอร์ HLS รองรับ HTTP stream ผ่าน Node.js Proxy

## ไฟล์ในโปรเจกต์

| ไฟล์ | หน้าที่ |
|------|---------|
| `index.html` | หน้าเพลเยอร์ — วางบน GitHub Pages |
| `proxy.js`   | Node.js proxy server — รันที่เครื่องตัวเอง |

---

## วิธีใช้งาน

### 1. Clone หรือดาวน์โหลดไฟล์

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. รัน Proxy ที่เครื่องตัวเอง

```bash
node proxy.js
```

จะเห็น:
```
✅ Proxy running → http://localhost:8080
```

### 3. เปิด index.html

- เปิดจาก GitHub Pages: `https://<your-username>.github.io/<repo-name>/`
- หรือเปิดไฟล์ตรง: ดับเบิลคลิก `index.html`

### 4. กด "เล่นผ่าน Proxy"

กรอก Proxy Host เป็น IP เครื่องคุณ (ถ้าเปิดจาก GitHub Pages ต้องใส่ IP จริง ไม่ใช่ localhost)

---

## GitHub Pages Setup

1. Push ไฟล์ขึ้น GitHub
2. ไปที่ Settings → Pages → Source: `main` branch → `/root`
3. เปิด `https://<username>.github.io/<repo>/`

> **หมายเหตุ:** proxy.js ต้องรันที่เครื่องเสมอ GitHub Pages ไม่สามารถรัน Node.js ได้
