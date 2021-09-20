import React, { useContext, Suspense } from 'react';

// views
const Contacts = React.lazy(() => import('./views/Contacts'));
const Card = React.lazy(() => import('./views/Card'));
const NewContactForm = React.lazy(() => import('./views/NewContactForm'));

// context api
import { ContactContext } from './context/context';

export const App = () => {
  const { showNewContact } = useContext(ContactContext);

  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <Contacts />
        {!showNewContact ? <Card /> : <NewContactForm />}
      </Suspense>
    </div>
  );
};
