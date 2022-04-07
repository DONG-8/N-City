import Phaser from 'phaser'
import Network from '../services/Network'
import store from '../stores'
import Chair from "../items/Chair";
import Computer from "../items/Computer";
import Whiteboard from "../items/Whiteboard";
import VendingMachine from "../items/VendingMachine";
import { LocationInfoChange } from "../stores/EditStore";
import Item from 'antd/lib/list/Item';

enum ItemCategory {
  GROUND,
  WALL,
  CHAIR,
  GENERIC,
  INTERACTION,
  RUGS,
  STAIRS,
  TABLES,
  WINDOW_DOOR,
  BASEMENT,
  STRUCTURE,
  MYART
}

class Editmap extends Phaser.Scene {
  selectedItemC = ItemCategory.GROUND;
  itemGid = 198;
  itemWidth = 32;
  itemHeight = 32;
  isCreateMode = true;
  myArtList = {content:[{productThumbnailUrl:'', productId:0, productView:true, productXCoordinate:0, productYCoordinate: 0}]}
  
  private marker;

  network!: Network
  private map!: Phaser.Tilemaps.Tilemap;
  computerMap = new Map<string, Computer>();
  private whiteboardMap = new Map<string, Whiteboard>();
 
  constructor() {
    super('Editmap')
  }

  preload() { // 시작전 세팅 

    this.load.image('backdrop_day', 'essets/background/backdrop_day.png')
    
    // this.load.tilemapTiledJSON('tilemap1', 'essets/map/editmap.json') // 배경 다 들고오기 

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
    this.cameras.main.zoom = 1

    this.map = this.make.tilemap({ key: "tilemap" }); // 맵만들기 ⭐⭐⭐
    const FloorAndGround = this.map.addTilesetImage(
      "FloorAndGround",
      "tiles_wall"
    );

    this.input.on('gameobjectdown', function(this:any, mousePointer, gameObjects) {
      if(this.isCreateMode == false) {
        gameObjects.destroy();
        console.log(gameObjects)
        if (gameObjects.name === "10") {  // 작품일 경우 삭제 
          store.dispatch(LocationInfoChange({x:gameObjects.texture.key, y:0, gid:Number(gameObjects.name)}));
        } else {
          store.dispatch(LocationInfoChange({x:gameObjects.x-16, y:gameObjects.y+32, gid:Number(gameObjects.name)}));
        }
      }
    }, this)

    this.input.on('pointerdown', function(this:any, mousePointer){
      this.setObject()
    }, this)

    // 💨 마우스 따라가기 💨💨💨💨💨💨💨💨💨💨💨💨💨

    // let cursor = this.add.image(0, 0, 'chairs', this.itemGid-2561).setVisible(false)
    // cursor = this.add.image(0, 0, 'chairs', this.itemGid-2560).setVisible(false)
    // this.input.on('pointermove', function (mousePointer){
    //   console.log(mousePointer.x, mousePointer.y)
    //   cursor.setVisible(true).setPosition(mousePointer.x, mousePointer.y).setDepth(100000)
    // }, this)

    this.marker = this.add.graphics({ lineStyle: { width: 3, color: 0xffffff, alpha: 1 } });
    this.marker.strokeRect(0, 0, 32, 32);
    
    const groundLayer = this.map.createLayer("Ground", FloorAndGround);
    groundLayer.setCollisionByProperty({ collides: true });

    const chairs = this.physics.add.staticGroup({ classType: Chair });
    const chairLayer = this.map.getObjectLayer("Chair");
    chairLayer.objects.forEach((chairObj) => {
      const item = this.addObjectFromTiled(
        chairs,
        chairObj,
        "chairs",
        "chair"
      ).setInteractive() as Chair;
      item.itemDirection = chairObj.properties[0].value;
      item.name = "2"
    });

    // import computers objects from Tiled map to Phaser
    const computers = this.physics.add.staticGroup({ classType: Computer });
    const computerLayer = this.map.getObjectLayer("Computer");
    computerLayer.objects.forEach((obj, i) => {
      const item = this.addObjectFromTiled(
        computers,
        obj,
        "computers",
        "computer"
      ).setInteractive() as Computer;
      item.setDepth(item.y + item.height * 0.27);
      const id = `${i}`;
      item.id = id;
      this.computerMap.set(id, item);
      item.name = "8"
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
      ).setInteractive() as Whiteboard;
      const id = `${i}`;
      item.id = id;
      this.whiteboardMap.set(id, item);
      item.name="7"
    });

