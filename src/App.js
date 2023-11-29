import './App.css';
import { Route, Routes,Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Project from './Pages/Project'
import Footer from './Components/Footer';
import Auth from './Components/Auth';
import { useContext } from 'react';
import { tokenAuthorisationContext } from './Contexts/TokenAuth';

function App() {
  const { isAuthorized, setIsAuthorized } = useContext(tokenAuthorisationContext)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register />} />
        <Route path='/dashboard' element={isAuthorized ? <Dashboard /> : <Home />} />
        <Route path='/project' element={isAuthorized ? <Project /> : <Home />} />
        <Route path='/*' element={<Navigate/>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
