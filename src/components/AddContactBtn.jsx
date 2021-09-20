import { useContext } from 'react';

// stylesheet
import '../style/buttons.scss';

// context api
import { ContactContext } from '../context/context';

export const AddContactBtn = ({ width, height, ellipsis }) => {
  const { setShowNewContact, clearActiveContact } = useContext(ContactContext);
  return (
    <div
      onClick={() => {
        setShowNewContact(true);
        clearActiveContact();
      }}
      className="ellipse ellipse-one"
      style={{ width: `${ellipsis}`, height: `${ellipsis}` }}
    >
      <div
        className="rectangle rectangle-one"
        style={{ width: `${width}`, height: `${height}` }}
      ></div>
      <div
        className="rectangle rectangle-two"
        style={{ width: `${width}`, height: `${height}` }}
      ></div>
    </div>
  );
};
