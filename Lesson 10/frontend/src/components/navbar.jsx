import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Nav,
    Navbar,
    OverlayTrigger,
    Popover
} from 'react-bootstrap'
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Basket from './Basket';

export default function PageNavbar(){
    const navigate = useNavigate();
    const [user, setUser] = useState({})

    useEffect(() => {
        var userId = Cookies.get("user")
        axios
        .get("http://localhost:3000/users/"+userId+"/email")
        .then((res) =>{
            setUser(res.data)
        })
        .catch((err) => {
            navigate("/login");
        })

        
    },[]);


    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Bean and Brew Coffee</Navbar.Brand>
                <Nav.Link href='/staff'>
                    Staff Page
                </Nav.Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">    
                    
                    <Navbar.Text>
                        Signed in as: <a href="#login">{user.email}</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
    
}