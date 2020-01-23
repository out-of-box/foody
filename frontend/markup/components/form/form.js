var form = document.querySelector('.js-form');
var screen = document.querySelector('.js-screen');
var name = document.querySelector('.js-name');
var email = document.querySelector('.js-email');
var thankyou = document.querySelector('.js-thankyou');
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
function xhr(data) {
    var rq = new XMLHttpRequest();
    rq.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                screen.classList.add('form__screen--hidden');
                thankyou.classList.remove('form__thankyou--hidden');
            } else {
                console.log(this.status);
            }
        }
    };

    rq.open('POST', 'https://us2.api.mailchimp.com/3.0/lists/7e2ad16b78/members/');
    rq.setRequestHeader('Content-Type', 'application/json');
    rq.setRequestHeader('Authorization', 'apikey: d0f13708a1f8b0c6bd8c474fe');
    rq.send(data);
}
// https://outofcloud.us2.list-manage.com/subscribe/post?u=d0f13708a1f8b0c6bd8c474fe&amp;id=7e2ad16b78

form.addEventListener('submit', function (event) {
    event.preventDefault();
    touchTel();
    touchEmail();
    if (!errors.email && !errors.tel) {
        var data = {
            status: 'subscribed',
            MMERGE1: name.value ? name.value.trim() : '',
            'email_address': email.value ? email.value.trim() : '',
            PHONE: tel.value ? tel.value.trim() : ''
        };
        // Вставить обработчик формы сюда
        xhr(data);

    } else {
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
