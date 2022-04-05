import Phaser from 'phaser'
import Network from '../services/Network'
import store from '../stores'
import { setRoomJoined } from '../stores/RoomStore'
import data from "./editmap.json"
import Item from "../items/Item";
import Chair from "../items/Chair";
import Computer from "../items/Computer";
import Whiteboard from "../items/Whiteboard";
import VendingMachine from "../items/VendingMachine";
import { CategoriChange,LocationInfoChange } from '../stores/EditStore'

enum MakingMode {
  CREATE, 
  DELETE
}

enum ItemCategory {
  GROUND,
  CHAIR,
  WHITEBOARD,
  WALL,
}

class Editmap extends Phaser.Scene {
  network!: Network
  private map!: Phaser.Tilemaps.Tilemap;
  computerMap = new Map<string, Computer>();
  private whiteboardMap = new Map<string, Whiteboard>();
  private keyZ!: Phaser.Input.Keyboard.Key;
  // private keyA!: Phaser.Input.Keyboard.Key;
  private mk !: MakingMode
  // private data = new Data 
  private controls
  private categori
  private keyA
  private key5 
  private keySpace
  private chairs
  private chairLayer
  constructor() {
    super('Editmap')
  }


  preload() { // 시작전 세팅 
    const mapInfo = store.getState().edit.userMap
    console.log(mapInfo,'에딧맵 맵 인포')
    this.load.image('edit', "essets/map/16x16s.png")
    // this.load.image('chairs','https://assets.repress.co.kr/photos/7247aa20193923b2d047bc29df8e4cdc/original.jpg')
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
    
    // this.load.tilemapTiledJSON('tilemap', 'essets/map/editmap.json') // 배경 다 들고오기 
    this.load.tilemapTiledJSON('tilemap', mapInfo) // 배경 다 들고오기 
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
      frameWidth: 48,
      frameHeight: 72,
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
  }

  init() { // import Network from '../services/Network'
    this.network = new Network()
  }

  

  create(data: { network: Network }) { // 백그라운드 시작

    // this.scene.launch('')
    const teste = this.make.tilemap(
      {key : '1616'}
    )
    console.log(teste,'맵이욤')
    const tests =teste.addTilesetImage('xx',"1616")
    const layer = teste.createLayer(1,tests)
    
    this.map = this.make.tilemap({ key: "tilemap" }); // 맵만들기 ⭐⭐⭐
    const FloorAndGround = this.map.addTilesetImage(
      "FloorAndGround",
      "tiles_wall"
    );
    const groundLayer = this.map.createLayer("Ground", FloorAndGround);
    groundLayer.setCollisionByProperty({ collides: true });
    
    this.cameras.main.zoom = 1 

    // 스태틱 그룹에 create 될때 추가시켜준다.
    // 이걸 전부 변수로 상태를 저장시켜준다면?

    this.chairs = this.physics.add.staticGroup({ classType: Chair });
    console.log(this.chairs,'의자들')
    this.chairLayer = this.map.getObjectLayer("Chair");
    this.chairLayer.objects.forEach((chairObj) => {
      const item = this.addObjectFromTiled(
        this.chairs,
        chairObj,
        "chairs",
        "chair"
      ).setInteractive() as Chair;
      // custom properties[0] is the object direction specified in Tiled
      item.itemDirection = chairObj.properties[0].value;
    });

    const computers = this.physics.add.staticGroup({ classType: Computer });
    const computerLayer = this.map.getObjectLayer("Computer");
    computerLayer.objects.forEach((obj, i) => {
      const item = this.addObjectFromTiled(
        computers,
        obj,
        "computers",
        "computer"
      ) as Computer;
      item.setDepth(item.y + item.height * 0.27);
      const id = `${i}`;
      item.id = id;
      this.computerMap.set(id, item);
    });

    // import whiteboards objects from Tiled map to Phaser
    const whiteboards = this.physics.add.staticGroup({ classType: Whiteboard });
    const whiteboardLayer = this.map.getObjectLayer("Whiteboard");
    whiteboardLayer.objects.forEach((obj, i) => {
      const item = this.addObjectFromTiled(
        whiteboards,
        obj,
        "whiteboards",
        "whiteboard"
      ) as Whiteboard;
      const id = `${i}`;
      item.id = id;
      this.whiteboardMap.set(id, item);
    });

    // import vending machine objects from Tiled map to Phaser
    const vendingMachines = this.physics.add.staticGroup({
      classType: VendingMachine,
    });
    const vendingMachineLayer = this.map.getObjectLayer("VendingMachine");
    vendingMachineLayer.objects.forEach((obj, i) => {
      this.addObjectFromTiled(
        vendingMachines,
        obj,
        "vendingmachines",
        "vendingmachine"
      );
    });

    // import other objects from Tiled map to Phaser
    this.addGroupFromTiled("Wall", "tiles_wall", "FloorAndGround", false);
    this.addGroupFromTiled(
      "Objects",
      "office",
      "Modern_Office_Black_Shadow",
      false
    );
    this.addGroupFromTiled(
      "ObjectsOnCollide",
      "office",
      "Modern_Office_Black_Shadow",
      true
    );
    this.addGroupFromTiled("GenericObjects", "generic", "Generic", false);
    this.addGroupFromTiled(
      "GenericObjectsOnCollide",
      "generic",
      "Generic",
      true
    );
    this.addGroupFromTiled("Basement", "basement", "Basement", true);

    var cursors = this.input.keyboard.createCursorKeys();
    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        down : cursors.down,
        up: cursors.up,
        speed: 0.5
    };

