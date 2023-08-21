import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button, Form, Input, Label } from './ContactForm.styled'; 
import Notiflix from 'notiflix';

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "number") {
      setNumber(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() && !number.trim()) {
      Notiflix.Notify.failure('Input is Empty !');
      return;
    }

    onSubmit({ name, number });
    setName('');
    setNumber('');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я' ]+$"
          title="Name may contain only letters, apostrophe, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
        />
        <Label htmlFor="tel">Number</Label>
        <Input
          id="tel"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
        />
        <Button type="submit">Add contact</Button>
      </div>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;