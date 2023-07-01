import render from './modules/render.js';
const {renderPhoneBook, renderContacts} = render;
import {modalControl, deleteControl, formControl} from './modules/control.js';
import {sortRows} from './modules/alphabetSort.js';

{const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);

  const {
    thead,
    list,
    logo,
    btnAdd,
    btnDel,
    formOverlay,
    form,
  } = renderPhoneBook(app, title);

  // Функционал
  renderContacts(list, logo);

  const {closeModal} = modalControl(btnAdd, formOverlay);
  deleteControl(btnDel, list);
  formControl(form, list, closeModal, logo);

  const alphabetSort = (thead, list) => {
    thead.addEventListener('click', e => {
      sortRows(e, thead, list, logo);
    });
  };

  alphabetSort(thead, list);
};

window.phoneBookInit = init;
}
