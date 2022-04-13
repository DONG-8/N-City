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

  video {
    border: solid 5px black;
  }
`;

const VideoGuide = () => {
  return (
    <VideoWrapper>
      <h1>N-City UCC</h1>
      <video controls width="1320px">
        <source src="essets/video/특화PJT_부울경_1반_E106_UCC경진대회.mp4" type="video/mp4" />
      </video>
    </VideoWrapper>
  );
};

export default VideoGuide;
