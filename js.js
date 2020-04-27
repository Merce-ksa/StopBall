
const bt_pause = document.getElementById('pause')
const bt_play = document.getElementById('play')
const bt_replay = document.getElementById('replay')

const bt_minus = document.getElementById('minus')
const bt_plus = document.getElementById('plus')
const txt_level = document.getElementById('level')

const ring = document.getElementById('ring')
const ball = document.getElementById('ball')
const attempt = document.getElementById('attempt')
const score = document.getElementById('score')

var current_level = txt_level.textContent
var count_attempt = attempt.textContent
var count_score = score.textContent

const moveBall = ball.animate([
  {
    transform: 'translateX(150px)'
  },
  {
    transform: 'translateX(1400px)'
  }
],{
    duration: 2000,
    delay: 0,
    direction: 'alternate',
    easing: 'linear',
    iterations: Infinity,
    fill: 'forwards',
    //iterationStar:
  })

  moveBall.pause()
  moveBall.playbackRate = 1
  bt_minus.classList.add('btn_inactive')

  bt_plus.addEventListener('click', function(event){
    if (current_level < 5){
        bt_minus.classList.remove('btn_inactive')
        current_level++
        txt_level.textContent = current_level
        moveBall.playbackRate = current_level * 0.5

        if(current_level == 5){
          bt_plus.classList.add('btn_inactive')
        }
    }
  })

  bt_minus.addEventListener('click', function(event){
    if (current_level > 1){

      bt_plus.classList.remove('btn_inactive')
      current_level--
      txt_level.textContent = current_level
      moveBall.playbackRate = current_level * 0.5

      if(current_level == 1) {
        bt_minus.classList.add('btn_inactive')
      }
    }
  })

  bt_pause.addEventListener('click', function(event) {

    bt_pause.style.display = 'none'
    bt_play.style.display = 'block'
    moveBall.pause()

    const ring_left = ring.getBoundingClientRect().left
    const ring_right = ring.getBoundingClientRect().right
    const ball_left = ball.getBoundingClientRect().left
    const ball_right = ball.getBoundingClientRect().right

    if(ring_left < ball_left && ball_right < ring_right){
      console.log('Has ganado')
      count_score++
      score.textContent = count_score

    }else{
      console.log('has perdido')
      count_attempt++
      attempt.textContent = count_attempt
    }

  })

  bt_play.addEventListener('click', (event) => {
    bt_pause.style.display = 'block'
    bt_play.style.display = 'none'
    moveBall.play()
  })

  bt_replay.addEventListener('click', function(event){

    bt_pause.style.display = 'none'
    bt_play.style.display = 'block'
    moveBall.cancel()

    bt_minus.classList.add('btn_inactive')
    bt_plus.classList.remove('btn_inactive')
    current_level = 1
    txt_level.textContent = current_level

    moveBall.playbackRate = 1
    count_attempt = 0;
    attempt.textContent = count_attempt
    count_score = 0;
    score.textContent = count_score
  })
