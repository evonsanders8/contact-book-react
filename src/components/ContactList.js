import React, { useState, useEffect } from "react";
import { fetchAPI } from "../api/index";
import ReactDom from "react-dom";
import CommentSection from "./Comments"
import NewComment from "./AddComment"
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
    setCurrentContact,
    removeContact,
    newComment,
    deleteComment,
  } = props;

  return (
    <div className="contact-list" style={{}}>
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
                <Button size="small"
                onClick={() => setCurrentContact(contact)}>Edit</Button>
                <Button size="small" 
                onClick={() => {
                  fetchAPI(
                    `https://univ-contact-book.herokuapp.com/api/contacts/${contact.id}`,
                    "DELETE"
                  )
                    .then((data) => {
                      removeContact(contact);
                    })
                    .catch(console.error);
                }}>Delete</Button>
                
              </CardActions>
              <CommentSection
              contact={contact}
              comments={contact.comments}
              deleteComment={deleteComment}
            />
            <NewComment contact={contact} newComment={newComment} />
        
            </Card>
          </div>
          
        );
      })}
    </div>
  );
};

export default ContactList;
