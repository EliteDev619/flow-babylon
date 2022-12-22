import { useEffect, useState } from "react";
import { Col, Container, Image, Row, Table } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import { useParams } from "react-router-dom";
import 'react-image-lightbox/style.css';
import { replace } from "lodash";
import { LoadingModule } from "../components/loading/loading";
import { scripts } from '@findonflow/character-client'
import { Script } from "../functions/script";
import "../components/nftdetail/nftdetail.css"
import { rarityColors } from "../functions/raritycolors";

export function NftDetail({ collection, currentUser }) {
    const { user, ID } = useParams()
    const [extCollection, setExtCollection] = useState()
    const [nftDetail, setNftDetail] = useState()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (currentUser.addr === user) {
            setExtCollection(collection)
        } else {
            async function getCollection(addr) {
                const getCollection = await Script(scripts.viewUser, { "address": addr });
                setExtCollection(getCollection)
            }
            async function getCollectionByName(addr) {
                const getCollection = await Script(scripts.viewUserByName, { "name": addr });
                setExtCollection(getCollection)
            }
            try {
                if (user.length > 16 && user.includes("0x"))
                    getCollection(user)
                else
                    getCollectionByName(user)
            }
            catch (error) {
                console.log(error)
            }
        }
    }, [collection, currentUser.addr, user])


    useEffect(() => {
        if (extCollection) {
            if (extCollection.lampions.length > 0)
                setNftDetail(extCollection.lampions?.filter(cat => cat.id === ID));
        }
    }, [extCollection])

    const [isOpen, setIsOpen] = useState(false)

    function LightBox() {
        let imageurl = "https://find.mypinata.cloud/ipfs/" + replace(nftDetail[0].thumbnail, "ipfs://", "")
        let videoUrl = "https://find.mypinata.cloud/ipfs/" + replace(nftDetail[0].media["video/mp4"], "ipfs://", "")
        return (
            <div>
                <Image src={imageurl} key={nftDetail[0].thumbnail} style={{ cursor: "pointer" }} alt={"Picture of NFT"} fluid onClick={() => setIsOpen(true)} />
                <video loop controls playsInline poster={imageurl}>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* TODO: add Video */}
                {isOpen && (
                    <Lightbox
                        mainSrc={nftDetail[0].thumbnail}
                        onCloseRequest={() => setIsOpen(false)}
                    />
                )}
            </div>
        );
    }
    //this is just an example of how the output data could be used
    if (nftDetail) {
        return (
            <Container className="mt-lg-4 g-0 p-0">
                <Row className="mx-auto">
                    <Col lg={{ span: 7 }} align="center"><LightBox /></Col>
                    <Col lg={{ span: 5 }}>
                        <Table id="detail-table" striped bordered hover variant="dark">
                            <tbody>
                                <tr>
                                    <td>Name: </td>
                                    <td colSpan={2}>{nftDetail[0].name}</td>
                                </tr>
                                <tr>
                                    <td>Serial: </td>
                                    <td colSpan={2}>{nftDetail[0].serial + "/" + nftDetail[0].maxSerial}</td>
                                </tr>
                                <tr>
                                    <td>Rarity: </td>
                                    <td colSpan={2}>{nftDetail[0].rarity}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3}><h5>Main Traits:</h5></td>
                                </tr>
                                <tr>
                                        <td>Home Team: </td>
                                        <td colSpan={2}>{nftDetail[0].traits["HomeTeam"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Away Team: </td>
                                        <td colSpan={2}>{nftDetail[0].traits["AwayTeam"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Competition: </td>
                                        <td colSpan={2}>{nftDetail[0].traits["Competition"]}</td>
                                    </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
    else {
        return (<LoadingModule />)
    }
}
