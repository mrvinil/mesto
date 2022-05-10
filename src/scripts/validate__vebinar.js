function enableValidation() {
  const form = document.querySelector('[data-target="form"]');
  //console.log(form);

  form.addEventListener('submit', handlerFormSubmit);
  form.addEventListener('input', handlerFormInput);
}

function handlerFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const isValid = form.checkValidity();

  //console.log(isValid);
}

function handlerFormInput(evt) {
  const form = evt.currentTarget;
  const input = evt.target;

  setCustomError(input); //      1. Найти невалидные поля и установить текст ошибки
  setFieldError(input); //       2. Показать ошибки пользователям
  setSubmitButtonState(form); // 3. Деактивировать кнопку на невалидной форме
}

function setCustomError(input) {
  const validity = input.validity;

  input.setCustomValidity('');

  if (validity.tooShort || validity.tooLong) {
    const currentLength = input.value.length;
    const min = input.getAttribute('minlength');
    const max = input.getAttribute('maxlength');

    input.setCustomValidity(`Введено ${currentLength} символов. Должно быть от ${min} до ${max}.`);
  }

  if (input.typeMismatch) {
    input.setCustomValidity('Введите адрес сайта.');
  }
}

function setFieldError(input) {
  //const inputError = document.querySelector()
  const formError = document.querySelector(`.${input.id}-error`);
  formError.textContent = input.validationMessage;
  formError.classList.add('popup__error_active');
  input.classList.add('popup__input_type_error');
}

function setSubmitButtonState(form) {
  const button = form.querySelector('.popup__submit');
  const isValid = form.checkValidity();

  if (!isValid) {
    button.classList.add('popup__submit_disabled');
    button.setAttribute('disabled', 'true');
  } else {
    button.classList.remove('popup__submit_disabled');
    button.removeAttribute('disabled');
  }
}


enableValidation();
