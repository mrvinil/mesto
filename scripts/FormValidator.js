export default class FormValidator {
  constructor(rest, formElement) {
    this._rest = rest;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._rest.inputSelector));
  }

  _getInputError(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._getInputError(inputElement);

    inputElement.classList.add(this._rest.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._rest.errorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._getInputError(inputElement);

    inputElement.classList.remove(this._rest.inputErrorClass);
    errorElement.classList.remove(this._rest.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._rest.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._rest.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _setEventListeners() {
    this._button = this._formElement.querySelector(this._rest.submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
