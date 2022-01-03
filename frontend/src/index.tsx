import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import './index.css';

ReactDom.render(
  <RecoilRoot>
    <Router>
      <App />
    </Router>
  </RecoilRoot>,
  document.getElementById('root')
);
