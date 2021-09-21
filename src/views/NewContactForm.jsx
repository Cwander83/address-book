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

const NewContactForm = () => {
  const { addContact } = useContext(ContactContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newContact = {
      firstName: data.firstName,
      lastName: data.lastName,
      emails: [data.email],
    };

    addContact(newContact);

    reset();
  };

  return (
    <div className="new-contact-container">
      <h1>New Contact</h1>
      <form className="form input-section" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            {...register('firstName', {
              required: '* required',
              minLength: {
                value: 2,
                message: '* first name minimum characters is 2',
              },
              pattern:{value:/^[A-Za-z]+$/, message: '* only letters please'},
              maxLength: 80,
            })}
          />
          <span className="error-message">
            {errors.firstName && errors.firstName.message}
          </span>
        </div>
        <div className="input-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            {...register('lastName', {
              required: '* required',
              minLength: {
                value: 2,
                message: '* last name minimum characters is 2',
              },
              pattern:{value:/^[A-Za-z]+$/, message: '* only letters please'},
              maxLength: 100,
            })}
          />
          <span className="error-message">
            {errors.lastName && errors.lastName.message}
          </span>
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
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

        <button type="submit" className="button-text save-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewContactForm;
