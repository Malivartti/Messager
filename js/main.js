import {UI, switchModal} from './view.js';
import {API, getRequest} from './api.js';
import {getTime} from './helpers.js';

let socket;
if (localStorage.getItem('token')) {
  API.TOKEN = localStorage.getItem('token');
  API.EMAIL = localStorage.getItem('email');
  startСonnection();
  switchModal('settings');
  document.querySelector('.chat').classList.remove('blur');
  document.querySelector('.modal').classList.add('hidden');
  addHistory()
}



UI.CHAT_FORM.addEventListener('submit', function() {
  if (!this.firstElementChild.value.trim()) return;
  sendMessage(this.firstElementChild.value);
  this.reset();
});

UI.AUTHORIZATION_FORM.addEventListener('submit', function() {
  const email = this.children[1].value;
  if (!email.trim()) return;
  getRequest(API.USER, 'POST', {body: {email}});
  API.EMAIL = email;
  localStorage.setItem('email', email);
  switchModal('confirmation');
  this.reset();
});

UI.CONFIRMATION_FORM.addEventListener('submit', function() {
  const token = this.children[1].value;
  const name = this.children[3].value;
  getRequest(API.USER, 'PATCH', {body: {name}, token})
  .then(function() {
    API.TOKEN = token;
    localStorage.setItem('token', token);
    addHistory()
    startСonnection();
  });
  switchModal('settings');
  this.reset();
});

UI.EXIT.addEventListener('click', function() {
  socket.close();
  localStorage.clear();
  UI.CHAT.innerHTML = '';
  document.querySelector('.chat').classList.add('blur')
  document.querySelector('.modal').classList.remove('hidden')
  switchModal('authorization');
});

UI.SEARCH_FORM.addEventListener('submit', function() {
  alert(this.firstElementChild.value)
  this.reset()
})

function startСonnection() {
  socket = new WebSocket(`${API.WEBSOCKETS}?${API.TOKEN}`);

  socket.onmessage = function(event) {
    const main = JSON.parse(event.data);
    console.log(main);
    addMessageToChat(main.user.name, main.text, main.user.email == API.EMAIL);
    UI.CHAT_BODY.scrollTop = UI.CHAT_BODY.scrollHeight;
  };
};

function addMessageToChat(username, text, isMe, date=false) {
  const clone = UI.MESSAGE.content.cloneNode(true);
  if (isMe) clone.firstElementChild.classList.add('item_me');
  clone.querySelector('.item-text').textContent = `${username}: ${text}`;
  clone.querySelector('.item-date').textContent = getTime(date);
  UI.CHAT.append(clone);
};

function sendMessage(text) {
  socket.send(JSON.stringify({text}));
};

function addHistory() {
  getRequest(API.MESSAGES, 'GET', {token: localStorage.getItem('token')})
  .then(i => i.messages.forEach(i => addMessageToChat(i.user.name, i.text, false, i.createdAt)))
  .then(function() {
    const el = document.createElement('div');
    el.classList.add('item_message');
    el.textContent = 'Новые сообщения';
    UI.CHAT.append(el);
  });
};