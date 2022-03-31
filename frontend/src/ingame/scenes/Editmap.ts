import Phaser, { Data } from 'phaser'
import Network from '../services/Network'
import store from '../stores'
import { setRoomJoined } from '../stores/RoomStore'
import data from "./editmap.json"
import Item from "../items/Item";
import Chair from "../items/Chair";
import Computer from "../items/Computer";
import Whiteboard from "../items/Whiteboard";
import VendingMachine from "../items/VendingMachine";
import {useState} from 'react';
import Generic from '../items/Generic'

enum ItemCategory {
  GROUND,
  WALL,
  CHAIR,
  WHITEBOARD
}

class Editmap extends Phaser.Scene {
  selectedItemC = ItemCategory.GROUND;
  itemGid = 0;
  private controls;
  private marker;

  network!: Network
  private map!: Phaser.Tilemaps.Tilemap;
  computerMap = new Map<string, Computer>();
  private whiteboardMap = new Map<string, Whiteboard>();
  private keyZ!: Phaser.Input.Keyboard.Key;
  private keyA!: Phaser.Input.Keyboard.Key;
  // private data = new Data 
  constructor() {
    super('Editmap')
  }

  // context

  preload() { // 시작전 세팅 

    this.load.image('backdrop_day', 'essets/background/backdrop_day.png')
    
    this.load.tilemapTiledJSON('tilemap1', 'essets/map/editmap.json') // 배경 다 들고오기 

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
    
    this.map = this.make.tilemap({ key: "tilemap" }); // 맵만들기 ⭐⭐⭐
    const FloorAndGround = this.map.addTilesetImage(
      "FloorAndGround",
      "tiles_wall"
    );

    // const cursor = this.add.image(0, 0, 'chairs', this.itemGid-2561).setVisible(false)
    // this.input.on('pointermove', function (mousePointer){
    //   console.log('move')
    //   cursor.setVisible(true).setPosition(mousePointer.x, mousePointer.y)
    // }, this)
    
    const groundLayer = this.map.createLayer("Ground", FloorAndGround);
    groundLayer.setCollisionByProperty({ collides: true });

    // 💨 마우스 따라가기 💨💨💨💨💨💨💨💨💨💨💨💨💨
    // this.marker = this.add.graphics();
    // this.input.on(Phaser.Input.Events.POINTER_MOVE, function (mousePointer) {
    //   console.log('move')
    //   if (mousePointer.isDown) {
    //     console.log('fuck')
    //   }

    // });
    this.marker = this.add.graphics({ lineStyle: { width: 3, color: 0xffffff, alpha: 1 } });
    this.marker.strokeRect(0, 0, 32, 32);
    // this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    // const cursors = this.input.keyboard.createCursorKeys();
    // var controlConfig = {
    //     camera: this.cameras.main,
    //     left: cursors.left,
    //     right: cursors.right,
    //     up: cursors.up,
    //     down: cursors.down,
    //     speed: 0.5
    // };
    // this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
    // this.input.on('gameobjectdown', function(mousePointer, gameObjects) {
    //   gameObjects.destroy();
    // })

//     this.input.on('pointerover', function (mousePointer, gameObject) {

//       gameObject.setTint(0xff0000);

//   });

//   this.input.on('gameobjectout', function (pointer, gameObject) {

//     gameObject.clearTint();

// });

    const chairs = this.physics.add.staticGroup({ classType: Chair });
    const chairLayer = this.map.getObjectLayer("Chair");
    chairLayer.objects.forEach((chairObj) => {
      const item = this.addObjectFromTiled(
        chairs,
        chairObj,
        "chairs",
        "chair"
      ).setInteractive() as Chair;
      // custom properties[0] is the object direction specified in Tiled
      item.itemDirection = chairObj.properties[0].value;
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
      ).setInteractive();
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
        .setDepth(actualY).setInteractive();
    });
  }

  selectItem(itemCategory : ItemCategory, gid : number) {
    console.log(itemCategory)
    this.selectedItemC = itemCategory
    this.itemGid = gid
  }

  update(t: number, dt: number) {  // 매 프레임 update

    // var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
    var pointTileX = this.map.worldToTileX(this.game.input.mousePointer.worldX)
    var pointTileY = this.map.worldToTileY(this.game.input.mousePointer.worldY);

    this.marker.x = this.map.tileToWorldX(pointTileX);
    this.marker.y = this.map.tileToWorldY(pointTileY); 

    if (this.input.manager.activePointer.isDown) {
      switch (this.selectedItemC) {
        case ItemCategory.GROUND:
          // this.map.removeTileAtWorldXY(this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY)
          // const tileInfo = this.map.getTileAt(pointTileX, pointTileY)
          // console.log(tileInfo.index) // 타일 (타일 모양) 
          // console.log(tileInfo.y*40 + tileInfo.x - 1) // 타일 위치 (인덱스)
          this.map.putTileAtWorldXY(this.itemGid, this.marker.x, this.marker.y)
          break
        case ItemCategory.WALL:
          this.map.putTileAtWorldXY(this.itemGid, this.marker.x, this.marker.y)
          this.map.putTileAtWorldXY(this.itemGid+64, this.marker.x, this.marker.y+63)
          break
        case ItemCategory.WHITEBOARD: 
          this.physics.add.staticSprite(this.marker.x+16, this.marker.y, 'whiteboards', this.itemGid-4685).setDepth(this.marker.y)
          break
        case ItemCategory.CHAIR: 
         this.add.image(this.marker.x+16, this.marker.y, 'chairs', this.itemGid-2561).setDepth(this.marker.y).setDepth(this.marker.y)
            break
        default:
          return 'asdf'
      }
    }
  }
}

export default Editmap;