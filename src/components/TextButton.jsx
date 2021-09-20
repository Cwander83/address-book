// stylesheet
import '../style/buttons.scss';

export const TextButton = ({ text, css, click }) => {
  return (
    <button className={`button-text ${css}`} onClick={click}>
      {text}
    </button>
  );
};
