import { Button, Navbar, Container, Nav, Table } from 'react-bootstrap'
import Header from './head/header.js'
import axios from 'axios';


function minting(props) {

    const { data } = props;
    const bitcoin_usd = data.bitcoin.usd;
    const sol_usd = data.solana.usd;
    const gmt_usd = data.stepn.usd;
    const gst_usd = data['green-satoshi-token'].usd;

    const gmt_sol = (data.stepn.usd / data.solana.usd).toFixed(3);
    const gst_sol = (data['green-satoshi-token'].usd / data.solana.usd).toFixed(3);
    // console.log(data.stepn.usd);
    // console.log(data['green-satoshi-token'].usd);
    return (
        <>
            <Header></Header>
            <Container>
                <p>환율($) (Sol)</p>
                <Table striped bordered hover size='md'>
                    <thead>
                        <tr>
                            <th>BitCoin</th>
                            <th>Sol</th>
                            <th>Gmt (Sol)</th>
                            <th>Gst (Sol)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${data.bitcoin.usd}</td>
                            <td>${data.solana.usd}</td>
                            <td>${data.stepn.usd} ({(data.stepn.usd / data.solana.usd).toFixed(3)}Sol)</td>
                            <td>${data['green-satoshi-token'].usd} ({(data['green-satoshi-token'].usd / data.solana.usd).toFixed(3)}Sol)</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>

            <Container>
                <p>Mint 계산기</p>

                <p>~ 2민트</p>
                <Table striped bordered hover size='md'>
                    <thead>
                        <tr>
                            <th>렙업비용(20GST+10GMT)</th>
                            <th>GST + GMT (120/80)</th>
                            <th>ToTal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{(gst_sol * 20 + gmt_sol * 10).toFixed(2)}Sol</td>
                            <td>{(gst_sol * 120 + gmt_sol * 80).toFixed(2)}Sol</td>
                            <td>{((gst_sol * 20 + gmt_sol * 10) + (gst_sol * 120 + gmt_sol * 80)).toFixed(2)}Sol</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            <Container>
                <p>민팅 비율(오후 11시 변동)</p>
                <Table striped bordered hover size='md'>
                    <thead>
                        <tr>
                            <th>GST 달러</th>
                            <th>민팅비용(GST)</th>
                            <th>민팅비용(GMT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>~ $2</td>
                            <td>200GST</td>
                            <td>0GMT</td>
                        </tr>
                        <tr>
                            <td>$2 ~ $3</td>
                            <td>160GST</td>
                            <td>40GMT</td>
                        </tr>
                        <tr>
                            <td>$3 ~ $4</td>
                            <td>120GST</td>
                            <td>80GMT</td>
                        </tr>
                        <tr>
                            <td>$4 ~ $8</td>
                            <td>100GST</td>
                            <td>100GMT</td>
                        </tr>
                        <tr>
                            <td>$8 ~ $10</td>
                            <td>80GST</td>
                            <td>120GMT</td>
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
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana,stepn,green-satoshi-token&vs_currencies=usd");
    return {
        props: {
            data: response.data
        }
    }
}
export default minting;