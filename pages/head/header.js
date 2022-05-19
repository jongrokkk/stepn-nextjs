import { Button, Navbar, Container, Nav, Table } from 'react-bootstrap'

function header() {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand href="#home">Stepn</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="./minting_cal">민팅비계산</Nav.Link>
                    <Nav.Link href="./shoebox_pro">슈박스확률</Nav.Link>
                    <Nav.Link href="./leveling_cal">레벨업비용</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default header