import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from "../components/Loader";
import Swal from 'sweetalert2'
import {Tag } from 'antd';

import { Tabs } from 'antd';

const user = JSON.parse(localStorage.getItem('currentUser'))
const items = [
  {
    key: '1',
    label: 'Profile',
    children:
    <>
    <div className='col-md-3 bs'>
     { user &&user ? (<>
      <h5><b>Name : </b> {user.name}</h5>
    <h5><b>Email :</b> {user.email}</h5>
    <h5><b>isAdmin :</b> {user.isAdmin ? ' Yes' : 'NO'}</h5>
     </>):(<>
     {/* {window.location.href='/login'} */}
     </>)

     }
   
    </div>
    </>
  },
  {
    key: '2',
    label: 'My Bookings',
    children: <MyBookings />,
  }
];




export default function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  useEffect(() => {
    if (!user) {
      window.location.href('/login')
    }

  }, [])
  return (
    <div className='ml-3 mt-3'>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}


export function MyBookings() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [bookings, setBookings] = useState([])
  const user = JSON.parse(localStorage.getItem('currentUser'))
  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true)
        const bookedRooms = await (await axios.post('https://hotel-management-application.onrender.com/api/bookings/getBookingsByuserid', { userid: user._id })).data
        

        setBookings(bookedRooms)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setLoading(false)
        setError(error)
      }

    }
    fetchData()

  }, [])


  async function CancelBooking(bookingid, roomid) {


    try {
      setLoading(true)
      const res = await (await axios.post('https://hotel-management-application.onrender.com/api/bookings/cancelBooking', { bookingid, roomid })).data
      console.log(res)
      setLoading(false)
      Swal.fire('Congrats', 'Your Booking Has Been Cancelled', 'success').then((res) => {
        window.location.reload()
      })
    } catch (err) {
      console.log(err)
      setLoading(false)
      Swal.fire('Oops', 'Something Went Wrong', 'error')
    }
  }

  return (
    <div className='row'>
      <div className='col-md-6'>
        {loading && (<Loader />)}
        {bookings && (bookings.map(booking => {
          return <div className='bs'>
            <h4>{booking.rooms}</h4>
            <p><b>Booking Id :</b> {booking._id}</p>
            <p><b>CheckIn : </b>{booking.fromdate}</p>
            <p><b>CheckOut : </b> {booking.todate}</p>
            <p><b>Amount : </b>{booking.
              totalamount}</p>
            <p><b>Status : </b>{
        booking.status==='Cancelled'?(  <Tag color="red">Cancelled</Tag>) :( <Tag color="green">Confirmed</Tag>)
        }</p>
            {booking.status !== 'Cancelled' && (
              <div className='text-right'>
                <button className='btn btn-primary' onClick={() => (CancelBooking(booking._id, booking.roomid))}>CANCEL BOOKING</button>
              </div>
            )}
          </div>
        }))}
      </div>
    </div>
  )
}
