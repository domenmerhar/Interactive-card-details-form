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

const successMessageHTML = `
    <img
    class="input-container__img"
    src="images/icon-complete.svg"
    alt="checkmark"
  />
  <div>
    <h1 class="input-container__form__heading">Thank you!</h1>
    <p class="input-container__form__paragraph">
      We've added your card details
    </p>
  </div>

  <button class="input-container__form__btn">Confirm</button>
  `

const form = document.querySelector('[data-input="form"]')
const inputContainer = document.querySelector('[data-input="container"]')

const currentDate = new Date()

const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth() + 1

let isMobile

function isCreditCardValid(cardNumber) {
  // Remove any spaces or non-numeric characters
  const cleanedCardNumber = cardNumber.replace(/\D/g, "")

  // Convert the card number to an array of digits
  const digits = cleanedCardNumber.split("").map(Number)

  // Reverse the array to start from the rightmost digit
  digits.reverse()

  // Apply the Luhn algorithm
  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i]

    if (i % 2 === 1) {
      // Double every second digit
      digit *= 2

      // If the result is greater than 9, subtract 9
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
  }

  // Check if the sum is a multiple of 10
  return sum % 10 === 0
}

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

const validateCreditCard = (input, error) => {
  if (input.value.length !== input.maxLength) return

  if (!isCreditCardValid(input.value)) {
    if (!isMobile) error.classList.add("error-message--shown")
    console.log("invalid")
    return input.setCustomValidity("Credit card number does not exist")
  }
}

const validate = (input, error) => {
  if (input.dataset.input === "card-number") validateCreditCard(input, error)
  if (isMobile) return

  if (error.classList.contains("error-message--shown"))
    error.classList.remove("error-message--shown")

  if (input.validationMessage !== "") {
    error.textContent = input.validationMessage
    error.classList.add("error-message--shown")
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
  isMobile = window.matchMedia("screen and (max-width: 48em)").matches

  trackedFields.forEach(([element, input]) => {
    if (input.value === "") return

    changeTextContent(element, format(input.value, input))
  })
}

init()

trackedFields.forEach(([element, input, error]) =>
  trackInput(input, element, error)
)

form.addEventListener("submit", (e) => {
  e.preventDefault()
  inputContainer.classList.add("display-flex")
  inputContainer.classList.add("align-items--center")
  form.classList.add("align-items--center")

  form.innerHTML = successMessageHTML
})

window.addEventListener("resize", () => {
  isMobile = window.matchMedia("screen and (max-width: 48em)").matches
})
