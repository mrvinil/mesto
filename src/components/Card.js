export default class Card {
  constructor({data, handleCardClick, handleCardDelete, handleLikeClick}, cardSelector, userId) {
    this._name = data.name;
    this._link = data.link;
    this._myId = userId;
    this._id = data._id;
    this._owner = data.owner._id;

    this._likesList = data.likes;
    this._likesServerCount = this._likesList.length;
    this._isLiked = this._likesList.some((item) => item._id === this._myId);

    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
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

    this._likesCount = this._element.querySelector('.cards__like-count');
    this._likeButton = this._element.querySelector('.cards__like-button');
    if(this._isLiked) {
      this._likeButton.classList.add('cards__like-button_active');
    }

    this._deleteButton = this._element.querySelector('.cards__trash');
    if (this._owner !== this._myId) {
      this._deleteButton.remove();
    }

    this._title = this._element.querySelector('.cards__name');
    this._title.textContent = this._name;

    this._image.src = this._link;
    this._image.alt = this._name;
    this._likesCount.textContent = this._likesServerCount;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._image.addEventListener('click', () => {
      this._viewImage();
    });
  }

  _viewImage() {
    this._handleCardClick(this._name, this._link);
  }

  _handleLike() {
    this._handleLikeClick(this._id, this._isLiked, (data) => {
      this._likesCount.textContent = data.likes.length;
      this._likeButton.classList.toggle('cards__like-button_active');
      this._isLiked = !this._isLiked;
    });
  }

  _deleteCard() {
    this._handleCardDelete(this._element, this._id);
  }
}
