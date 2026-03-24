'use strict';

import { getElement, select, listen } from './utils.js';

const headerPhoto = getElement('header-photo');
const profileModal = getElement('profile-modal');
const userName = select('.username');
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
const postContainer = select('.post-feed')
const postBtn = getElement('post-btn');


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
    userName.innerText = this.#userName;
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
    pages.innerText = this.#pages;
    groups.innerText = this.#groups;
    canMonetize.innerText = this.#canMonetize ? "Yes" : "No";

  }
}

const subscriber = new Subscriber(
  123,
  "Wally Travels",
  "wallytravels",
  "luzdirection@gmail.com",
  ["Travel Blog", "Foodies"],
  ["Backpackers", "Digital Nomads"],
  true
);




listen('click', headerPhoto, () => {
  subscriber.getInfo();
  profileModal.classList.toggle('hidden');
});




