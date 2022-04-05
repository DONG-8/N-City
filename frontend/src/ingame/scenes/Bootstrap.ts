import Phaser from 'phaser'
import Network from '../services/Network'
import store from '../stores'
import { setRoomJoined } from '../stores/RoomStore'
import stores from '../../store'
import basicData from './editmap.json';

enum BackgroundMode {
  DAY,
  NIGHT,
}

enum GameMode {
  GAME,
  EDIT
}

export default class Bootstrap extends Phaser.Scene {
  network!: Network
  mapInfo = basicData
  myArtList = {content:[{productThumbnailUrl:'', productId:0}]}

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

    this.load.tilemapTiledJSON('tilemap', this.mapInfo) // 배경 다 들고오기 

    this.load.spritesheet('tiles_wall', 'essets/map/FloorAndGround.png', { // items 사이즈 지정 
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
    this.load.spritesheet('vendingmachines', 'essets/items/vendingmachine.png', {
      frameWidth: 96,
      frameHeight: 96,
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
    this.load.spritesheet('generic2', 'essets/items/Generic.png', {
      frameWidth: 96,
      frameHeight: 128,
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

    // 사용자가 가진 이미지 로드 
    {this.myArtList.content.map((product, idx) => {
      return (
        this.load.spritesheet(`${product.productId}`, `https://ncity-bucket-resize.${product.productThumbnailUrl.slice(21)}`, {
          frameWidth: 120,
          frameHeight: 120,
        })
      )
    })}
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

  launchGame(gameMode : GameMode) { 
    this.network.webRTC?.checkPreviousPermission()
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

  changeGameMode(gameMode: GameMode) {
    if (gameMode === GameMode.EDIT) {
      this.scene.stop('game')
      this.scene.launch('Editmap')
      console.log('게임모드 변경에딧맵으로오ㅗ오오오')
    }
    else {
      this.scene.stop('Editmap')
      this.network.webRTC?.checkPreviousPermission()
      this.scene.launch('game', {network: this.network})
      console.log('게임모드 변경')
      store.dispatch(setRoomJoined(false))
    }
  }
}
