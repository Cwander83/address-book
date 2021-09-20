import { useContext } from 'react';

// components
import { EmailList } from '../components/EmailList';
import { TextButton } from '../components/TextButton';

// stylesheet
import '../style/card.scss';
import '../style/inputs.scss';

// context api
import { ContactContext } from '../context/context';

// icon 
import Arrow from '../assets/icons/arrow_left_icon.png';

const Card = () => {
  const {
    activeContact,
    setActiveContact,
    deleteContact,
    clearActiveContact,
    updateContact,
  } = useContext(ContactContext);

  const updateInputHandler = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setActiveContact({ ...activeContact, [name]: value });
  };
  return (
    <div className="card-container">
      {activeContact.id !== null ? (
        <>
          <div className="inputs-section card-section">
            <div className="input-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                placeholder="Craggy"
                name="firstName"
                value={activeContact.firstName}
                onChange={(e) => updateInputHandler(e)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                placeholder="Bramble"
                value={activeContact.lastName}
                onChange={(e) => updateInputHandler(e)}
                name="lastName"
              />
            </div>
          </div>
          <EmailList />
          <div className="buttons-group">
            <TextButton
              text="Delete"
              css="delete-btn"
              click={() => deleteContact(activeContact.id)}
            />
            <TextButton
              text="Cancel"
              css="cancel-btn"
              click={() => clearActiveContact()}
            />
            <TextButton
              text="Save"
              css="save-btn"
              click={() => updateContact(activeContact)}
            />
          </div>
        </>
      ) : (
        <div className="welcome-container">
          <p>
            <img src={Arrow} alt="" /> Click here to create new contact
          </p>
          <div className="welcome-title">
            <h1>Welcome to AVB Marketing</h1>
            <h1>Address Book</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
