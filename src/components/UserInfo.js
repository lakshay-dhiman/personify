import React,{useEffect,useState} from 'react';
import DefaultPFP from '../Files/Default_pfp.svg'
import Loading from '../Files/Loading.svg'
const UserInfo = () =>{

    const [user,setUser] = useState(null)

    const get_user_info = async () => {
        const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        });
        const user_info = await response.json();
        setUser(user_info)
    };

    useEffect(()=>{
        get_user_info()
    },[])

    if(user){
        return (
          <div className="user-info">
            <div className="name">{user.display_name}</div>
            <img src={user.images[0]?user.images[0].url:DefaultPFP} alt="user profile" className='pfp'/>
          </div>
        );        
    }else{
        return (
          <div className="loading-lyrics">
            <img src={Loading} alt="lodaing" />
          </div>
        );
    }

}

export default UserInfo