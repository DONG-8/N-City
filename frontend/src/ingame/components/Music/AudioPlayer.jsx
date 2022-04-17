import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 180px;
  height: 80px;
  margin: 0;
`;

const Content = styled.div`
  width: 100%;
  /* height: 100px; */
  margin: 0px;
  /* background-color: #eeedee; */
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  .musicimg {
    width: 25px;
    height: 25px;
    border-radius: 15px;
    margin: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  h2 {
    width: 240px;
    font-size: 12px;
    /* margin: 0px; */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    animation: filter 8s linear infinite;
  }
  .box {
    width: 240px;
    overflow: hidden;
    margin-left: 10px;
    cursor: pointer;
  }
  @keyframes filter {
    to {
      transform: translateX(-200px);
      filter: hue-rotate(0);
    }
    from {
      transform: translateX(200px);
      filter: hue-rotate(360deg);
    }
  }
`;

const Player = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  div {
    width: 100%;
  }

  input {
    width: 50%;
    margin-top: -10px;
    margin-right: 5px;
  }
`;

const AudioPlayer = ({ tracks }) => {
  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Destructure for conciseness
  const { title, artist, color, image, audioSrc } = tracks[trackIndex];

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Destructure for conciseness
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Wrapper>
      <Content>
        <Header>
          <img
            className="musicimg"
            src={image}
            alt={`track artwork for ${title} by ${artist}`}
          />
          <div className="box">
            <h2 className="title">
              {artist} : {title}
            </h2>
          </div>
        </Header>
        <Player>
          <AudioControls
            isPlaying={isPlaying}
            onPrevClick={toPrevTrack}
            onNextClick={toNextTrack}
            onPlayPauseClick={setIsPlaying}
          />
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            className="progress"
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{ background: trackStyling }}
          />
        </Player>
      </Content>
    </Wrapper>
  );
};

export default AudioPlayer;
