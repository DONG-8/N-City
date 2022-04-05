import Phaser from 'phaser'
import Network from '../services/Network'


export default class Start extends Phaser.Scene {
  network!: Network

  constructor() {super('start')}

  launchBootstrap() { 
    this.scene.launch('bootstrap')
  }
}
