import { useEffect, useRef, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import GraffleSDK from "../../functions/graffle";
import { replace } from "lodash";
import { useFormStatus } from "../../functions/DisabledState";
import { handleRedeemPack } from "../../functions/txfunctions";

export function OpenPack({ id }) {
    const [displayImg, setDisplayImg] = useState()
    const [displayTxt, setDisplayTxt] = useState("Opening the pack - stay here")
    let conn = useRef();

    const formDisabled = useFormStatus()

    //signalR listens for the reveal event and sets state if it matches the id sent. 
    useEffect(() => {
        const streamSDK = new GraffleSDK();
        const feed = async (message) => {
            if (message.flowEventId === process.env.REACT_APP_PACK_REVEAL_EVENT) {
                if (message.blockEventData.packId === parseInt(id)) {
                    let imageurl = "https://find.mypinata.cloud/ipfs/" + replace(message.blockEventData.rewardFields.image, "ipfs://", "")
                    setDisplayImg(imageurl)
                    setDisplayTxt("You just pulled " + message.blockEventData.rewardFields.name)
                }
            }
            console.log(message);
        };
        async function startConn() {
            conn.current = await streamSDK.stream(feed);
        }
        startConn()
    }, []);

    useEffect(() => () => {
        conn.current.stop()
    }, []);

    useEffect(() => {
        if (!formDisabled) {
            handleRedeemPack(id, {
                async onSuccess(status) {
                    console.log("success");
                    setDisplayTxt("Pack opened - now for the big reveal")
                },
                async onError() {
                    setDisplayTxt("There was a problem, close and try again")
                }
            });
        } else
        {
            setDisplayTxt("A transaction is running, please finish that first")
        }

    }, [id]);

    return (
        <Container style={{height: "100%"}}>
            <Row>
                <Col>
                    <h3>{displayTxt}</h3>
                </Col>
            </Row>
            <Row>
                <Col id="cf2" align="center">
                    <Image className="top" src={displayImg} fluid style={{ maxHeight: "80vh" }} />
                    <Image className={displayImg ? "bottom transparent" : "bottom"} src="/assets/home/2.jpg" fluid style={{ maxHeight: "80vh" }} />
                </Col>
            </Row>
        </Container>
    )
}
