import { useState } from "react";
import "./styles.css";
import Otp from "./component/Otp";

export default function App() {
  const [message, setMessage] = useState("");

  const handleSubmit = (otpValue) => {
    console.log("OTP submitted:", otpValue);
    if (otpValue === "12345") {
      setMessage("✅ OTP Verified Successfully!");
    } else {
      setMessage("❌ Invalid OTP.");
    }
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="App">
      <h1>OTP Verification</h1>
      <Otp otpLength={5} onComplete={handleSubmit} autoSubmitDelay={500} />
      {message && <div className="message">{message}</div>}
      <div className="hint">Try: 12345</div>

      <div className="features">
        <span>⌨️ Keyboard navigation</span>
        <span>📋 Paste support</span>
        <span>🎯 Auto-focus</span>
        <span>⚡ Auto-submit</span>
      </div>
    </div>
  );
}
