import React, { useState, useEffect } from "react";
import { fetchAPI } from "../api/index";
import ReactDom from "react-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Typography,
} from "@material-ui/core";

const ContactList = (props) => {
  const {
    contacts,
    setActiveContact,
    removeContact,
    addComment,
    removeComment,
  } = props;

  return (
    <div className="contact-list">
      {contacts.map((contact, idx) => {
        const { name, email, address, phoneNumber, contactType } = contact;

        return (
          <div style={{
              paddingLeft:"20px"
          }}>
            <Card
              style={{
                width: "275px",
                border: "1px solid grey"
              }}
            >
            <CardHeader style={{background: '#20639B' , color:"white"}} title="Contact Info"> 
           
            </CardHeader>
              <CardContent>
              
                <Typography color="textSecondary" gutterBottom>
                  {" "}
                  {name} ({contactType})
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {" "}
                  Address: {address}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {" "}
                  Email: {email}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {" "}
                  Phone Number: {phoneNumber}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small">Delete</Button>
              </CardActions>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;
