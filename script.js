const trackedFields = [
  [
    document.querySelector('[data-text="card-number"]'),
    document.querySelector('[data-input="card-number"]'),
  ],
  [
    document.querySelector('[data-text="name"]'),
    document.querySelector('[data-input="name"]'),
  ],
  [
    document.querySelector('[data-text="exp-date-month"]'),
    document.querySelector('[data-input="exp-date-month"]'),
  ],
  [
    document.querySelector('[data-text="exp-date-year"]'),
    document.querySelector('[data-input="exp-date-year"]'),
  ],
  [
    document.querySelector('[data-text="CVC"]'),
    document.querySelector('[data-input="CVC"]'),
  ],
]

const CVCInput = document.querySelector('[data-input="CVC"]')

const formatCardNumber = (element, text) =>
  text.length < 4 || text.length > 16
    ? text
    : text
        .split("")
        .map((char, index) => (index % 4 == 0 ? " " + char : char))
        .join("")

const changeTextContent = (element, value) => {
  element.textContent = value
}

const trackInput = (input, element) => {
  input.addEventListener("input", (e) => {
    changeTextContent(
      element,
      input.dataset.input === "card-number"
        ? formatCardNumber(element, e.target.value)
        : e.target.value
    )
  })
}

trackedFields.forEach(([element, input]) => trackInput(input, element))
