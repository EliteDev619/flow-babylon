import { Col, Container, Image, Row } from "react-bootstrap";
import { MintSlider } from "../components/mintslider/mintslider";
import { useFormStatus } from "../functions/DisabledState";

export function Info() {
    return (
        <Container className="mt-lg-4 g-0 p-0">
            {/* <fieldset disabled={useFormStatus()}>
                <MintSlider />
            </fieldset> */}
            <Row className="justify-content-center my-5 py-lg-5">
                <Col xs={{ order: 'last' }} lg={{ span: 5, offset: 0, order: 'first' }} className="my-auto">
                    <h1>Another heading</h1>
                    <p>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Col>
                <Col lg={{ span: 5, offset: 1 }}>
                    <Image src="/assets/home/1.jpg" style={{ minWidth: "250px" }} fluid />
                </Col>
            </Row>
            <Row className="justify-content-center my-5 py-lg-5">
                <Col lg={{ span: 5, offset: 0 }}>
                    <Image src="/assets/home/2.jpg" style={{ minWidth: "250px" }} fluid />
                </Col>
                <Col lg={{ span: 5, offset: 1 }} className="my-auto">
                <h1>Another heading</h1>
                    <p>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Col>
            </Row>
        </Container>
    )
}