import React, {useState} from 'react';
import {fetchAPI} from '../api';
import{Button} from "@material-ui/core"


const NewComment = (props) => {
    const { contact, newComment } = props;
    const [content, setMessage] = useState("");

    return <form style={{"height": "200px", "width": "200px","display": "flex", "flexWrap": "wrap"}}
          className="comment-form"
          onSubmit={(event) => {
            event.preventDefault();
    
            const dataObj = {
              content,
            };
    
            const url = `https://univ-contact-book.herokuapp.com/api/contacts/${contact.id}/comments`;
    
            fetchAPI(url, "POST", dataObj)
              .then((response) => {
                newComment(contact, response.comment);
                setMessage("");
              })
              .catch(console.error);
          }}
        >
          <h4>Create New Comment for {contact.name}</h4>
          <input
            type="text"
            placeholder="Your comment..."
            value={content}
            onChange={(event) => setMessage(event.target.value)}
          />
          <Button type="submit">SUBMIT</Button>
        </form>
      
    };
    







export default NewComment;