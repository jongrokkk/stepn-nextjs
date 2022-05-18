import { Button, Navbar, Container, Nav, Table } from 'react-bootstrap'

function header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Container>
                <Navbar.Brand href="#home">Stepn</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="./minting">민팅비계산</Nav.Link>
                    <Nav.Link href="#features">잡동사니</Nav.Link>
                    <Nav.Link href="#pricing">각종정보</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default header