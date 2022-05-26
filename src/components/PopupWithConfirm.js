import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');

    this.submit = this._popup.querySelector('.popup__button');
    this._popupButtonTextDefault = this.submit.textContent;
  }

  open(card, cardID) {
    super.open();
    this._card = card;
    this._cardID = cardID;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card, this._cardID);
    });
  }

  renderLoading(isLoading = true) {
    if(isLoading) {
      this.submit.textContent = 'Удаляю...';
    } else {
      this.submit.textContent = this._popupButtonTextDefault;
    }
  }
}

