import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { ReactComponent as Logo} from "../images/logo.svg";

const Header = (props) => {
  // ({title})
  const { title } = props; //properties destruct
  const navStyle = {
    backgroundColor: "black",
  };
  console.log("Header comp render")

  return (
    <Navbar style={navStyle} variant="light">
      <Container>
        <Logo style={{maxWidth: '12rem', maxHeight: '3rem'}}/>
      </Container>
    </Navbar>
  );
};

export default Header;
