// Hand component
// 4 boxes to store hand in form Ad5d

import React, { useState, useRef, useEffect } from "react";




const CodeInput: React.FC = () => {
    const [code, setCode] = useState("");
    const inputRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        if (inputRefs.current.length) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleInput = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
        const { key, target } = e;
        const value = target.value.trim();

        if (key === "Backspace" && value.length === 0) {
            if (i > 0) {
                inputRefs.current[i - 1].focus();
            }
            return;
        }

        if (value.length > 1) {
            target.value = value.charAt(0);
        }
        console.log(inputRefs);

        const newCode = inputRefs.current.map((input) => input.value).join("");
        setCode(newCode);
        if (i < inputRefs.current.length - 1 && value.length > 0) {
            inputRefs.current[i + 1].focus();
        }
    };

    return (
        <div>
            {[...Array(4)].map((_, i) => (
                <input
                    className="specialbox"
                    key={i}
                    type="text"
                    maxLength={1}
                    ref={(element) => inputRefs.current.push(element)}
                    onKeyUp={(e) => handleInput(e, i)}
                />
            ))}
        </div>
    );
};

export default CodeInput;

