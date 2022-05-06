const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
};

const showError = (form, element, errorMessage, { inputErrorClass, errorClass }) => {
  const errorElement = form.querySelector(`.${element.id}-error`);

  element.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideError = (form, element, { inputErrorClass, errorClass }) => {
  const errorElement = form.querySelector(`.${element.id}-error`);

  element.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (form, element, config) => {
  if (!element.validity.valid) {
    showError(form, element, element.validationMessage, config);
  } else {
    hideError(form, element, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, button, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', 'true');
  } else {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  }
};

const setEventListeners = (form, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);

  toggleButtonState(inputList, button, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(form, inputElement, rest);
      toggleButtonState(inputList, button, inactiveButtonClass);
    });
  });
};

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelector(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

enableValidation(config);
