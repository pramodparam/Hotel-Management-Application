import React from 'react'
import {Link} from 'react-router-dom'
function Landing() {
  return (
    <div className='row landing justify-content-center'>
        <div className='col-md-9 my-auto text-center' style={{borderRight:'8px solid white'}}>
            <h2 style={{color:'white' , fontSize:'90px'}}>PR_Hotel-Management</h2>
            <h4 style={{color:'green',fontSize:'80px'}}>Welcome</h4>
            <Link to='/home'><button className='btn landingBtn' style={{color:'black', backgroundColor:'white'}}>Get Started</button></Link>
            

        </div>
      
    </div>
  )
}

export default Landing
