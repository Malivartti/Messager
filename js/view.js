export const UI = {
  CHAT_BODY: document.querySelector('.chat__body'),
  CHAT: document.querySelector('.chat__body-massager'),
  CHAT_FORM: document.querySelector('.chat__form'),
  MODAL_FORM: document.querySelector('.modal__form'),
  MESSAGE: document.querySelector('#message'),
  SETTING: document.querySelector('.setting-btn'),
  CLOSE: document.querySelector('.modal__btn'),
}

UI.SETTING.addEventListener('click', function() {
  document.querySelector('.chat').classList.add('blur')
  document.querySelector('.modal').classList.add('visible')
})

UI.CLOSE.addEventListener('click', function() {
  document.querySelector('.chat').classList.remove('blur')
  document.querySelector('.modal').classList.remove('visible')
})