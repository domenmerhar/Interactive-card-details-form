const trackedFields = [
  [
    document.querySelector('[data-text="name"]'),
    document.querySelector('[data-input="name"]'),
    document.querySelector('[data-error="name"]'),
  ],
  [
    document.querySelector('[data-text="card-number"]'),
    document.querySelector('[data-input="card-number"]'),
    document.querySelector('[data-error="card-number"]'),
  ],
  [
    document.querySelector('[data-text="exp-date-month"]'),
    document.querySelector('[data-input="exp-date-month"]'),
    document.querySelector('[data-error="date"]'),
  ],
  [
    document.querySelector('[data-text="exp-date-year"]'),
    document.querySelector('[data-input="exp-date-year"]'),
    document.querySelector('[data-error="date"]'),
  ],
  [
    document.querySelector('[data-text="CVC"]'),
    document.querySelector('[data-input="CVC"]'),
    document.querySelector('[data-error="cvc"]'),
  ],
]

const form = document.querySelector('[data-input="form"]')

const formatCardNumber = (text) =>
  text.length < 4 || text.length > 16
    ? text
    : text
        .split("")
        .map((char, index) => (index % 4 == 0 ? " " + char : char))
        .join("")

const formatDate = (text) => (text.length < 2 ? text.padStart(2, "0") : text)

const formatCVC = (text) => (text.length < 3 ? text.padStart(3, "0") : text)

const format = (text, input) => {
  switch (input.dataset.input) {
    case "card-number":
      return formatCardNumber(text)
    case "exp-date-month":
      return formatDate(text)
    case "exp-date-year":
      return formatDate(text)
    case "CVC":
      return formatCVC(text)
    default:
      return text
  }
}

const changeTextContent = (element, value) => {
  element.textContent = value
}

const validate = (input, error) => {
  if (input.validationMessage !== "") {
    error.textContent = input.validationMessage
    return error.classList.add("error-message--shown")
  }

  if (error.classList.contains) {
    error.classList.remove("error-message--shown")
  }
}

const trackInput = (input, element, error) => {
  input.addEventListener("input", (e) => {
    validate(input, error)

    if (input.value === "") return (element.textContent = input.placeholder)

    changeTextContent(element, format(e.target.value, input))
  })
}

const init = () => {
  trackedFields.forEach(([element, input]) => {
    if (input.value === "") return

    changeTextContent(element, format(input.value, input))
  })
}

init()

trackedFields.forEach(([element, input, error]) =>
  trackInput(input, element, error)
)
