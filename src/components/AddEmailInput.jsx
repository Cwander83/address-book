import { useContext,useEffect } from 'react';

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
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // removes errors if click on another contact
    clearErrors();
  }, [activeContact]);

  const onSubmit = (data) => {
    const newArr = [...activeContact.emails, data.email];

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
            <div className="email-input">
              <input
                type="email"
                {...register('email', {
                  required: '* this is required',
                  pattern: { value: /^\S+@\S+$/i, message: '* Invalid Email' },
                })}
              />

              <span className="error-message">
                {errors.email && errors.email.message}
              </span>
            </div>
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
