import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Tabs,
    Tab,
    Table,
    Button
} from 'react-bootstrap'
import axios from 'axios';

export default function OrderingTable(){
    const [drinks, setDrinks] = useState([])


    useEffect(() => {
        axios
        .get("http://localhost:3000/products/drinks")
        .then((res) =>{
            setDrinks(res.data)
        })
        .catch((err) => console.log(err))
    },[]);
    
    return (
        <Tabs
            id="products-tab"
            className="mb-3"
        >
            <Tab eventKey="drinks" title="Drinks">
                <Table striped>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Add to Basket</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            drinks.map(drink =>(
                                <tr key={drink._id}>
                                    <td><img src={drink.image} style={{width:"100px"}}/></td>
                                    <td>{drink.name}</td>
                                    <td>£{drink.price}</td>
                                    <td><Button>Add to Basket</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Tab>
            <Tab eventKey="food" title="Food">
                Tab content for food
            </Tab>
        </Tabs>
    );
}