import { useState } from 'react';

// react hooks form library
import { useForm } from 'react-hook-form';

// stylesheet
import '../style/card.scss';
import '../style/inputs.scss';
import '../style/newContact.scss';
import '../style/buttons.scss';

const NewContactForm = () => {
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
    console.log(newContact);
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
              required: true,
              min: 2,
              maxLength: 80,
            })}
          />
          <span>{errors.firstName && '* first name is required'}</span>
        </div>
        <div className="input-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            {...register('lastName', {
              required: true,
              min: 2,
              maxLength: 100,
            })}
          />
          <span>{errors.lastName && '* last name is required'}</span>
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          <span>{errors.email && '* email is required'}</span>
        </div>

        <button type="submit" className="button-text save-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewContactForm;
