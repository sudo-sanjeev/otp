# 🧩 OTP Component - React

A comprehensive, reusable React component for OTP (One-Time Password) input fields, designed with interview best practices and real-world usability in mind.

**GitHub Repository**: [https://github.com/sudo-sanjeev/otp](https://github.com/sudo-sanjeev/otp)

## ✅ Milestones

| Milestone | Description                                                                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1         | **Core Functionality**: Configurable length (4-6 digits), numeric-only input, single character per field, auto-focus navigation, backspace handling |
| 2         | **Enhanced UX**: Paste support with auto-distribution, arrow key navigation, click-to-focus, auto-submit when complete                              |
| 3         | **Validation & Accessibility**: Error handling, customizable styling, ARIA labels, keyboard navigation, screen reader support                       |

## 🎬 Demo

![OTP Component Demo](src/assets/otpDemo.gif)

## 🚀 Quick Start

```jsx
import Otp from "./component/Otp";

function App() {
  const handleOtpComplete = (otp) => {
    console.log("OTP entered:", otp);
    // Handle OTP verification
  };

  return (
    <Otp otpLength={5} autoSubmitDelay={500} onComplete={handleOtpComplete} />
  );
}
```

## 📋 Props API

| Prop              | Type     | Default    | Description                   |
| ----------------- | -------- | ---------- | ----------------------------- |
| `otpLength`       | number   | 5          | Number of OTP digits          |
| `autoSubmitDelay` | number   | 500        | Delay before auto-submit (ms) |
| `onComplete`      | function | `() => {}` | Callback when OTP is complete |

## 🏗️ Architecture

```
src/
├── component/
│   ├── Otp.js              # Main OTP component
│   ├── styles.css          # Component styling
│   └── hooks/
│       └── useOtp.js       # Custom hook with all logic
```

**Key Design Decisions:**

- **Custom Hook Pattern**: Logic separated into `useOtp` hook for reusability
- **Ref Management**: `useRef` array to manage focus across input fields
- **Event Handling**: Comprehensive keyboard and paste event handling

## 💻 Complete Code Implementation

### Main OTP Component (`Otp.js`)

```javascript
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
        {inputArr.map((val, index) => (
          <input
            className="input-box"
            key={index}
            type="text"
            inputMode="numeric" // Shows numeric keypad on mobile
            pattern="[0-9]" // HTML5 validation pattern
            maxLength="1" // Restricts to single character
            value={val}
            aria-label={`Digit ${index + 1} of ${otpLength}`}
            ref={(input) => (refArr.current[index] = input)}
            onChange={(e) => handleOnChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e)}
          />
        ))}
      </div>
    </>
  );
}
```

### Custom Hook (`useOtp.js`)

```javascript
import { useState, useRef, useEffect } from "react";

const focusInput = (refArr, index) => {
  refArr.current[index]?.focus();
};

export const useOtp = (otpLength, autoSubmitDelay, onComplete) => {
  const [inputArr, setInputArr] = useState(new Array(otpLength).fill(""));
  const refArr = useRef([]);

  // Auto-submit when all fields are filled
  useEffect(() => {
    const isComplete = inputArr.every((digit) => digit !== "");
    let timer;

    if (isComplete) {
      timer = setTimeout(() => {
        onComplete(inputArr.join("")); // Call parent callback
        setInputArr(new Array(otpLength).fill("")); // Reset form
      }, autoSubmitDelay);
    }

    return () => {
      if (timer) clearTimeout(timer); // Cleanup timer
    };
  }, [inputArr, onComplete, otpLength, autoSubmitDelay]);

  // Focus first input on mount
  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleOnChange = (input, index) => {
    // Validate: only allow numeric input
    if (input && (input < "0" || input > "9")) return;

    const newArr = [...inputArr];
    newArr[index] = input.slice(-1); // Take only last character
    setInputArr(newArr);

    // Auto-advance to next field
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

    // Extract only numeric characters
    let numericChars = "";
    for (let i = 0; i < clipBoardData.length; i++) {
      const char = clipBoardData[i];
      if (char >= "0" && char <= "9") {
        numericChars += char;
      }
    }

    // Limit to OTP length and distribute
    const digitsToPaste = numericChars.slice(0, otpLength);
    const newArr = new Array(otpLength).fill("");

    for (let i = 0; i < digitsToPaste.length; i++) {
      newArr[i] = digitsToPaste[i];
    }

    setInputArr(newArr);

    // Focus the next empty field or last filled field
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
```

### Styling (`styles.css`)

```css
.input-container {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}

.input-box {
  text-align: center;
  width: 50px;
  height: 50px;
  font-size: 20px;
  font-weight: 500;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  color: #333;
  transition: border-color 0.2s ease;
}

.input-box:focus {
  border-color: #3498db;
}
```

## 🔧 Key Implementation Details

**Critical Decisions:**

- **`slice(-1)`**: Ensures only one character per field
- **Optional Chaining (`?.`)**: Prevents errors if refs aren't ready
- **Timer Cleanup**: Prevents memory leaks in useEffect
- **Numeric Validation**: Character-by-character validation for paste operations
- **Focus Management**: Centralized focus control through helper function

## 🧪 Interview Strategy

### Time Management (30 minutes)

1. **Requirements Gathering** (5 min): Ask clarifying questions
2. **Core Implementation** (15 min): Focus on basic functionality first
3. **Enhancement** (10 min): Add UX improvements if time permits

### Key Questions to Ask

- Should we validate the OTP or is a placeholder fine?
- Is the OTP length fixed or dynamic?
- Should we support paste functionality?
- Any specific UI/UX requirements?

### What Impresses Interviewers

- **Clean, modular code** with proper separation of concerns
- **Accessibility considerations** from the start
- **Edge case handling** (paste, keyboard navigation)
- **Performance considerations** (proper cleanup, ref management)

## 🚀 Running the Project

```bash
npm install
npm start
```

## 📝 Final Notes

In interviews, focus on:

1. **Think before you code** - Show your thought process
2. **Write clean, understandable code** - Quality over quantity
3. **Handle one thing well** - Better to nail core functionality than half-implement everything

Sometimes solving one part exceptionally well impresses more than a rushed, complete solution.

---

_Built with ❤️ for the React community and interview preparation_
