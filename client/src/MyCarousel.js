import { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';

/*
props {
    activeIndex,    // int
    slides          // [jsx]
}
*/

export const MyCarousel = (props) => {
    const [index, setIndex] = useState(props.activeIndex || 0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }

    useEffect( () => {
        const prevIcon = document.getElementsByClassName("carousel-control-prev")[0];
        const nextIcon = document.getElementsByClassName("carousel-control-next")[0];
        if (index === 0) {
            prevIcon.style.display = 'none';
        } else {
            prevIcon.style.display = 'flex';
        }
        if (index === props.slides.length - 1) {
            nextIcon.style.display = 'none';
        } else {
            nextIcon.style.display = 'flex';
        }
    });

    return(
        <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            fade={true}
            interval={null}
            indicators={false}
        >
            {props.slides.map( (slide, indy) => {
                return (
                    <Carousel.Item key={indy}>
                        {slide}
                    </Carousel.Item>
                );
            })}
        </Carousel>
    );
};