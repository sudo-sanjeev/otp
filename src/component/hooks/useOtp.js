import { useState, useRef, useEffect } from "react";

const focusInput = (refArr, index) => {
  refArr.current[index]?.focus();
};

export const useOtp = (otpLength, autoSubmitDelay, onComplete) => {
  const [inputArr, setInputArr] = useState(new Array(otpLength).fill(""));
  const refArr = useRef([]);

  useEffect(() => {
    const isComplete = inputArr.every((digit) => digit !== "");
    let timer;

    if (isComplete) {
      timer = setTimeout(() => {
        onComplete(inputArr.join(""));
        setInputArr(new Array(otpLength).fill(""));
      }, autoSubmitDelay);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [inputArr, onComplete, otpLength]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleOnChange = (input, index) => {
    if (input && (input < "0" || input > "9")) return;

    const newArr = [...inputArr];
    newArr[index] = input.slice(-1);
    setInputArr(newArr);

    if (newArr[index] && index < otpLength - 1) {
      focusInput(refArr, index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    const { key, target } = e;

    switch (key) {
      case "Backspace":
        if (!target.value && index > 0) {
          focusInput(refArr, index - 1);
        }
        break;
      case "ArrowRight":
        if (index < otpLength - 1) {
          focusInput(refArr, index + 1);
        }
        break;
      case "ArrowLeft":
        if (index > 0) {
          focusInput(refArr, index - 1);
        }
        break;
      default:
        break;
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipBoardData = e.clipboardData.getData("text");

    let numericChars = "";
    for (let i = 0; i < clipBoardData.length; i++) {
      const char = clipBoardData[i];
      if (char >= "0" && char <= "9") {
        numericChars += char;
      }
    }

    const digitsToPaste = numericChars.slice(0, otpLength);
    const newArr = new Array(otpLength).fill("");

    for (let i = 0; i < digitsToPaste.length; i++) {
      newArr[i] = digitsToPaste[i];
    }

    setInputArr(newArr);

    const nextIndex = Math.min(digitsToPaste.length, otpLength - 1);
    focusInput(refArr, nextIndex);
  };

  return {
    inputArr,
    refArr,
    handleOnChange,
    handleKeyDown,
    handlePaste,
  };
};
