import Phaser from 'phaser'
import MyPlayer from './MyPlayer'
import Item from '../items/Item'
// ⭐⭐ 뭐하는 페이지인지 모르겠음

export enum PlayerBehavior {
  IDLE,
  SITTING,
}


export default class PlayerSelector extends Phaser.GameObjects.Zone {
  selectedItem?: Item // 근처로 가면 선택되는 것

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    super(scene, x, y, width, height)

    scene.physics.add.existing(this)
  }

  update(player: MyPlayer, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (!cursors) { //안눌렀을때는 돌아가기
      return
    }
    // 앉아있을때는 뭘하든 안된다 .
    if (player.playerBehavior === PlayerBehavior.SITTING) {
      return
    }

    const { x, y } = player
    if (cursors.left?.isDown) { // 플레이어 위치에 한번 누르면 32씩 이동되게 
      this.setPosition(x - 32, y)
    } else if (cursors.right?.isDown) {
      this.setPosition(x + 32, y)
    } else if (cursors.up?.isDown) {
      this.setPosition(x, y - 32)
    } else if (cursors.down?.isDown) {
      this.setPosition(x, y + 32)
    }

    // 현재 항목을 선택하는동안
    //선택항목이 겹치지 않으면 대화상자를 삭제합니다. 
    if (this.selectedItem) {
      if (!this.scene.physics.overlap(this, this.selectedItem)) {
        this.selectedItem.clearDialogBox()
        this.selectedItem = undefined
      }
    }
  }
}
