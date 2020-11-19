
//mport './App.css';
import React, {useState, useEffect} from 'react'
import {fetchAPI} from '../api/index'
import ReactDom from "react-dom"
import ContactList from './ContactList';
import{AppBar, Toolbar} from '@material-ui/core'
import ContactForm from './ContactForm'

const App = ()  => {
  const [contacts, setContacts, setContactType] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  

  useEffect(() => {
    fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts")
      .then((data) => setContacts(data.contacts))
      .catch(console.error);
  }, []);
  const addNewContact = (contact) => {
    contact.comments = contact.comments || [];
    setContacts([...contacts, contact]);
  };




  return (
    <div className="app">
    
     <AppBar position="absolute" style={{ background: '#20639B' }} >
       <Toolbar> Contact List App</Toolbar>
     </AppBar>
    
     <div style={{
       paddingTop: "150px"
     }}> 
     <ContactList
        contacts={contacts}
        setActiveContact={setActiveContact}
        //removeContact={removeContact}
        //addComment={addComment}
        //removeComment={removeComment}
      />

      <ContactForm addNewContact={addNewContact}/>

     
     </div>
 





      
    </div>
  );
}

export default App;
