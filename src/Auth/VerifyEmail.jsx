import React, { useRef, useState } from "react";
import PrimaryButton from "../components/common/PrimaryButton";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (isNaN(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if not the last one
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pasteData[i] || "";
    }
    setCode(newCode);
    inputRefs.current[Math.min(pasteData.length - 1, 5)].focus();
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Enter The Code</h1>
      <p className="text-gray-600 text-[14px]">
        Enter the 6-digit code sent to {"md@gmail.com"} via SMS.
      </p>

      <div className="mt-4 flex justify-center gap-2">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        ))}
      </div>
      <p className="text-center py-3">
        Didn't receive the code?{" "}
        <span className="text-primary cursor-pointer mb-4">Resend</span>
      </p>
      <Link to="/admin">
        <PrimaryButton type="button" value="Verify" />
      </Link>
    </div>
  );
};

export default VerifyEmail;
