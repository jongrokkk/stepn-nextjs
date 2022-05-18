import { Button, Navbar, Container, Nav, Table } from 'react-bootstrap'
import Header from './head/header.js'
import axios from 'axios';


function minting(props) {

    const { data } = props;

    // console.log(data.stepn.usd);
    // console.log(data['green-satoshi-token'].usd);
    return (
        <>
            <Header></Header>
            <Container>
                <p>환율($)</p>
                <Table striped bordered hover size='md'>
                    <thead>
                        <tr>
                            <th>BitCoin</th>
                            <th>Gmt</th>
                            <th>Gst</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.bitcoin.usd}</td>
                            <td>{data.stepn.usd}</td>
                            <td>{data['green-satoshi-token'].usd}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>

            <Container>
                <p>Mint 계산기</p>
                <Table striped bordered hover size='md'>
                    <thead>
                        <tr>
                            <th>BitCoin</th>
                            <th>Gmt</th>
                            <th>Gst</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.bitcoin.usd}</td>
                            <td>{data.stepn.usd}</td>
                            <td>{data['green-satoshi-token'].usd}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>

            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td></td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table> */}
        </>
    )
}

export async function getServerSideProps() {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,stepn,green-satoshi-token&vs_currencies=usd");
    return {
        props: {
            data: response.data
        }
    }
}
export default minting;