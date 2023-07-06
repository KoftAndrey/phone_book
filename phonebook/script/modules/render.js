import {getStorage} from './serviceStorage.js';
import {sortFromStorage} from './alphabetSort.js';
import * as create from './createElements.js';
const {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createFooterText,
  createRow,
} = create;


const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const buttonsGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = createTable();
  const {form, overlay} = createForm();
  const footer = createFooter();
  const footertext = createFooterText();

  header.headerContainer.append(logo);
  main.mainContainer.append(buttonsGroup.btnWrapper, table, overlay);
  footer.footerContainer.append(footertext);
  app.append(header, main, footer);

  return {
    thead: table.thead,
    list: table.tbody,
    logo,
    btnAdd: buttonsGroup.btns[0],
    btnDel: buttonsGroup.btns[1],
    formOverlay: overlay,
    form,
  };
};

const renderContacts = (elem, logo) => {
  const allRow = getStorage('phonebook').map(x => createRow(x, logo));
  elem.append(...allRow);
  if (sessionStorage.getItem('columnIndex')) {
    sortFromStorage(sessionStorage.getItem('columnIndex'), elem);
  }
};

export default {renderPhoneBook, renderContacts};
