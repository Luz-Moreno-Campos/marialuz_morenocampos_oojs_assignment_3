'use strict';

import { getElement, select, selectAll, listen } from './utils.js';

const headerPhoto = getElement('header-photo');
const profileModal = getElement('profile-modal');
const userName = selectAll('.username');
const name = getElement('modal-name');
const email = getElement('modal-email');
const id = getElement('modal-id');
const canMonetize = getElement('modal-monetize');
const pages = getElement('modal-pages');
const groups = getElement('modal-groups');
const content = getElement('post-content');
const uploadfile = getElement('upload');
const date = select('.date');
const postText = select('.posted-text');
const postedImage = select('.post-image');
const feed = select('.posts-feed')
const postBtn = getElement('post-btn');
const displayFile = getElement("file-name-display");


class User {
  #id;
  #name;
  #userName;
  #email;
  constructor(id, name, userName, email) {
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
  }

  get id() { return this.#id }
  get name() { return this.#name }
  get userName() { return this.#userName }
  get email() { return this.#email }

  getInfo() {
    userName.forEach(el => el.innerText = this.userName);
    name.innerText = this.#name;
    id.innerText = this.#id;
    email.innerText = this.#email;

  }
}

class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;

  constructor(id, name, userName, email, pages, groups, canMonetize) {
    super(id, name, userName, email)
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }
  get pages() { return this.#pages }
  get groups() { return this.#groups }
  get canMonetize() { return this.#canMonetize }

  getInfo() {

    super.getInfo();

    pages.innerHTML = this.#pages.map(page => `<li>${page}</li>`).join("");
    groups.innerHTML = this.#groups.map(page => `<li>${page}</li>`).join("");

    canMonetize.innerText = this.#canMonetize ? "Yes" : "No";

  }
}

const subscriber = new Subscriber(
  123,
  "Wallace Friedling",
  "wallytravels",
  "wallytravels@gmail.com",
  ["Travel Blog", "Foodies"],
  ["Backpackers", "Digital Nomads"],
  true
);


listen('click', headerPhoto, () => {
  subscriber.getInfo();
  profileModal.classList.toggle('hidden');
});

function getDate() {
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }
  return new Date().toLocaleString('en-ca', options);
}

function createPost() {
  const text = content.value.trim();
  const file = uploadfile.files[0];

  if (!text && !file) return;

  let imageHTML = "";
  if (file) {
    // This creates a temporary URL (a blob URL) that represents the file the user uploaded.
    // The browser can use this URL as the source of the <img> to display it without needing to upload it to a server.
    const imageURL = URL.createObjectURL(file);
    imageHTML = `<img class="post-image" src="${imageURL}" alt="">`;
  }

  let textHTML = "";
  if (text) {
    textHTML = `<p class="posted-text">${text}</p>`;
  }
  
  const newPost = `
    <div class="post-container">
      <div class="post-header">
        <img class="profile-photo" src="./assets/media/profile-photo.jpg" alt="Profile photo">
        <div class="post-info">
          <span class="username">${subscriber.name}</span>
          <span class="date">${getDate()}</span>
        </div>
      </div>
      <div class="post">
        ${textHTML} 
        ${imageHTML}
      </div>
    </div>`


  feed.innerHTML = newPost + feed.innerHTML;

  content.value = "";
  uploadfile.value = "";
  displayFile.innerText = "";
}


listen("change", uploadfile, () => {
  const file = uploadfile.files[0];

  if (file) {
    displayFile.innerText = file.name;
  } else {
    displayFile.innerText = "";
  }
});


listen("click", postBtn, () => {
  createPost();
});

