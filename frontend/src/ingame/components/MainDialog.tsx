import styled from 'styled-components'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

const Wrapper = styled.div`
`

export default function LoginDialog(){
  const game = phaserGame.scene.keys.game as Game 

  return (
    <Wrapper>
    </Wrapper>
  )
}
