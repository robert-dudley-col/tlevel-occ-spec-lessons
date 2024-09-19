import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Button,
    Card
} from 'react-bootstrap'
import axios from 'axios';

export default function Root(){
    const [sites, setSites] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        axios
        .get("http://localhost:3000/sites/")
        .then((res) =>{
            setSites(res.data)
            setIsLoaded(true)
        })
        .catch((err) => console.log(err))
    },[]);

    if(isLoaded)
    {
        return (
            <Container>
              <Row>
                <Col>
                    {
                        sites.map(site =>(
                            <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={site.image}/>
                            <Card.Body>
                                <Card.Title>{site.name}</Card.Title>
                                <Card.Text>{site.description}</Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                        ))
                    }
                </Col>
              </Row>
            </Container>
        );
    }

    
}