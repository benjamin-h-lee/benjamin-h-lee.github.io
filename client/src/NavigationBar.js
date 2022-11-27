import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationBar = (props) => {
    const PAGES = ["Home", "Interests"];


    const setPage = props.setPage;

    return (
        <Navbar sticky="top" bg="light" expand="md">
            <Container>
                <Navbar.Brand onClick={() => {setPage(PAGES[0]);}}>Benjamin Lee</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar" />
                <Navbar.Collapse id="navbar">
                    <Nav>
                        {
                            PAGES.map( (page) => {
                                return (
                                <Nav.Link onClick={() => {setPage(page);}}
                                          key={page}>
                                    {page}
                                </Nav.Link>
                                )
                            })
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;