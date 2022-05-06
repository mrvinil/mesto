export default class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);
  }

  renderCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.cards__img');
    this._title = this._element.querySelector('.cards__name');
    this._likeButton = this._element.querySelector('.cards__like');
    this._deleteButton = this._element.querySelector('.cards__trash');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete();
    });

    this._image.addEventListener('click', () => {
      this._viewImage();
    });
  }

  _viewImage() {
    this._handleCardClick(this._name, this._link);
  }

  _handleLike() {
    this._likeButton.classList.toggle('cards__like_active');
  }

  _handleCardDelete() {
    this._element.remove();
  }
}
