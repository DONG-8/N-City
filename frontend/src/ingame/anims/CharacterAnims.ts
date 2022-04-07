import Phaser from 'phaser'

export const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
  const animsFrameRate = 12 // 프레임 -> 낮으면 안걸어다님

  // anims.create({ // key, nancy.png 에서 012345번 사진 6개 사용 
  //   key: 'nancy_idle_right',
  //   frames: anims.generateFrameNames('nancy', {
  //     start: 0,
  //     end: 5,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({ // 가만있는 상태 = idle
  //   key: 'nancy_idle_up',
  //   frames: anims.generateFrameNames('nancy', {
  //     start: 6,
  //     end: 11,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'nancy_idle_left',
  //   frames: anims.generateFrameNames('nancy', {
  //     start: 12,
  //     end: 17,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'nancy_idle_down',
  //   frames: anims.generateFrameNames('nancy', {
  //     start: 18,
  //     end: 23,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({ // run : 걷는 상태
  //   key: 'nancy_run_right',
  //   frames: anims.generateFrameNames('nancy', {
  //     start: 24,
  //     end: 29,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'nancy_run_up',
  //   frames: anims.generateFrameNames('nancy', {
  //     start: 30,
  //     end: 35,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'nancy_run_left',
  //   frames: anims.generateFrameNames('nancy', {
  //     start: 36,
  //     end: 41,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'nancy_run_down',
  //   frames: anims.generateFrameNames('nancy', {
  //     start: 42,
  //     end: 47,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({ // 프레임 하나 사용 앉기
  //   key: 'nancy_sit_down',
  //   frames: anims.generateFrameNames('nancy', {
  //     start: 48,
  //     end: 48,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'nancy_sit_left',
  //   frames: anims.generateFrameNames('nancy', {
  //     start: 49,
  //     end: 49,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'nancy_sit_right',
  //   frames: anims.generateFrameNames('nancy', {
  //     start: 50,
  //     end: 50,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'nancy_sit_up',
  //   frames: anims.generateFrameNames('nancy', {
  //     start: 51,
  //     end: 51,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({ // 루씨 시작
  //   key: 'lucy_idle_right',
  //   frames: anims.generateFrameNames('lucy', {
  //     start: 0,
  //     end: 5,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'lucy_idle_up',
  //   frames: anims.generateFrameNames('lucy', {
  //     start: 6,
  //     end: 11,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'lucy_idle_left',
  //   frames: anims.generateFrameNames('lucy', {
  //     start: 12,
  //     end: 17,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'lucy_idle_down',
  //   frames: anims.generateFrameNames('lucy', {
  //     start: 18,
  //     end: 23,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'lucy_run_right',
  //   frames: anims.generateFrameNames('lucy', {
  //     start: 24,
  //     end: 29,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'lucy_run_up',
  //   frames: anims.generateFrameNames('lucy', {
  //     start: 30,
  //     end: 35,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'lucy_run_left',
  //   frames: anims.generateFrameNames('lucy', {
  //     start: 36,
  //     end: 41,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'lucy_run_down',
  //   frames: anims.generateFrameNames('lucy', {
  //     start: 42,
  //     end: 47,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'lucy_sit_down',
  //   frames: anims.generateFrameNames('lucy', {
  //     start: 48,
  //     end: 48,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'lucy_sit_left',
  //   frames: anims.generateFrameNames('lucy', {
  //     start: 49,
  //     end: 49,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'lucy_sit_right',
  //   frames: anims.generateFrameNames('lucy', {
  //     start: 50,
  //     end: 50,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'lucy_sit_up',
  //   frames: anims.generateFrameNames('lucy', {
  //     start: 51,
  //     end: 51,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'ash_idle_right',
  //   frames: anims.generateFrameNames('ash', {
  //     start: 0,
  //     end: 5,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'ash_idle_up',
  //   frames: anims.generateFrameNames('ash', {
  //     start: 6,
  //     end: 11,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'ash_idle_left',
  //   frames: anims.generateFrameNames('ash', {
  //     start: 12,
  //     end: 17,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'ash_idle_down',
  //   frames: anims.generateFrameNames('ash', {
  //     start: 18,
  //     end: 23,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate * 0.6,
  // })

  // anims.create({
  //   key: 'ash_run_right',
  //   frames: anims.generateFrameNames('ash', {
  //     start: 24,
  //     end: 29,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'ash_run_up',
  //   frames: anims.generateFrameNames('ash', {
  //     start: 30,
  //     end: 35,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'ash_run_left',
  //   frames: anims.generateFrameNames('ash', {
  //     start: 36,
  //     end: 41,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'ash_run_down',
  //   frames: anims.generateFrameNames('ash', {
  //     start: 42,
  //     end: 47,
  //   }),
  //   repeat: -1,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'ash_sit_down',
  //   frames: anims.generateFrameNames('ash', {
  //     start: 48,
  //     end: 48,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'ash_sit_left',
  //   frames: anims.generateFrameNames('ash', {
  //     start: 49,
  //     end: 49,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'ash_sit_right',
  //   frames: anims.generateFrameNames('ash', {
  //     start: 50,
  //     end: 50,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  // anims.create({
  //   key: 'ash_sit_up',
  //   frames: anims.generateFrameNames('ash', {
  //     start: 51,
  //     end: 51,
  //   }),
  //   repeat: 0,
  //   frameRate: animsFrameRate,
  // })

  anims.create({
    key: 'character_idle_right',
    frames: anims.generateFrameNames('character', {
      start: 0,
      end: 5,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  })

  anims.create({
    key: 'character_idle_up',
    frames: anims.generateFrameNames('character', {
      start: 6,
      end: 11,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  })

  anims.create({
    key: 'character_idle_left',
    frames: anims.generateFrameNames('character', {
      start: 12,
      end: 17,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  })

  anims.create({
    key: 'character_idle_down',
    frames: anims.generateFrameNames('character', {
      start: 18,
      end: 23,
    }),
    repeat: -1,
    frameRate: animsFrameRate * 0.6,
  })

  anims.create({
    key: 'character_run_right',
    frames: anims.generateFrameNames('character', {
      start: 24,
      end: 29,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  })

  anims.create({
    key: 'character_run_up',
    frames: anims.generateFrameNames('character', {
      start: 30,
      end: 35,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  })

  anims.create({
    key: 'character_run_left',
    frames: anims.generateFrameNames('character', {
      start: 36,
      end: 41,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  })

  anims.create({
    key: 'character_run_down',
    frames: anims.generateFrameNames('character', {
      start: 42,
      end: 47,
    }),
    repeat: -1,
    frameRate: animsFrameRate,
  })

  anims.create({
    key: 'character_sit_down',
    frames: anims.generateFrameNames('character', {
      start: 48,
      end: 48,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  })

  anims.create({
    key: 'character_sit_left',
    frames: anims.generateFrameNames('character', {
      start: 49,
      end: 49,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  })

  anims.create({
    key: 'character_sit_right',
    frames: anims.generateFrameNames('character', {
      start: 50,
      end: 50,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  })

  anims.create({
    key: 'character_sit_up',
    frames: anims.generateFrameNames('character', {
      start: 51,
      end: 51,
    }),
    repeat: 0,
    frameRate: animsFrameRate,
  })
}
