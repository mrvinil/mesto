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

// выбираем пустой контейнер с карточками
const cardsWrap = document.querySelector('.cards');

// получаем содержимое тега template
const cardsTemplate = document.querySelector('#card-template').content;

// перебираем массив и создаем карточки
initialCards.forEach((item) => {
  // клонируем содержимое тега template
  const cardsElement = cardsTemplate.querySelector('.cards__item').cloneNode(true);
  // наполняем содержимым
  cardsElement.querySelector('.cards__img').src = item.link ;
  cardsElement.querySelector('.cards__img').alt = item.name;
  cardsElement.querySelector('.cards__name').textContent = item.name;

  // добавляем карточки в контейнер
  cardsWrap.append(cardsElement);
});
