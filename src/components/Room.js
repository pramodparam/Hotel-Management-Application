import { useState, React } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
function Room({ room ,fromdate,todate}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (<>
        <div className="row bs">
            <div className="col-md-4">
                <img src={room.imageUrl[0]} className='smallimg'/>
            </div>
            <div className="col-md-7 ">
                <h3 >{room.name}</h3>
                <b> <p>Max Count : {room.maxCount}</p>
                    <p>Phone Number : {room.phoneNumber}</p>
                    <p>Type : {room.type}</p></b>
                <div style={{ float: 'right' }}>

                    {(fromdate && todate) && (<Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                        <button className="btn btn-primary m-2">Book Now </button>
                    </Link>)}
               
                    <button className="btn btn-primary" onClick={handleShow}>View Details</button>
                </div>
            </div>



            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>

                        {room.imageUrl.map((url) => {
                            return (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100 bigimg"
                                        src={url}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                    <p>{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    </>);
}

export default Room;