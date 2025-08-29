import { useState, useRef } from "react";
import "./styles.css";

const OTP_DIGIT_LENGTH = 5;

export default function Otp({ otpLength = OTP_DIGIT_LENGTH }) {
  const [inputArr, setInputArr] = useState(new Array(otpLength).fill("1"));
  const refArr = useRef([]);

  const handleOnChange = (input, index) => {
    if (isNaN(input)) return;
    const newArr = [...inputArr];
    newArr[index] = input.trim().slice(-1);
    setInputArr(newArr);
    newArr[index] && refArr.current[[index + 1]]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  return (
    <div className="input-container">
      {inputArr.map((val, index) => {
        return (
          <input
            className="input-box"
            key={index}
            type="text"
            value={inputArr[index]}
            ref={(input) => {
              return (refArr.current[index] = input);
            }}
            onChange={(e) => handleOnChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          ></input>
        );
      })}
    </div>
  );
}
