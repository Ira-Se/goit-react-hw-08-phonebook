import { useSelector } from "react-redux";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import Loader from "./Loader/Loader";
import { selectError, selectIsLoading } from "redux/selectors";


export const App = () => {
  // const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectError)


    return <>
      <h1>Phonebook</h1>
      <ContactForm/>
      <h2>Contacts</h2>
      <Filter />
      {isLoading && <Loader/>}
      {error && (<p>Please reload the page</p>)}
      <ContactList/>
     </>
  } 