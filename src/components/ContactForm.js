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

const ContactForm = (props) => {
  const [contactType, setContactType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const Contact_Type = ["work", "personal", "other"];
  const { addNewContact } = props;
  console.log(props);

  // useEffect(() => {
  //     setName(props.name || '')
  //     setEmail(props.email || '')
  //     setPhone(props.phone || '')
  //     setAddress(props.address || '')
  //     setContactType(props.contactType || '')
  //   }, [isCurrentContact])

  const handleSubmit = (event) => {
    event.preventDefault();
    setContactType(event.target.value);
  };
  const clearForm = () => {
    setAddress("");
    setName("");
    setContactType("");
    setEmail("");
    setPhone("");
  };

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

          const url = "https://univ-contact-book.herokuapp.com/api/contacts";
          fetchAPI(url, "POST", bodyObj)
            .then((response) => addNewContact(response.contact))
            // clearForm()
            .catch((error) => {
              console.log(error);
            });
          clearForm();
        }}
      >
        <h3>Create Contact</h3>
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
          <Select value={contactType} onChange={handleSubmit}>
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
          <Button type="submit"> Create+</Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
