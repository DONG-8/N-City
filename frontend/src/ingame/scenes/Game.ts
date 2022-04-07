import { ItemType } from './../items/Item';
import { IPlayer } from './../../types/IOfficeState';
import Phaser from 'phaser'
import { createCharacterAnims } from '../anims/CharacterAnims'
import Item from '../items/Item'
import Chair from '../items/Chair'
import Computer from '../items/Computer'
import Whiteboard from '../items/Whiteboard'
import VendingMachine from '../items/VendingMachine'
import '../characters/MyPlayer'
import '../characters/OtherPlayer'
import MyPlayer from '../characters/MyPlayer'
import OtherPlayer from '../characters/OtherPlayer'
import PlayerSelector from '../characters/PlayerSelector'
import Network from '../services/Network'
import { PlayerBehavior } from '../../types/PlayerBehavior'
import store from '../stores'
import { setFocused, setShowChat } from '../stores/ChatStore'
import stores from "../stores"

enum GameMode {
  GAME,
  EDIT
}

export default class Game extends Phaser.Scene {
  myArtList = {content:[{productThumbnailUrl:'', productId:0, productView:true, productXCoordinate:0, productYCoordinate: 0}]}

  network!: Network // null이 될수가 없는 변수에 대해서 지정
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private keyE!: Phaser.Input.Keyboard.Key
  private keyR!: Phaser.Input.Keyboard.Key
  private map!: Phaser.Tilemaps.Tilemap 
  myPlayer!: MyPlayer
  private playerSelector!: Phaser.GameObjects.Zone // 직사각형 게임 개체
  private otherPlayers!: Phaser.Physics.Arcade.Group // 느낌표를 붙이는 이유 ? 값이 있다고 확신을 주는 
  private otherPlayerMap = new Map<string, OtherPlayer>()
  computerMap = new Map<string, Computer>()
  private whiteboardMap = new Map<string, Whiteboard>()
  private Setting = stores.getState().edit.EditMode
  constructor() {
    super('game')
  }

  registerKeys() { // 키 편하게 쓰게 등록 하기 
    this.cursors = this.input.keyboard.createCursorKeys()
    this.keyE = this.input.keyboard.addKey('E')
    this.keyR = this.input.keyboard.addKey('R')
    this.input.keyboard.disableGlobalCapture()
    this.input.keyboard.on('keydown-ENTER', (event) => {
      store.dispatch(setShowChat(true)) // 엔터치면 채팅보기 
      store.dispatch(setFocused(true))
    })
    this.input.keyboard.on('keydown-ESC', (event) => {
      store.dispatch(setShowChat(false))
    })
    this.input.keyboard.on('keydown-CTRL', (event) => {
      console.log('캐릭터 x 좌표 : ',this.myPlayer.x)
      console.log('캐릭터 y 좌표 : ',this.myPlayer.y)
    })
  }

  
  disableKeys() { // 키보드 사용불가 
    this.input.keyboard.enabled = false
  }

  enableKeys() {
    this.input.keyboard.enabled = true
  }

