# 📍 लाइव GPS ट्रैकिंग सिस्टम (Teensy + Node.js + React + Leaflet)

![License: Custom](https://img.shields.io/badge/License-Custom--Non--Commercial-red)

## 🌐 भाषाएं

* 🇺🇸 [English](./README.md)
* 🇮🇳 Hindi (current)
* 🇧🇩 [Bengali](./README.bn.md)

---

## 🚀 प्रोजेक्ट विवरण

यह प्रोजेक्ट एक **रियल-टाइम GPS ट्रैकिंग सिस्टम** है जो हार्डवेयर और वेब टेक्नोलॉजी को जोड़कर लाइव लोकेशन को मैप पर दिखाता है।

---

## 📸 लाइव डेमो

<p align="center">
  <img src="./assets/Live_location_update_Image.png" width="800"/>
</p>

---

## 🧠 सिस्टम आर्किटेक्चर

GPS → Teensy → Node.js → Socket.io → React → Map UI

---

## 🔌 वायरिंग (GPS ↔ Teensy)

| GPS | Teensy           |
| --- | ---------------- |
| VCC | 3.3V/5V          |
| GND | GND              |
| TX  | Pin 0            |
| RX  | Pin 1 (optional) |

---

## 💻 Teensy कोड

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

## ⚙️ फीचर्स

* 📡 लाइव ट्रैकिंग
* 🗺️ इंटरैक्टिव मैप
* 📍 मूविंग मार्कर
* 🔁 फॉलो मोड

---

## 🚀 सेटअप

```bash
cd Backend && npm start
cd frontend && npm run dev
```

---

## 📜 लाइसेंस

यह प्रोजेक्ट केवल **पर्सनल और एजुकेशनल उपयोग** के लिए फ्री है।
कमर्शियल उपयोग के लिए अनुमति आवश्यक है।

📧 संपर्क:
[arahamabeddin7@gmail.com](mailto:arahamabeddin7@gmail.com)
