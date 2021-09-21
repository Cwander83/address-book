import { useContext, useEffect } from 'react';

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

// react hook forms
import { useForm } from 'react-hook-form';

const Card = () => {
  const { activeContact, deleteContact, clearActiveContact, updateContact } =
    useContext(ContactContext);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // dynamically setting value for each contact
    setValue('firstName', activeContact.firstName);
    setValue('lastName', activeContact.lastName);

    // removes errors if click on another contact
    clearErrors();
  }, [activeContact]);

  const onSubmit = (data) => {
    const newContact = {
      id: activeContact.id,
      firstName: data.firstName,
      lastName: data.lastName,
      emails: activeContact.emails,
    };

    updateContact(newContact);
  };

  return (
    <div className="card-container">
      {activeContact.id !== null ? (
        <>
          <form className="inputs-section card-section">
            <div className="input-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                {...register('firstName', {
                  required: '* first name is required',
                  minLength: {
                    value: 2,
                    message: '* first name minimum characters is 2',
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: '* only letters please',
                  },
                  maxLength: 80,
                })}
              />
            </div>
            <div className="input-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                {...register('lastName', {
                  required: '* last name is required',
                  minLength: {
                    value: 2,
                    message: '* last name minimum characters is 2',
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: '* only letters please',
                  },
                  maxLength: 100,
                })}
              />
            </div>
          </form>
          <span className="error-message">
            {errors.firstName && errors.firstName.message}
          </span>
          <span className="error-message">
            {errors.lastName && errors.lastName.message}
          </span>
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
              click={handleSubmit((data) => onSubmit(data))}
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
