import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Header = (props) => {
  // ({title})
  const { title } = props; //properties destruct
  const navStyle = {
    backgroundColor: "lightblue",
  };
  console.log("Header comp render")

  return (
    <Navbar style={navStyle} variant="light">
      <Container>
        <Navbar.Brand href="/">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
