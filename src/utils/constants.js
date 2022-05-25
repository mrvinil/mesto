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

const forms = document.forms;
const editProfileForm = forms.profileForm;
const createCardForm = forms.cardForm;

const inputUserName = editProfileForm.elements.userName;
const inputUserJob = editProfileForm.elements.userJob;

const inputCardName = document.querySelector('.popup__input_card-name');
const inputCardLink = document.querySelector('.popup__input_card-link');

const CARD_TEMPLATE = '#card-template';
const CARD_LIST = '.cards';
const POPUP_VIEW_IMAGE = '#popup__img';
const USER_NAME = '.profile__name';
const USER_JOB = '.profile__about';
const USER_AVATAR = '.profile__avatar';
const POPUP_FORM_PROFILE = '#popup__profile';
const POPUP_FORM_CARD = '#popup__card';

export {
  config,
  CARD_TEMPLATE,
  CARD_LIST,
  POPUP_VIEW_IMAGE,
  USER_NAME,
  USER_JOB,
  USER_AVATAR,
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
}
