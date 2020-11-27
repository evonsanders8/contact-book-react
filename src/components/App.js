import "./App.css";
import React, { useState, useEffect } from "react";
import { fetchAPI } from "../api/index";
import ReactDom from "react-dom";
import ContactList from "./ContactList";
import { AppBar, Toolbar } from "@material-ui/core";
import ContactForm from "./ContactForm";
import EditedContactForm from "./EditedContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts")
      .then((data) => setContacts(data.contacts))
      .catch(console.error);
  }, []);
  const addNewContact = (contact) => {
    contact.comments = contact.comments || [];
    setContacts([...contacts, contact]);
  };

  const clearEditContact = () => {
    setCurrentContact(null);
  };
  const removeContact = (deletedContact) =>
    setContacts(contacts.filter((contact) => contact !== deletedContact));

  const newComment = (contact, comment) => {
    const newContacts = [...contacts];
    const index = newContacts.indexOf(contact);

    newContacts[index].comments.push(comment);
    setContacts(newContacts);
  };

  const deleteComment = (contact, deletedComment) => {
    const newContacts = [...contacts];
    const index = newContacts.indexOf(contact);

    newContacts[index].comments = newContacts[index].comments.filter(
      (comment) => comment !== deletedComment
    );
    setContacts(newContacts);
  };

  const editContact = (oldContact, newContact) => {
    const newContacts = contacts.map((contact) => {
      if (contact === oldContact) {
        return newContact;
      }

      return contact;
    });

    setContacts(newContacts);
  };

  function filterContacts() {
    return contacts.filter((filteredContact) => {
      return filteredContact.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }

  return (
    <div className="app">
      <AppBar position="absolute" style={{ background: "#20639B" }}>
        <Toolbar> Contact List App</Toolbar>
      </AppBar>

      <div
        style={{
          paddingTop: "150px",
        }}
      >
        <input
          className="search-bar"
          // style={{
          //   top: '80px',
          //   position: 'relative',
          //   height: '20px',
          // }}
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search Here"
        />

        {currentContact ? (
          <EditedContactForm
            currentContact={currentContact}
            clearEditContact={clearEditContact}
            editContact={editContact}
          />
        ) : (
          <ContactForm addNewContact={addNewContact} />
        )}

        <ContactList
          contacts={filterContacts()}
          setCurrentContact={setCurrentContact}
          editContact={editContact}
          removeContact={removeContact}
          newComment={newComment}
          deleteComment={deleteComment}
        />
      </div>
    </div>
  );
};

export default App;
