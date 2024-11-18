import {getValidationStatus, setFormValue, submitSignUpForm, validateEmail, validatePassword} from "./utils.js"


////// ДЕМОНСТРАЦИОННЫЙ УЧАСТОК КОДА. На оценку не влияет, исключительно для саморазвития.

// Предлагаю "поиграться" с частями кода ниже, чтобы познакомиться с JS
// Получаем элемент и меняем его класс, который определеён в библиотеке стилей materialize
// const password = document.getElementById('password');
// password.classList.add("valid")
// password.classList.remove("valid")

// В браузере можно посмотреть, что из себя представляет документ
// (CTRL+SHIFT+i для открытия консоли и открыть вкладку "консоль", туда будет залогированно значение)
// console.log("Document")
// console.log(document)

// Если запросить id, которого нет в DOM дереве - вернется undefined
// => надо быть осторожней: коллега может поменять id вашего элемента и упадёт !ВАШ! код
// const first_name = document.getElementById('first_name_invalid');
// first_name.oninput = (e) => validatePassword(e)

// Селекция по классу. Может пригодится, для того, чтобы упростить обработку полей в двух формах.
// Чтобы не делать кучу уникальных айди, можно определённым полям формы давать один класс и обрабатывать их в цикле
// const passwords = document.querySelectorAll('.password')
// console.log(passwords)
// for (const password of passwords) {
//   password.style.background = "red"
//   password.oninput = (e) => validatePassword(e)
// }

////// КОНЕЦ ДЕМОНСТРАЦИОННОГО УЧАСТКА КОДА. Дальше код для оцениваемой части задания


// Выписываем все айдишники HTMl-элементов в константы для переиспользования
const first_name_id = 'first_name';
const last_name_id = 'last_name';
const password_id = 'password';
const password_repeat_id = 'password-repeat';
const email_id = 'email';
const sign_up_form_id = 'sign_up_form';
const sign_in_form_id = 'sign_in_form';
const sign_up_btn_id = 'sign_up_btn';
const sign_in_btn_id = 'sign_in_btn';
const sign_in_link_id = 'sign_in_link';
const sign_up_link_id = 'sign_up_link';


// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...
// Получаем кнопку регистрации и авторизации


const signUpBtn = document.getElementById(sign_up_btn_id);
const signInBtn = document.getElementById(sign_in_btn_id);

function updateValidationClass(element, isValid) {
    if (isValid) {
        element.classList.add('valid');
        element.classList.remove('invalid');
    } else {
        element.classList.add('invalid');
        element.classList.remove('valid');
    }
}

// Обработчики для обновления состояния кнопок
const updateSignUpButtonState = () => {
    const isFormValid = getValidationStatus('sign_up_form');
    const password = document.getElementById(password_id).value;
    const passwordRepeat = document.getElementById(password_repeat_id).value;
    const passwordRepeatInput = document.getElementById(password_repeat_id);

    if (password !== passwordRepeat) {
        updateValidationClass(passwordRepeatInput, false);
        signUpBtn.disabled = true;
    } else {
        updateValidationClass(passwordRepeatInput, true);
        signUpBtn.disabled = !isFormValid;
    }
};

const updateSignInButtonState = () => {
    signInBtn.disabled = !getValidationStatus(sign_in_form_id);
};

// Инициализация кнопок при загрузке страницы
window.onload = () => {
    updateSignUpButtonState();
    updateSignInButtonState();
};

// Обработчики ввода для формы регистрации
const firstName = document.getElementById(first_name_id);
firstName.oninput = (e) => {
    setFormValue(first_name_id, e.target.value);
    updateSignUpButtonState();
};

const email = document.getElementById(email_id);
email.oninput = (e) => {
    setFormValue(email_id, e.target.value, validateEmail);
    updateSignUpButtonState();
};

const password = document.getElementById(password_id);
password.oninput = (e) => {
    validatePassword(e);
    updateSignUpButtonState();
};

// Обработчики ввода для формы авторизации
const authEmail = document.getElementById('auth_email');
authEmail.oninput = (e) => {
    setFormValue('auth_email', e.target.value, validateEmail);
    updateSignInButtonState();
};

const authPassword = document.getElementById('auth_password');
authPassword.oninput = (e) => {
    validatePassword(e);
    updateSignInButtonState();
};
const passwordRepeat = document.getElementById('password-repeat');
passwordRepeat.oninput = () => {
    updateSignUpButtonState();
};

// Переключение на форму авторизации
const switchToSignIn = document.getElementById(sign_in_link_id);
switchToSignIn.onclick = () => {
    document.getElementById(sign_up_form_id).style.display = "none";
    document.getElementById(sign_in_form_id).style.display = "";
};

// Переключение на форму регистрации
const switchToSignUp = document.getElementById(sign_up_link_id);
switchToSignUp.onclick = () => {
    document.getElementById(sign_in_form_id).style.display = "none";
    document.getElementById(sign_up_form_id).style.display = "";
};

// Обработчик нажатия кнопки регистрации
signUpBtn.onclick = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    submitSignUpForm(); // Вызов функции отправки формы регистрации
};

// Обработчик нажатия кнопки авторизации
signInBtn.onclick = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    submitSignInForm(); // Вызов функции отправки формы авторизации
};

// Реализация функции для отправки формы авторизации
function submitSignInForm() {
    console.log("Sign-in form submitted");
}