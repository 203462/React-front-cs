import { BrowserRouter , Route, Routes} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile/:userId' element={<Profile/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;