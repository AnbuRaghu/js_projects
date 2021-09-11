const navBtn = document.querySelector('.nav-button')
const navOpen = document.querySelector('.nav-open')
//const tween=TweenLite.to(object we want to Animate,time,{which animation})
//const tween=TweenLite.to('.cover',1,{width:'40%'})

// to create multiple animation we use tiomeline
const t1 = new TimelineLite({ paused: true, reversed: true })
t1.to('.cover', 1, {
  width: '60%',
  ease: Power2.easeOut,
})
  .to(
    'nav',
    1,
    {
      height: '100%',
      ease: Power2.easeOut,
    },
    '-=0.5',
  )
  .fromTo(
    '.nav-open',
    0.5,
    {
      opacity: 0,
      x: 50,
      ease: Power2.easeOut,
    },
    {
      opacity: 1,

      x: 0,
      onComplete: function () {
        navOpen.getElementsByClassName.pointerEvents = 'auto'
        console.log('done')
      },
    },
  )
navBtn.addEventListener('click', (e) => {
  if (t1.isActive()) {
    // check if the animation happens we can't stop isActive is a built in function
    e.preventDefault()
    e.stopImmediatePropagation()
    return false
  }
  toggletween(t1)
})
function toggletween(tween) {
  tween.reversed() ? tween.play() : tween.reverse()
}
