import {setStorage, removeStorage} from './serviceStorage.js';
import {createRow} from './createElements.js';

export const modalControl = (btnAdd, formOverlay) => {
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

export const deleteControl = (btnDel, list) => {
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

export const formControl = (form, list, closeModal, logo) => {
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
