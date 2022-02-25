let profileEditButton = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');

let popupForm = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');

let inputName = document.querySelector('.popup__input_type_name');
let inputJob = document.querySelector('.popup__input_type_job');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');


// открываем попап
function openPopup() {
  popupForm.classList.add('popup_opened');

  // получаем текущие значения и записываем в инпуты
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}
profileEditButton.addEventListener('click', openPopup);


// закрываем попап
function closePopup() {
  popupForm.classList.remove('popup_opened');
}
closePopupButton.addEventListener('click', closePopup);


// обработчик отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  // записываем новые значения из инпутов
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  // закрываем попап
  popupForm.classList.remove('popup_opened');

}
formElement.addEventListener('submit', formSubmitHandler);
