import { useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Countdown from "react-countdown";
import Carousel from "react-gallery-carousel";
import { useNavigate } from "react-router";
import { useImmer } from "use-immer";
import { changeState, useStateChanged } from "../../functions/DisabledState";
import { Script } from "../../functions/script";
import { scripts } from "@findonflow/character-client"
import { HandleMint } from "../../functions/txfunctions";
import { useState } from "react";

export function MintSlider() {
    const navigate = useNavigate()
    const [numberOfPacks, setNumberOfPacks] = useState()
    const formStateChanged = useStateChanged()

    //get the number of packs available and store that number in state
    useEffect(() => {
        async function getPacksRemaining(addr) {
          const getPacks = await Script(scripts.packsRemaining, { "address": addr });
          setNumberOfPacks(getPacks)
        }
        try {
          getPacksRemaining(process.env.REACT_APP_MINTER_ADDRESS)
        }
        catch (error) {
          console.log(error)
        }
    }, [formStateChanged])

    //function to mint a pack
    async function Mint() {
        await HandleMint(formValues);
        changeState()
        navigate('/collection');
    }

    const [formValues, setFormValues] = useImmer([
        {
            id: "quantity",
            value: "1",
        },
        {
            id: "packType",
            value: process.env.REACT_APP_PACK_TYPE,
        },
        {
            id: "amount",
            value: process.env.REACT_APP_PACK_PRICE,
        },
    ]);

    const images = [1, 2].map((number) => ({
        src: `/assets/home/${number}.jpg`
    }))

    function updateField(e) {
        setFormValues((draft) => {
            const varVal = draft.find((varVal) => varVal.id === e.target.name);
            varVal.value = e.target.value;
            //now validate
        });
    }

    const CountdownTimer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return (
                <>
                    <fieldset>
                        <Col xs="auto" className="mb-3">{numberOfPacks} remaining packs</Col>
                        <Col xs="auto" className="mb-3">
                            <Form.Select name="quantity" id="quantity" aria-label="Mint Number Select" className="mintSelect" style={{ width: "150px" }} onChange={updateField}>
                                <option value="1">1 Pack</option>
                                <option value="2">2 Packs</option>
                                <option value="3">3 Packs</option>
                                <option value="4">4 Packs</option>
                                <option value="5">5 Packs</option>
                                <option value="6">6 Packs</option>
                                <option value="7">7 Packs</option>
                                <option value="8">8 Packs</option>
                                <option value="9">9 Packs</option>
                                <option value="10">10 Packs</option>
                            </Form.Select>
                        </Col>
                        <Col xs="auto"><Button variant="wl" style={{ width: "240px" }} onClick={() => Mint()}>MINT ({parseFloat(formValues[2].value * formValues[0].value)} FLOW)</Button></Col>
                    </fieldset>
                </>
            )
        } else {
            // Render a countdown
            return <Row className="auction-digits justify-content-center justify-content-md-start">
                <Col xs="12"><h5>The final countdown!</h5></Col>
                <Col xs="auto" className="p-2">{days}<div className="mint-dayshoursmins p-0">days</div></Col>
                <Col xs="auto" className="p-2">:</Col>
                <Col xs="auto" className="p-2">{hours} <div className="mint-dayshoursmins">hours</div></Col>
                <Col xs="auto" className="p-2">:</Col>
                <Col xs="auto" className="p-2">{minutes} <div className="mint-dayshoursmins">mins</div></Col>
                <Col xs="auto" className="p-2">:</Col>
                <Col xs="auto" className="p-2">{seconds} <div className="mint-dayshoursmins">secs</div></Col>
            </Row>;
        }
    };

    return (
        <Row className="justify-content-center my-5">
            <Col lg={{ span: 5, offset: 0 }}>
                <div align="center" className="galleryContainer mb-3">
                    <Carousel images={images} isLoop shouldLazyLoad isAutoPlaying hasMediaButton={false} hasThumbnails={false} hasIndexBoard={false} has style={{ maxWidth: "1150px" }} />
                </div>
            </Col>
            <Col lg={{ span: 5, offset: 1 }} className="my-auto">
                <h1>Enter a heading text </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit</p>
                <p className="my-4"><b>Early access: XX/XX/XXXX</b></p>
                <p className="my-4"><b>Release: XX/XX/XXXX</b></p>
                <Row className="my-3">
                    <Countdown date={new Date("2022-05-01 18:22:00 GMT")} renderer={CountdownTimer} />
                </Row>
            </Col>
        </Row>
    )
}
