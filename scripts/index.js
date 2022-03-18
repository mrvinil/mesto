let profileEditButton = document.querySelector('.profile__edit');
const addCardButton = document.querySelector('.profile__add');
let closePopupButton = document.querySelectorAll('.popup__close');

const popupFormProfile = document.querySelector('#popup__profile');
const popupFormCard = document.querySelector('#popup__card');
let formElement = document.querySelector('.popup__form');

let inputName = document.querySelector('.popup__input_type_name');
let inputJob = document.querySelector('.popup__input_type_job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');


function editProfile(evt) {
  // получаем текущие значения и записываем в инпуты
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  openPopup(evt);
}

function openPopup(evt) {
  evt.classList.add('popup_opened');
}

function closePopup(evt) {
  evt.classList.remove('popup_opened');
}

// обработчик отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  // записываем новые значения из инпутов
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  // закрываем попап
  closePopup(evt.target.closest('.popup_opened'));

}

// ловим клик по кнопке и открываем соответствующий попап
profileEditButton.addEventListener('click', () => editProfile(popupFormProfile));

// ловим клик по кнопке и открываем соответствующий попап
addCardButton.addEventListener('click', () => openPopup(popupFormCard));

// ловим клик по кнопке и закрываем соответствующий попап
closePopupButton.forEach((i) => {
  i.addEventListener('click', () => closePopup(i.closest('.popup_opened')));
});

formElement.addEventListener('submit', formSubmitHandler);
