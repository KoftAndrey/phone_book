import {renderPhoneBook, renderContacts} from './modules/render.js';
import {modalControl, deleteControl, formControl} from './modules/render.js';
import sortRows from './modules/alphabetSort';

const init = (selectorApp, title) => {
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
