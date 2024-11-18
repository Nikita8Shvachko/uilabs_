const formValues = {}  // Сюда пишутся значения формы (Object как в Java, или dict из Python)
const formValidation = {}  // Сюда пишутся статусы валидации каждого поля. Если поле ни разу не валидировалось,
// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false


// Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде
export const validatePassword = (e) => {
    const password = e.target.value;  // Получаем значение пароля из события
    formValidation.password = password;  // Обновляем значение пароля в объекте валидации

    // Параметры валидации
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Проверка пароля
    const isValid = password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    // Обновление статуса валидации
    formValidation.password = isValid;

    // Получаем элемент пароля
    const passwordInput = e.target;

    // Функция для изменения стилей в зависимости от валидности
    if (isValid) {
        passwordInput.classList.add('valid');
        passwordInput.classList.remove('invalid');
    } else {
        passwordInput.classList.add('invalid');
        passwordInput.classList.remove('valid');
    }

    return isValid;
}

export const validateEmail = (email) => {
    // Создадим шаблон регулярного выражения. В нём применяются шаблонные строки
    // Гуглить по тегам: "шаблонные строки js", "регулярные выражения"
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return String(email)
        .toLowerCase()
        .match(regExp);
}


// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
export function getValidationStatus(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input');
    for (const input of inputs) {
        if (!input.classList.contains('valid')) {
            return false;
        }
    }
    return true;
}


// Функция возвращающая которая ставит значение поля в форме по ключу
export const setFormValue = (valueKey, newValue, validator) => {
    formValues[valueKey] = newValue
    if (validator !== undefined) {
        formValidation[valueKey] = validator(newValue)
    }
}


// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
export const submitSignUpForm = () => {
    if (!getValidationStatus()) {
        console.log("FORM IS INCORRECT")
        return false
    }
    console.log("FORM IS FINE")
    console.log(formValues)
    return true
}

