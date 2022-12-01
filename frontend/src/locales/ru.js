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
      loadingError: 'Ошибка соединения',
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
      error: {
        network: 'Ошибка сети',
        uniqueName: 'Имя должно быть уникальным',
      },
      success: 'Канал переименован',
    },
    deleteChannel: {
      error: {
        network: 'Ошибка сети',
      },
      success: 'Канал удалён',
    },
  }
};

export default ru;
