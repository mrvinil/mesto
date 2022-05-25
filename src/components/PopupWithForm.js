import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    //this._popupButton = this._popupForm.querySelector('.popup__button'); // TODO: _popupForm или _popup
    this.submit = this._popupForm.querySelector('.popup__button'); // TODO: _popupForm или _popup
    //this._inputList = Array.from(this._popup.querySelectorAll('input'));

    this._popupButtonTextDefault = this.submit.textContent
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((inputElement) => {
      inputValues[inputElement.name] = inputElement.value
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this.submit.textContent = 'Сохранение...';
    } else {
      this.submit.textContent = this._popupButtonTextDefault;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((inputElement) => {
      inputElement.value = data[inputElement.name];
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
