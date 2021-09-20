import { useContext, useState } from 'react';

// component
import { AddContactBtn } from '../components/AddContactBtn';

// stylesheet
import '../style/contacts.scss';

// context api
import { ContactContext } from '../context/context';

// hook
import { useContactsLoading } from '../hooks/useContactsLoading';

 const Contacts = () => {
  const { contacts, setActiveContact, setShowNewContact } =
    useContext(ContactContext);

  // state for active contact
  const [selected, setSelected] = useState('');

  // hooks calls fetch all contacts from db
  useContactsLoading();

  const changeColor = (id) => setSelected(id);

  return (
    <div className="contacts-container">
      <div className="title">
        <h1>Contacts</h1>
        <AddContactBtn width="2px" height="24px" ellipsis="32px" />
      </div>
      <ul className="contacts-list">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            style={{
              backgroundColor: selected === contact.id ? '#579aff' : '',
              color: selected === contact.id ? '#ffffff' : '#444444',
            }}
          >
            <p
              onClick={() => {
                changeColor(contact.id);
                setActiveContact(contact);
                setShowNewContact(false);
              }}
            >
              {contact.firstName} {contact.lastName}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
