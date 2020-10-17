'use strict';

// проверка заполнения форм

const warning1 = document.querySelector('.text_warning_heading');
const warning2 = document.querySelector('.text_warning_desc');
const warning3 = document.querySelector('.text_warning_date');
const heading = document.querySelector('.input__heading');
const desc = document.querySelector('.input__desk');
const date = document.querySelector('.input__date');
const button = document.querySelector('.form-btn');
const todoList = document.querySelector('.todo__list');
const tabLinks = document.querySelectorAll('.tabs__link');
let tasks = document.querySelectorAll('.todo__list__items');

heading.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (heading.value.length > 9) {
    warning1.textContent = ' ';
  };
  activation();
});

desc.addEventListener('keyup', (e) => {
  if (desc.value.length > 49) {
    warning2.textContent = ' ';
  };
  activation();
});

date.addEventListener('change', (e) => {
  e.preventDefault();
  let dateStart = new Date();
  let dateEnd = new Date(date.value);
  if ((date.value.length == 10) && (dateEnd >= dateStart)) {
    warning3.textContent = ' ';
  } else {
    warning3.textContent = 'Введите действительную дату';
  };
  activation();
})

function activation() {
  if (warning1.textContent == warning2.textContent && warning2.textContent == warning3.textContent) button.removeAttribute('disabled');
};

// создание задачи
button.addEventListener('click', (e) => {
  e.preventDefault();
  createNewLi();
  discardForm();
  sort();
});

function createNewLi() {
  let dateStart = new Date();
  let dateEnd = new Date(date.value);

  let li = document.createElement('li');
  li.className = 'todo__list__items';

  let headingTask = document.createElement('h3');
  headingTask.className = 'items__heading';
  headingTask.textContent = heading.value;
  li.prepend(headingTask);

  let descTasc = document.createElement('p');
  descTasc.className = 'items__description';
  descTasc.setAttribute('title', 'Клик, для изменения статуса задачи');
  descTasc.textContent = desc.value;
  headingTask.after(descTasc);

  let timeContainer = document.createElement('p');
  let timeStart = document.createElement('time');
  let timeEnd = document.createElement('time');
  timeContainer.className = 'items__deadline';
  timeStart.setAttribute('datetime', `${dateStart.getFullYear()}-${dateStart.getMonth() + 1}-${dateStart.getDate()}`);
  timeEnd.setAttribute('datetime', `${dateEnd.getFullYear()}-${dateEnd.getMonth() + 1}-${dateEnd.getDate()}`);
  timeStart.textContent = `Дата начала: ${dateStart.toLocaleDateString()}`;
  timeEnd.textContent = `Выполнить до: ${dateEnd.toLocaleDateString()}`;
  timeContainer.prepend(timeStart);
  timeContainer.append(timeEnd);
  descTasc.after(timeContainer);

  let btn = document.createElement('button');
  btn.className = 'items__btn';
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-label', 'close button');
  li.append(btn);

  todoList.append(li);
};


function discardForm() {
  heading.value = '';
  warning1.textContent = 'Введите наименование задачи, не менее 10 символов';
  desc.value = '';
  warning2.textContent = 'Введите наименование задачи, не менее 50 символов';
  date.value = '';
  warning3.textContent = 'Введите действительную дату';
  tasks = document.querySelectorAll('.todo__list__items');
  button.setAttribute('disabled', 'disabled');
};


// манипуляции с задачами
// изменение статуса и удаление задачи

todoList.addEventListener('click', (e) => {
  let target = e.target;

  if (target.classList.contains('items__description')) {
    target.classList.toggle('performed');
    target.parentElement.classList.toggle('ok');
    sort();
  }

  if (target.classList.contains('items__btn'))
    target.parentNode.remove();
})

// сортировка и управление табами

for (let el of tabLinks) {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.tabs_active').classList.remove('tabs_active');
    el.parentElement.classList.add('tabs_active');

    sort();
  });
};

function sort() {
  const tabActive = document.querySelector('.tabs-item.tabs_active');

  if (tabActive.dataset.status == 'ok') {
    for (let task of [...tasks]) {
      task.removeAttribute('hidden');
      if (task.classList.contains('ok')) continue;
      task.setAttribute('hidden', 'hidden');
    }
  } else if (tabActive.dataset.status == 'inWork') {
    for (let task of [...tasks]) {
      task.removeAttribute('hidden');
      if (task.classList.contains('ok')) task.setAttribute('hidden', 'hidden');
    }
  } else if (tabActive.dataset.status == 'all') {
    for (let task of [...tasks]) {
      task.removeAttribute('hidden');
    }
  };
};