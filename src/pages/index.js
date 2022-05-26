import './index.css';

import {
  config,
  CARD_TEMPLATE,
  CARD_LIST,
  POPUP_VIEW_IMAGE,
  POPUP_FORM_PROFILE,
  POPUP_FORM_AVATAR,
  POPUP_FORM_CARD,
  POPUP_FORM_CARD_DELETE,
  profileEditButton,
  addCardButton,
  avatarEditButton,
  userData,
} from '../utils/constants.js';

import { enableValidation, formValidators } from "../utils/formValidators.js";

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// Создаем api работы с сервером
const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '94f82fe8-d5f1-4c97-b104-8e3f90c97123',
    'Content-Type': 'application/json',
  }
});

// Создаем пользователя
const user = new UserInfo(userData);

// Создаем объект содержащий секцию с карточками
const cardList = new Section({renderer: createCard}, CARD_LIST);

// Функция создания карточки
function createCard(cardData) {
  return new Card({
      data: cardData,
      handleCardClick: (name, link) => popupViewImage.open(name, link),
      handleCardDelete: (card, id) => formConfirm.open(card, id),
      handleLikeClick: (cardId, isLiked, likeCount) => {
        if (isLiked) {
          api.deleteLike(cardId)
            .then((res) => likeCount(res))
            .catch((err) => console.log(err))
        } else {
          api.putLike(cardId)
            .then((res) => likeCount(res))
            .catch((err) => console.log(err))
        }
      },
    },
    CARD_TEMPLATE,
    user.getUserID()
  ).renderCard(); // вызываем метод, который возвращает разметку карточки
}

const popupViewImage = new PopupWithImage(POPUP_VIEW_IMAGE);

// форма подтверждения действия
const formConfirm = new PopupWithConfirm(POPUP_FORM_CARD_DELETE, {
  handleFormSubmit: (card, id) => {
    formConfirm.renderLoading();
    api.deleteCard(id)
      .then(() => {
        formConfirm.close();
        card.remove();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        formConfirm.renderLoading(false);
      });
  },
});

//форма редактирования профиля
const editProfile = new PopupWithForm(POPUP_FORM_PROFILE, {
  handleFormSubmit: (userData) => {
    editProfile.renderLoading();
    api.editUserInfo(userData)
      .then((res) => {
        user.setUserInfo(res);
        editProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => editProfile.renderLoading(false));
  },
});


// форма добавления карточки
const formAddCard = new PopupWithForm(POPUP_FORM_CARD, {
  handleFormSubmit: (item) => {
    const cardProperty = {
      name: item.nameImg,
      link: item.linkImg
    };
    formAddCard.renderLoading();
    api.addCard(cardProperty)
      .then((cardProperty) => {
        cardList.addItem(cardProperty);
        formAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => formAddCard.renderLoading(false));
  },
});


// форма редактирования аватара профиля
const formEditAvatar = new PopupWithForm(POPUP_FORM_AVATAR, {
  handleFormSubmit: (avatar) => {
    formEditAvatar.renderLoading();
    api.editUserAvatar(avatar.avatarLink)
      .then((res) => {
        user.setUserInfo(res);
        formEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => formEditAvatar.renderLoading(false));
  },
});

function popupEditOpen() {
  formValidators.profileForm.resetFormValidation();
  editProfile.setInputValues(user.getUserInfo());
  editProfile.open();
}

function popupAddOpen() {
  formValidators.cardForm.resetFormValidation();
  formAddCard.open();
}

function popupAvatarEditOpen() {
  formValidators.profileAvatar.resetFormValidation();
  formEditAvatar.open();
}

api.getAllNeededData()
  .then(( [cards, userData] ) => {
    user.setUserInfo(userData);
    user.getUserID();
    cardList.renderItems(cards)

    // подключение валидации
    enableValidation(config);
    // Вешаем слушателей на кнопки открытия форм
    profileEditButton.addEventListener('click', popupEditOpen);
    addCardButton.addEventListener('click', popupAddOpen);
    avatarEditButton.addEventListener('click', popupAvatarEditOpen);
    // Вешаем слушателей на событие отправки формы
    popupViewImage.setEventListeners();
    formConfirm.setEventListeners();
    editProfile.setEventListeners();
    formAddCard.setEventListeners();
    formEditAvatar.setEventListeners();
  })
  .catch((err) => console.log(err))
