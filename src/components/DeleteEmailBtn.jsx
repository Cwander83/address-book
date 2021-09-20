import { useContext } from 'react';

// stylesheet
import '../style/buttons.scss';

// context api
import { ContactContext } from '../context/context';

export const DeleteEmailBtn = ({ selectedEmail, email, id }) => {
  const { deleteEmail } = useContext(ContactContext);

  return (
    <>
      {selectedEmail === email && (
        <>
          <div
            className="ellipse ellipse-two"
            onClick={() => deleteEmail(selectedEmail, id)}
          >
            <div className="rectangle rectangle-three"></div>
          </div>
        </>
      )}
    </>
  );
};
