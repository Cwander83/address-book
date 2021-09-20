import { useState, useContext } from 'react';

// components
import { AddContactBtn } from './AddContactBtn';
import { DeleteEmailBtn } from './DeleteEmailBtn';
import { AddEmailInput } from './AddEmailInput';

// stylesheet
import '../style/buttons.scss';

// context api
import { ContactContext } from '../context/context';

export const EmailList = () => {
  
  const [showInput, setShowInput] = useState(false);

  const { activeContact } = useContext(ContactContext);

  // state for mouse hover to show delete btn
  const [selectedEmail, setSelectedEmail] = useState('');

  return (
    <div className="email-container">
      <h6 className="email-title">Email</h6>

      <ul className="email-list">
        {activeContact &&
          activeContact.emails.map((email, index) => (
            <li
              key={index}
              onMouseEnter={() => {
                setSelectedEmail(email);
              }}
              onMouseLeave={() => {
                setSelectedEmail('');
              }}
            >
              <p>{email}</p>
              <DeleteEmailBtn
                selectedEmail={selectedEmail}
                email={email}
                id={activeContact.id}
              />
            </li>
          ))}
      </ul>
      <AddEmailInput showInput={showInput} setShowInput={setShowInput} />
      <button
        className="add-email-btn"
        onClick={() => setShowInput(!showInput)}
      >
        {!showInput ? (
          <>
            <AddContactBtn width="1.5px" height="18px" ellipsis="24px" />
            <p>add email</p>
          </>
        ) : (
          <p>cancel</p>
        )}
      </button>
    </div>
  );
};
