import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Tabs,
    Tab,
    Table,
    Button
} from 'react-bootstrap'
import axios from 'axios';
import Cookies from 'js-cookie';

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

    const AddToBasket = (event) => {
        var userid = Cookies.get("user");
        var item = event.currentTarget.parentNode.parentNode.id
        axios
        .post("http://localhost:3000/basket/item",{
            item:item,user:userid
        }).then((res)=>{
            console.log(res.data)
        })
    }
    
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
                                <tr id={drink._id} key={drink._id}>
                                    <td><img src={drink.image} style={{width:"100px"}}/></td>
                                    <td>{drink.name}</td>
                                    <td>£{drink.price}</td>
                                    <td><Button onClick={AddToBasket}>Add to Basket</Button></td>
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