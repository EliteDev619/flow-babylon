import { Col, Container, Row, Spinner } from "react-bootstrap";

//loading screen component

export function LoadingModule() {
    return(
        <Container>
            <Row><Col align="center"><h1>Loading</h1></Col></Row>
            <Row className="my-5">
                <Col align="center">
                    <Spinner animation="grow" variant="success" className="mx-2" />
                    <Spinner animation="grow" variant="danger" className="mx-2" />
                    <Spinner animation="grow" variant="warning" className="mx-2" />
                </Col>
            </Row>
        </Container>
    )
}