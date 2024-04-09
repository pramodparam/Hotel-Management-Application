
import { useState ,useEffect} from "react";
import axios from 'axios';
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
//import 'antd/dist/reset.css'
import moment from 'moment'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker;
function HomeScreen() {

    const [rooms, setRooms] = useState([])
   
    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const [fromdate, setFromDate] = useState()
    const [todate, setToDate] = useState()
    const [duplicateRooms, setDuplicateRooms] = useState([])
    const[searchKey,setSearchKey]=useState('')
    const [type,setType]=useState('all')
    useEffect(() => {
        const fetchData = async () => {
            try {
               setLoading(true)
               const data=(await axios.get('api/rooms/getAllRooms')).data
              
               setRooms(data)
                console.log(rooms)
                setDuplicateRooms(data)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setError(true)
                setLoading(false)
            }
        }
        fetchData()

    }, [])


    function filterByDate(dates) {
        const date1 = (dates[0]).format('DD-MM-YYYY')
        const date2 = (dates[1]).format('DD-MM-YYYY')
        setFromDate(date1)
        setToDate(date2)


        var temprooms = []
        var availability = false
        for (const rooms of duplicateRooms) {
            if (rooms.currentBookings.length > 0) {
                for (const booking of rooms.currentBookings) {
      

                    if (!(date1<=booking.todate && date1>=booking.fromdate) && !(date2<=booking.todate && date2>=booking.fromdate) )
                     {
                   
                        if (
                           date1 !== booking.fromdate &&
                            date1!== booking.todate &&
                            date2 !== booking.fromdate &&
                           date2 !== booking.todate) {
                            availability = true
                            
                        }


                    }else{
                        availability = false
                       
                        break
                    }
                }
            }
            if (availability === true || rooms.currentBookings.length === 0) {
                temprooms.push(rooms)
            }
        }


    }

    function filterByType(e){
        try{
            setType(e)
            if(e!=='all'){
                const temp=duplicateRooms.filter(rooms=>rooms.type.toLowerCase()==e.toLowerCase())
                setRooms(temp)
              
            }else{
                setRooms(duplicateRooms)
            }
        }
       catch(err){
        console.log(err)
       }
        
    }

    function filterBySerach(){
        try{
            const temp=duplicateRooms.filter(rooms=>rooms.name.toLowerCase().includes(searchKey.toLowerCase()))
            setRooms(temp)
        }catch(err){
            console.log(err)
        }
   
    }
    return (<>
        <div className="container">

            <div className="row mt-5 bs">
                <div className="col-md-3" style={{color:'black'}}>

                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>

                <div className="col-md-5">
                    <input type="text" className="form-control" placeholder="search rooms" 
                    value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}} onKeyUp={filterBySerach} ></input>
                </div>
                <div className="col-md-3">
                <select className="form -control" value={type} onChange={(e)=>{filterByType(e.target.value)}}>
                <option value='all'>All</option>
                <option value='delux'>Delux</option>
                <option value='non-delux'>Non-Delux</option>
                </select>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                {loading ?
                    (<Loader />) :
                    (
                        rooms.map((room) => {
                            return <div className="col-md-9 mt-2">
                                <Room room={room} fromdate={fromdate} todate={todate} />
                            </div>;
                        })
                    )}
            </div>
        </div>

       
    </>);
}

export default HomeScreen;