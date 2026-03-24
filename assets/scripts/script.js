'use strict';

import { getElement, select,  listen } from './utils.js';

const userName= select('.username');
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
const postedImage = select('.post-image')

