import styled from 'styled-components';

// Values

// Colors

export const primaryColor = 'black';
export const secondaryColor = 'white';

// Media query breakpoints

const size = {
  MobileLandscape: '480px',
  TabletPortrait: '768px',
  TabletLandscape: '992px',
  Laptops: '1200px',
};

export const device = {
  MobileLandscape: `(min-width: ${size.MobileLandscape})`,
  TabletPortrait: `(min-width: ${size.TabletPortrait})`,
  TabletLandscape: `(min-width: ${size.TabletLandscape})`,
  Laptops: `(min-width: ${size.Laptops})`,
};

// Layout components

export const Layout = styled.div``;

// export const Block = styled.div`
//   //border: 1px solid red;
//   margin: 0 auto;
//   margin-top: 50px;
//   margin-bottom: 50px;
//   margin-left: 25vh;
//   margin-right: 25vh;
//   background-color: white;
//   height: 90vh;
//   max-height: 100%;
//   border-radius: 30px;
//   text-align: center;
//   box-shadow: 5px 5px 5px 5px gray;
//   /* width: 100vw; */
//   @media ${device.MobileLandscape} {
//   }
// `;
