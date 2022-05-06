// Функция, которая добавляет класс с ошибкой
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.classList.add('popup__error_active');
};


// Функция, которая удаляет класс с ошибкой
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_active');
  errorElement.textContent = ''; // Очистим содержимое span с ошибкой
};


// Функция, которая проверяет валидность поля. Она принимает formElement и inputElement, а не берёт их из внешней области видимости
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    hideError(formElement, inputElement);
  }
};

// Функция принимает массив полей и ищет первое не валидное поле
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__submit_disabled');
    buttonElement.setAttribute('disabled', 'true');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__submit_disabled');
    buttonElement.removeAttribute('disabled');
  }
};


// Слушатель события input
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input')); // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const buttonElement = formElement.querySelector('.popup__button'); // Найдём в текущей форме кнопку отправки

  toggleButtonState(inputList, buttonElement); // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем checkInputValidity, передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};


const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // У каждой формы отменим стандартное поведение браузера
    });
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement);
  });
};

enableValidation();






