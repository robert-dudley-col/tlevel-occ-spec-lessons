import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Card,
    Col,
    Container,
    Row,
    Table
} from 'react-bootstrap';
import { useParams  } from 'react-router-dom';
import PageNavbar from '../components/navbar';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function OrdersUser(){
    let {userid} = useParams();
    const [orders, setOrders] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() =>{
        axios
        .get('http://localhost:3000/orders/user/'+userid)
        .then((res) =>{
            setOrders(res.data);
            setIsLoaded(true);
        });
    },[userid])

    if(isLoaded)
    {
        return(
            <>
                <PageNavbar/>
                <Container fluid>
                    <Row>
                    <Col xs={3}></Col>
                    <Col xs={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Your Orders</Card.Title>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Site</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map(order => (
                                                <tr key={order.id}>
                                                    <td>{new Date(order.timestamp).toLocaleString("UK")}</td>
                                                    <td>{order.site}</td>
                                                    <td>£{order.total}</td>
                                                    <td>{order.status}</td>
                                                    <td><Button href={'/order/'+order.id}>View Order</Button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>                           
                        </Card>
                    </Col>
                    <Col xs={3}></Col>
                    </Row>
                </Container>
            </>
        )
    }
}