import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios'
import Loader from "../components/Loader";
import Swal from 'sweetalert2'
import Error from "../components/Error";
const items = [
    {
        key: '1',
        label: 'Bookings',
        children: <Bookings />,
    },
    {
        key: '2',
        label: 'Rooms',
        children: <Rooms />,
    },
    {
        key: '3',
        label: 'Add Room',
        children: <AddRooms />,
    },
    {
        key: '4',
        label: 'Users',
        children: <Users />,
    }
];
function Admin() {

    useEffect(() => {
        // if(!JSON.parse(localStorage.getItem('currentUser')).isAdmin){
        //     window.location.href='/home'
        // }
    }, [])
    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontSize: '30px' }}> <b>Admin Panel</b> </h2>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}


export function Bookings() {

    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    useEffect(() => {
        async function fetchData() {
            try {

                const data = await (await axios.get('/api/bookings/getallbookings')).data
                setBookings(data)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
                setError(error)
            }
        }
        fetchData()

    }, [])
    return (<div className='row'>

        <div className='col-md-12'>
            <h4>Bookings</h4>
            {loading && (<Loader />)}
            <table className='table table-bordered table-dark'>
                <thead className='bs'>
                    <tr>
                        <th>Booking Id</th>
                        <th>User Id</th>
                        <th>Room</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 && (
                        bookings.map(booking => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.rooms}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        })
                    )}
                </tbody>
            </table>

        </div>
    </div>)
}



export function Rooms() {

    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    useEffect(() => {
        async function fetchData() {
            try {

                const data = await (await axios.get('/api/rooms/getAllRooms')).data
                setRooms(data)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
                setError(error)
            }
        }
        fetchData()

    }, [])
    return (<div className='row'>

        <div className='col-md-10'>
            <h4>Rooms</h4>
            {loading && (<Loader />)}
            <table className='table table-bordered table-dark'>
                <thead className='bs'>
                    <tr>
                        <th>Room Id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Rent Per Day</th>
                        <th>Max Count</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.length > 0 && (
                        rooms.map(room => {
                            return <tr>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentPerDay}</td>
                                <td>{room.maxCount}</td>
                                <td>{room.phoneNumber}</td>
                            </tr>
                        })
                    )}
                </tbody>
            </table>

        </div>
    </div>)
}

export function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    useEffect(() => {
        async function fetchData() {
            try {

                const data = await (await axios.get('/api/users/getAllUsers')).data
                setUsers(data)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
                setError(error)
            }
        }
        fetchData()

    }, [])

    return (<div className='row'>
        <div className='col-md-10'>
            <h4>Users</h4>
            {loading && (<Loader />)}
            <table className='table table-bordered table-dark'>

                <thead className='bs'>
                    <tr>

                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Is Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 && (
                        users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>

                            </tr>
                        })
                    )}
                </tbody>
            </table>

        </div>

    </div>)

}




export function AddRooms() {
    const [name,setName]=useState('')
    const [rentPerDay,setRentPerDay]=useState()
    const [maxCount,setMaxCount]=useState()
    const [description,setDescription]=useState()
    const [phoneNumber,setPhoneNumber]=useState()
    const [type,setType]=useState()
    const[imageUrl1,setImageUrl1]=useState()
    const[imageUrl2,setImageUrl2]=useState()
    const[imageUrl3,setImageUrl3]=useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
   async function addRoom(){


        const newRoom={
            name,
            rentPerDay,
            maxCount,
            description,
            phoneNumber,
            type,
            imageUrl:[imageUrl1,imageUrl2,imageUrl3]
        }
        try{
            setLoading(true)
   const res=await (await axios.post('/api/rooms/addRoom',newRoom)).data
   setLoading(false)
   Swal.fire('Congrats','New Room Added Successfully','success').then((res)=>{
window.location.href='/home'
   })
   console.log(res)
        }catch(err){
            setLoading(false)
            Swal.fire('Oops','Something Went Wrong','error')
            setError(err)

        }
    }
    return (
        <div className='row'>
            
            <div className='col-md-5'>
            {loading && <Loader/>}
                <input type='text' className='form-control m-2' placeholder='Room Name'
                value={name} onChange={(e)=>{setName(e.target.value)}} ></input>
                <input type='text' className='form-control m-2' placeholder='Rent Per Day'
                value={rentPerDay} onChange={(e)=>{setRentPerDay(e.target.value)}}></input>
                <input type='text' className='form-control m-2' placeholder='Max Count'
                value={maxCount} onChange={(e)=>{setMaxCount(e.target.value)}}></input>
                <input type='text' className='form-control m-2' placeholder='Description'
                value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
                <input type='text' className='form-control m-2' placeholder='Phone Number'
                value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}}></input>
            </div>
            <div className='col-md-5'>
                <input type='text' className='form-control m-2' placeholder='Type'
                value={type} onChange={(e)=>{setType(e.target.value)}}></input>
                <input type='text' className='form-control m-2' placeholder='Image URL 1'
                value={imageUrl1} onChange={(e)=>{setImageUrl1(e.target.value)}}></input>
                <input type='text' className='form-control m-2' placeholder='Image URL 2'
                value={imageUrl2} onChange={(e)=>{setImageUrl2(e.target.value)}}></input>
                <input type='text' className='form-control m-2' placeholder='Image URL 3'
                value={imageUrl3} onChange={(e)=>{setImageUrl3(e.target.value)}}></input>

                <div className='text-right'>
                    <button className='btn btn-primary mt-2' onClick={addRoom}>Add Room</button>

                </div>
            </div>

        </div>
    )
}





export default Admin
