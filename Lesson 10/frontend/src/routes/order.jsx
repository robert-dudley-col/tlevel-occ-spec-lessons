import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Card,
    Table
} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import PageNavbar from '../components/navbar';
import axios from 'axios';

export default function Order(){

    const [order, setOrder] = useState({})
    const [loaded, setLoaded] = useState(false)
    let {orderid} = useParams();

    useEffect(() => {
        axios
        .get("http://localhost:3000/orders/"+orderid)
        .then((res) =>{
            setOrder(res.data)
            console.log(res.data)
            setLoaded(true)
        })
        .catch((err) => console.log(err))
    },[]);

    if(loaded)
    {
        return (
            <>
                <PageNavbar/>
                <Container fluid>
                    <Row>
                        <Col xs={4}></Col>
                        <Col xs={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Your Order at {order.site}
                                    </Card.Title>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order.items.map(item=>(
                                                    <tr>
                                                        <td><img src={item.image} style={{width:"100px"}}/></td>
                                                        <td>{item.name}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>£{item.price}</td>
                                                        <td>£{item.quantity * item.price}</td>
                                                    </tr>
                                                ))
                                            }
                                            
                                        </tbody>
                                    </Table>
                                    <Card.Text>
                                        Order Total: £{order.total} <br/>
                                        Ordered At: {new Date(order.timestamp).toLocaleString("UK")}
                                    </Card.Text> 
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={4}></Col>
                    </Row>
                </Container>
            </>
        );
    }
    
}