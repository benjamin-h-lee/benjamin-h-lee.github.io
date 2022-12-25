import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

/*
single image (and caption) as column

props: {
    imgContent,      // jsx to be put in image column
    captionLocation, // 'left', 'right', 'bottom', undefined
    captionColProps, // eg {xs:4}
    capContent,      // jsx to be put in caption column
    imgColProps,     // properties for Col that is parent of img
    containerColProps// properties for outer Col
}
*/
const ImgAndCap = (props) => {
    const COL_CLASS = props.className === undefined ?
                        'fader' : 'fader ' + props.className;

    const CAPTION_ROW_CLASS = 'imgAndCap';

    // NO CAPTION
    // RETURN just image column if no caption
    if (props.capContent === undefined)
        return (<Col className={COL_CLASS} {...props.imgColProps}>
                    {props.imgContent}
                </Col>)
    

    // CAPTION INCLUDED

    // defaults
    props = {
        captionLocation:'right',
        ...props
    }

    const imgContainer = (
        <Col {...props.imgColProps}> {props.imgContent} </Col>
    );
    const captionContainer = (
        <Col className='captionCol' {...props.captionColProps}> {props.capContent} </Col>
    );

    if (props.captionLocation === 'left') {
        return (
        <Col className={COL_CLASS} {...props.containerColProps}>
            <Row className={CAPTION_ROW_CLASS}>
                {captionContainer}
                {imgContainer}
            </Row>
        </Col>
        );
    } else {
        // image on top of caption if captionLocation === 'bottom'
        const stack = props.captionLocation === 'bottom' ?
                        {'style':{display:'block'}} :
                        {};
        
        return (
        <Col className={COL_CLASS} {...props.containerColProps}>
            <Row className={CAPTION_ROW_CLASS} {...stack}>
                {imgContainer}
                {captionContainer}
            </Row>
        </Col>
        );
    }
}

export default ImgAndCap;