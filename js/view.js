export const UI = {
  CHAT_BODY: document.querySelector('.chat__body'),
  CHAT: document.querySelector('.chat__body-massager'),
  CHAT_FORM: document.querySelector('.chat__form'),
  AUTHORIZATION_FORM: document.querySelector('.authorization-form'),
  CONFIRMATION_FORM: document.querySelector('.confirmation-form'),
  MESSAGE: document.querySelector('#message'),
  SETTING: document.querySelector('.setting-btn'),
  CLOSE: document.querySelector('.modal__btn'),
  TITLE: document.querySelector('.title'),
  EXIT: document.querySelector('.exit-btn'),
}

export function switchModal(modal) {
  switch (modal) {
    case 'authorization':
      UI.AUTHORIZATION_FORM.classList.remove('hidden');
      document.querySelector('.settings').classList.add('hidden');
      UI.TITLE.textContent = 'Авторизация';
      UI.CLOSE.hidden = true
      break;
    case 'confirmation':
      UI.AUTHORIZATION_FORM.classList.add('hidden');
      UI.CONFIRMATION_FORM.classList.remove('hidden');
      UI.TITLE.textContent = 'Подтверждение';
      break;
    case 'settings':
      UI.AUTHORIZATION_FORM.classList.add('hidden');
      UI.CONFIRMATION_FORM.classList.add('hidden');
      document.querySelector('.settings').classList.remove('hidden');
      document.querySelector('.chat').classList.remove('blur');
      document.querySelector('.modal').classList.add('hidden');
      UI.CLOSE.hidden = false
      UI.TITLE.textContent = 'Настройки';
      break;
  };
};

UI.SETTING.addEventListener('click', function() {
  document.querySelector('.chat').classList.add('blur')
  document.querySelector('.modal').classList.remove('hidden')
})

UI.CLOSE.addEventListener('click', function() {
  document.querySelector('.chat').classList.remove('blur')
  document.querySelector('.modal').classList.add('hidden')
})

