import { useOtp } from "./hooks/useOtp";
import "./styles.css";

const OTP_DIGIT_LENGTH = 5;
const AUTO_SUBMIT_DELAY = 500;

export default function Otp({
  otpLength = OTP_DIGIT_LENGTH,
  autoSubmitDelay = AUTO_SUBMIT_DELAY,
  onComplete = () => console.log("success"),
}) {
  const { inputArr, refArr, handleOnChange, handleKeyDown, handlePaste } =
    useOtp(otpLength, autoSubmitDelay, onComplete);

  return (
    <>
      <label id="otp-label">Enter verification code</label>
      <div className="input-container" role="group" aria-labelledby="otp-label">
        {inputArr.map((val, index) => {
          return (
            <input
              className="input-box"
              key={index}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength="1"
              value={val}
              aria-label={`Digit ${index + 1} of ${otpLength}`}
              ref={(input) => {
                return (refArr.current[index] = input);
              }}
              onChange={(e) => handleOnChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e)}
            ></input>
          );
        })}
      </div>
    </>
  );
}
