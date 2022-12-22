import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <Container className="mt-5 pt-lg-3">
            {/* <Row className="justify-content-center my-lg-5 my-3">
                <Col xs="auto"><Link to="/">Mint</Link></Col>
                <Col xs="auto"><Link to="/info">Info</Link></Col>
                <Col xs="auto"><Link to="/collection">Collection</Link></Col>
            </Row> */}
            <Row className="justify-content-center">
                <Col xs="auto" className="my-lg-5 my-3 display-6 stroked-font">Powered By</Col>
            </Row>
            <Row className="justify-content-center align-items-center">
                <Col xs="auto" className="mx-lg-5 mx-3 mb-3"><a href="https://blocto.app" target="_blank" rel="noreferrer"><Image src="/assets/footer/logo-blocto.svg" /></a></Col>
                <Col xs="auto"className="mx-lg-5 mx-3 mb-3"><a href="https://graffle.io" target="_blank" rel="noreferrer"><Image src="/assets/footer/logo-graffle.png" /></a></Col>
                <Col xs="auto" className="mx-lg-5 mx-3 mb-5 mb-lg-3"><a href="https://find.xyz" target="_blank" rel="noreferrer"><Image src="/assets/footer/logo-find.svg" height="50" /></a></Col>
            </Row>
            <Row>
                <Col align="right"><span className="info-font">&copy;.find - whitelabel</span></Col>
            </Row>
        </Container>
    )
}