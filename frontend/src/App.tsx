import { Routes, Route, useNavigate } from 'react-router-dom';

import { Login } from './components/Login';
import { Home } from './views/Home';
import './index.css';

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;