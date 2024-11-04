import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    Table
} from 'react-bootstrap';
import { useParams  } from 'react-router-dom';
import PageNavbar from '../components/navbar';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function OrdersSites(){
    const [sitesLoaded, setSitesLoaded] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [sites, setSites] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() =>{
        axios
        .get('http://localhost:3000/sites')
        .then((res)=>{
            setSites(res.data);
            setSitesLoaded(true);
        })
    },[])

    useEffect(() =>{
        if(sitesLoaded)
        {
            axios
            .get('http://localhost:3000/orders/site/'+sites[0]._id)
            .then((res) => {
                setOrders(res.data);
                setLoaded(true);
            })
        }
    },[sitesLoaded,sites])

    const handleChange = (event) => {
        axios
        .get('http://localhost:3000/orders/site/'+sites[event.target.selectedIndex]._id)
        .then((res) => {
            setOrders(res.data)
        })
    }

    if(loaded)
    {
        return(
            <>
                <PageNavbar/>
                <Container fluid>
                    <Col xs={3}></Col>
                    <Col xs={6}>
                        <Card>
                            <Card.Title>Orders</Card.Title>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>Select Site</Form.Label>
                                    <Form.Select onChange={handleChange}>
                                        {
                                            sites.map(site =>(
                                                <option key={site._id}>{site.name}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Date and Time</th>
                                            <th>Total</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map(order => (
                                                <tr key={order.id}>
                                                    <td>{new Date(order.timestamp).toLocaleString("UK")}</td>
                                                    <td>£{order.total}</td>
                                                    <td><Button href={'/orders/'+order.id}>View Order</Button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={3}></Col>
                </Container>
            </>
        )
    }
}