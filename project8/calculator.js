const input = document.getElementById("input");
const history = document.getElementById("history");
let currentInput = "";
let lastResult = "";

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => handleButton(btn));
});

document.addEventListener("keydown", (e) => handleKeyboard(e));

function handleButton(btn) {
  const value = btn.dataset.value;
  const action = btn.dataset.action;

  if (action === "clear") clearInput();
  else if (action === "backspace") backspace();
  else if (action === "calculate") calculate();
  else if (value) appendValue(value);
}

function handleKeyboard(e) {
  if (/[\d+\-*/.%]/.test(e.key)) appendValue(e.key);
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") backspace();
  if (e.key.toLowerCase() === "c") clearInput();
}

function appendValue(value) {
  currentInput += value;
  input.value = currentInput;
}

function clearInput() {
  currentInput = "";
  input.value = "";
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  input.value = currentInput;
}

function calculate() {
  try {
    const result = Function(`"use strict"; return (${currentInput})`)();
    history.textContent = currentInput + " =";
    currentInput = result;
    input.value = result;
  } catch {
    input.value = "Error";
    currentInput = "";
  }
}
