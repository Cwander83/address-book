import ReactDOM from 'react-dom';
import { App } from './App.jsx';

// stylesheet
import './style/index.scss';

// context api
import ContactProvider from './context/context';

ReactDOM.render(
  <ContactProvider>
    <App />
  </ContactProvider>,
  document.getElementById('root')
);
