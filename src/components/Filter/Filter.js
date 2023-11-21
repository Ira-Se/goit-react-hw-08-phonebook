import { useDispatch, useSelector } from 'react-redux';
import { StyledInput, Container } from './Filter.styled';
import { setFilter } from 'redux/filterReducer';
import { selectFilter } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChangeFilter = evt => {
    dispatch(setFilter(evt.target.value));
  };

  return (
    <Container>
      <label htmlFor="filerInput">Find contacts by name</label>
      <StyledInput type="text" value={filter} onChange={handleChangeFilter} />
    </Container>
  );
};
