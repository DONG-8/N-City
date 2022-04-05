import Phaser from 'phaser'

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
  scene: Editmap, //scene 추가 
} 

console.log('에딧 페이저가불러졋습니다.')
// const EditPhaserGame = new Phaser.Game(config) // Phaser 시작
// const EditPhaserGame = new Phaser.Game(config) // Phaser 시작
const EditPhaserGame = 'test'
// ;(window as any).game = EditPhaserGame;
// (window as any).game.destroy(true);
export default EditPhaserGame