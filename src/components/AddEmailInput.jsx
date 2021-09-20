import { useContext } from 'react';

// react hooks form library
import { useForm } from 'react-hook-form';

// context api
import { ContactContext } from '../context/context';

// stylesheet
import '../style/card.scss';
import '../style/inputs.scss';
import '../style/newContact.scss';
import '../style/buttons.scss';

export const AddEmailInput = ({ showInput }) => {
  const { activeContact, updateContact } = useContext(ContactContext);
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.email);
    const newArr = [...activeContact.emails, data.email];
    console.log(newArr);
    const newContact = {
      id: activeContact.id,
      firstName: activeContact.firstName,
      lastName: activeContact.lastName,
      emails: newArr,
    };
    updateContact(newContact);
    reset();
  };

  return (
    <>
      {showInput && (
        <form className="form email-section" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input
              type="email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />

            <span>{errors.email && '* email is required'}</span>
            <button
              type="submit"
              className="button-text save-btn save-email-btn"
            >
              Add Email
            </button>
          </div>
        </form>
      )}
    </>
  );
};
