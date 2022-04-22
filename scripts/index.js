import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, rest} from "../utils/data.js";

const profileEditButton = document.querySelector('.profile__edit');
const addCardButton = document.querySelector('.profile__add');
const popupsList = Array.from(document.querySelectorAll('.popup'));

const popupImage = document.querySelector('#popup__img');
const popupFormProfile = document.querySelector('#popup__profile');
const popupFormCard = document.querySelector('#popup__card');
const editProfileForm = document.querySelector('#popup__form_profile');
const createCardForm = document.querySelector('#popup__form_card');

const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');

const inputCardName = document.querySelector('.popup__input_card-name');
const inputCardLink = document.querySelector('.popup__input_card-link');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');

const cardsWrap = document.querySelector('.cards');

const modalImage = document.querySelector('.modal__img');
const modalName = document.querySelector('.modal__name');


function addCard(data, cardSelector, handleImageOpen) {
  const card = new Card(data, cardSelector, handleImageOpen);
  return card.renderCard();
}

initialCards.forEach((item) => {
  const cardsElement = addCard(item, '#card-template', handleImageOpen);
  cardsWrap.append(cardsElement);
});

function handleCardCreate(evt) {
  evt.preventDefault();

  const cardProperty = addCard({name: inputCardName.value, link: inputCardLink.value}, '#card-template', handleImageOpen);
  cardsWrap.prepend(cardProperty);

  evt.currentTarget.reset();
  evt.submitter.classList.add('popup__button_disabled');
  evt.submitter.setAttribute('disabled', 'true');
  closePopup(evt.target.closest('.popup_opened'));
}

function handleImageOpen() {
  openPopup(popupImage);
  modalImage.src = this._link;
  modalImage.alt = this._name;
  modalName.textContent = this._name;
}

// подключение валидации форм
const profileFormValidator = new FormValidator(rest, editProfileForm);
const cardFormValidator = new FormValidator(rest, createCardForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

function editProfile(evt) {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  openPopup(evt);
}

function openPopup(evt) {
  evt.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupInEscape);
}

function closePopup(evt) {
  evt.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupInEscape);
}

function handlePopupOverlayClose(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
}

function closePopupInEscape(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// обработчик отправки формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(evt.target.closest('.popup_opened'));
}

// ловим клик по кнопке и открываем соответствующий попап
profileEditButton.addEventListener('click', () => editProfile(popupFormProfile));

// ловим клик по кнопке и открываем соответствующий попап
addCardButton.addEventListener('click', () => openPopup(popupFormCard));

popupsList.forEach(handlePopupOverlayClose);

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
createCardForm.addEventListener('submit', handleCardCreate);
