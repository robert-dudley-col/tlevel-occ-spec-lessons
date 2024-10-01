import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import PageNavbar from '../components/navbar';
import Cookies from 'js-cookie';
import axios from 'axios';
import OrderingTable from '../components/OrderingTable';
import Basket from '../components/Basket';

export default function Site(){

    const [siteData, setSiteData] = useState({})

    let {siteid} = useParams();
    
    var site = Cookies.get(site);

    if(site === undefined){
        Cookies.set("site",siteid)
    }
    if(site!==siteid){
        Cookies.set("site",siteid)
    }

    useEffect(() => {
        axios
        .get("http://localhost:3000/sites/"+siteid)
        .then((res) =>{
            setSiteData(res.data)
        })
        .catch((err) => console.log(err))
    },[]);

    
    return (
        <>
            <PageNavbar/>
            <Container>
                <Row>
                    <Col xs="2" style={{paddingTop:"10px"}}>
                        <Card>
                            <Card.Img src={siteData.image}/>
                            <Card.Body>
                                <Card.Title>You are shopping at: {siteData.name}</Card.Title>
                                <Card.Text>{siteData.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={{paddingTop:"10px"}}>
                        <OrderingTable/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Basket/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}