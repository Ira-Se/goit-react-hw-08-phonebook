import { createSelector } from '@reduxjs/toolkit';

export const selectList = state => state.contacts.list;
export const selectFilter = state => state.filter;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectFilterContacts = createSelector(
  [selectList, selectFilter],
  (contacts, filter) => {
    //   const contacts = selectList(state);
    //   const filter = selectFilter(state);
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  }
);
