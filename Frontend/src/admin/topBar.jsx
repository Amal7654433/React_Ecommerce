import React from 'react'
import './topBar.css'
import { useNavigate } from 'react-router-dom'
const TopBar = () => {
    const navigate=useNavigate()
    
    return (
        <div className='topBarContainer'>   <div className="button-group">
            <button onClick={()=>navigate('/admin/dashboard')} >Customers</button>
            <button  onClick={()=>navigate('/admin/product')}>Products</button>
            <button onClick={()=>navigate('/admin/order')} >Orders</button>
        </div></div>

    )
}

export default TopBar