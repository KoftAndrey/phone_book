'use strict';
{
  // Работа с localStorage
  const getStorage = key => {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return [];
    }
  };

  const setStorage = (key, obj) => {
    const arr = getStorage(key);
    arr.unshift(obj);
    const str = JSON.stringify(arr);
    localStorage.setItem(key, str);
  };

  const removeStorage = (key, phone) => {
    const arr = getStorage(key);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].phone === phone) arr.splice(i, 1);
    }
    const str = JSON.stringify(arr);
    localStorage.setItem(key, str);
  };

  // Создание элементов
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();

    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;

    return footer;
  };

  const createFooterText = () => {
    const footerText = document.createElement('p');
    footerText.textContent = 'Все права защищены ©Андрей';

    return footerText;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th class="delete">Удалить</th>
      <th class="name">Имя<span class="sort-icon"></span></th>
      <th class="surname">Фамилия<span class="sort-icon"></span></th>
      <th colspan="2">Телефон</th>
    </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.thead = thead;
    table.tbody = tbody;

    return table;
  };

  const crerateForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('close');
    form.append(closeButton);

    form.insertAdjacentHTML('beforeend', `
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name" 
          id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname" 
          id="surname" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone" 
          id="phone" type="number" required>
      </div>
    `);

    const buttonsGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonsGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createRow = ({name: firstName, surname, phone}, logo) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;

    tdPhone.append(phoneLink);

    const tdEdit = document.createElement('td');
    tdEdit.classList.add('contact-edit');
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.classList.add('edit');
    tdEdit.append(editButton);
    tr.tdEdit = tdEdit;

    const logoText = logo.textContent;
    tr.addEventListener('mouseenter', () => {
      logo.textContent = tr.phoneLink.textContent;
      tr.tdEdit.classList.add('is-visible');
    });
    tr.addEventListener('mouseleave', () => {
      logo.textContent = logoText;
      tr.tdEdit.classList.remove('is-visible');
    });

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  // Сортировка
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

  const sortRows = (e, thead, list, logo) => {
    const i = Array.from(thead.firstElementChild.cells).indexOf(e.target);
    if (i === 1) {
      e.target.nextElementSibling.lastChild.classList.remove('alphabet-az', 'alphabet-za');
    }
    if (i === 2) {
      e.target.previousElementSibling.lastChild.classList.remove('alphabet-az', 'alphabet-za');
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

  const sortFromStorage = (i, list) => {
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

  // Рендер элементов
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
    const {form, overlay} = crerateForm();
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

  // Управление
  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => formOverlay.classList.add('is-visible');
    const closeModal = () => formOverlay.classList.remove('is-visible');

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', e => {
      const target = e.target;
      if (target === formOverlay || target.classList.contains('close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      if (e.target.classList.contains('del-icon')) {
        e.target.closest('.contact').remove();
        const phone = e.target.closest('.contact')
            .lastElementChild
            .previousElementSibling
            .lastElementChild
            .textContent;
        removeStorage('phonebook', phone);
      }
    });
  };

  const addContactToPage = (contact, list, logo) => {
    list.prepend(createRow(contact, logo));
  };

  const formControl = (form, list, closeModal, logo) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);

      addContactToPage(newContact, list, logo);
      setStorage('phonebook', newContact);
      form.reset();
      closeModal();
    });
  };

  // Инициализация
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
}
