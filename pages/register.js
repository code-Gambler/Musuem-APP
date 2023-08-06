import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register(props){
    // Form field values within the "state"
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    // Error messages
    const [warning, setWarning] = useState('');
    // Initializing an instance of router
    const router = useRouter();

    // Function to handle form submissions
    async function handleSubmit(e) {
        e.preventDefault();
        try {
          await registerUser(user, password, password2);
          router.push('/login');
        } catch (err) {
          setWarning(err.message);
        }
    }

    return (
        <>
            <Card bg="light">
                <Card.Body>
                <h2>Register</h2>
                <p>Register for an account:</p>
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
                <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type="password" value={password2} id="password2" name="password2" onChange={e => setPassword2(e.target.value)} />
                </Form.Group>
                <br />
                <Button variant="dark" className="pull-right" type="submit">Register</Button><br /><br />
                <p className="form-text"><Link className="form-link" href="/login">Already have an account?</Link></p>
            </Form>
        </>
    );
}