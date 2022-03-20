const profileEditButton = document.querySelector('.profile__edit');
const addCardButton = document.querySelector('.profile__add');
const closePopupButtons = document.querySelectorAll('.popup__close');

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
const cardsTemplate = document.querySelector('#card-template').content;

const modalImage = document.querySelector('.modal__img');
const modalName = document.querySelector('.modal__name');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(item) {
  const cardsElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);

  // наполняем содержимым
  cardsElement.querySelector('.cards__img').src = item.link;
  cardsElement.querySelector('.cards__img').alt = item.name;
  cardsElement.querySelector('.cards__name').textContent = item.name;

  const cardLikeButton = cardsElement.querySelector('.cards__like');
  cardLikeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('cards__like_active');
  });

  const cardImage = cardsElement.querySelector('.cards__img');
  cardImage.addEventListener('click', function openViewImage() {
    openPopup(popupImage);
    modalImage.src = item.link;
    modalImage.alt = item.name;
    modalName.textContent = item.name;
  });

  const cardDeleteButton = cardsElement.querySelector('.cards__trash');
  cardDeleteButton.addEventListener('click', deleteCard);

  cardsWrap.prepend(cardsElement);
  return createCard;
}
initialCards.map(createCard);

function deleteCard(evt) {
  const card = evt.currentTarget.closest('.cards__item');
  card.remove();
}


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
function submitProfileFormHandler(evt) {
  evt.preventDefault();
  // записываем новые значения из инпутов
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  // закрываем попап
  closePopup(evt.target.closest('.popup_opened'));

}

function createCardHandler(evt) {
  evt.preventDefault();

  initialCards.unshift(
    {
      name: inputCardName.value,
      link: inputCardLink.value
    }
  );

  createCard(initialCards[0]);
  evt.currentTarget.reset();

  closePopup(evt.target.closest('.popup_opened'));
}

// ловим клик по кнопке и открываем соответствующий попап
profileEditButton.addEventListener('click', () => editProfile(popupFormProfile));

// ловим клик по кнопке и открываем соответствующий попап
addCardButton.addEventListener('click', () => openPopup(popupFormCard));

// ловим клик по кнопке и закрываем соответствующий попап
closePopupButtons.forEach((i) => {
  i.addEventListener('click', () => closePopup(i.closest('.popup_opened')));
});

editProfileForm.addEventListener('submit', submitProfileFormHandler);
createCardForm.addEventListener('submit', createCardHandler);
