import Phaser from 'phaser'
import Player from './Player'
import MyPlayer from './MyPlayer'
import { sittingShiftData } from './Player'
import WebRTC from '../web/WebRTC'
import { Event, phaserEvents } from '../components/events/EventCenter'

export default class OtherPlayer extends Player {
  private targetPosition: [number, number]
  private lastUpdateTimestamp?: number
  private connectionBufferTime = 0
  private connected = false
  private playContainerBody: Phaser.Physics.Arcade.Body
  private myPlayer?: MyPlayer

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    id: string,
    name: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, id, frame)
    this.targetPosition = [x, y]

    this.playerName.setText(name)
    this.playContainerBody = this.playerContainer.body as Phaser.Physics.Arcade.Body
  }

  makeCall(myPlayer: MyPlayer, webRTC: WebRTC) { // 가까이 가면 화면 전화하기
    this.myPlayer = myPlayer
    const myPlayerId = myPlayer.playerId
    if (
      !this.connected &&
      this.connectionBufferTime >= 750 &&
      myPlayer.readyToConnect &&
      this.readyToConnect &&
      myPlayer.videoConnected &&
      myPlayerId > this.playerId
    ) {
      webRTC.connectToNewUser(this.playerId)
      this.connected = true
      this.connectionBufferTime = 0
    }
  }

  updateOtherPlayer(field: string, value: number | string | boolean) {
    switch (field) { //field로 정보가 하나씩 들어올 예정
      case 'name': // 이름일 경우 이름 저장하기 -> 문자열이 아니면 저장 안하기
        if (typeof value === 'string') {
          this.playerName.setText(value)
        }
        break

      case 'x': // x값이 들어왔으면 targetPosition[x,y]으로 저장
        if (typeof value === 'number') {
          this.targetPosition[0] = value
        }
        break

      case 'y': // x값이 들어왔으면 targetPosition[x,y]으로 저장
        if (typeof value === 'number') {
          this.targetPosition[1] = value
        }
        break

      case 'anim': // 행동을 하고 있다면? 
        if (typeof value === 'string') {
          this.anims.play(value, true) // 행동을 보여주기
        }
        break

      case 'readyToConnect': // 연결 준비완료
        if (typeof value === 'boolean') {
          this.readyToConnect = value
        }
        break

      case 'videoConnected': // 비디오 연결 
        if (typeof value === 'boolean') {
          this.videoConnected = value
        }
        break
    }
  }

  destroy(fromScene?: boolean) { // ⭐ fromscene을 삭제를 한다?
    this.playerContainer.destroy()
    super.destroy(fromScene)
  }

  preUpdate(t: number, dt: number) { // 위치 정보를 매 프레임마다 업데이를 해준다.
    super.preUpdate(t, dt) // 업데이트하기

    if (this.lastUpdateTimestamp && t - this.lastUpdateTimestamp > 750) {
      this.lastUpdateTimestamp = t
      this.x = this.targetPosition[0]
      this.y = this.targetPosition[1]
      this.playerContainer.x = this.targetPosition[0]
      this.playerContainer.y = this.targetPosition[1] - 30
      return
    }

    this.lastUpdateTimestamp = t
    this.setDepth(this.y) // change player.depth based on player.y
    const animParts = this.anims.currentAnim.key.split('_')
    const animState = animParts[1]
    if (animState === 'sit') {
      const animDir = animParts[2]
      const sittingShift = sittingShiftData[animDir]
      if (sittingShift) { // 중복 앉기 : z축 관련된 느낌?
        this.setDepth(this.depth + sittingShiftData[animDir][2])
      }
    }

    const speed = 200 
    const delta = (speed / 1000) * dt // 움직일수 있는 최소한의 거리
    let dx = this.targetPosition[0] - this.x
    let dy = this.targetPosition[1] - this.y

    // if the player is close enough to the target position, directly snap the player to that position
    if (Math.abs(dx) < delta) {
      this.x = this.targetPosition[0]
      this.playerContainer.x = this.targetPosition[0]
      dx = 0
    }
    if (Math.abs(dy) < delta) {
      this.y = this.targetPosition[1]
      this.playerContainer.y = this.targetPosition[1] - 30
      dy = 0
    }

    let vx = 0
    let vy = 0
    if (dx > 0) vx += speed
    else if (dx < 0) vx -= speed
    if (dy > 0) vy += speed
    else if (dy < 0) vy -= speed

    this.setVelocity(vx, vy)
    this.body.velocity.setLength(speed)
    this.playContainerBody.setVelocity(vx, vy)
    this.playContainerBody.velocity.setLength(speed)

    this.connectionBufferTime += dt
    if (
      this.connected &&
      !this.body.embedded &&
      this.body.touching.none &&
      this.connectionBufferTime >= 750
    ) {
      if (this.x < 610 && this.y > 515 && this.myPlayer!.x < 610 && this.myPlayer!.y > 515) return
      phaserEvents.emit(Event.PLAYER_DISCONNECTED, this.playerId)
      this.connectionBufferTime = 0
      this.connected = false
    }
  }
}

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      otherPlayer(
        x: number,
        y: number,
        texture: string,
        id: string,
        name: string,
        frame?: string | number
      ): OtherPlayer
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'otherPlayer',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    id: string,
    name: string,
    frame?: string | number
  ) {
    const sprite = new OtherPlayer(this.scene, x, y, texture, id, name, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    const collisionScale = [6, 4]
    sprite.body
      .setSize(sprite.width * collisionScale[0], sprite.height * collisionScale[1])
      .setOffset(
        sprite.width * (1 - collisionScale[0]) * 0.5,
        sprite.height * (1 - collisionScale[1]) * 0.5 + 17
      )

    return sprite
  }
)
