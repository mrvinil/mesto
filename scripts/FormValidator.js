export default class FormValidator {
  constructor(rest, formElement) {
    this._rest = rest;
    this._formElement = formElement;
  }

  // Находим класс ошибки и получаем
  // разметку ошибки соответствующего ей поля через его id
  _getInputError(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }

  // метод выделяет поле и показывает сообщение об ошибке
  _showError(inputElement, errorMessage) {
    const errorElement = this._getInputError(inputElement);

    inputElement.classList.add(this._rest.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._rest.errorClass);
  }

  // метод скрывает выделение поля и сообщение об ошибке
  _hideError(inputElement) {
    const errorElement = this._getInputError(inputElement);

    inputElement.classList.remove(this._rest.inputErrorClass);
    errorElement.classList.remove(this._rest.errorClass);
    errorElement.textContent = '';
  }

  // метод в зависимости от валидации скрывает или показывает ошибку
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  // метод принимает массив полей и ищет первое не валидное поле
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // метод принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._rest.inactiveButtonClass);
      button.setAttribute('disabled', 'true');
    } else {
      button.classList.remove(this._rest.inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }

  // Слушатель события input
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._rest.inputSelector));
    const button = this._formElement.querySelector(this._rest.submitButtonSelector);

    this._toggleButtonState(inputList, button);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, button);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
