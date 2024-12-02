// Базовый класс для формы входа
class LoginForm {
    constructor() {
        this.fields = []; // Массив для хранения полей формы
        this.button = { text: 'Войти', action: () => {} }; // Кнопка с текстом и действием
    }

    // Метод для добавления поля в форму
    addField(field) {
        this.fields.push(field);
    }

    // Метод для установки действия кнопки
    setButtonAction(action) {
        this.button.action = action;
    }

    // Метод для добавления поля "Роль"
    addRoleField() {
        const select = document.createElement('select');
        select.id = 'role';
        select.required = true;

        const options = [
            { value: 'admin', text: 'Администратор' },
            { value: 'librarian', text: 'Библиотекарь' },
            { value: 'reader', text: 'Читатель' },
        ];
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.text = option.text;
            select.appendChild(opt);
        });
        this.fields.push({ type: 'select', element: select });
    }

    // Метод для рендеринга формы
    render() {
        const form = document.createElement('form'); // Используем тег <form> вместо <div>
        form.className = 'login-form';

        const title = document.createElement('h2');
        title.textContent = 'Вход в библиотеку';
        form.appendChild(title);

        this.fields.forEach(field => {
            if (field.element) {
                form.appendChild(field.element);
                if (field.type === 'select') {
                    const br = document.createElement('br'); // Добавляем разрыв строки после выбора роли
                    form.appendChild(br);
                } else {
                const input = document.createElement('input');
                input.type = field.type;
                input.id = field.id;
                input.placeholder = field.placeholder;
                input.required = true;
                form.appendChild(input);
            }
        });

        const button = document.createElement('button');
        button.type = 'submit';
        button.id = 'login-button';
        button.textContent = this.button.text;
        form.appendChild(button);

        return form;
    }

    // Метод для привязки событий к форме
    attachEvents() {
        const form = document.querySelector('.login-form');
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращаем отправку формы
            this.button.action();
        });
    }
}

// Декоратор для добавления поля "email"
class EmailFieldDecorator {
    constructor(loginForm) {
        this.loginForm = loginForm;
        this.loginForm.addField({ type: 'email', id: 'email', placeholder: 'Email' });
        console.log('Добавлено поле "Email"');
    }

    // Метод для рендеринга формы
    render() {
        return this.loginForm.render();
    }

    // Метод для привязки событий к форме
    attachEvents() {
        this.loginForm.attachEvents();
    }
}

// Декоратор для добавления поля "пароль"
class PasswordFieldDecorator {
    constructor(loginForm) {
        this.loginForm = loginForm;
        this.loginForm.addField({ type: 'password', id: 'password', placeholder: 'Пароль' });
        console.log('Добавлено поле "Пароль"');
    }

    // Метод для рендеринга формы
    render() {
        return this.loginForm.render();
    }

    // Метод для привязки событий к форме
    attachEvents() {
        this.loginForm.attachEvents();
    }
}

// Декоратор для добавления поля "Роль"
class RoleFieldDecorator {
    constructor(loginForm) {
        this.loginForm = loginForm;
        this.loginForm.addRoleField(); // Исправлено: вызов без аргументов
        console.log('Добавлено поле "Роль"');
    }

    // Метод для рендеринга формы
    render() {
        return this.loginForm.render();
    }

    // Метод для привязки событий к форме
    attachEvents() {
        this.loginForm.attachEvents();
    }
}

// Создание формы входа с использованием декораторов
function createLoginForm() {
    let loginForm = new LoginForm();
    console.log('Создана базовая форма входа');

    // Применение декораторов для добавления полей
    new EmailFieldDecorator(loginForm);
    new PasswordFieldDecorator(loginForm);
    new RoleFieldDecorator(loginForm);

    // Установка действия для кнопки "Войти"
    loginForm.setButtonAction(() => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        console.log('Проверка email:', email);
        if (!validateEmail(email)) {
            alert('Неправильный формат email');
            return;
        }

        console.log('Проверка пароля:', password);
        if (password.trim() === '') {
            alert('Пароль не может быть пустым');
            return;
        }

        // Сохранение данных пользователя
        const user = { email, role };
        console.log('Вход выполнен:', user);

        // Вывод сообщения о успешном входе
        alert('Вы успешно вошли');

        // Перенаправление на другую страницу
        // window.location.href = 'https://media.tenor.com/Iccl_wfwIdwAAAAM/despicable-me-minions.gif';
    });

    return loginForm;
}

// Функция проверки email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Инициализация формы входа
window.onload = () => {
    console.log('Начало инициализации формы входа');
    const loginForm = createLoginForm(); // Создание формы

    // Отображение формы
    const formElement = loginForm.render();
    document.getElementById('login-form').appendChild(formElement); // Добавление формы в div 'login-form'.
    console.log('Форма входа вставлена в DOM');
    loginForm.attachEvents(); // Прикрепление события после того, как форма окажется в DOM
    console.log('События привязаны');
};
