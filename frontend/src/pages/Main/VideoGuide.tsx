import React from "react";
import styled from "styled-components";
const VideoWrapper = styled.div`
  width: 1320px;
  height: 800px;
  margin: 0 auto;
  /* background-color: wheat; */
  h1 {
    font-size: 42px;
  }
`;

const VideoGuide = () => {
  return (
    <VideoWrapper>
      <h1>How To use N-City?</h1>
      <video controls width="1320px">
        <source src="essets/video/운동유어스타.mp4" type="video/mp4" />
      </video>
    </VideoWrapper>
  );
};

export default VideoGuide;
