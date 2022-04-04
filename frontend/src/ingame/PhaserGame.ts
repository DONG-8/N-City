import Phaser from 'phaser'
import Game from './scenes/Game'
import Background from './scenes/Background'
import Bootstrap from './scenes/Bootstrap'
import EditMap from './scenes/Editmap'
import Start from './scenes/Start'

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
  scene: [Start, Bootstrap, Background, Game, EditMap], //scene 추가 
} 

const phaserGame = new Phaser.Game(config) // Phaser 시작

;(window as any).game = phaserGame;
// (window as any).game.destroy(true);
export default phaserGame


// function returnConfig() {
//   console.log(setting,'페이저게임에서의 세팅 값')
//   if (setting === false) {
//     const config: Phaser.Types.Core.GameConfig = { //건드릴거없을듯 ?
//       type: Phaser.AUTO,
//       parent: 'phaser-container',
//       backgroundColor: '#93cbee',
//       pixelArt: true, // 확대되었을때 깨지는것을 방지
//       scale: {
//         mode: Phaser.Scale.ScaleModes.RESIZE,
//         width: window.innerWidth,
//         height: window.innerHeight,
//       },
//       physics: {
//         default: 'arcade',
//         arcade: {
//           gravity: { y: 0 },
//           debug: false,
//         },
//       },
//       autoFocus: true,
//       scene: [Bootstrap,Background,Game] //scene 추가 
//     } 
//     console.log(config,'그냥맵')
//     return (config)
//   } else {
//     const config: Phaser.Types.Core.GameConfig = { //건드릴거없을듯 ?
//       type: Phaser.AUTO,
//       parent: 'phaser-container',
//       backgroundColor: '#93cbee',
//       pixelArt: true, // 확대되었을때 깨지는것을 방지
//       scale: {
//         mode: Phaser.Scale.ScaleModes.RESIZE,
//         width: window.innerWidth,
//         height: window.innerHeight,
//       },
//       physics: {
//         default: 'arcade',
//         arcade: {
//           gravity: { y: 0 },
//           debug: false,
//         },
//       },
//       autoFocus: true,
//       scene: Editmap //scene 추가 
//     } 
//     console.log(config,'에딧맵')

//     return (config)
//   }
// }