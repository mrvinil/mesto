import './index.css';

import {initialCards} from '../utils/data.js';
import {
  config,
  CARD_TEMPLATE,
  CARD_LIST,
  POPUP_VIEW_IMAGE,
  USER_NAME,
  USER_JOB,
  POPUP_FORM_PROFILE,
  POPUP_FORM_CARD,
  profileEditButton,
  addCardButton,
  editProfileForm,
  createCardForm,
  inputUserName,
  inputUserJob,
  inputCardName,
  inputCardLink,
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const cardList = new Section({renderer: (cardProperty) => cardList.addItem(addCard(cardProperty))}, CARD_LIST);
cardList.renderItems(initialCards);

const popupViewImage = new PopupWithImage(POPUP_VIEW_IMAGE);
popupViewImage.setEventListeners();

function addCard(cardProperty) {
  return new Card(
    {
      data: cardProperty,
      handleCardClick: (name, link) => {
        popupViewImage.open(name, link);
      },
    },
    CARD_TEMPLATE
  ).renderCard();
}

const userData = {
  userNameSelector: USER_NAME,
  userJobSelector: USER_JOB,
};
const user = new UserInfo(userData);

const editProfile = new PopupWithForm(POPUP_FORM_PROFILE, { handleFormSubmit: (userData) => user.setUserInfo(userData.userName, userData.userJob), });
editProfile.setEventListeners();

const formAddCard = new PopupWithForm(POPUP_FORM_CARD, { handleFormSubmit: () => {
    const cardProperty = {
      name: inputCardName.value,
      link: inputCardLink.value
    };
    cardList.addItem(addCard(cardProperty));
  },
});
formAddCard.setEventListeners();

const profileFormValidator = new FormValidator(config, editProfileForm);
const cardFormValidator = new FormValidator(config, createCardForm);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

function popupEditOpen() {
  inputUserName.value = user.getUserInfo().userName;
  inputUserJob.value = user.getUserInfo().userJob;
  profileFormValidator.resetFormValidation();
  editProfile.open();
}

function popupAddOpen() {
  cardFormValidator.resetFormValidation();
  formAddCard.open();
}

profileEditButton.addEventListener('click', popupEditOpen);
addCardButton.addEventListener('click', popupAddOpen);
