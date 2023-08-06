import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { getHistory, getFavourites } from "@/lib/userData";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import Link from "next/link";

export default function Login(props){
    // Form field values within the "state"
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    // Error messages
    const [warning, setWarning] = useState('');
    // References to atoms
    const [ favouritesList, setFavouritesList ] = useAtom(favouritesAtom);
    const [ searchHistory, setSearchHistory ] = useAtom(searchHistoryAtom);
    // Initializing an instance of router
    const router = useRouter();

    // Function to update the atoms in our store before redirecting the user
    async function updateAtoms() {
        setFavouritesList(await getFavourites()); 
        setSearchHistory(await getHistory());
    }    

    // Function to handle form submissions
    async function handleSubmit(e) {
        e.preventDefault();
        try {
          await authenticateUser(user, password);
          await updateAtoms();
          router.push('/favourites');
        } catch (err) {
          setWarning(err.message);
        }
    }

    return (
        <>
            <Card bg="light">
                <Card.Body>
                <h2>Login</h2>
                <p>Enter your login information below:</p>
                { warning && ( <><br /><Alert variant="danger">{warning}</Alert></> )}
                </Card.Body>
            </Card>
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>User:</Form.Label>
                    <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <br />
                <Button variant="dark" className="pull-right" type="submit">Login</Button><br /><br />
                <p className="form-text"><Link className="form-link" href="/register">Don&lsquo;t have an account?</Link></p>
            </Form>
        </>
    );
}