import { Button, Col, Container, Form, Image, Modal, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthCluster } from "../components/auth-cluster";
import { LoadingModule } from "../components/loading/loading";
import { handleInitUser, handleSendToAdr, handleSendPackToAdr } from "../functions/txfunctions";
import { replace } from "lodash";
import { OpenPack } from "../components/openpack/openpack";
import { useState } from "react";
import "../components/collection/collection.css"
import { changeState } from "../functions/DisabledState";

export function Collection({ hasCollection, user, collection }) {
    const [sendToAddress, setSendToAddress] = useState()
    let nameAdr
    let senderAdmin = "0x12345678901234"

    if (hasCollection && collection && collection.profile) {
        nameAdr = collection.profile?.findName !== "" ? collection.profile.findName : collection.profile.address
    } else {
        nameAdr = user.addr
    }

    function handleSendItem(packId) {
        handleSendToAdr(sendToAddress, packId)
        setSendToAddress()
    }

    function handleSendPack(packId) {
        handleSendPackToAdr(sendToAddress, packId)
        setSendToAddress()
    }

    async function initUser() {
        await handleInitUser()
        changeState()
    }

    function RevealModal({ id, imgUrl }) {
        const [show, setShow] = useState
            (false);

        const handleClose = () => {
            changeState()
            setShow(false);
        }
        const handleShow = () => {
            setShow(true);
        }

        return (
            <>
                <Row><Col><Image src={imgUrl} fluid /></Col></Row>
                <Row className="mt-3"><Col align="center"><Button onClick={handleShow} variant="wl">Open Pack</Button></Col></Row>
                <Modal id="reveal-modal" show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body><OpenPack id={id} /></Modal.Body>
                </Modal>
            </>
        );
    }
    //check that the user is logged in, has a collection and has at least a single pack or NFT.
    if (user.loggedIn) {
        if (hasCollection) {
            if (collection?.lampionsPack.length > 0 || collection?.lampions.length > 0) {
                return (
                    <Container>
                        <Row className="justify-content-center">
                            <Col align="center"><h1>Your Collection</h1></Col>
                        </Row>
                        <Row className="mt-5">
                            {/* Iterate through the packs and display them */}
                            {collection.lampionsPack.map((pack, i) => {
                                return (<Col key={i + "packCol"} lg="4" md="6" className="mb-3">
                                    <RevealModal id={pack.id} imgUrl={"" + replace(pack.image, "ipfs://", "https://find.mypinata.cloud/ipfs/")} />
                                    {/* this is only needed if you want the option to send packs/items to other addresses */}
                                    {collection.profile.address === senderAdmin && <div align="center" className="my-3"><Button variant="wl" onClick={() => handleSendPack(pack.id)}>Send Pack</Button><Form.Control className="my-3" style={{ backgroundColor: "black !important" }} placeholder="Enter 0x address to send" onChange={(e) => setSendToAddress(e.target.value)} /></div>}
                                </Col>)
                            })}
                            {/* Iterate through the items and display them */}
                            {collection.lampions.map((pack, i) => {
                                return (<Col key={i} lg="4" md="6" className="mb-3">
                                    <Card bg="dark">
                                        <Card.Header>{pack.name + " " + pack.serial + "/" + pack.maxSerial}</Card.Header>
                                        <Card.Body>
                                            <Link to={"/collection/" + nameAdr + "/" + pack.id}><Image src={"" + replace(pack.thumbnail, "ipfs://", "https://find.mypinata.cloud/ipfs/")} fluid /></Link>
                                            {/* this is only needed if you want the option to send packs/items to other addresses */}
                                            {collection.profile.address === senderAdmin && <div align="center" className="my-3"><Button variant="wl" onClick={() => handleSendItem(pack.nftId)}>Send NFT</Button><Form.Control className="my-3" style={{ backgroundColor: "black !important" }} placeholder="Enter 0x address to send" onChange={(e) => setSendToAddress(e.target.value)} /></div>}

                                        </Card.Body>
                                    </Card>
                                </Col>)
                            })}
                        </Row>
                        <Row>
                            <Col>
                            </Col>
                        </Row>
                    </Container>
                )
            }
            if (collection?.lampionsPack.length === 0 && collection?.lampions.length === 0) {
                return (
                    <Container>
                        <Row className="justify-content-center">
                            <Col align="center"><h1>Your Collection</h1></Col>
                        </Row>
                        <Row className="mt-5">
                            <Col className="mb-3">This collection is empty</Col>
                        </Row>
                    </Container>
                )
            }
        } else {
            //the user has no collection
            return (
                <Container>
                    <Row className="justify-content-center">
                        <Col align="center"><h1>You need to initialise your collection.</h1></Col>
                    </Row>
                    <Row className="mt-5">
                        <Button variant="wl" onClick={() => initUser()}>Initialise Collection</Button>
                    </Row>
                </Container>
            )
        }
    }
    else {
        //the user is not logged in
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col align="center"><h1>You are currently logged out</h1></Col>
                </Row>
                <Row className="mt-5">
                    <Col align="center"><AuthCluster user={user} /></Col>

                </Row>
            </Container>
        )
    }
    //default return until a condition is met.
    return (
        <LoadingModule />
    )

}
