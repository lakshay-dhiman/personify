import React, { useEffect, useState } from "react";
import Lyrics from "./Lyrics";
import PlaySong from "../Files/Play_song.svg";
import AdPlaying from "../Files/Ad_playing.svg";

const CurrentSong = () => {
  const [song, setSong] = useState(null),
    [artist, setArtist] = useState(null),
    [track, setTrack] = useState(null);
  const get_current_song = async () => {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    const http_code = response.status;
    if (http_code === 200) {
      const current_playing = await response.json();
      if (current_playing.currently_playing_type === "ad") {
        setSong("ad_playing");
      } else if (current_playing.currently_playing_type === "track") {
        const artist = current_playing.item.artists[0].name,
          track = current_playing.item.name;
        setArtist(artist);
        setTrack(track);
        setSong(current_playing);
      }
    } else if (http_code === 204) {
      setSong("no_song");
    }
  };

  useEffect(() => {
    get_current_song();
  }, []);
  if (song) {
    if (typeof song == "object") {
      return (
        <div className="currently-playing-component">
          <div className="wrapper">
            <div className="currently-playing">
              <div className="heading">Currently Playing : </div>
              <div className="widget">
                <img src={song.item.album.images[0].url} alt="cover art" />
                <div className="song-info">
                  <div className="name">{song.item.name}</div>
                  <div className="artist">{song.item.artists[0].name}</div>
                  <div className="album">
                    Album &nbsp;: &nbsp; {song.item.album.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="credits">
              Fetched from
              <a rel="noreferrer"  href="https://spotify.com" target="_blank">
                Spotify.com
              </a>
            </div>
          </div>
          <div className="lyrics-block">
            <Lyrics artist={artist} track={track} />
          </div>
        </div>
      );
    } else if (typeof song === "string" && song === "no_song") {
      return (
        <div className="no_song">
          <img src={PlaySong} alt="no_song" />
          <div className="text">
            <div className="title">Err.. no song song playing</div>
            <div className="subtitle">
              Play a song from your spotify account and enjoy yourself here
            </div>
          </div>
        </div>
      );
    } else if (typeof song === "string" && song === "ad_playing") {
      return (
        <div className="ad_playing">
          <div className="text">
            <div className="title">Ugh.. ads suck</div>
            <div className="subtitle">
              An ad is iterupting, but you’ll get your music back soon
            </div>
          </div>

          <img src={AdPlaying} alt="ad_playing" />
        </div>
      );
    }
  } else {
    return <div></div>;
  }
};

export default CurrentSong;
