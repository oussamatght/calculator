const input = document.getElementById("input") as HTMLInputElement;
const history = document.getElementById("history") as HTMLElement;

let currentInput: string = "";
let lastResult: string = "";

const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".btn");
buttons.forEach((btn: HTMLButtonElement) => {
    btn.addEventListener("click", () => handleButtonClick(btn));
});

document.addEventListener("keydown", (event: KeyboardEvent) => handleKeyboardInput(event));


function handleButtonClick(btn: HTMLButtonElement): void {
    const value: string | undefined = btn.dataset.value;
    const action: string | undefined = btn.dataset.action;

    if (action === "clear") {
        clearInput();
    } else if (action === "backspace") {
        removeLastCharacter();
    } else if (action === "calculate") {
        calculateResult();
    } else if (value) {
        appendToInput(value);
    }
}


function handleKeyboardInput(event: KeyboardEvent): void {
    const key: string = event.key;

    if (/[0-9+\-*/.%]/.test(key)) {
        appendToInput(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        removeLastCharacter();
    } else if (key.toLowerCase() === "c") {
        clearInput();
    }
}


function appendToInput(value: string): void {
    currentInput += value;
    updateInputField();
}


function clearInput(): void {
    currentInput = "";
    updateInputField();
}


function removeLastCharacter(): void {
    currentInput = currentInput.slice(0, -1);
    updateInputField();
}


function updateInputField(): void {
    input.value = currentInput;
}


function calculateResult(): void {
    try {
        const result: number = Function(`"use strict"; return (${currentInput})`)();
        updateHistory(currentInput);
        currentInput = String(result);
        updateInputField();
        lastResult = String(result);
    } catch (error) {
        handleCalculationError(error);
    }
}

function updateHistory(expression: string): void {
    history.textContent = expression + " =";
}


function handleCalculationError(error: any): void {
    input.value = "Error";
    currentInput = "";
    console.error("Calculation error:", error);
}
