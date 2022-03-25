export const items= [
  {productRegDt:[2022,3,21,18,13,6],productCode:0,productTitle:"#Hong1535",productPrice:1.24,productFavorite:35,productThumbnailUrl:'https://lh3.googleusercontent.com/MmtavcUNNiTpLFfDqqol8pwp1_TKSEv0AbkKSxmN2lffhgYtkxAdfAo72lZVSJ4hpRW87s9TCL-HYMEIpaJ8PdgWBQWVlPsMZkgM6A=w305'},
  {productRegDt:[2022,3,21,18,13,6],productCode:0,productTitle:"#ghe23434",productPrice:1.35,productFavorite:43,productThumbnailUrl:'https://lh3.googleusercontent.com/qGLA-qtTThUV063ueH3gLxZgm0pC1VKusEYh7BrOUi8hBMAbssWvv2Vt0oRTdsWO51CDCkvF5Lc93fC62iI_liTxKz1H2qYyQxnRfg=w352'},
  {productRegDt:[2022,3,21,18,13,6],productCode:0,productTitle:"#ghe254334",productPrice:1.2,productFavorite:24,productThumbnailUrl:'https://lh3.googleusercontent.com/3usYOjVkwnra66EAhX4yJB-xmYCfFoTsREGVvVLCYWhtVG4pifdZLBRCSgv6wbjbV4rwPamlBDgganvgFO3xeifJyZQtqxwTYpXiqtc=w300'},
  {productRegDt:[2022,3,21,18,13,6],productCode:0,productTitle:"#Hong1535",productPrice:1.24,productFavorite:35,productThumbnailUrl:'https://lh3.googleusercontent.com/EdzzR4e6tc8jtOsRZ7T5-d9ejmy6r7zyulAjw4D-XlNMNISRPAwYXpVLOmj_dL-gWme69VvlDBj_EsXit8jwSFPjS_oFvgcjmo-Z=w328'},
  {productRegDt:[2022,3,21,18,13,6],productCode:0,productTitle:"#ghe23434",productPrice:1.35,productFavorite:43,productThumbnailUrl:'https://lh3.googleusercontent.com/qeCj7NRekCZ9BUjM8c9Pk02DxmPgX483qgEkVJeLXYIDOFVTXAfCg8TTztcMMQPgYFsNDUqndF5asWPCgJVpiM6P39VzpWa3TTKrvg=w300'},
  {productRegDt:[2022,3,21,18,13,6],productCode:0,productTitle:"#ghe254334",productPrice:1.2,productFavorite:24,productThumbnailUrl:'https://lh3.googleusercontent.com/jWonBwIV3RRzCv2xEu3pKA5buXUne_vnltLcLIfnluPuctdbTd-ScsBO94-njkA2L5VHVRA56CG5tbbxwacCvFdFWaZzuIJNUB1sVCA=w300'},
  {productRegDt:[2022,3,21,18,13,6],productCode:0,productTitle:"#g53434",productPrice:1.37,productFavorite:52,productThumbnailUrl:'https://lh3.googleusercontent.com/Op3TUf8vqznY1geantykLx86mlGf4yEaBfKT25utQlQu8keA9ywYdwYYzVSqGZG_3uSJKCNcUBAVK6qs520xhZ6lsP3dVDGsM9wnRA=w352'},
  {productRegDt:[2022,3,21,18,13,6],productCode:0,productTitle:"#Hong1535",productPrice:1.24,productFavorite:35,productThumbnailUrl:'https://lh3.googleusercontent.com/jc4P6pZhiNsBNxErAilpkx-d3RZDpNpJbYjs2k5nou29DJGe_r27tu2i0xy0KBOIgHaQhgVOqIF4-aLpjIqLV6eo-IsIUQ98VI_jDw=w300'},
  {productRegDt:[2022,3,21,18,13,6],productCode:0,productTitle:"#ghe23434",productPrice:1.35,productFavorite:43,productThumbnailUrl:'https://lh3.googleusercontent.com/qGLA-qtTThUV063ueH3gLxZgm0pC1VKusEYh7BrOUi8hBMAbssWvv2Vt0oRTdsWO51CDCkvF5Lc93fC62iI_liTxKz1H2qYyQxnRfg=w352'},
  {productRegDt:[2022,3,21,18,13,6],productCode:0,productTitle:"#g53434",productPrice:1.37,productFavorite:52,productThumbnailUrl:'https://lh3.googleusercontent.com/Op3TUf8vqznY1geantykLx86mlGf4yEaBfKT25utQlQu8keA9ywYdwYYzVSqGZG_3uSJKCNcUBAVK6qs520xhZ6lsP3dVDGsM9wnRA=w352'},
  {productRegDt:[2022,3,21,18,13,6],productCode:0,productTitle:"#ghe254334",productPrice:1.2,productFavorite:24,productThumbnailUrl:'https://lh3.googleusercontent.com/BqScg3QwKPcNW_cxtvBws2D2cE8Us-QsN9yYmB_8UzUikBwLfOC5Nc2JgXWOB2ijx4lAU2KcYplGujimb2FUD9ArixBFeCyNPcES=w352'},
  {productRegDt:[2022,3,21,18,13,6],productCode:0,productTitle:"#g53434",productPrice:1.37,productFavorite:52,productThumbnailUrl:'https://lh3.googleusercontent.com/OjwqOOt3_po4pPlTYg43Us9_pp4Ji9X8JKZY4aCsjzHISKQL-u2oSX_q4NmK5qZZn5PPYfMCpDS8OKFXBzXzXA6ljfWfaxGdEvc8DA=w300'},
]
export interface ItemType{
  item:{
    productTitle: string,
    productPrice: Number,
    productThumbnailUrl: string,
    productFavorite: Number,
    productRegDt:Object,
    productCode: Number,
  }
}

   
export const artists = [
  { name:"Happy Club ",
    sumnailImg:"https://lh3.googleusercontent.com/YCprgCsKKotONKjXCkJbiSWitAY_X5CrIfCMARxlsQ1d7ZkVwqxIXbBDqgpuVD7zt3B2eJxJkS6PYwcGuQUqSproductThumbnailUrlB1R_gk9Xqwdze-o=w352",
    profileImg:"https://lh3.googleusercontent.com/rPB_SZcWuxqlK5M6LpQdF_-4gm3ucQ4xuS7AMjgZJk1kseF2d20Q1GTsXPQs_aOyu8iyDpwKowjw1tw1XfyJbna5oeOSJz1n3LAEQZE=w352",
    verified:false,
    descreption:"Happy Club is the best Club all over the world. u know what? it is better to run out when i see u. cuase i'm too strong to keep ur house safe."},
    { name:"Happy Club ",
    sumnailImg:"https://lh3.googleusercontent.com/vALHImVEwEODQSOflhpMtBzFlcpFSLsx23Cl9RmeI_Kkjs55D3cqxZGpKevob-W8qXTEBw7NGbepY1MHSo8g-FpC1cgHteie-452=w352",
    profileImg:"https://lh3.googleusercontent.com/cxi2xFzMFTwzV9ooqyi5KR5ax8i4sce_1PdeLSyHIms8kTUrAih_tPtGGcslqhvB8yibvCZIIQsFrfDLq_76Hpqs72zwoo1F_bLC2Q=w352",
    verified:true,
    descreption:"Happy Club is the best Club all over the world. u know what? it is better to run out when i see u. cuase i'm too strong to keep ur house safe."},
    { name:"Happy Club ",
    sumnailImg:"https://lh3.googleusercontent.com/np9zjHHBCwZbx0026anZjJJ_9HY_StZYfD0-l_zmjrpGKS3ioB-eQ38vElOjuekV_mR411iwaK69mWW5y-4lRXOAPZOlUJ4xW4_Ayw=w352",
    profileImg:"https://lh3.googleusercontent.com/9HZDavtHY7rsjCgFlcBb3fz-nw8Zr4iHRSxjbpKSh8LNpZ2dHTHfdlRC1RRpAAkL4MnuKUCskykNx5zK0M87F1GLyCshn7G4fydlOA=w352",
    verified:false,
    descreption:"Happy Club is the best Club all over the world. u know what? it is better to run out when i see u. cuase i'm too strong to keep ur house safe."},
    { name:"Happy Club ",
    sumnailImg:"https://lh3.googleusercontent.com/lKO8Gswt-ZKxHMg6PK8caKuMhi2sW2Vp-f5ltxCi-N3hiODM3u0fbMQad-t5dockqy_Rfb5SAA0QItZgFuXsqAKGzCjWN22sqzeE=w352",
    profileImg:"https://lh3.googleusercontent.com/pDBXxExd4AV6RUTV5o9SbSoDMZZ7RX9oiv4RTJ4BXm9lBa2hwvog0bPTy19itnb-10OHXmOAWwvKUcCQFaucEkrAmfmz5WJuYaCd=w352",
    verified:true,
    descreption:"Happy Club is the best Club all over the world. u know what? it is better to run out when i see u. cuase i'm too strong to keep ur house safe."},
]