import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import
{
    Col,
    Container,
    Row,
    Card,
    Button
} from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Sites(){

    const [sites, setSites] = useState([])
    const navigate = useNavigate();


    useEffect(() => {
        axios
        .get('http://127.0.0.1:3000/sites')
        .then((res) => {
            setSites(res.data)
        })
        .catch((error) => console.log(error))
    },[]) // <---- please add this


    const selectSite = (site) =>{
        Cookies.set('site',site)
        navigate('/')
    }

    return(
        <>
            <Container style={{height:"100vh"}} className='d-flex align-items-center justify-content-center' fluid>
                <Row>
                    {
                        sites.map(site =>(
                            <Col xs='4'>
                                <Card>
                                    <Card.Img variant='top' src={site.image}/>
                                    <Card.Body>
                                        <Card.Title>{site.name}</Card.Title>
                                        <Card.Text>{site.description}</Card.Text>
                                        <Button onClick={() => selectSite(site._id)} variant="primary">Select Site</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
    
}