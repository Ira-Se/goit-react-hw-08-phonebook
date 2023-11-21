import { useDispatch, useSelector } from 'react-redux';
import { Item, StyledButton } from './ContactItem.styled';

import { selectFilterContacts } from 'redux/selectors';
import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/operations';

export const ContactItem = () => {
  // const contacts = useSelector(selectList);
  // const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  // const filterContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase())
  // );
  const filterContacts = useSelector(selectFilterContacts);
  console.log(filterContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {filterContacts.map(({ id, name, number }) => (
        <Item key={id}>
          {name}: {number}
          <StyledButton onClick={() => dispatch(deleteContact(id))}>
            Delete
          </StyledButton>
        </Item>
      ))}
    </>
  );
};
