import React from "react";
import { Jumbotron, Button } from "react-bootstrap";

const Welcome = () => {
    return(
        <Jumbotron>
            <h1>Image Gallery</h1>
            <p>
                This is a simple application which is developed using React in the frontend and Python Flask in the backend.
                This application uses Unsplash API to retrive photos. To get started type a word in the search box. 
            </p>
            <p>
            <Button variant="primary" href="https://unsplash.com" target="_blank">Learn more</Button>
            </p>
        </Jumbotron>
    )
}

export default Welcome