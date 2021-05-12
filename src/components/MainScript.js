import React, { useEffect, useState } from "react";
import $ from "jquery";
import CurrentSong from "./CurrentSong";
import Nav from "./Nav";


const MainScript = () => {
  const [user, setUser] = useState(null),
    [song, setSong] = useState(null),
    [lyrics, setLyrics] = useState(null),
    [access_token,SetAccesstoken] = useState(null)

  useEffect(() => {
    get_token();
  }, []);

  const delte_memory = () => {
    window.setTimeout(() => {
      window.setInterval(() => {
        const now = new Date().getTime();
        if (localStorage.getItem("expire")) {
          if (localStorage.getItem("expire") < now) {
            localStorage.setItem("access_token", "expired");
          }
        }
      }, 1000);
    }, 1000);
  };

  const memory = (value, time) => {
    const now = new Date().getTime();
    localStorage.setItem("access_token", value);
    localStorage.setItem("expire", now + time * 1000);
    delte_memory();
  };

  const get_token = () => {
    delte_memory();
    let error = false;
    const url_parms = window.location.href.split("?");
    if (url_parms.length > 1) {
      let get = {};
      url_parms.forEach((parm) => {
        if (parm.includes("=")) {
          const parameter = parm.split("="),
            name = parameter[0],
            value = parameter[1];
          get[name] = value;
        }
      });

      if (get["error"]) {
        console.log("something went wrong");
        error = true;
      } else if (get["code"]) {
        const code = get["code"],
          data = {
            code: code,
          };
        if (
          localStorage.getItem("access_token") === "undefined" ||
          !localStorage.getItem("access_token")
        ) {
          $.ajax({
            method: "post",
            url: "http://localhost/Personify/server/access_token.php",
            // url: "http://personify.sakujo.in/server/access_token.php",
            data: data,
            success: (data) => {
              data = JSON.parse(data);
              const access_token = data.access_token;
              const refresh_token = data.refresh_token;
              const expire_in = data.expires_in;
              console.log(access_token)
              localStorage.setItem("refresh_token", refresh_token);
              memory(access_token, expire_in);
              SetAccesstoken(access_token);
            },
          });
        } else if (localStorage.getItem("access_token") === "expired") {
          $.ajax({
            method: "post",
            // url: "http://localhost/practice/React%20/Learn/spotify-react/src/server/refresh_token.php",
            url: "http://localhost/Personify/server/refresh_token.php",
            data: {
              refresh_token: localStorage.getItem("refresh_token"),
            },
            success: (data) => {
              data = JSON.parse(data);
              const access_token = data.access_token,
                expire_in = data.expires_in;
                memory(access_token, expire_in);
              SetAccesstoken(access_token)
            },
          });
        }else{
          SetAccesstoken(localStorage.getItem('access_token'))
        }
      }
    }
  };

  console.log(access_token);

  if(access_token){
    return (
      <div>
        <Nav/>
        <CurrentSong/>
      </div>
    );
  }else{
    return(
      <div>
      </div>
    )
  }





};

export default MainScript;
