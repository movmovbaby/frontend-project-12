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
    signupPage: {
      imageAlt: 'Регистрация',
    },
    signupForm: {
      title: 'Регистрация',
      usernameLabel: 'Имя пользователя',
      passwordLabel: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submitButtonText: 'Зарегистрироваться',
      validationError: {
        usernameField: 'От 3 до 20 символов',
        passwordField: 'Не менее 6 символов',
        confirmPasswordField: 'Пароли должны совпадать',
        userAlreadyExist: 'Такой пользователь уже существует',
      },
    },
    navbar: {
      brand: 'Hexlet Chat',
      button: 'Выйти',
    },
    channels: {
      title: 'Каналы',
      manage: 'Управление каналом',
      loadingError: 'Ошибка соединения',
      dropDownItem: {
        delete: 'Удалить',
        rename: 'Переименовать',
      },
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
    },
    addChannel: {
      errors: {
        network: 'Ошибка сети',
        uniqueName: 'Имя должно быть уникальным',
      },
      success: 'Канал создан',
    },
    renameChannel: {
      form: {
        label: 'Имя канала',
      },
      button: {
        cancel: 'Отменить',
        send: 'Отправить',
      },
      error: {
        network: 'Ошибка сети',
        uniqueName: 'Имя должно быть уникальным',
      },
      success: 'Канал переименован',
    },
    deleteChannel: {
      buttons: {
        sure: 'Уверены?',
        cancel: 'Отменить',
      },
      error: {
        network: 'Ошибка сети',
      },
      success: 'Канал удалён',
    },
  },
};

export default ru;
