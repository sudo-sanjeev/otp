# 🧩 OTP Component - React

A comprehensive, reusable React component for OTP (One-Time Password) input fields, designed with interview best practices and real-world usability in mind.

## 🎯 About This Project

The OTP component is one of the most commonly asked machine coding questions in React interviews. This implementation demonstrates a systematic approach to building production-ready components, focusing on user experience, accessibility, and clean code architecture.

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

## ✅ Implementation Strategy & Milestones

This project follows a phased development approach, perfect for interview scenarios where time management is crucial:

### Phase 1: Core Functionality ⚡

- **Configurable length** (4-6 digits default, fully customizable)
- **Numeric-only input** with validation
- **Single character per field** constraint
- **Auto-focus navigation** (moves to next field automatically)
- **Backspace handling** (moves to previous field when current is empty)

### Phase 2: Enhanced UX 🎨

- **Paste support** with intelligent auto-distribution
- **Arrow key navigation** (left/right keys for manual navigation)
- **Click-to-focus** functionality
- **Auto-submit** when OTP is complete
- **Auto-clear** after submission

### Phase 3: Validation & Accessibility ♿

- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Input validation** with error handling
- **Customizable styling** through CSS classes
- **Screen reader compatibility**

## 🏗️ Architecture & Code Organization

### Component Structure

```
src/
├── component/
│   ├── Otp.js              # Main OTP component
│   ├── styles.css          # Component styling
│   └── hooks/
│       └── useOtp.js       # Custom hook with all logic
```

### Key Design Decisions

1. **Custom Hook Pattern**: All logic is extracted into `useOtp` hook for better separation of concerns and testability
2. **Ref Management**: Uses `useRef` array to manage focus across multiple input fields
3. **State Management**: Simple `useState` for input array, avoiding over-engineering
4. **Event Handling**: Comprehensive keyboard and paste event handling

## 🔧 Features Deep Dive

### Smart Paste Handling

```javascript
const handlePaste = (e) => {
  e.preventDefault();
  const clipboardData = e.clipboardData.getData("text");

  // Extract only numeric characters
  let numericChars = "";
  for (let i = 0; i < clipboardData.length; i++) {
    const char = clipboardData[i];
    if (char >= "0" && char <= "9") {
      numericChars += char;
    }
  }

  // Distribute across input fields
  const digitsToPaste = numericChars.slice(0, otpLength);
  // ... rest of implementation
};
```

### Auto-Focus Management

```javascript
const focusInput = (refArr, index) => {
  refArr.current[index]?.focus();
};

// Usage in onChange
if (newArr[index] && index < otpLength - 1) {
  focusInput(refArr, index + 1);
}
```

### Keyboard Navigation

- **Backspace**: Moves to previous field when current field is empty
- **Arrow Keys**: Manual navigation between fields
- **Number Keys**: Direct input with automatic progression

## 🎨 Styling & Customization

The component uses CSS classes for easy customization:

```css
.input-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.input-box {
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 18px;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.input-box:focus {
  border-color: #007bff;
  outline: none;
}
```

## 📋 Props API

| Prop              | Type     | Default    | Description                   |
| ----------------- | -------- | ---------- | ----------------------------- |
| `otpLength`       | number   | 5          | Number of OTP digits          |
| `autoSubmitDelay` | number   | 500        | Delay before auto-submit (ms) |
| `onComplete`      | function | `() => {}` | Callback when OTP is complete |

## 🧪 Interview Tips & Best Practices

### Time Management Strategy

1. **Requirements Gathering** (5 minutes): Ask clarifying questions
2. **Core Implementation** (15 minutes): Focus on basic functionality first
3. **Enhancement** (10 minutes): Add UX improvements if time permits

### Key Questions to Ask in Interviews

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
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📝 Final Notes

Remember: In interviews, you won't be able to implement everything perfectly in 30 minutes, and that's okay! Focus on:

1. **Think before you code** - Show your thought process
2. **Write clean, understandable code** - Quality over quantity
3. **Communicate clearly** - Explain your decisions
4. **Handle one thing well** - Better to nail core functionality than half-implement everything

Sometimes solving one part of the problem exceptionally well is enough to impress interviewers more than a rushed, complete solution.

---

_Built with ❤️ for the React community and interview preparation_
