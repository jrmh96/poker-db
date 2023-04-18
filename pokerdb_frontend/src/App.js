import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import AddHand from './hands/AddHand';
import EditHand from './hands/EditHand';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
    return (
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/addHand" element={<AddHand/>}></Route>
              <Route exact path="/editHand/:id" element={<EditHand />}></Route>
            </Routes>
          </Router>
        </div>
    );
}

export default App;
