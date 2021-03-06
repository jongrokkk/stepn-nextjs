import { Button, Navbar, Container, Nav, Table, Card } from 'react-bootstrap'
import Header from './head/header.js'
import axios from 'axios';
import React, { useState, Component } from 'react';

function level_cost() {

    const custom_cost_cal = (i) => {
        let gst_amount = i;
        let gmt_amount = 0;
        if (i == 5) {
            gst_amount += 5;
            gmt_amount += 10;
        } else if (i == 10) {
            gst_amount += 20;
            gmt_amount += 30;
        } else if (i == 20) {
            gst_amount += 40;
            gmt_amount += 30;
        } else if (i == 29) {
            gmt_amount += 29;
        } else if (i == 30) {
            gst_amount += 70;
            gmt_amount += 100;
        }
        return [gst_amount, gmt_amount];
    }

    let td_array = [];
    let j = 0;
    for (let i = 1; i < 31; i++) {
        if (i == 5) {
            const td_color = "table-warning";
        } else {
            const td_color = "";
        }
        td_array.push(
            <tr className="">
                <td className="col-md-2">{i}</td>
                <td className="col-md-2">{i}</td>
                <td className="col-md-2">{i + j}</td>
                <td className="col-md-2">{custom_cost_cal(i)[0]}GST</td>
                <td className="col-md-2">{custom_cost_cal(i)[0]}GST + {custom_cost_cal(i)[1]}GMT</td>
            </tr>
        )
        j = i + j;
    }
    return td_array;
}
const custom_time_cal = (a, b) => {
    let f = parseInt(a) + 1;
    let duration = 0;

    for (let i = f; i <= b; i++) {
        duration += parseInt(i);
    }
    // timeConversion(c);
    // return c;
    const portions = [];
    const msInHour = 24;
    const hours = Math.trunc(duration / msInHour);
    if (hours >= 1) {
        portions.push(hours + '일');
        duration = duration - (hours * msInHour);
    }

    const msInMinute = 1;
    const minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
        portions.push(minutes + '');
        duration = duration - (minutes * msInMinute);
    }
    return portions.join(' ');
}

function Leveling_cal(props) {

    const { pay_data } = props;
    const gmt_sol = (pay_data.stepn.usd / pay_data.solana.usd).toFixed(3);
    const gst_sol = (pay_data['green-satoshi-token'].usd / pay_data.solana.usd).toFixed(3);

    const [data, setData] = useState({
        start_level: '',
        end_level: ''
    });
    const { start_level, end_level } = data;

    const handleChange = (e) => {  // <- input값으로 text 변경 함수
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        })
    };

    const custom_cost_cal = (a, b) => {
        let f = parseInt(a) + 1;
        let gst_amount = 0;
        let gmt_amount = 0;
        for (let i = f; i <= b; i++) {
            gst_amount += parseInt(i);
            if (i == 5) {
                gst_amount += 5;
                gmt_amount += 10;
            } else if (i == 10) {
                gst_amount += 20;
                gmt_amount += 30;
            } else if (i == 15) {
                gst_amount += 40;
                gmt_amount += 60;
            } else if (i == 29) {
                gmt_amount += 29;
            } else if (i == 30) {
                gst_amount += 70;
                gmt_amount += 100;
            }
        }
        return [gst_amount, gmt_amount, (gst_amount * gst_sol + gmt_amount * gmt_sol)];
    }
    function timeConversion(duration) {


        const portions = [];
        const msInHour = 24;
        const hours = Math.trunc(duration / msInHour);
        if (hours > 1440) {
            portions.push(hours + 'Days');
            duration = duration - (hours * msInHour);
        }

        const msInMinute = 1;
        const minutes = Math.trunc(duration / msInMinute);
        if (minutes > 0) {
            portions.push(minutes + 'H');
            duration = duration - (minutes * msInMinute);
        }

        console.log(portions);
        return portions.join(' ');
    }
    return (
        <>
            <Header></Header>
            <Container>
                <Card>
                    <Card.Body>
                        <h3>레벨업 계산기</h3>
                    </Card.Body>
                    <Table bordered size='md'>
                        <thead>
                            <tr>
                                <th>시작레벨</th>
                                <th>도달레벨</th>
                                <th>총 시간(시간)</th>
                                <th>총 비용(Gst/GMT)/(Sol)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="col-md-2"><input type="text" placeholder="시작레벨" name="start_level" onChange={handleChange} value={start_level} /></td>
                                <td className="col-md-2"><input type="text" placeholder="도달레벨" name="end_level" onChange={handleChange} value={end_level} /></td>
                                <td className="col-md-2">{custom_time_cal(data.start_level, data.end_level)}시간</td>
                                <td className="col-md-2">{custom_cost_cal(data.start_level, data.end_level)[0]}GST / {custom_cost_cal(data.start_level, data.end_level)[1]}GMT ({custom_cost_cal(data.start_level, data.end_level)[2].toFixed(2)})SOL</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </Container>
            <Container>
                <Card>
                    <Card.Body>
                        <h3>레벨업 비용</h3>
                        <Table bordered hover size='md'>
                            <thead>
                                <tr>
                                    <th>Level</th>
                                    <th>시간</th>
                                    <th>총 시간(h)</th>
                                    <th>비용</th>
                                    <th>총 비용</th>
                                </tr>
                            </thead>
                            <tbody>
                                {level_cost()}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
};
export async function getServerSideProps() {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=solana,stepn,green-satoshi-token&vs_currencies=usd");

    return {
        props: {
            pay_data: response.data,
        }
    }
}

export default Leveling_cal;