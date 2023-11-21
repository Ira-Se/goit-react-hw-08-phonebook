import { useDispatch, useSelector } from 'react-redux';

import { nanoid } from 'nanoid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  StyledForm,
  ErrMessage,
  StyledLabel,
  StyledField,
  StyledButton,
} from './ContactForm.styled';
import { selectList } from 'redux/selectors';
import { addContact } from 'redux/operations';

const AddContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'This name is too short!')
    .max(24, 'This name is too long!')
    .matches(
      /^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('This is a required field'),
  number: Yup.string()
    .min(5, 'This number is too short')
    .max(11, 'This number is too long!')
    .matches(
      /^\+?\d{1,4}?[ .\-s]?(\(\d{1,3}?\))?([ .\-s]?\d{1,4}){1,4}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('This is a required field'),
});

export const ContactForm = ({ onAdd }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectList);

  const handleSubmit = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    const existingContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      return alert(`${newContact.name} is already in contacts`);
    }
    dispatch(addContact(newContact));
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={AddContactSchema}
      onSubmit={(value, action) => {
        handleSubmit(value);
        action.resetForm();
      }}
    >
      <StyledForm>
        <StyledLabel htmlFor="Name">Name</StyledLabel>
        <StyledField type="text" name="name" />
        <ErrMessage name="name" component="div" />
        <StyledLabel htmlFor="Number">Number</StyledLabel>
        <StyledField type="tel" name="number" />
        <ErrMessage name="number" component="div" />
        <StyledButton type="submit">Add contact</StyledButton>
      </StyledForm>
    </Formik>
  );
};
