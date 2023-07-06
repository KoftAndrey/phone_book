import {getStorage} from './serviceStorage.js';
import {createRow} from './createElements.js';

const renderListFromLocalStorage = (elem, logo) => {
  const arr = getStorage('phonebook').map(x => createRow(x, logo));
  elem.replaceChildren(...arr);
};

const sortAZ = (i, list) => {
  const sorted = Array.from(list.rows)
      .sort((a, b) => (a.cells[i].innerHTML > b.cells[i].innerHTML ? 1 : -1));
  list.append(...sorted);
};

const sortZA = (i, list) => {
  const sorted = Array.from(list.rows)
      .sort((a, b) => (a.cells[i].innerHTML > b.cells[i].innerHTML ? -1 : 1));
  list.append(...sorted);
};

export const sortRows = (e, thead, list, logo) => {
  const i = Array.from(thead.firstElementChild.cells).indexOf(e.target);
  if (i === 1) {
    e.target.nextElementSibling.lastChild.classList
        .remove('alphabet-az', 'alphabet-za');
  }
  if (i === 2) {
    e.target.previousElementSibling.lastChild.classList
        .remove('alphabet-az', 'alphabet-za');
  }

  switch (true) {
    case i !== 1 && i !== 2:
      break;
    case e.target.lastChild.classList.value === 'sort-icon':
      e.target.lastChild.classList.add('alphabet-az');
      sessionStorage.setItem('columnIndex', i);
      sessionStorage.setItem('sortDirection', 'az');
      sortAZ(i, list);
      break;
    case e.target.lastChild.classList.contains('alphabet-az'):
      e.target.lastChild.classList.remove('alphabet-az');
      e.target.lastChild.classList.add('alphabet-za');
      sessionStorage.setItem('sortDirection', 'za');
      sortZA(i, list);
      break;
    case e.target.lastChild.classList.contains('alphabet-za'):
      e.target.lastChild.classList.remove('alphabet-za');
      sessionStorage.clear();
      renderListFromLocalStorage(list, logo);
      break;
  }
};

export const sortFromStorage = (i, list) => {
  const target = i === '1' ?
    document.querySelector('.name') :
    document.querySelector('.surname');
  if (sessionStorage.getItem('sortDirection') === 'az') {
    target.lastChild.classList.add('alphabet-az');
    sortAZ(i, list);
  }
  if (sessionStorage.getItem('sortDirection') === 'za') {
    target.lastChild.classList.add('alphabet-za');
    sortZA(i, list);
  }
};
