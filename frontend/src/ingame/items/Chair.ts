import Item from './Item'
import { ItemType } from './Item'


export default class Chair extends Item {
  itemDirection?: string

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.itemType = ItemType.CHAIR
  }

  onOverlapDialog() {
    this.setDialogBox('E를 눌러 앉으세요')
  }
}
