const input = document.getElementById("input") as HTMLInputElement;
const history = document.getElementById("history") as HTMLElement;

let currentInput: string = "";
let lastResult: string = "";

const buttons = document.querySelectorAll<HTMLButtonElement>(".btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => handleButton(btn));
});

document.addEventListener("keydown", (e: KeyboardEvent) => handleKeyboard(e));

function handleButton(btn: HTMLButtonElement): void {
  const value = btn.dataset.value;
  const action = btn.dataset.action;

  if (action === "clear") clearInput();
  else if (action === "backspace") backspace();
  else if (action === "calculate") calculate();
  else if (value) appendValue(value);
}

function handleKeyboard(e: KeyboardEvent): void {
  if (/[\d+\-*/.%]/.test(e.key)) appendValue(e.key);
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") backspace();
  if (e.key.toLowerCase() === "c") clearInput();
}

function appendValue(value: string): void {
  currentInput += value;
  input.value = currentInput;
}

function clearInput(): void {
  currentInput = "";
  input.value = "";
}

function backspace(): void {
  currentInput = currentInput.slice(0, -1);
  input.value = currentInput;
}

function calculate(): void {
  try {
    const result = Function(`"use strict"; return (${currentInput})`)();
    history.textContent = currentInput + " =";
    currentInput = String(result);
    input.value = currentInput;
  } catch {
    input.value = "Error";
    currentInput = "";
  }
}
