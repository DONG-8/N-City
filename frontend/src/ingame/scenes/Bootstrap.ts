import Phaser from 'phaser'
import { stringify } from 'querystring'
import Network from '../services/Network'
import store from '../stores'
import { setRoomJoined } from '../stores/RoomStore'
const ROOMNUM = localStorage.getItem('roomNum')

export const TOKENS = {
  1:'https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/e625d60d-ebb4-45af-96a0-7986e2ac9f3f.jpg',
  2:'https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/d9e65217-8f00-49b8-bd71-b66d9ebcb4fe.png',
  3:'https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/ee371e46-c1aa-4f35-b6bf-d0bcb66684e1.png',
  4:'https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/6488c6ea-55de-44be-bd52-4c66648c2bb6.png',
  5:'https://ncity-bucket.s3.ap-northeast-2.amazonaws.com/1e2cd99e-2270-4375-ab9a-bd8e314685ac.jpg',
}

enum BackgroundMode {
  DAY,
  NIGHT,
}

export default class Bootstrap extends Phaser.Scene {
  network!: Network
  
  constructor() {
    super('bootstrap')
  }
  
  preload() { // 시작전 세팅 
    this.load.atlas( // atlas 는 여러개의 스프라이트를 한장의 큰 텍스쳐에 모아놓은 것 
      'cloud_day',
      'essets/background/cloud_day.png',
      'essets/background/cloud_day.json'
    ) //배경 가져오기
    this.load.image('backdrop_day', 'essets/background/backdrop_day.png') //
    this.load.atlas(
      'cloud_night',
      'essets/background/cloud_night.png',
      'essets/background/cloud_night.json'
    )
    this.load.image('backdrop_night', 'essets/background/backdrop_night.png')
    this.load.image('sun_moon', 'essets/background/sun_moon.png')
    // this.load.tilemapTiledJSON('tilemap', `essets/map/map${ROOMNUM}.json`) // 배경 다 들고오기 
    this.load.tilemapTiledJSON('tilemap', `essets/map/map.json`) // 배경 다 들고오기 
    //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
    this.load.spritesheet({
      key:'vendingmachines',
      url: TOKENS[1],
      frameConfig:{frameWidth: 120,frameHeight: 80},
    })
    this.load.spritesheet({
      key:'vendingmachines2',
      url:TOKENS[2],
      frameConfig:{frameWidth:  120,frameHeight: 80},
    })
    this.load.spritesheet({
      key:'vendingmachines3',
      url:TOKENS[3],
      frameConfig:{frameWidth: 120,frameHeight:  80},
    })
    this.load.spritesheet({
      key:'vendingmachines4',
      url:TOKENS[4],
      frameConfig:{frameWidth: 120,frameHeight:  80,},
    })
    this.load.spritesheet({
      key:'vendingmachines5',
      url:TOKENS[5],
      frameConfig:{frameWidth: 120,frameHeight:  80},
    })
  //⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

    this.load.spritesheet('tiles_wall', 'essets/map/FloorAndGround.png'
    ,{ // items 사이즈 지정 
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('chairs', 'essets/items/chair.png', {
      frameWidth: 32,
      frameHeight: 64,
    })
    this.load.spritesheet('computers', 'essets/items/computer.png', {
      frameWidth: 96,
      frameHeight: 64,
    })
    this.load.spritesheet('whiteboards', 'essets/items/whiteboard.png', {
      frameWidth: 64,
      frameHeight: 64,
    })
    
    this.load.spritesheet('office', 'essets/items/Modern_Office_Black_Shadow.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('basement', 'essets/items/Basement.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('generic', 'essets/items/Generic.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('adam', 'essets/character/adam.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.spritesheet('ash', 'essets/character/ash.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.spritesheet('lucy', 'essets/character/lucy.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.spritesheet('nancy', 'essets/character/nancy.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
    
  }

  init() { // import Network from '../services/Network'
    this.network = new Network()
  }

  create() { // 백그라운드 시작
    this.launchBackground(store.getState().user.backgroundMode)
    
  }

  private launchBackground(backgroundMode: BackgroundMode) { // 위에서 실행 
    this.scene.launch('background', { backgroundMode })
  }

  launchGame() { // 
    // this.network.webRTC?.checkPreviousPermission()
    this.scene.launch('game', {
      network: this.network,
    })
    // ReduxStore 관련 
    store.dispatch(setRoomJoined(true))
  }

  changeBackgroundMode(backgroundMode: BackgroundMode) {
    this.scene.stop('background')
    this.launchBackground(backgroundMode)
  }
}
