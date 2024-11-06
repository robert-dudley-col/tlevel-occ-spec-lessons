import {useState, useEffect} from 'react';
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

export default function Order(){
    const [order, setOrder] = useState({});
    const [isLoaded, setisLoaded] = useState(false);
    let {orderid} = useParams();
    var userid = Cookies.get('token');

    useEffect(() => {
        axios
        .get('http://localhost:3000/orders/'+orderid)
        .then((res) => {
            setOrder(res.data);
            setisLoaded(true);
        })
        .catch((err) => console.log(err))
    },[orderid])

    if(isLoaded)
    {
        return(
            <>
                <PageNavbar/>
                <Container fluid>
                    <Row>
                        <Col xs={4}></Col>
                        <Col xs={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        Your order at {order.site}
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
                                                    <tr key={item.name}>
                                                        <td><img src={item.image} style={{width:"100px"}}/></td>
                                                        <td>{item.name}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>£{item.price}</td>
                                                        <td>£{item.price * item.quantity}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                    <Card.Text>
                                        Order Total: £{order.total} <br/>
                                        Ordered at: {new Date(order.timestamp).toLocaleString("UK")}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Title>View All Your Orders</Card.Title>
                                <Card.Body>
                                    <Button href={'/orders/user/'+userid}>View your orders</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={4}></Col>
                    </Row>
                </Container>
            </>
        )
    }
}