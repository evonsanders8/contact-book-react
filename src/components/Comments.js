import React from "react";
import { fetchAPI } from "../api";
import { Button, CardContent } from "@material-ui/core";

const CommentSection = (props) => {
  const { comments, contact, deleteComment } = props;

  return comments.length ? (
    <CardContent
      className="comment-list"
      style={{ height: "150px", width: "200px" }}
    >
      <h4>Comments for {contact.name}</h4>
      {comments.map((comment, idx) => {
        return (
          <CardContent key={idx} className="comment">
            <p>{comment.content}</p>
            <Button
              onClick={() => {
                fetchAPI(
                  `https://univ-contact-book.herokuapp.com/api/comments/${comment.id}`,
                  "DELETE"
                )
                  .then((data) => {
                    deleteComment(contact, comment);
                  })
                  .catch(console.error);
              }}
            >
              DELETE
            </Button>
          </CardContent>
        );
      })}
    </CardContent>
  ) : null;
};

export default CommentSection;
