import { useEffect, useContext } from 'react';

// context api
import { ContactContext } from '../context/context';

export function useContactsLoading() {
  const { fetchContacts } = useContext(ContactContext);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);
}
