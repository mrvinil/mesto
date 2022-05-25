import Api from "../components/Api";

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
};

const profileEditButton = document.querySelector('.profile__edit');
const addCardButton = document.querySelector('.profile__add');
const avatarEditButton = document.querySelector('.profile__avatar-wrap');

const forms = document.forms;
const editProfileForm = forms.profileForm;
const createCardForm = forms.cardForm;
const editProfileAvatarForm = forms.profileAvatar;

const inputUserName = editProfileForm.elements.userName;
const inputUserJob = editProfileForm.elements.userJob;

const inputAvatarLink = editProfileAvatarForm.elements.avatarUrl;

const inputCardName = document.querySelector('.popup__input_card-name');
const inputCardLink = document.querySelector('.popup__input_card-link');

const CARD_TEMPLATE = '#card-template';
const CARD_LIST = '.cards';
const POPUP_VIEW_IMAGE = '#popup__img';
const USER_NAME = '.profile__name';
const USER_JOB = '.profile__about';
const USER_AVATAR = '.profile__avatar';
const POPUP_FORM_PROFILE = '#popup__profile';
const POPUP_FORM_AVATAR = '#popup__avatar';
const POPUP_FORM_CARD = '#popup__card';
const POPUP_FORM_CARD_DELETE = '#popup__delete';

const userData = {
  userNameSelector: USER_NAME,
  userJobSelector: USER_JOB,
  userAvatarSelector: USER_AVATAR,
};

export {
  config,
  CARD_TEMPLATE,
  CARD_LIST,
  POPUP_VIEW_IMAGE,
  USER_NAME,
  USER_JOB,
  USER_AVATAR,
  POPUP_FORM_PROFILE,
  POPUP_FORM_AVATAR,
  POPUP_FORM_CARD,
  POPUP_FORM_CARD_DELETE,
  profileEditButton,
  addCardButton,
  avatarEditButton,
  editProfileForm,
  createCardForm,
  editProfileAvatarForm,
  inputUserName,
  inputUserJob,
  inputCardName,
  inputCardLink,
  inputAvatarLink,
  userData,
  optionsApi,
}

const optionsApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "94f82fe8-d5f1-4c97-b104-8e3f90c97123",
    "Content-Type": "application/json",
  }
};
