import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import{
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    Table
} from 'react-bootstrap';
import { useParams } from "react-router-dom";
import PageNavbar from "../components/navbar";
import axios from "axios";

export default function OrderStaff()
{
    const [order, setOrder] = useState({});
    const [orderLoaded, setOrderLoaded] = useState(false);
    const [statuses, setStatuses] = useState([]);
    const [statusesLoaded, setStatusesLoaded] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(undefined);
    let {orderid} = useParams();

    useEffect(()=>{
        axios
        .get('http://localhost:3000/orders/'+orderid)
        .then((res)=>{
            setOrder(res.data);
            setOrderLoaded(true);
        })
    },[orderid])

    useEffect(()=>{
        axios
        .get('http://localhost:3000/orders/statuses')
        .then((res) =>{
            setStatuses(res.data);
            setStatusesLoaded(true);
        })
    },[])

    const SetStatus = (event) =>{
        setSelectedStatus(statuses[event.target.selectedIndex].status)
    }

    const ChangeStatus = (event) =>{
        event.preventDefault();

        axios
        .put('http://localhost:3000/orders/'+orderid+'/status',
            {status:selectedStatus}
        )
        .then((res)=>{
            setOrder(res.data)
        })
    }

    if(statusesLoaded && orderLoaded)
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
                                        Order for {order.site}
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
                                                order.items.map(item =>(
                                                    <tr key={item.name}>
                                                        <td><img src={item.image} style={{width:"100px"}} /></td>
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
                                        Ordered at: {new Date(order.timestamp).toLocaleString('UK')} <br/>
                                        Order Status: {order.status}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Change Order Status</Card.Title>
                                    <Form onSubmit={ChangeStatus}>
                                        <Form.Group>
                                            <Form.Label>Select new status</Form.Label>
                                            <Form.Select onChange={SetStatus}>
                                                {
                                                    statuses.map(status =>(
                                                        <option key={status._id}>{status.description}</option>
                                                    ))
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
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