    this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    this.key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);

    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  private handleItemSelectorOverlap(playerSelector, selectionItem) {
    const currentItem = playerSelector.selectedItem as Item; // 가까이 가면 ?
    if (currentItem) {
      // 상호작용 물품이 있을 떄
      // 상호작용 물품이 그대로이면 ?
      if (
        currentItem === selectionItem ||
        currentItem.depth >= selectionItem.depth
      ) {
        return;
      }
      //상호작용 취소하기
      // if (this.myPlayer.playerBehavior !== PlayerBehavior.SITTING)
      //   currentItem.clearDialogBox();
    }

    // 새로운 상호작용 템 등록
    playerSelector.selectedItem = selectionItem;
    selectionItem.onOverlapDialog();
  }

  private addObjectFromTiled(
    //⭐ '타일' 관련.. idk
    group: Phaser.Physics.Arcade.StaticGroup,
    object: Phaser.Types.Tilemaps.TiledObject,
    key: string,
    tilesetName: string
  ) {
    const actualX = object.x! + object.width! * 0.5;
    const actualY = object.y! - object.height! * 0.5;
    const obj = group
      .get(
        actualX,
        actualY,
        key,
        // 프레임
        object.gid! - this.map.getTileset(tilesetName).firstgid
      )
      .setDepth(actualY);
    // console.log(obj)
    return obj;
  }

  private addGroupFromTiled(
    // ⭐ 타일 관련.. idk
    objectLayerName: string,
    key: string,
    tilesetName: string,
    collidable: boolean
  ) {
    
    const group = this.physics.add.staticGroup();
    const objectLayer = this.map.getObjectLayer(objectLayerName);
    objectLayer.objects.forEach((object) => {
      const actualX = object.x! + object.width! * 0.5;
      const actualY = object.y! - object.height! * 0.5;
      group
        .get(
          actualX,
          actualY,
          key,
          object.gid! - this.map.getTileset(tilesetName).firstgid
        )
        .setDepth(actualY);
    });
    
  }

  // // 만든 내용에 대한 저장을 위한 토큰 매번 새로 불러와지면 초기로 세팅
  private makeArr = []
  private nftArr = []

  
  modeChange(makingMode : MakingMode) {
    if (makingMode === MakingMode.CREATE) {
      this.mk = MakingMode.CREATE
      // console.log('변경됨')
    } else {
      this.mk = MakingMode.DELETE
      // console.log('삭제로 변경')
    }
  }

  changeCategori(categori : ItemCategory) {
    // 변경 입력을 받은 카테고리 정보로 갱신시켜준다.
    this.categori = categori
    
  }
  
  // 카테고리별로 분류하는 함수
  editlayerCollect(categori: ItemCategory) {
    // console.log('아잉')
    switch(this.categori) {
      case ItemCategory.GROUND:
        // 그라운드에 맞는 속성을 부여한다.
        // console.log('Ground')
        break
      case ItemCategory.CHAIR:
        // console.log('Chair')
        break
      case ItemCategory.WALL:
        // console.log('Wall')
        break
      case ItemCategory.WHITEBOARD:
        // console.log('WhiteBoard')
        break
    }
  }


  update(t: number, dt: number) {  // 매 프레임 update

    // 카메라 무빙 with 키보드
    this.controls.update(dt)
    // console.log(this.add.image(200,500,"office"),'오피스')
    // this.add.image(200,500,"office")
    var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
    var pointTilex = this.map.worldToTileX(this.game.input.mousePointer.worldX)
    var pointTileY = this.map.worldToTileY(this.game.input.mousePointer.worldY);
    // console.log(pointTilex, pointTileY)
    let marker = this.add.graphics(); 
    marker.x = this.map.tileToWorldX(pointTilex);
    marker.y = this.map.tileToWorldY(pointTileY);

    // console.log(marker.x)
    if (this.input.manager.activePointer.isDown){
      const location = { x: marker.x, y : marker.y }
      store.dispatch(LocationInfoChange(location))
    }
  
    
    
    }
    

    
  
}

