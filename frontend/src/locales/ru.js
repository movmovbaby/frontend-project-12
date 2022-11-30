const ru = {
  translation: {
    loginForm: {
      title: 'Войти',
      error: 'Неверные имя пользователя или пароль',
      submitButtonText: 'Войти',
      usernameLabel: 'Ваш ник',
      passwordLabel: 'Пароль',
      footerText: 'Нет аккаунта?',
      footerLink: 'Регистрация',
    },
    signupForm: {
      title: 'Регистрация',
      usernameLabel: 'Имя пользователя',
      passwordLabel: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submitButtonText: 'Зарегистрироваться',
      validationError: {
        username: 'От 3 до 20 символов',
        password: 'Не менее 6 символов',
        confirmPassword: 'Пароли должны совпадать',
        userAlreadyExist: 'Такой пользователь уже существует',
      }
    },
    navbar: {
      brand: 'Hexlet Chat',
      button: 'Выйти',
    },
    channels: {
      title: 'Каналы',
      manage: 'Управление каналом',
    },
    messagesHeader: {
      messagesCount_zero: '{{count}} сообщений',
      messagesCount_one: '{{count}} сообщениe',
      messagesCount_few: '{{count}} сообщения',
      messagesCount_many: '{{count}} сообщений',
    },
    messagesForm: {
      placeholder: 'Введите сообщение',
      submitButton: 'Отправить',
    }

  }
};

export default ru;
