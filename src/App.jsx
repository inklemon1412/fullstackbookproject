import React, {useState}from 'react';

import{Routes, Route, Switch} from 'react-router-dom';
import BookDetails from './components/BookDetails';

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";




const App = () => {
	const [title, updateTitle] = useState(null);
	const [errorMessage, updateErrorMessage] = useState(null);

	  return (
      <div>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
         
          <Route path="Books/:id" element={<BookDetails />}></Route>
       
          <Route path="/dashboard" element={<Dashboard />}></Route>
       
       
        
        </Routes>
      </div>
    );
  }




export default App;
