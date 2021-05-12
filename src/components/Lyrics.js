import React, { useEffect, useState } from "react";
import $ from "jquery";
import Cheerio from "cheerio-without-node-native";
import Loading from "../Files/Loading.svg";
import NotFound from "../Files/Not_Found.svg"

const Lyrics = ({ artist, track }) => {
  const [lyrics, setLyrics] = useState(null);
  const get_lyrics = () => {
    const get_url_parms = () => {
      const url_parm_raw = artist + " " + track;
      const url_parm_components = url_parm_raw
        .split("(")[0]
        .split("/")[0]
        .trim()
        .split(" ");
      const remove_elements = ['-']
      let index=0
      url_parm_components.forEach((elem) => {
        remove_elements.forEach((char) => {
          if (elem === char) {
            url_parm_components.splice(index, 1);
          }
        });
        index++;
      });
      for (var i = 0; i < url_parm_components.length; i++) {
        const split_by = ["'", "’", ".", "ʼ", "-"];
        var word = "";
        split_by.forEach((char) => {
          const word_correction = url_parm_components[i].split(char);
          if (i !== 0) {
            word = word_correction.join("").toLowerCase();
          }if(i===0){
            word = word_correction.join("").toLowerCase().charAt(0).toUpperCase() + word_correction.join("").toLowerCase().slice(1);
          }
          url_parm_components[i] = word;
        });

      }
      url_parm_components.push("lyrics");
      let url_parms = url_parm_components.join("-");
      const replace_char = {
        "&": "and",
        "Á": "A",
        "É": "E",
        "Í": "I",
        "Ó": "O",
        "Ú": "U",
        "Ü": "U",
        "Ñ": "N",
        'á': "a",
        "é": "e",
        "í": "i",
        "ó": "o",
        "ú": "u",
        "ü": "u",
        "ñ": "n",
      };
      for(const[key,value] of Object.entries(replace_char)){
        url_parms = url_parms.replace(key,value)
      }
      console.log(url_parms);
      return url_parms;
      
    };

    const fetch_lyrics = (() => {

      const host = window.location.protocol+'//'+window.location.hostname;
      $.ajax({
        method: "post",
        url:`${host}/server/fetch_lyrics.php`,
        data: {
          url_parms: get_url_parms(),
        },
        success: (lyrics_data) => {
          const cheerio = Cheerio.load(lyrics_data);
          const lyrics_func = (() =>{
            const lyrics_complete = [];
            const lyrics_block = cheerio(".lyrics");
            if(lyrics_block[0]){
              let lyric_line = "";
              lyrics_block[0].children[3].children.forEach((line) => {
                if (line.type === "text") {
                  lyric_line = lyric_line + line.data;
                } else if (line.type === "tag" && line.name !== "br") {
                  line.children.forEach((item) => {
                    if (item.type === "text") {
                      lyric_line = lyric_line + item.data;
                    }else if(item.type==='tag' && item.name!=='br'){
                      item.children.forEach((item)=>{
                        if(item.type==='text'){
                          lyric_line = lyric_line + item.data;
                        }
                      })
                    }else{
                      lyrics_complete.push(lyric_line);
                      lyric_line = "";
                    }
                  });
                } else {
                  lyrics_complete.push(lyric_line);
                  lyric_line = ''
                }
              });
              setLyrics(lyrics_complete);
            }else{
              setLyrics('Errr.... lyrics of this song not found')
            }
          })()
        },
      });
    })();
  };

  useEffect(() => {
    get_lyrics();
  },[]);

  if (lyrics) {
    if(typeof(lyrics)=='object'){
      return (
        <div className="lyrics-component">
          <div className="lyrics">
            <div className="block">
              <div className="name">Lyrics for {track} :</div>
              <div className="the_lyrics">
                {lyrics.map((line) => (
                  <div className="line">{line}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="credits">
            Lyrics fetched from{" "}
            <a rel="noreferrer" href="https://genius.com" target="_blank">
              Genius.com
            </a>
          </div>
        </div>
      );
    }else{
      return(
        <div className='notfound'>
          <div>{lyrics}</div>
          <img src={NotFound} alt="not found"/>
        </div>
      )
    }

  } else {
    return (
      <div className='loading-lyrics'>
        <img src={Loading} alt="lodaing"/>
      </div>
    );
  }
};

export default Lyrics;
