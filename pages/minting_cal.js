import { Button, Navbar, Container, Nav, Table, Card } from 'react-bootstrap'
import Header from './head/header.js'
import axios from 'axios';


function minting_cal(props) {

    const { data, data_usd } = props;
    const bitcoin_usd = data.bitcoin.usd;
    const sol_usd = data.solana.usd;
    const gmt_usd = data.stepn.usd;
    const gst_usd = data['green-satoshi-token'].usd;

    const gmt_sol = (data.stepn.usd / data.solana.usd).toFixed(3);
    const gst_sol = (data['green-satoshi-token'].usd / data.solana.usd).toFixed(3);
    // console.log(data.stepn.usd);
    // console.log(data['green-satoshi-token'].usd);

    const gst_amount = 160;
    const gmt_amount = 40;
    const floor_price = 12.4;

    const krw_usd = data_usd[0].basePrice;

    return (
        <>
            <Header></Header>
            <Container>
                <Card>
                    <Card.Body>
                        <h3>환율($) (Sol)</h3>
                        <hr />
                        <Table bordered hover size='md'>
                            <thead>
                                <tr>
                                    <th>BitCoin</th>
                                    <th>Sol</th>
                                    <th>Gmt (Sol)</th>
                                    <th>Gst (Sol)</th>
                                    <th>1달러 환율</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="col-md-2">${data.bitcoin.usd.toLocaleString(3)}</td>
                                    <td class="col-md-2">${data.solana.usd}</td>
                                    <td class="col-md-2">${data.stepn.usd} ({(data.stepn.usd / data.solana.usd).toFixed(3)}Sol)</td>
                                    <td class="col-md-2">${data['green-satoshi-token'].usd} ({(data['green-satoshi-token'].usd / data.solana.usd).toFixed(3)}Sol)</td>
                                    <td class="col-md-2">\{krw_usd.toLocaleString(3)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
            <Container>
                <Card>
                    <Card.Body>
                        <h3>Mint 계산기</h3>
                        <hr />
                        <h5>~ 2민트</h5>
                        <Table bordered hover size='md'>
                            <thead>
                                <tr>
                                    <th class="col-md-2">렙업비(20GST+10GMT)</th>
                                    <th class="col-md-2">민팅비({gst_amount}GST + {gmt_amount}GMT)</th>
                                    <th class="col-md-2">ToTal</th>
                                    <th class="col-md-2">바닥가</th>
                                    <th class="col-md-2">손익(\)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{(gst_sol * 20 + gmt_sol * 10).toFixed(2)}Sol</td>
                                    <td>{(gst_sol * gst_amount + gmt_sol * gmt_amount).toFixed(2)}Sol</td>
                                    <td>{((gst_sol * 20 + gmt_sol * 10) + (gst_sol * gst_amount + gmt_sol * gmt_amount)).toFixed(2)}Sol</td>
                                    <td>{floor_price}Sol</td>
                                    <td>{(floor_price - ((gst_sol * 20 + gmt_sol * 10) + (gst_sol * gst_amount + gmt_sol * gmt_amount))).toFixed(2)}Sol (\{((floor_price - ((gst_sol * 20 + gmt_sol * 10) + (gst_sol * gst_amount + gmt_sol * gmt_amount))) * sol_usd * 1200).toLocaleString(undefined, { maximumFractionDigits: 0 })})</td>
                                </tr>
                            </tbody>
                        </Table>
                        <h5>3민트</h5>
                        <Table bordered hover size='md'>
                            <thead>
                                <tr>
                                    <th class="col-md-2">렙업비(0)</th>
                                    <th class="col-md-2">민팅비({gst_amount * 1.5}GST + {gmt_amount * 1.5}GMT)</th>
                                    <th class="col-md-2">ToTal</th>
                                    <th class="col-md-2">바닥가</th>
                                    <th class="col-md-2">손익(\)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>0Sol</td>
                                    <td>{(gst_sol * gst_amount * 1.5 + gmt_sol * gmt_amount * 1.5).toFixed(2)}Sol</td>
                                    <td>{(gst_sol * gst_amount * 1.5 + gmt_sol * gmt_amount * 1.5).toFixed(2)}Sol</td>
                                    <td>15.4Sol</td>
                                    <td>{(12.4 - ((gst_sol * 20 + gmt_sol * 10) + (gst_sol * 120 + gmt_sol * 80))).toFixed(2)}Sol (\{((12.4 - ((gst_sol * 20 + gmt_sol * 10) + (gst_sol * 120 + gmt_sol * 80))) * sol_usd * 1200).toLocaleString(undefined, { maximumFractionDigits: 0 })})</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
            <Container>
                <Card>
                    <Card.Body>
                        <h3>민팅 비율(오후 11시 변동)</h3>
                        <hr />
                        <Table bordered hover size='md'>
                            <thead>
                                <tr>
                                    <th class="col-md-4">GST 달러</th>
                                    <th class="col-md-4">민팅비용(GST)</th>
                                    <th class="col-md-4">민팅비용(GMT)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>~ $2</td>
                                    <td>200GST</td>
                                    <td>0GMT</td>
                                </tr>
                                <tr class="table-warning">
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
                    </Card.Body>
                </Card>
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

    const response_usd = await axios.get("https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD");

    console.log('1');
    console.log(response_usd.data);
    return {
        props: {
            data: response.data,
            data_usd: response_usd.data
        }
    }
}
export default minting_cal;