import React from "react";
import styled from "styled-components";

const AudioWrapper = styled.div`
  width: 50%;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;

  .btnimg {
    width: 20px;
    height: 30px;
    margin: 0;
  }
`;

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => (
  <AudioWrapper>
    <button
      type="button"
      className="prev"
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <img className="btnimg" src="essets/room/arrow-left.png" alt="" />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className="pause"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <img className="btnimg" src="essets/room/pause-line.png" alt="" />
      </button>
    ) : (
      <button
        type="button"
        className="play"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <img className="btnimg" src="essets/room/play.png" alt="" />
      </button>
    )}
    <button
      type="button"
      className="next"
      aria-label="Next"
      onClick={onNextClick}
    >
      <img className="btnimg" src="essets/room/arrow-right.png" alt="" />
    </button>
  </AudioWrapper>
);

export default AudioControls;
