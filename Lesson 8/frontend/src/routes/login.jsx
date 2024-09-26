import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Alert
} from 'react-bootstrap'
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [inputs, setInputs] = useState({});
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        var email = inputs.email;
        var password = inputs.password
        axios
        .post('http://localhost:3000/users/login',{
            email:email, password:password
        }).then((res) =>{
            console.log(res.data)
            if(res.data.cookie !== undefined)
            {
                Cookies.set("user",res.data.cookie)
                navigate("/");
            }
            
        }).catch((error) =>{
            console.log(error)
            setShow(true);
            setMessage(error.response.data.error)
        })
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    
    return (
        <>
            <Container>
                <Row>
                    <Col xs="2" style={{paddingTop:"10px"}}></Col>
                    <Col style={{paddingTop:"10px"}}>
                    <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>Oh no!</Alert.Heading>
                        <p>
                        {message}
                        </p>
                    </Alert>
                        <Card>
                            <Card.Body>
                                <Card.Title>Login</Card.Title>
                                <Card.Text>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" name="email" required onChange={handleChange}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control name='password' type="password" placeholder="Password" required onChange={handleChange}/>
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs="2" style={{paddingTop:"10px"}}></Col>
                </Row>
            </Container>
        </>
    );
}