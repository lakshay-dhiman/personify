import React, { useState } from "react";
import Loading from "../Files/Loading.svg"

const Home = () => {
  const [intro, setIntro] = useState("load");
  const [visible,setVisible] = useState("invisible-home")
  const [visible_loading,setVisibleLoading] = useState("visible-loading")

    window.setTimeout(() => {
        setIntro("loaded");
        setVisibleLoading("invisible-loading")
        window.setTimeout(()=>{
            setVisible("visible-home");
        },1000)
    }, 1000);


  const login_spotify = () => {
    const host = window.location.protocol+'//'+window.location.hostname;
    let redirect_uri ;
    if(window.location.port){
      redirect_uri = `${host}:${window.location.port}/song_info`;
    }else{
      redirect_uri = `${host}/song_info`;
    }
    
      const client_id = "d3708d18048e4a108714ecfb905b2179",
      authorisation_scope = "user-read-currently-playing user-read-email",
      request_type = "code";
    localStorage.clear();
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${request_type}&redirect_uri=${redirect_uri}&scope=${authorisation_scope}`;
  };

  return (
    <div className="homescreen">
      <div className={intro + " logo"}>
        <div><span>Person</span>ify</div>
        <img className={visible_loading} src={Loading} alt="loading" />
      </div>
      <div className={visible + " main-home"}>
        <div className="welcome">Welcome to Personify</div>
        <div className="para">
          Get details and lyrics of currently playing song on spotify instantly
        </div>
        <button onClick={login_spotify}>Login with Spotify</button>
      </div>
    </div>
  );
};

export default Home;
