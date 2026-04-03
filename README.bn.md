# 📍 লাইভ GPS ট্র্যাকিং সিস্টেম (Teensy + Node.js + React + Leaflet)

![License: Custom](https://img.shields.io/badge/License-Custom--Non--Commercial-red)

## 🌐 ভাষা

* 🇺🇸 [English](./README.md)
* 🇮🇳 [Hindi](./README.hi.md)
* 🇧🇩 Bengali (current)

---

## 🚀 প্রজেক্ট বিবরণ

এই প্রজেক্টটি একটি **রিয়েল-টাইম GPS ট্র্যাকিং সিস্টেম** যা হার্ডওয়্যার ও ওয়েব প্রযুক্তি ব্যবহার করে লাইভ লোকেশন ম্যাপে দেখায়।

---

## 📸 লাইভ ডেমো

<p align="center">
  <img src="./assets/Live_location_update_Image.png" width="800"/>
</p>

---

## 🧠 সিস্টেম আর্কিটেকচার

GPS → Teensy → Node.js → Socket.io → React → Map UI

---

## 🔌 ওয়্যারিং (GPS ↔ Teensy)

| GPS | Teensy           |
| --- | ---------------- |
| VCC | 3.3V/5V          |
| GND | GND              |
| TX  | Pin 0            |
| RX  | Pin 1 (optional) |

---

## 💻 Teensy কোড

```cpp
void setup() {
  Serial.begin(115200);
  Serial1.begin(115200);
}

void loop() {
  while (Serial1.available()) {
    Serial.print((char)Serial1.read());
  }
}
```

---

## ⚙️ ফিচার

* 📡 লাইভ ট্র্যাকিং
* 🗺️ ম্যাপ ইন্টারঅ্যাকশন
* 📍 লাইভ মার্কার
* 🔁 ফলো মোড

---

## 🚀 সেটআপ

```bash
cd Backend && npm start
cd frontend && npm run dev
```

---

## 📜 লাইসেন্স

এই প্রজেক্টটি শুধুমাত্র **ব্যক্তিগত ও শিক্ষামূলক ব্যবহারের জন্য ফ্রি**।
কমার্শিয়াল ব্যবহারের জন্য অনুমতি প্রয়োজন।

📧 যোগাযোগ:
[arahamabeddin7@gmail.com](mailto:arahamabeddin7@gmail.com)
