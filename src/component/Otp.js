import { useState, useRef, useEffect } from "react";
import "./styles.css";

const OTP_DIGIT_LENGTH = 5;

export default function Otp({
  otpLength = OTP_DIGIT_LENGTH,
  submit = () => console.log("success"),
}) {
  const [inputArr, setInputArr] = useState(new Array(otpLength).fill(""));
  const refArr = useRef([]);

  useEffect(() => {
    const isComplete = inputArr.every((digit) => digit !== "");
    let timer;
    if (isComplete) {
      timer = setTimeout(() => {
        submit();
        const newArr = new Array(otpLength).fill("");
        setInputArr(newArr);
      }, 500);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [inputArr, submit]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleOnChange = (input, index) => {
    if (isNaN(input)) return;
    const newArr = [...inputArr];
    newArr[index] = input.trim().slice(-1);
    setInputArr(newArr);
    newArr[index] && refArr.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight") {
      refArr.current[index + 1]?.focus();
    }

    if (e.key === "ArrowLeft") {
      refArr.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const clipBoardData = e.clipboardData.getData("text");
    let numericChars = "";
    for (let i = 0; i < clipBoardData.length; i++) {
      if (clipBoardData[i] >= "0" && clipBoardData[i] <= "9") {
        numericChars += clipBoardData[i];
      }
    }
    const digitsToPaste = numericChars.slice(0, otpLength);
    const newArr = [...inputArr];
    for (let i = 0; i < digitsToPaste.length; i++) {
      newArr[i] = digitsToPaste[i];
    }
    setInputArr(newArr);
    const nextFocusIndex = Math.min(digitsToPaste.length, otpLength - 1);
    refArr.current[nextFocusIndex]?.focus();
  };

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
              onPaste={(e) => handlePaste(e, index)}
            ></input>
          );
        })}
      </div>
    </>
  );
}
