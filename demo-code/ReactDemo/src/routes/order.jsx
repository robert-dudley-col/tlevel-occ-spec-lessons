import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container
} from 'react-bootstrap';
import { useParams  } from 'react-router-dom';
import PageNavbar from '../components/navbar';
import axios from 'axios';

export default function Order(){
    const [order, setOrder] = useState({});
    const [isLoaded, setisLoaded] = useState(false);
    let {orderid} = useParams();

    useEffect(() => {
        //add axios here
    },[])

    if(isLoaded)
    {
        return(
            <>
                <PageNavbar/>
                <Container fluid>
                    {
                        //order.site = the name of the site where the order was made
                    }
                </Container>
            </>
        )
    }
}