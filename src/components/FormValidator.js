export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }

  _getInputError(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._getInputError(inputElement);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._getInputError(inputElement);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  // Валидация поля. Показ или скрытие ошибки
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  // Проверка валидности всех полей
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Изменение кнопки в зависимости от валидности поля
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._config.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  // Проверка валидности при вводе
  _setEventListeners() {
    this._button = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // метод отключающий кнопку
  resetFormValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
    this._toggleButtonState();
  }

  // Метод включения валидации
  enableValidation() {
    this._setEventListeners();
  }
}
