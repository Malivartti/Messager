import {UI} from './view.js';
import {API, getRequest} from './api.js';
import {getTime} from './helpers.js';


const socket = new WebSocket(`${API.WEBSOCKETS}?${API.TOKEN}`);

socket.onmessage = function(event) {
  let flag = false
  const main = JSON.parse(event.data)
  console.log(main)
  if (main.user.email == 'malivartti@yandex.ru') flag = true
  addMessageToChat(main.user.name, main.text, flag)
};

UI.CHAT_FORM.addEventListener('submit', function() {
  if (!this.firstElementChild.value.trim()) return
  sendMessage(this.firstElementChild.value)
  this.reset()
})

UI.MODAL_FORM.addEventListener('submit', function() {
  const value = this.children[1].value;
  if (!value.includes('@')) return
  getRequest(API.USER, 'POST', {body: {'email': value}})
  this.reset()
})

function addMessageToChat(username, text, isMe) {
  const clone = UI.MESSAGE.content.cloneNode(true);
  if (!isMe) clone.firstElementChild.classList.add('item_other', 'item_readed')
  clone.querySelector('.item-text').textContent = `${username}: ${text}`;
  clone.querySelector('.item-date').textContent = getTime()
  UI.CHAT.append(clone)

  UI.CHAT_BODY.scrollTop = UI.CHAT_BODY.scrollHeight;
}

function sendMessage(text) {
  socket.send(JSON.stringify({text}));
}
