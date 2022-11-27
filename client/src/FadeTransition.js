

/**
 * 
 * @param {func} func function to be called when opactiy is 0
 * @param {int}  time transition time (fade out + fade in)
 *                    doesn't include pause in between
 * @param {int}  pausetime time to pause in between fades
 */
const FadeTransition = (func, time, pauseTime = 0) => {
    const body = document.getElementsByTagName("body")[0];
    body.style.transition = 'opacity ' + (time / 2) + 'ms';
    body.style.opacity = 0;
    setTimeout( () => {
        func();
      if (pauseTime === 0) {
        body.style.opacity = 1;
      } else {
        setTimeout( () => {
          body.style.opacity = 1;
        }, pauseTime);
      }
    }, time / 2);
}

export default FadeTransition;