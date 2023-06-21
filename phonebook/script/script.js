'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Яковлев',
    phone: '+79514545454',
  },
  {
    name: 'Антон',
    surname: 'Верещагин',
    phone: '+79999999999',
  },
  {
    name: 'Яна',
    surname: 'Иванова',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Анисимова',
    phone: '+79876543210',
  },
];

{
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

  const createRow = ({name: firstName, surname, phone}) => {
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

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

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
    const form = crerateForm();
    const footer = createFooter();
    const footertext = createFooterText();

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonsGroup.btnWrapper, table, form.overlay);
    footer.footerContainer.append(footertext);
    app.append(header, main, footer);

    return {
      thead: table.thead,
      list: table.tbody,
      logo,
      btnAdd: buttonsGroup.btns[0],
      btnDel: buttonsGroup.btns[1],
      formOverlay: form.overlay,
      form: form.form,
    };
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo, editBtn) => {
    const logoText = logo.textContent;
    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
        contact.tdEdit.classList.add('is-visible');
      });
    });
    allRow.forEach(contact => {
      contact.addEventListener('mouseleave', () => {
        logo.textContent = logoText;
        contact.tdEdit.classList.remove('is-visible');
      });
    });
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

  const sortRows = (e, thead, list, reserve) => {
    const i = Array.from(thead.firstElementChild.cells).indexOf(e.target);
    if (i === 1) {
      e.target.nextElementSibling.lastChild.classList.remove('alphabet-az', 'alphabet-za');
    }
    if (i === 2) {
      e.target.previousElementSibling.lastChild.classList.remove('alphabet-az', 'alphabet-za');
    }

    switch (true) {
      case !e.target.lastElementChild:
        break;
      case e.target.lastChild.classList.value === 'sort-icon':
        e.target.lastChild.classList.add('alphabet-az');
        sortAZ(i, list);
        break;
      case e.target.lastChild.classList.contains('alphabet-az'):
        e.target.lastChild.classList.remove('alphabet-az');
        e.target.lastChild.classList.add('alphabet-za');
        sortZA(i, list);
        break;
      case e.target.lastChild.classList.contains('alphabet-za'):
        e.target.lastChild.classList.remove('alphabet-za');
        list.append(...reserve);
        break;
    }
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);
    const {
      thead,
      list,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
    } = phoneBook;
    // Функционал
    const allRow = renderContacts(list, data);
    let reservedArr = Array.from(list.rows);

    hoverRow(allRow, logo);

    btnAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    });

    formOverlay.addEventListener('click', e => {
      const target = e.target();
      if (target === formOverlay || target.classList.contains('close')) {
        formOverlay.classList.remove('is-visible');
      }
    });

    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      if (e.target.classList.contains('del-icon')) {
        e.target.closest('.contact').remove();
        reservedArr = Array.from(list.rows);
      }
    });

    thead.addEventListener('click', e => {
      sortRows(e, thead, list, reservedArr);
    });
  };

  window.phoneBookInit = init;
}
