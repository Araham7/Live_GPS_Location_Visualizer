const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

// 🧠 Convert NMEA → Decimal
function convert(raw, direction) {
  let deg, min;

  if (direction === "N" || direction === "S") {
    deg = parseInt(raw.slice(0, 2));   // latitude
    min = parseFloat(raw.slice(2));
  } else {
    deg = parseInt(raw.slice(0, 3));   // longitude
    min = parseFloat(raw.slice(3));
  }

  let val = deg + (min / 60);

  if (direction === "S" || direction === "W") {
    val *= -1;
  }

  return val;
}

// 🚀 Start GPS reading
function startGPS(io) {
  const port = new SerialPort({
    path: "/dev/ttyACM0",   // ⚠️ change if needed
    baudRate: 115200
  });

  const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

  console.log("📡 GPS Serial Started...");

  parser.on("data", (line) => {
    line = line.trim();

    // raw log
    console.log("📥 RAW:", line);

    if (line.startsWith("$GNRMC")) {
      const parts = line.split(",");

      if (parts.length > 6 && parts[2] === "A") {
        try {
          const lat = convert(parts[3], parts[4]);
          const lon = convert(parts[5], parts[6]);

          console.log("📍 PARSED:", lat, lon);

          // send to frontend
          io.emit("update-location", { lat, lon });

        } catch (err) {
          console.error("❌ Parse error:", err.message);
        }
      } else {
        console.log("⚠️ Invalid GPS fix");
      }
    }
  });

  port.on("error", (err) => {
    console.error("❌ Serial Error:", err.message);
  });
}

module.exports = { startGPS };