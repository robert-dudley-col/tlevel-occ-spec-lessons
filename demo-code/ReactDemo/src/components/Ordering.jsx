import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import {
    Button,
    Card,
    Tab,
    Table,
    Tabs
} from 'react-bootstrap';
import Cookies from 'js-cookie';

export default function Ordering(){
    const [isLoaded, setisLoaded] = useState(false);
    const [drinks, setDrinks] = useState([]);
    const [foods, setFood] = useState([])
    const [basket, setBasket] = useState([])

    useEffect(() =>{
        var user = Cookies.get('token');
        axios
        .get('http://127.0.0.1:3000/products/drinks')
        .then((res) => {
            setDrinks(res.data);
        }).then(()=>{
            axios.get('http://127.0.0.1:3000/products/food')
            .then((res)=>{
                setFood(res.data);
            }).then(() => {
                axios.get('http://127.0.0.1:3000/basket?user='+user)
                .then((res)=>{
                    setBasket(res.data)
                    setisLoaded(true);
                })
            })
        })
        .catch((error) => console.log(error))
    },[]);

    const AddToBasket = (item) =>{
        var userid = Cookies.get('token');
        axios
        .post('http://localhost:3000/basket/item',{
            item:item,user:userid
        }).then((res) =>{
            setBasket(res.data)
        })
    }

    if(isLoaded)
    {
        return(
            <>
                <Tabs
                    defaultActiveKey="drinks"
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
                                    drinks.map(drink => (
                                        <tr>
                                            <td><img src={drink.image} style={{width:"100px"}}/></td>
                                            <td>{drink.name}</td>
                                            <td>£{drink.price}</td>
                                            <td><Button onClick={() => {AddToBasket(drink._id)}}>Add to Basket</Button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="food" title="Food">
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
                                    foods.map(food => (
                                        <tr>
                                            <td><img src={food.image} style={{width:"100px"}}/></td>
                                            <td>{food.name}</td>
                                            <td>£{food.price}</td>
                                            <td><Button onClick={() => {AddToBasket(food._id)}}>Add to Basket</Button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
                <Card>
                    <Card.Title>Basket</Card.Title>
                    <Card.Body>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Item</th>
                                    <th>Quanity</th>
                                    <th>Total</th>
                                    <th>Remove from basket</th>
                                </tr>
                            </thead>
                            {
                                basket.items.map((item) =>(
                                    <tbody>
                                        <tr>
                                            <td><img src={item.image} style={{width:"100px"}}/></td>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.quantity * item.price}</td>
                                            <td><Button variant="danger">Remove from Basket</Button></td>
                                        </tr>
                                    </tbody>
                                ))
                            }
                        </Table>
                        <Card.Text>
                            Basket total: £{basket.total}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    }
}