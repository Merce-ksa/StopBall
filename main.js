
const bt_pause = document.getElementById('pause')
const bt_play = document.getElementById('play')
const bt_replay = document.getElementById('replay')

const bt_minus = document.getElementById('minus')
const bt_plus = document.getElementById('plus')
const txt_level = document.getElementById('level')

const ring = document.getElementById('ring')
const ball = document.getElementById('ball')

const score = document.getElementById('score')
const max_score = document.getElementById('max_score')

var count_score = Number(score.textContent)
const point = document.getElementById('score-point')
const message = document.getElementById('score-message')

const storage_max_score = window.localStorage.getItem('puntuacion') || 0
max_score.textContent = storage_max_score


const INITIAL_BALL_DURATION = 2500
const INITIAL_LEVEL = 1
const MAX_LEVEL = 5
const POINT_SCORE = 5

var current_level = INITIAL_LEVEL

const moveBall = ball.animate([
  {
    transform: 'translateX(0px)'
  },
  {
    transform: 'translateX(950px)'
  }
],{
    duration: INITIAL_BALL_DURATION,
    direction: 'alternate',
    easing: 'linear',
    iterations: Infinity,
    fill: 'forwards'
  })

  moveBall.pause()
  moveBall.playbackRate = INITIAL_LEVEL
  bt_minus.classList.add('btn_inactive')

  function updateLevel(level){
    txt_level.textContent = level
    moveBall.playbackRate = level * 0.5
  }

  function inactiveButton(button){
      button.classList.add('btn_inactive')
  }

  function activeButton(button){
      button.classList.remove('btn_inactive')
  }

  function isBallInsideRing() {

    const ring_left = ring.getBoundingClientRect().left
    const ring_right = ring.getBoundingClientRect().right
    const ball_left = ball.getBoundingClientRect().left
    const ball_right = ball.getBoundingClientRect().right

    return ring_left < ball_left && ball_right < ring_right
  }

  bt_plus.addEventListener('click', function(event){
    if (current_level < MAX_LEVEL){
        activeButton(bt_minus)
        current_level++
        updateLevel(current_level)

        if(current_level == MAX_LEVEL){
          inactiveButton(bt_plus)
        }
    }
  })

  bt_minus.addEventListener('click', function(event){
    if (current_level > INITIAL_LEVEL){
      activeButton(bt_plus)
      current_level--
      updateLevel(current_level)

      if(current_level == INITIAL_LEVEL) {
        inactiveButton(bt_minus)
      }
    }
  })

  bt_pause.addEventListener('click', function(event) {

    bt_pause.style.display = 'none'
    bt_play.style.display = 'block'
    moveBall.pause()

    if(isBallInsideRing()){

      count_score+=POINT_SCORE*current_level
      score.textContent = count_score

      if(count_score > storage_max_score){
        window.localStorage.setItem('puntuacion', count_score)
        max_score.textContent = count_score
      }

      point.textContent = '+' + POINT_SCORE*current_level
      point.style.display = 'flex'
    }
  })

  bt_play.addEventListener('click', (event) => {
    bt_pause.style.display = 'block'
    bt_play.style.display = 'none'
    point.style.display = 'none'
    moveBall.play()
  })

  bt_replay.addEventListener('click', function(event) {

    moveBall.cancel()

    bt_pause.style.display = 'none'
    bt_play.style.display = 'block'

    txt_level.textContent = INITIAL_LEVEL
    current_level = INITIAL_LEVEL

    inactiveButton(bt_minus)
    activeButton(bt_plus)

    moveBall.playbackRate = 1

    count_score = 0;
    score.textContent = count_score
  })