    // import vending machine objects from Tiled map to Phaser
    const vendingMachines = this.physics.add.staticGroup({
      classType: VendingMachine,
    });
    // const vendingMachineLayer = this.map.getObjectLayer("VendingMachine");
    // vendingMachineLayer.objects.forEach((obj, i) => {
    //   this.addObjectFromTiled(
    //     vendingMachines,
    //     obj,
    //     "vendingmachines",
    //     "vendingmachine"
    //   ).setInteractive();
    // });
    {this.myArtList.content.map((product, idx) => {
      console.log(this.myArtList)
      if (product.productView) {
        console.log(product.productId)
        // this.add.image(product.productXCoordinate, productYCoordinate, `${this.itemGid}`).setDepth(this.marker.y+16).setInteractive()
        vendingMachines.get(product.productXCoordinate, product.productYCoordinate, String(product.productId), String(product.productId))
        .setDepth(product.productYCoordinate).setInteractive().setName("10")
      }
    })}

    // import other objects from Tiled map to Phaser
    this.addGroupFromTiled("Wall", "tiles_wall", "FloorAndGround", false, "1");
    this.addGroupFromTiled(
      "Objects",
      "office",
      "Modern_Office_Black_Shadow",
      false,
      "3"
    );
    this.addGroupFromTiled(
      "ObjectsOnCollide",
      "office",
      "Modern_Office_Black_Shadow",
      true,
      "4"
    );
    this.addGroupFromTiled("GenericObjects", "generic", "Generic", false, "5");
    this.addGroupFromTiled(
      "GenericObjectsOnCollide",
      "generic",
      "Generic",
      true,
      "6"
    );
    this.addGroupFromTiled("Basement", "basement", "Basement", true, "9");
  }

  private setObject(){
    var pointTileX = this.map.worldToTileX(this.game.input.mousePointer.worldX)
    var pointTileY = this.map.worldToTileY(this.game.input.mousePointer.worldY);

    if (this.isCreateMode) {
      switch (this.selectedItemC) {
        case ItemCategory.GROUND:
          const tileInfo = this.map.getTileAt(pointTileX, pointTileY)
          console.log(tileInfo.index) // 타일 (타일 모양) 
          console.log(tileInfo.y*40 + tileInfo.x - 1) // 타일 위치 (인덱스)
          this.map.putTileAtWorldXY(this.itemGid, this.marker.x, this.marker.y)
          console.log(this.marker.x, this.marker.y)
          this.marker.x = tileInfo.y*40 + tileInfo.x - 1  // 타일 위치 (인덱스)
          store.dispatch(LocationInfoChange({x:this.marker.x+1, y:0, gid:tileInfo.index}));
          break
        // case ItemCategory.STRUCTURE:
          // this.map.putTileAtWorldXY(this.itemGid+1, mousePointer.x, mousePointer.y)
          // if (this.itemHeight === 64) {
          //   this.map.putTileAtWorldXY(this.itemGid+65, mousePointer.x, mousePointer.y+63)
          // }
          //   break
        case ItemCategory.WALL:
          // this.physics.add.staticSprite(this.marker.x+16, this.marker.y+16, 'tiles_wall', this.itemGid-1).setDepth(this.marker.y+16).setInteractive()
          // this.map.putTileAtWorldXY(this.itemGid, this.marker.x, this.marker.y)
          this.map.putTileAtWorldXY(this.itemGid, this.marker.x, this.marker.y)
          this.map.putTileAtWorldXY(this.itemGid+4, this.marker.x, this.marker.y+63)
          this.map.putTileAtWorldXY(this.itemGid+4, this.marker.x, this.marker.y+95)
          
          this.map.putTileAtWorldXY(this.itemGid+4, this.marker.x, this.marker.y+127)
          this.map.putTileAtWorldXY(this.itemGid+64, this.marker.x, this.marker.y+159)
          // store.dispatch(LocationInfoChange({x:this.marker.x-32, y:this.marker.y+32, gid:this.itemGid}));
          // store.dispatch(LocationInfoChange({x:this.marker.x+1, y:0, gid:this.itemGid}));
          break
        case ItemCategory.INTERACTION: 
          if(this.itemGid < 4685) {
            this.physics.add.staticSprite(this.marker.x+16, this.marker.y, 'computers', this.itemGid-4680).setDepth(this.marker.y).setInteractive()
            .setName("8")
          } else {
            this.physics.add.staticSprite(this.marker.x+16, this.marker.y, 'whiteboards', this.itemGid-4685).setDepth(this.marker.y).setInteractive()
            .setName("7")
          }
          store.dispatch(LocationInfoChange({x:this.marker.x-32, y:this.marker.y+32, gid:this.itemGid}));
          break
        case ItemCategory.CHAIR: 
          this.add.image(this.marker.x+16, this.marker.y, 'chairs', this.itemGid-2561).setDepth(this.marker.y).setInteractive().setName("2")
          store.dispatch(LocationInfoChange({x:this.marker.x, y:this.marker.y+32, gid:this.itemGid}));
          break
        case ItemCategory.GENERIC: case ItemCategory.WINDOW_DOOR:
          var w = this.itemWidth/ 32
          var h = this.itemHeight / 32
          for (let i = 0; i< w; i ++){
            for (let j = 0; j< h; j ++){
              this.add.image(this.marker.x+16+(i*32), this.marker.y+16+(j*32), 'generic', this.itemGid+(i+j*16)).setDepth(this.marker.y+16+(j*32)).setInteractive()
              .setName(this.selectedItemC === ItemCategory.GENERIC ? "6" : "5")
              store.dispatch(LocationInfoChange({x:this.marker.x-32+(i*32), y:this.marker.y+64+(j*32), gid:this.itemGid+(i+j*16)+3432}));
          }
          }
          break
        case ItemCategory.RUGS: case ItemCategory.STAIRS:
          var w = this.itemWidth/ 32
          var h = this.itemHeight / 32
            for (let i = 0; i< w; i ++){
              for (let j = 0; j< h; j ++){
                console.log('Editmap', this.itemGid+(i+j*16))
                this.add.image(this.marker.x+16+(i*32), this.marker.y+16+(j*32), 'generic', this.itemGid+(i+j*16)).setDepth(0).setInteractive().setName("5")
                store.dispatch(LocationInfoChange({x:this.marker.x-32+(i*32), y:this.marker.y+96+(j*32), gid:this.itemGid+(i+j*16)+3432}));
            }
          }
          break
        case ItemCategory.MYART:
          this.add.image(this.marker.x+16, this.marker.y+16, `${this.itemGid}`).setDepth(this.marker.y+16).setInteractive().setName("10")
          store.dispatch(LocationInfoChange({x:this.marker.x, y:this.marker.y+32, gid:this.itemGid}));
          break
        default:
          return null;
      }
      
    }}

  private addObjectFromTiled(
    //⭐ '타일' 관련.. idk
    group: Phaser.Physics.Arcade.StaticGroup,
    object: Phaser.Types.Tilemaps.TiledObject,
    key: string,
    tilesetName: string,
  ) {
    const actualX = object.x! + object.width! * 0.5;
    const actualY = object.y! - object.height! * 0.5;
    const obj = group
      .get(
        actualX,
        actualY,
        key,
        object.gid! - this.map.getTileset(tilesetName).firstgid
      )
      .setDepth(actualY).setInteractive();
    return obj;
  }

  private addGroupFromTiled(
    // ⭐ 타일 관련.. idk
    objectLayerName: string,
    key: string,
    tilesetName: string,
    collidable: boolean,
    layerIndex: string, 
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
        .setName(layerIndex)
        .setDepth(actualY).setInteractive();
    });
  }

  update(t: number, dt: number) {  // 매 프레임 update
    var pointTileX = this.map.worldToTileX(this.game.input.mousePointer.worldX)
    var pointTileY = this.map.worldToTileY(this.game.input.mousePointer.worldY);

    this.marker.x = this.map.tileToWorldX(pointTileX);
    this.marker.y = this.map.tileToWorldY(pointTileY); 

  }
}

export default Editmap;