  create(data: { network: Network}) {
    if (!data.network) {
      throw new Error('server instance missing')
    } else {
      this.network = data.network
    }
    
    this.cameras.main.zoom = 1.6
    
    createCharacterAnims(this.anims)

    this.map = this.make.tilemap({ key: 'tilemap' }) // 맵만들기 ⭐⭐⭐
    console.log(this.map)
    const FloorAndGround = this.map.addTilesetImage('FloorAndGround', 'tiles_wall')
    
    const groundLayer = this.map.createLayer('Ground', FloorAndGround)
    console.log(groundLayer)
    groundLayer.setCollisionByProperty({ collides: true })

    // debugDraw(groundLayer, this) // 만들어둔 debug 사용해보기

    this.myPlayer = this.add.myPlayer(705, 500, 'adam', this.network.mySessionId) // 시작 할때 캐릭터 위치 설정
    this.playerSelector = new PlayerSelector(this, 0, 0, 16, 16) // ⭐player selector가 뭘까

    // 의자 위치 잡기
    const chairs = this.physics.add.staticGroup({ classType: Chair })
    const chairLayer = this.map.getObjectLayer('Chair')
    chairLayer.objects.forEach((chairObj) => {
      const item = this.addObjectFromTiled(chairs, chairObj, 'chairs', 'chair') as Chair
      // custom properties[0] is the object direction specified in Tiled
      item.itemDirection = chairObj.properties[0].value
    })
    
    // import computers objects from Tiled map to Phaser
    const computers = this.physics.add.staticGroup({ classType: Computer })
    const computerLayer = this.map.getObjectLayer('Computer')
    computerLayer.objects.forEach((obj, i) => {
      const item = this.addObjectFromTiled(computers, obj, 'computers', 'computer') as Computer
      item.setDepth(item.y + item.height * 0.27)
      const id = `${i}`
      item.id = id
      this.computerMap.set(id, item)
      item.name = "computer"
    })

    // import whiteboards objects from Tiled map to Phaser
    // whiteboard 에서 가지는 물리법칙 적용
    const whiteboards = this.physics.add.staticGroup({ classType: Whiteboard })
    // 화이트보드 레이어를 map.json 에서 가져옴
    const whiteboardLayer = this.map.getObjectLayer('Whiteboard')
    // 이 화이트 보드 레이어의 모든 정보를 순회하면서, wihteboard 물리 법칙과,
    // whiteboard.ts 에서 상속받은 함수들을 적용시켜줌
    whiteboardLayer.objects.forEach((obj, i) => {
      const item = this.addObjectFromTiled(
        whiteboards,
        obj,
        'whiteboards',
        'whiteboard'
      ) as Whiteboard
      // console.log(item,'아이템 뽑아왔어요')
      const id = `${i}`
      item.id = id
      // console.log(this.whiteboardMap, '화이트보트맵', id)
      this.whiteboardMap.set(id, item)
    })

    // import vending machine objects from Tiled map to Phaser
    const vendingMachines = this.physics.add.staticGroup({ classType: VendingMachine })
    // const vendingMachineLayer = this.map.getObjectLayer('VendingMachine')
    // console.log(vendingMachineLayer)
    // vendingMachineLayer.objects.forEach((obj, i) => {
    //   this.addObjectFromTiled(vendingMachines, obj, 'vendingmachines', 'vendingmachine')
    // })

    // 작품 세팅
    {this.myArtList.content.map((product, idx) => {
      if (product.productView) {
        // this.add.image(product.productXCoordinate, productYCoordinate, `${this.itemGid}`).setDepth(this.marker.y+16).setInteractive()
        vendingMachines.get(product.productXCoordinate, product.productYCoordinate, String(product.productId), String(product.productId))
        .setDepth(10)
      }
    })}
    
    this.addGroupFromTiled('Wall', 'tiles_wall', 'FloorAndGround', false)
    this.addGroupFromTiled('Objects', 'office', 'Modern_Office_Black_Shadow', false)
    this.addGroupFromTiled('ObjectsOnCollide', 'office', 'Modern_Office_Black_Shadow', true)
    this.addGroupFromTiled('GenericObjects', 'generic', 'Generic', false)
    this.addGroupFromTiled('GenericObjectsOnCollide', 'generic', 'Generic', true)
    this.addGroupFromTiled('Basement', 'basement', 'Basement', true)
    this.otherPlayers = this.physics.add.group({ classType: OtherPlayer })

    
    this.cameras.main.startFollow(this.myPlayer, true) // 인칭

    this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], groundLayer) // 충돌나는 물건들 
    // this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], vendingMachines) //  충돌
   
    this.physics.add.overlap( // ⭐ 이거 없으면 상호작용 불가
      this.playerSelector,
      [chairs, computers, whiteboards, vendingMachines],
      this.handleItemSelectorOverlap,
      undefined,
      this
    )

    this.physics.add.overlap(  // 겹침가능
      this.myPlayer,
      this.otherPlayers,
      this.handlePlayersOverlap,
      undefined,
      this
    )

    // network event listeners 등록
    this.network.onPlayerJoined(this.handlePlayerJoined, this)
    this.network.onPlayerLeft(this.handlePlayerLeft, this)
    this.network.onMyPlayerReady(this.handleMyPlayerReady, this)
    this.network.onMyPlayerVideoConnected(this.handleMyVideoConnected, this)
    this.network.onPlayerUpdated(this.handlePlayerUpdated, this)
    this.network.onItemUserAdded(this.handleItemUserAdded, this)
    this.network.onItemUserRemoved(this.handleItemUserRemoved, this)
    this.network.onChatMessageAdded(this.handleChatMessageAdded, this)
  }

  private handleItemSelectorOverlap(playerSelector, selectionItem) {
    const currentItem = playerSelector.selectedItem as Item // 가까이 가면 ?
    if (currentItem) { // 상호작용 물품이 있을 떄
      // 상호작용 물품이 그대로이면 ?
      if (currentItem === selectionItem || currentItem.depth >= selectionItem.depth) {
        return
      }
      //상호작용 취소하기  
      if (this.myPlayer.playerBehavior !== PlayerBehavior.SITTING) currentItem.clearDialogBox()
    }

    // 새로운 상호작용 템 등록
    playerSelector.selectedItem = selectionItem
    selectionItem.onOverlapDialog()
  }

  private addObjectFromTiled( //⭐ 타일 관련.. idk
    group: Phaser.Physics.Arcade.StaticGroup,
    object: Phaser.Types.Tilemaps.TiledObject,
    key: string,
    tilesetName: string
  ) {
    const actualX = object.x! + object.width! * 0.5
    const actualY = object.y! - object.height! * 0.5
    const obj = group
      .get(actualX, actualY, key, object.gid! - this.map.getTileset(tilesetName).firstgid)
      .setDepth(actualY)
    return obj
  }

  private addGroupFromTiled( // ⭐ 타일 관련.. idk
    objectLayerName: string,
    key: string,
    tilesetName: string,
    collidable: boolean
  ) {
    const group = this.physics.add.staticGroup()
    const objectLayer = this.map.getObjectLayer(objectLayerName)
    objectLayer.objects.forEach((object) => {
      const actualX = object.x! + object.width! * 0.5
      const actualY = object.y! - object.height! * 0.5
      // if (objectLayerName === 'GenericObjects') {
      //   actualY = 1
      // }
      group
        .get(actualX, actualY, key, object.gid! - this.map.getTileset(tilesetName).firstgid)
        .setDepth(actualY)
    })
    if (this.myPlayer && collidable)
      this.physics.add.collider([this.myPlayer, this.myPlayer.playerContainer], group)
  }

  // 새로운 player가 들어왔을 때  추가해주기
  private handlePlayerJoined(newPlayer: IPlayer, id: string) {
    const otherPlayer = this.add.otherPlayer(newPlayer.x, newPlayer.y, 'adam', id, newPlayer.name)
    this.otherPlayers.add(otherPlayer)
    this.otherPlayerMap.set(id, otherPlayer)
  }

  // player가 나갔을떄
  private handlePlayerLeft(id: string) {
    if (this.otherPlayerMap.has(id)) {
      const otherPlayer = this.otherPlayerMap.get(id)
      if (!otherPlayer) return
      this.otherPlayers.remove(otherPlayer, true, true)
      this.otherPlayerMap.delete(id)
    }
  }

  private handleMyPlayerReady() {
    this.myPlayer.readyToConnect = true
  }

  private handleMyVideoConnected() {
    this.myPlayer.videoConnected = true
  }

  // 위치변동 되었을 때 
  private handlePlayerUpdated(field: string, value: number | string, id: string) {
    const otherPlayer = this.otherPlayerMap.get(id)
    otherPlayer?.updateOtherPlayer(field, value)
  }

  private handlePlayersOverlap(myPlayer, otherPlayer) {
    otherPlayer.makeCall(myPlayer, this.network?.webRTC)
  }

  private handleItemUserAdded(playerId: string, itemId: string, itemType: ItemType) {
    if (itemType === ItemType.COMPUTER) { // 컴퓨터 , 화이트 보드 // 아이템 등록할 때 적어야 하는곳
      const computer = this.computerMap.get(itemId)
      computer?.addCurrentUser(playerId)
    } else if (itemType === ItemType.WHITEBOARD) {
      const whiteboard = this.whiteboardMap.get(itemId)
      whiteboard?.addCurrentUser(playerId)
    }
  }

  private handleItemUserRemoved(playerId: string, itemId: string, itemType: ItemType) {
    if (itemType === ItemType.COMPUTER) {
      const computer = this.computerMap.get(itemId)
      computer?.removeCurrentUser(playerId)
    } else if (itemType === ItemType.WHITEBOARD) {
      const whiteboard = this.whiteboardMap.get(itemId)
      whiteboard?.removeCurrentUser(playerId)
    }
  }

  private handleChatMessageAdded(playerId: string, content: string) { // 채팅추가 , 말풍선 추가
    const otherPlayer = this.otherPlayerMap.get(playerId)
    otherPlayer?.updateDialogBubble(content)
  }

  update(t: number, dt: number) {  // 매 프레임 update
    if (this.myPlayer && this.network) {
      this.playerSelector.update(this.myPlayer, this.cursors)
      this.myPlayer.update(this.playerSelector, this.cursors, this.keyE, this.keyR, this.network)
    }

    var worldPoint = this.input.activePointer.positionToCamera(
      this.cameras.main
    )
    var pointTilex = this.map.worldToTileX(this.game.input.mousePointer.worldX)
    var pointTileY = this.map.worldToTileY(this.game.input.mousePointer.worldY);
    let marker = this.add.graphics(); 
    marker.x = this.map.tileToWorldX(pointTilex);
    marker.y = this.map.tileToWorldY(pointTileY);
  }
}


