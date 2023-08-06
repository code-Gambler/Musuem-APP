import React from "react";
import { Container } from 'react-bootstrap';
import MainNav from "./MainNav";

export default function Layout(props) {
    return (
        <>
            <MainNav />
            <br />
            <Container>
                {props.children}
            </Container>
            <br />
        </>
    );
}