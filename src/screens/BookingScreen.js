import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Swal from 'sweetalert2'
import Error from "../components/Error";
import StripeCheckout from 'react-stripe-checkout';
import moment from "moment";
function BookingScreen({ match }) {
    const params = useParams();
    const id = params.roomid;
    const fromDate = params.fromdate;
    const toDate = params.todate;
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [rooms, setRooms] = useState([])

    const [totalAmount, setTotalAmount] = useState()

    const [day1, month1, year1] = fromDate.split('-')
    const [day2, month2, year2] = toDate.split('-')
    const startDate = new Date(`${year1}-${month1}-${day1}`)
    const endDate = new Date(`${year2}-${month2}-${day2}`)

    const diff1 = Math.abs(startDate - endDate)
    const diff2 = Math.ceil(diff1 / (1000 * 60 * 60 * 24)) + 1
    const rent = rooms.rentPerDay * diff2


    async function onToken(token) {
     console.log(token)
        const bookingDetails = {
            rooms,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate: fromDate,
            todate: toDate,
            totalamount: rent,
            totaldays: diff2,
            token
        }
        try {
            setLoading(true)
            const res = await axios.post('/api/bookings/bookRoom', bookingDetails)
            setLoading(false)
            
            Swal.fire('Congratulations','Your Room Booked Successfully','success').then((res)=>{
                window.location.href='/profile'
            })
            
           
        } catch (err) {
            setLoading(false)
            Swal.fire('Oops','Something Went Wrong','error')
            console.log(err)
        }

    }
    useEffect(() => {
        if(!localStorage.getItem('currentUser')){
           window.location.reload='/login'
        }
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = (await axios.post('/api/rooms/getRoomById', { roomid: id })).data
                setTotalAmount(rent)
                setRooms(data)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setError(true)
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

   async function bookRoom(){
    const bookingDetails={
        rooms,
        userid:JSON.parse(localStorage.getItem('currentUser'))._id,
        fromDate,
        toDate,
        rent,
        diff2

    }
   }
 
    return (<div className="ml-5 mr-5 mb-3">

        {loading ? (<Loader />) : rooms ? (<div>

            <div className="row justify-content-center mt-3 bs">
                <div className="col-md-5 ">
                    <h2>{rooms.name}</h2>
                    <img src={rooms.imageUrl[0]} className='bigimg ' />
                </div>
                <div className="col-md-5 mt-3 ml-5 " >
                    <div style={{ textAlign: 'right' }}>
                        <h4 style={{ fontWeight: 'bold' }}>Booking Details</h4>
                        <hr style={{
                            color: 'black',
                        }} />
                        <b><p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                            <p>From Date :{fromDate} </p>
                            <p>To Date :{toDate} </p>
                            <p>Max Count : {rooms.maxCount}</p>
                        </b>
                       <h4 style={{fontWeight:'bold'}} >Amount</h4>
                        <hr />
                        <b>
                            <p>Total Days : {diff2}</p>
                            <p>Rent Per Day : {rooms.rentPerDay}</p>
                            <p>Total Amount: {rent} </p>
                        </b>
                        <div style={{ float: 'right' }}>
                           
                            <StripeCheckout
                            amount={rent*100}
                            currency="INR"
                                token={onToken}
                                stripeKey="pk_test_51P2xfOSCPMGo2Dl7COVzWkm5Ttb7sYWmvxlYDyAryggeRBFb7K2sICnlOVIHqnIlhjFnVBabEmLWHsNnT3uM5G4Q00tn4dqZMq"
                            >

                                <button className="btn btn-primary" >Pay Now</button>
                            </StripeCheckout>

                        </div>
                    </div>

                </div>

            </div>
        </div>) : (
            <Error />
        )
        }

    </div>);
}

export default BookingScreen;