import {UI, switchModal} from './view.js';
import {API, getRequest} from './api.js';
import {getTime} from './helpers.js';

let socket;
let history;
if (localStorage.getItem('token')) {
  startСonnection();
  switchModal('settings');
  document.querySelector('.chat').classList.remove('blur');
  document.querySelector('.modal').classList.add('hidden');
  history = await getRequest(API.MESSAGES, 'GET', {token: localStorage.getItem('token')});
  addHistory()
}


UI.CHAT_FORM.addEventListener('submit', function() {
  if (!this.firstElementChild.value.trim()) return;
  sendMessage(this.firstElementChild.value);
  this.reset();
  return false
});

UI.AUTHORIZATION_FORM.addEventListener('submit', function() {
  const email = this.children[1].value.trim();
  if (!email) return;
  switchModal('confirmation');
  getRequest(API.USER, 'POST', {body: {email}});
  localStorage.setItem('email', email);
  this.reset();
  return false
});

UI.CONFIRMATION_FORM.addEventListener('submit', async function() {
  const token = this.children[1].value;
  const name = this.children[3].value;
  getRequest(API.USER, 'PATCH', {body: {name}, token})
  .then(function() {
    localStorage.setItem('token', token);
    addHistory()
    startСonnection();
  });
  history = await getRequest(API.MESSAGES, 'GET', {token: localStorage.getItem('token')});
  localStorage.setItem('scrollIndex', history.messages.length - 100)
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

UI.CHAT_BODY.addEventListener('scroll', function() {
  if (UI.CHAT_BODY.scrollTop + UI.CHAT_BODY.clientHeight == UI.CHAT_BODY.scrollHeight && Number(localStorage.getItem('scrollIndex')) + 20 < history.messages.length) {
    localStorage.setItem('scrollIndex', Number(localStorage.getItem('scrollIndex')) + 20)
    addHistory()
  }
  if (UI.CHAT_BODY.scrollTop === 0)  {
    console.log(1)
  }
})

function startСonnection() {
  socket = new WebSocket(`${API.WEBSOCKETS}?${localStorage.getItem('token')}`);

  socket.onmessage = function(event) {
    const main = JSON.parse(event.data);
    console.log(main);
    addMessageToChat(main.user.name, main.text, main.user.email == localStorage.getItem('email'));
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
  const index = Number(localStorage.getItem('scrollIndex'))
  history.messages.slice(index).forEach(i => addMessageToChat(i.user.name, i.text, i.user.email == localStorage.getItem('email'), i.createdAt))
};

// function addHistory() {
//   getRequest(API.MESSAGES, 'GET', {token: localStorage.getItem('token')})
//   .then(i => i.messages.forEach(i => addMessageToChat(i.user.name, i.text, i.user.email == API.EMAIL, i.createdAt)))
//   .then(function() {
//     const el = document.createElement('div');
//     el.classList.add('item_message');
//     el.textContent = 'Новые сообщения';
//     UI.CHAT.append(el);
//   })
//   .then(function() {
//     UI.CHAT_BODY.scrollTop = UI.CHAT_BODY.scrollHeight;
//   })
// };
