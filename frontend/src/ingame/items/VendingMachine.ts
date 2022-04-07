import Item from './Item'
import { ItemType } from './Item'
import store from '../stores'

import { openVendingMachineDialog, setProductNum } from '../stores/VendingMachineStore'

export default class VendingMachine extends Item {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.itemType = ItemType.VENDINGMACHINE
  }

  onOverlapDialog() {
    this.setDialogBox('R-그림 자세히 보기')
  }
  openDialog(productId){
    store.dispatch(setProductNum(productId))
    store.dispatch(openVendingMachineDialog(Number(productId)))
    // sessionStorage.setItem('productId',productId)
    console.log('productId',productId)
  }
}
