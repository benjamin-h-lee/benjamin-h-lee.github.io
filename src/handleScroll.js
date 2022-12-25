/**
 * causes elements with 'fader' class to fade in / out when
 * it is scrolled in / out
 */

const handleScroll = () => {
    const FADE_BOUNDARY = window.innerHeight * 0.05;
    const elements = document.getElementsByClassName("fader");
    for(let i = 0; i < elements.length; i++){
    const el = elements[i];
    const rect = el.getBoundingClientRect();

    // y calculated from top
    // bottom below upper boundary and top below lower boundary
    // --> in view
    // || true --> don't fade out when element passed
    if((rect.bottom > FADE_BOUNDARY || true) && rect.top < window.innerHeight - FADE_BOUNDARY) {
        el.style.opacity = 1;
    } else {
        let opac = rect.top < FADE_BOUNDARY ?
                    rect.top / FADE_BOUNDARY :
                    (window.innerHeight - rect.bottom) / FADE_BOUNDARY;
        el.style.opacity = opac > 0 ? opac : 0;
    }
    }
}

export default handleScroll;