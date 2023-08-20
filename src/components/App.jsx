import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import DataManager from './storages/storage';
import * as storageKeys from './storages/storageKeys';
import { H2Style } from './App.styled';

export const App = () => {
  const dataManager = new DataManager();
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const loadFromStorage = () => {
      const storedContacts = dataManager.load(storageKeys.CONTACTS);
      if (storedContacts) {
        setContacts(storedContacts);
      }
    };

    loadFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const saveContactsToStorage = () => {
      dataManager.save(storageKeys.CONTACTS, contacts);
    };

    if (contacts.length > 0) {
      saveContactsToStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

const handleFormSubmit = ({ name, number }) => {
  if (isContactAlreadyExists(name)) {
    showInfoNotification(`${name} is already in contacts`);
    return;
  }

  const newContact = {
    name,
    number,
    id: nanoid(),
  };

  addContact(newContact);
  showSuccessNotification('Contact was added successfully');
};

  const isContactAlreadyExists = (name) => {
    return contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());
  };

  const showInfoNotification = (message) => {
    Notiflix.Notify.info(message);
  };

const addContact = (newContact) => {
  setContacts([...contacts, newContact]);
};

  const showSuccessNotification = (message) => {
    Notiflix.Notify.success(message);
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilterValue = filter.toLowerCase();
    return contacts.filter((contact) => contact.name.toLowerCase().includes(normalizedFilterValue));
  };

  const onDeleteBtn = (id) => {
    removeContact(id);
     Notiflix.Notify.failure('Contact deleted successfully');
  };

  const removeContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  return (
    <>
      <div>
        <H2Style>Phonebook</H2Style>
        <ContactForm onSubmit={handleFormSubmit} />
        <H2Style>Contacts</H2Style>
        <Filter filter={filter} handleFilter={handleFilter} />
        <ContactList contacts={getFilteredContacts()} onDeleteBtn={onDeleteBtn} />
      </div>
    </>
  );
};

