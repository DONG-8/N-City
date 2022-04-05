import Phaser from 'phaser'
import Game from './scenes/Game'
import Background from './scenes/Background'
import Bootstrap from './scenes/Bootstrap'
import Editmap from './scenes/Editmap'

//phasergame.ts 에서는 scenes들을 불러온다. 

const config: Phaser.Types.Core.GameConfig = { //건드릴거없을듯 ?
  type: Phaser.AUTO,
  parent: 'phaser-container',
  backgroundColor: '#93cbee',
  pixelArt: true, // 확대되었을때 깨지는것을 방지
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  autoFocus: true,
  scene: [Bootstrap, Background, Game, Editmap], //scene 추가 
} 

const phaserGame = new Phaser.Game(config) // Phaser 시작

;(window as any).game = phaserGame;
// (window as any).game.destroy(true);
export default phaserGame
