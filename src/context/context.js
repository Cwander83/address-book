import { createContext, useState, useCallback, useEffect } from 'react';

// default value
export const defaultValue = {
  contacts: [],
  activeContact: {},
  isLoading: false,
  showNewContactForm: false,
  fetchContacts: () => {},
  addContact: () => {},
  updateContact: () => {},
  removeContact: () => {},
  addEmail: () => {},
  deleteEmail: () => {},
};

//
export const ContactContext = createContext(defaultValue);

const ContactProvider = (props) => {
  // url to DB
  const url = 'https://avb-contacts-api.herokuapp.com/contacts/';

  const [contacts, setContacts] = useState([]);

  const [showNewContact, setShowNewContact] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [activeContact, setActiveContact] = useState({
    id: null,
    firstName: '',
    lastName: '',
    emails: [],
  });

  // GET all contacts
  const fetchContacts = useCallback(async () => {
    setIsLoading(true);

    await fetch(url + 'paginated?page=1')
      .then((response) => response.json())
      .then((fetchedContacts) => {
        setContacts(fetchedContacts.contacts);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setContacts]);

  // POST takes new contact and adds to DB
  const addContact = useCallback(
    async (contact) => {
      setIsLoading(true);

      await fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify({ contact }),
      })
        .then((response) => console.log(response))
        .finally(() => setIsLoading(false));
    },
    [setContacts, contacts]
  );

  // DELETE removes contact from DB completely
  const deleteContact = useCallback(
    async (contactId) => {
      setIsLoading(true);

      await fetch(`${url}${contactId}`, {
        method: 'DELETE',
      })
        .then(() => {
          const newContacts = [...contacts];
          const removedContactIndex = newContacts.findIndex(
            (contact) => contact.id === contactId
          );
          if (removedContactIndex > -1) {
            newContacts.splice(removedContactIndex, 1);
          }
          setContacts(newContacts);
          clearActiveContact();
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [setContacts, contacts]
  );

  // UPDATE / DELETE  removes email from contact 
  const deleteEmail = useCallback(
    async (email, id) => {
      setIsLoading(true);

      // filters single contact from array by id
      const filteredContact = contacts.filter((contact) => contact.id === id);

      // takes email array from object
      const emailsArr = await filteredContact[0].emails;

      // finds index of email to be removed
      const emailIndex = await emailsArr.indexOf(email);

      // removes email
      await emailsArr.splice(emailIndex, 1);

      const newContact = {
        firstName: filteredContact[0].firstName,
        lastName: filteredContact[0].lastName,
        id: filteredContact[0].id,
        emails: emailsArr,
      };

      await fetch(`${url}${newContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      })
        .then((response) => response.json())
        .then(() => fetchContacts())
        .finally(() => {
          setIsLoading(false);
        })

        .catch((err) => console.error(err));
    },
    [contacts, setContacts]
  );

  // PUT modifies info in contact object
  const updateContact = useCallback(
    async (newContact) => {

      setIsLoading(true);

      await fetch(`${url}${newContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      })
        .then((response) => response.json())
        .then((data) =>
          setActiveContact({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            emails: data.emails,
          })
        )
        .then(() => fetchContacts())
        .finally(() => setIsLoading(false))

        .catch((err) => console.error(err));
    },
    [setContacts]
  );

  // resets active contact to default state
  const clearActiveContact = () =>
    setActiveContact({
      id: null,
      firstName: '',
      lastName: '',
      emails: [],
    });

  return (
    <ContactContext.Provider
      value={{
        contacts,
        activeContact,
        showNewContact,
        clearActiveContact,
        updateContact,
        isLoading,
        setActiveContact,
        addContact,
        fetchContacts,
        deleteEmail,
        deleteContact,
        setShowNewContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
