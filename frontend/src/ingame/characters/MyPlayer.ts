import { ItemType } from './../items/Item';
import Phaser from 'phaser' 
import PlayerSelector from './PlayerSelector'
import { sittingShiftData } from './Player'
import Player from './Player'
import Network from '../services/Network'
import Chair from '../items/Chair'
import Computer from '../items/Computer'
import Whiteboard from '../items/Whiteboard'
import VendingMachine from '../items/VendingMachine'
import { phaserEvents, Event } from '../components/events/EventCenter'
import store from '../stores'
import { pushPlayerJoinedMessage } from '../stores/ChatStore'



export enum PlayerBehavior {
  IDLE,
  SITTING,
}

export default class MyPlayer extends Player {
  private playContainerBody: Phaser.Physics.Arcade.Body // 자기 캐릭터 설정
  private chairOnSit?: Chair // ⭐ 앉아있는지? 함수 
  constructor( 
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    id: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, id, frame)
    this.playContainerBody = this.playerContainer.body as Phaser.Physics.Arcade.Body
  } // state 초기 설정

  setPlayerName(name: string) { // name으로 들어온 값으로 이름 설정하기
    this.playerName.setText(name)
    phaserEvents.emit(Event.MY_PLAYER_NAME_CHANGE, name) //⭐ phaserevent로 이름 바꾸기
    store.dispatch(pushPlayerJoinedMessage(name)) // 채팅창에 `새로운 사람 들어왔다`
  }

  setPlayerTexture(texture: string) { // 시작할때 , 
    this.playerTexture = texture //  texture = 캐릭터 이름 
    this.anims.play(`${this.playerTexture}_idle_down`, true) // 아래보고있는 캐릭터로 시작하기
    phaserEvents.emit(Event.MY_PLAYER_TEXTURE_CHANGE, this.x, this.y, this.anims.currentAnim.key) //캐릭터 위치시키기
  }
  
  update( // 아래 값들이 변경될 때 마다 캐릭터가 변화한다. 
    playerSelector: PlayerSelector,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    keyE: Phaser.Input.Keyboard.Key,
    keyR: Phaser.Input.Keyboard.Key,
    network: Network
  ) {
    if (!cursors) return //⭐

    const item = playerSelector.selectedItem // 캐릭터가 아이템 앞에 있으면? 

    if (Phaser.Input.Keyboard.JustDown(keyR)) { //R키누르면
      switch (item?.itemType) { // 아이템에 종류에 따라
        case ItemType.COMPUTER: // 컴퓨터이면
          const computer = item as Computer // item은 computer가 되는 것이다?
          computer.openDialog(this.playerId, network) //
          break
        case ItemType.WHITEBOARD:
          const whiteboard = item as Whiteboard
          whiteboard.openDialog(network)
          break
        case ItemType.VENDINGMACHINE: // 화면을 띄운다.
          const vendingMachine = item as VendingMachine
          vendingMachine.openDialog(vendingMachine.texture.key)
          break
      }
    }

    switch (this.playerBehavior) { // 사용자의 행동에 따라 
      case PlayerBehavior.IDLE:
        // 의자 앞에서 E를 눌렀을 떄?
        if (Phaser.Input.Keyboard.JustDown(keyE) && item?.itemType === ItemType.CHAIR) { 
          const chairItem = item as Chair 

          this.scene.time.addEvent({
            delay: 10, // 바로 작동하면 에러가 날 수 있다 ? 딜레이 좀 주기 
            callback: () => {
              this.setVelocity(0, 0) // 속도 0으로 바꿔주기
              if (chairItem.itemDirection) {
                this.setPosition( // 캐릭터 위치를 의자 위로 바꿔주기 
                // import sittingShiftData from 'player.ts' 
                  chairItem.x + sittingShiftData[chairItem.itemDirection][0],
                  chairItem.y + sittingShiftData[chairItem.itemDirection][1]
                ).setDepth(chairItem.depth + sittingShiftData[chairItem.itemDirection][2])
                
                // playerContainer = 말풍선  => 위치도 자리 잡아주기
                this.playContainerBody.setVelocity(0, 0)
                this.playerContainer.setPosition(
                  chairItem.x + sittingShiftData[chairItem.itemDirection][0],
                  chairItem.y + sittingShiftData[chairItem.itemDirection][1] - 30
                )
              }
              // 앉은 자세로 바꿔주기
              this.play(`${this.playerTexture}_sit_${chairItem.itemDirection}`, true)
              playerSelector.selectedItem = undefined // 의자 근처에 있다는 표시 지우기
              if (chairItem.itemDirection === 'up') { // 의자가 위를 보고 있다면
                playerSelector.setPosition(this.x, this.y - this.height)
              } else {
                playerSelector.setPosition(0, 0)
              }
              // send new location and anim to server
              network.updatePlayer(this.x, this.y, this.anims.currentAnim.key) // 캐릭터가 앉아있다고 네트워크 보내기
            },
            loop: false,
          })
          
          chairItem.clearDialogBox() // 앉으라는 글 지우기
          chairItem.setDialogBox('E를 눌러 일어나세요') // 새로운 dialog 적기
          this.chairOnSit = chairItem // ⭐ 앉아있냐는 함수
          this.playerBehavior = PlayerBehavior.SITTING // 캐릭터의 행동 바꿔주기
          return
        }
      // 🚗 캐릭터 이동 관련 
        const speed = 200 // 움직이는 속도 
        let vx = 0 // 대각선
        let vy = 0
        if (cursors.left?.isDown) vx -= speed
        if (cursors.right?.isDown) vx += speed
        if (cursors.up?.isDown) {
          vy -= speed
          this.setDepth(this.y) 
        }
        if (cursors.down?.isDown) {
          vy += speed
          this.setDepth(this.y) 
        }
        this.setVelocity(vx, vy)
        this.body.velocity.setLength(speed)
        this.playContainerBody.setVelocity(vx, vy)
        this.playContainerBody.velocity.setLength(speed)

        if (vx !== 0 || vy !== 0) network.updatePlayer(this.x, this.y, this.anims.currentAnim.key)
        if (vx > 0) { //캐릭터 모양 바꿔주기
          this.play(`${this.playerTexture}_run_right`, true)
        } else if (vx < 0) {
          this.play(`${this.playerTexture}_run_left`, true)
        } else if (vy > 0) {
          this.play(`${this.playerTexture}_run_down`, true)
        } else if (vy < 0) {
          this.play(`${this.playerTexture}_run_up`, true)
        } else { //
          const parts = this.anims.currentAnim.key.split('_')
          parts[1] = 'idle'
          const newAnim = parts.join('_')
          if (this.anims.currentAnim.key !== newAnim) {
            this.play(parts.join('_'), true)
            network.updatePlayer(this.x, this.y, this.anims.currentAnim.key)
          }
        }
        break
       // 캐릭터 이동 관련 🚗 

      case PlayerBehavior.SITTING: // 내가 지금 앉아있을 경우 
        if (Phaser.Input.Keyboard.JustDown(keyE)) { // E를 누르게 되면
          const parts = this.anims.currentAnim.key.split('_') // 캐릭터의 행동 변화
          parts[1] = 'idle' 
          this.play(parts.join('_'), true)
          this.playerBehavior = PlayerBehavior.IDLE // 평상시로 바꿔주고
          this.chairOnSit?.clearDialogBox() // 다이얼로그 비우기
          playerSelector.setPosition(this.x, this.y) //위치 그자리로 바꾸기
          playerSelector.update(this, cursors)  // ⭐ 커서 초기화?
          network.updatePlayer(this.x, this.y, this.anims.currentAnim.key) // 현재상태 네트워크로 보고하기
        }
        break
    }
  }
}

declare global { //  Phaser.GameObjects를  global에서 사용하겠다 선언
  namespace Phaser.GameObjects {  
    interface GameObjectFactory {  
      myPlayer(x: number, y: number, texture: string, id: string, frame?: string | number): MyPlayer
    }
  }
}
// 내플레이어 등록 : this = 내 위치, 캐릭터 이름 , id , frame 
Phaser.GameObjects.GameObjectFactory.register( //⭐⭐⭐ 
  'myPlayer',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    id: string,
    frame?: string | number
  ) {
    const sprite = new MyPlayer(this.scene, x, y, texture, id, frame) //애니메이션 합성하는 기술 ?

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    const collisionScale = [0.5, 0.2]
    sprite.body
      .setSize(sprite.width * collisionScale[0], sprite.height * collisionScale[1])
      .setOffset(
        sprite.width * (1 - collisionScale[0]) * 0.5,
        sprite.height * (1 - collisionScale[1])
      )

    return sprite
  }
)
