import Phaser from 'phaser'
export enum ItemType {
  CHAIR,
  COMPUTER,
  WHITEBOARD,
  VENDINGMACHINE,
  VENDINGMACHINE2,
  VENDINGMACHINE3,
  VENDINGMACHINE4,
  VENDINGMACHINE5,
}
export default class Item extends Phaser.Physics.Arcade.Sprite { // 아이템 등록하기 
  private dialogBox!: Phaser.GameObjects.Container // 말풍선
  private statusBox!: Phaser.GameObjects.Container // 모양 
  itemType!: ItemType

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    // add dialogBox and statusBox containers on top of everything which we can add text in later
    this.dialogBox = this.scene.add.container().setDepth(10000)
    this.statusBox = this.scene.add.container().setDepth(10000)
  }

  setDialogBox(text: string) { // press E to Sit 문구 
    const innerText = this.scene.add
      .text(0, 0, text)
      .setFontFamily('Arial')
      .setFontSize(12)
      .setColor('blue')
    // 말풍선 크기
    const dialogBoxWidth = innerText.width + 4
    const dialogBoxHeight = innerText.height + 2
    const dialogBoxX = this.x - dialogBoxWidth * 0.5
    const dialogBoxY = this.y + this.height * 0.5

    this.dialogBox.add(
      this.scene.add
        .graphics()
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(dialogBoxX, dialogBoxY, dialogBoxWidth, dialogBoxHeight, 3)
        .lineStyle(1.5, 0x000000, 1)
        .strokeRoundedRect(dialogBoxX, dialogBoxY, dialogBoxWidth, dialogBoxHeight, 3)
    )
    this.dialogBox.add(innerText.setPosition(dialogBoxX + 2, dialogBoxY))
  }

  // 말풍선 지우기
  clearDialogBox() {
    this.dialogBox.removeAll(true)
  }

  // add text into status box container
  setStatusBox(text: string) { // 누가 사용하고 있으면 나오는 글자
    const innerText = this.scene.add
      .text(0, 0, text)
      .setFontFamily('Arial')
      .setFontSize(12)
      .setColor('red')

    // set dialogBox slightly larger than the text in it
    const statusBoxWidth = innerText.width + 4
    const statusBoxHeight = innerText.height + 2
    const statusBoxX = this.x - statusBoxWidth * 0.5
    const statusBoxY = this.y - this.height * 0.25
    this.statusBox.add(
      this.scene.add
        .graphics()
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(statusBoxX, statusBoxY, statusBoxWidth, statusBoxHeight, 3)
        .lineStyle(1.5, 0x000000, 1)
        .strokeRoundedRect(statusBoxX, statusBoxY, statusBoxWidth, statusBoxHeight, 3)
    )
    this.statusBox.add(innerText.setPosition(statusBoxX + 2, statusBoxY))
  }

  clearStatusBox() {
    this.statusBox.removeAll(true)
  }
}
