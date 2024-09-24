import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Navbar,
} from 'react-bootstrap'

export default function PageNavbar(){
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Bean and Brew Coffee</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <a href="#login">user</a>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}