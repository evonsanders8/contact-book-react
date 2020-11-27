import React, { useState, useEffect } from "react";
import {
  FormControl,
  Menu,
  MenuItem,
  Input,
  InputLabel,
  Select,
  TextField,
  Button,
} from "@material-ui/core";
import "./ContactForm.css";
import { fetchAPI } from "../api";

const Contact_Type = ["work", "personal", "other"];
const EditContactForm = (props) => {
  const { currentContact, clearEditContact, editContact } = props;

  const [name, setName] = useState(currentContact.name);
  const [email, setEmail] = useState(currentContact.email);
  const [phone, setPhone] = useState(currentContact.phone);
  const [address, setAddress] = useState(currentContact.address);
  const [contactType, setContactType] = useState(currentContact.contactType);

  // console.log(props)

  useEffect(() => {
    setName(currentContact.name);
    setEmail(currentContact.email);
    setPhone(currentContact.phone);
    setAddress(currentContact.address);
    setContactType(currentContact.contactType);
  }, [currentContact]);

  return (
    <div className="div-holding-form">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const bodyObj = {
            name,
            email,
            address,
            phone,
            contactType,
          };

          const url = `https://univ-contact-book.herokuapp.com/api/contacts/${currentContact.id}`;

          fetchAPI(url, "PATCH", bodyObj)
            .then((response) => {
              editContact(currentContact, response.contact);
              clearEditContact();
            })
            .catch(console.error);
        }}
      >
        <h3>Update Contact</h3>
        <div>
          <InputLabel className="contact-form-label">Name</InputLabel>
          <TextField
            type="text"
            variant="outlined"
            value={name}
            placeholder="Name here"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div>
          <InputLabel className="contact-form-label">Address</InputLabel>
          <TextField
            type="text"
            variant="outlined"
            value={address}
            placeholder="Adrdess "
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
        </div>
        <div>
          <InputLabel className="contact-form-label">Email</InputLabel>

          <TextField
            type="text"
            variant="outlined"
            value={email}
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <br></br>
        <div>
          <InputLabel className="contact-form-label">Phone Number</InputLabel>
          <TextField
            type="text"
            variant="outlined"
            value={phone}
            placeholder="Phone Number"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
        <br></br>
        <div>
          <InputLabel className="contact-form-label">Contact Type</InputLabel>
          <Select
            value={contactType}
            onChange={(event) => {
              setContactType(event.target.value);
            }}
          >
            {Contact_Type.map((contacttype, idx) => {
              return (
                <MenuItem value={contacttype} key={idx}>
                  {" "}
                  {contacttype}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div>
          <Button> Update</Button>
          <Button onClick={clearEditContact}>Undo</Button>
        </div>
      </form>
    </div>
  );
};

export default EditContactForm;
