import React from 'react';
import UserInfo from './UserInfo.js';

const Nav = ()=>{
    return(
        <nav>
            <div className="logo">
                <div><span>Person</span>ify</div>
            </div>
            <UserInfo/>
        </nav> 
    )

}

export default Nav