import { Route, Routes } from 'react-router-dom';
import './App.css';
import Gallery from './Pages/Gallery';
import Videos from './Pages/Videos';
import Home from './Pages/Home';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/gallery' element={<Gallery />} />
      <Route path='/videos' element={<Videos />} />
    </Routes>
  );
}

export default App;
