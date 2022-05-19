import { Button, Navbar, Container, Nav, Table, Card } from 'react-bootstrap'
import Header from './head/header.js'
import axios from 'axios';


function level_cost() {

    let td_array = [];
    let j = 0;
    for (let i = 1; i < 30; i++) {

        td_array.push(
            <tr>
                <td class="col-md-2">{i}</td>
                <td class="col-md-2">{i + j}</td>
                <td class="col-md-2">{i}</td>
                <td class="col-md-2">{i}</td>
                <td class="col-md-2">{i}</td>
            </tr>
        )
        j = i + j;
    }
    return td_array;
}
function leveling_cal() {
    return (
        <>
            <Header></Header>
            <Container>
                <Card>
                    <Card.Body>
                        <h3>레벨업 비용</h3>
                    </Card.Body>
                    <Table bordered hover size='md'>
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>시간</th>
                                <th>총 시간</th>
                                <th>비용</th>
                                <th>총 비용</th>
                            </tr>
                        </thead>
                        <tbody>
                            {level_cost()}
                        </tbody>
                    </Table>
                </Card>
            </Container>
        </>
    )
};


export default leveling_cal;