export default Editmap;


// 클릭할때 물건 배치하기
// if (this.input.manager.activePointer.isDown)
//     { 
//           console.log('여기와쯤')

//           // 여기가 클릭한거별로 바뀌어야함
//           const chairs = this.physics.add.staticGroup({ classType: Chair })
//           const chairLayer = this.map.getObjectLayer('Chair')
//           // chairLayer.objects.forEach((chairObj) => {
//             const item = this.addObjectFromTiled(chairs, {"gid":2564,
//             "height":64,
//             "id":335,
//             "name":"",
//             "properties":[
//                   {
//                   "name":"direction",
//                   "type":"string",
//                   "value":"down"
//                   }],
//             "rotation":0,
//             "type":"",
//             "visible":true,
//             "width":32,
//             "x":this.game.input.mousePointer.worldX,
//             "y":this.game.input.mousePointer.worldY
//           }, 'chairs', 'chair') as Chair
//           item.itemDirection = "down"
//           console.log(data,'데이터')
//           console.log(data.layers[2].objects)
//         }


///
// 모드 변경에 따른 문제점 발견 해결중....
// if (this.mk === MakingMode.CREATE) {

// } else {
//   // console.log('삭제모드')
// }
// // 모드별로 변경되어야합니다.
// this.categori = ItemCategory.GROUND
// // console.log(this.categori,'카테고리')
// this.editlayerCollect(this.categori)
// // 이전 액션


// // console.log(this.mk)
// if (this.mk === MakingMode.CREATE) {
//   if (this.input.manager.activePointer.isDown)
//   {         
//     // console.log(this.chairs)
//     const chair = this.physics.add.staticGroup({ classType: Chair });
//     // console.log(this.chairs,'의자정보')
//     // const chair = this.chairs
//       const item = this.addObjectFromTiled(chair, {"gid":2564,
//       "height":64,
//       "id":335,
//       "name":"",
//       "properties":[
//             {
//             "name":"direction",
//             "type":"string",
//             "value":"down"
//             }],
//       "rotation":0,
//       "type":"",
//       "visible":true,
//       "width":32,
//       "x":this.game.input.mousePointer.worldX,
//       "y":this.game.input.mousePointer.worldY
//     }, 'chairs', 'chair') as Chair
//     item.itemDirection = "down"
  
//     // 우리의 객체에 추가
//     const prevChairs = chair.children.entries
//     console.log(prevChairs)
//     const newChair = [...prevChairs , item]
//     console.log(newChair, "뉴체어")
//     this.chairs.children.entries.push(item)
//     console.log(this.chairs.children.entries,'정보업데이트가 되었나욤?')
//   }
// } else {
//   if (this.input.manager.activePointer.isDown){
//     const newArr = this.chairs.children.entries

//     this.chairs.children.entries = newArr.map((obj,i) => {
      
//     })
    
    
//   }
// }


// // 키보드 이벤트 추가하는 방법
// if (this.keyA.isDown) {
//   console.log('a')
// } 
// if (this.key5.isDown) { 
//   console.log('5')
// }