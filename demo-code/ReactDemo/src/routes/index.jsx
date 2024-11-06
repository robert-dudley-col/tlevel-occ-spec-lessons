import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Col,
    Container,
    Row,
    Card
} from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import PageNavbar from '../components/navbar';
import Ordering from '../components/Ordering';

export default function Index(){

    const [site, setSite] = useState({});

    useEffect(()=>{
        var siteid = Cookies.get('site');
        axios
        .get('http://127.0.0.1:3000/sites/'+siteid)
        .then((res) =>{
            setSite(res.data)
        })
        .catch((err) => console.log(err))
    },[])
    
    return(
        <>
            <PageNavbar/>
            <Container>
                <Row style={{paddingTop:"10px"}}>
                    <Col xs={3}>
                        <Card>
                            <Card.Img src={site.image}/>
                            <Card.Body>
                                You are shopping at {site.name}.<br/>
                                {site.description}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={9}>
                        <Ordering/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}