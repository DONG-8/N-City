import styled from 'styled-components'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

const Wrapper = styled.div`
`
const avatars = [
  { name: 'adam', img: "/essets/login/Adam_login.png" },
  { name: 'ash', img:"/essets/login/Ash_login.png" },
  { name: 'lucy', img: "/essets/login/Lucy_login.png" },
  { name: 'nancy', img: "/essets/login/Nancy_login.png" },
]
export default function MainDialog(){

  const game =  phaserGame.scene.keys.game as Game

  return (
    <Wrapper>
    </Wrapper>
  )
}
