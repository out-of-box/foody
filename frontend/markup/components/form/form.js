var form = document.querySelector('.js-form');
var name = document.querySelector('.js-name');
var email = document.querySelector('.js-email');
var tel = document.querySelector('.js-tel');
var errors = {
    email: false,
    tel: false
};

function touchEmail() {
    errors.email = !/^.+@.+\..+$/.test(email.value.trim());
}
function touchTel() {
    errors.tel = !/^[+\d-()\s]+$/.test(tel.value.trim());
}

form.addEventListener('submit', function (event) {
    touchTel();
    touchEmail();
    if (!errors.email && !errors.tel) {
        var data = {
            name: name.value ? name.value.trim() : '',
            email: email.value ? email.value.trim() : '',
            tel: tel.value ? tel.value.trim() : ''
        };
        // Вставить обработчик формы сюда

    } else {
        event.preventDefault();
        if (errors.email) {
            email.classList.add('form__input--error');
        }
        if (errors.tel) {
            tel.classList.add('form__input--error');
        }
    }
});

email.addEventListener('blur', touchEmail);
tel.addEventListener('blur', touchTel);

email.addEventListener('focus', function (e) {
    e.target.classList.remove('form__input--error');
});
tel.addEventListener('focus', function (e) {
    e.target.classList.remove('form__input--error');
});
