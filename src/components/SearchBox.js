import React, {useState}from "react";


const SearchBox = ( {searchBooks} ) => {
   const [search, setSearch] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      searchBooks(search);
  };
   return (
      <>
          <div className="col col-sm-4">
          <form onSubmit={handleSubmit}>
      <input 
      className='form-control'
      placeholder='Type to search...'
      onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn'>
                search
            </button>
            </form>
      </div>
          
    </>
    
   );
};


/*import React from 'react';
import { Modal } from 'react-bootstrap';

import EditBook from './edit-book';
const CreateBookModel = (props) => {
     
    return (
        <>
           <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false} centered>
               <Modal.Header closeButton>
                  <Modal.Title>Add New Book</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <EditBook />
               </Modal.Body>
            </Modal>
         </>
    )
}
*/
export default SearchBox;
