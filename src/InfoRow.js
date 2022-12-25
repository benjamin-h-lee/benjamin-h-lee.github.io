import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * 
 * @param {
 *     {String} id,         // default: "InfoRow"
 *     {String} header,
 *     {[String]} contents  // paragraphs about {header}
 * } props 
 * @returns 
 */
const InfoRow = (props) => {
    return (
        <Row className="justify-content-center" id={props.id || "InfoRow"}>
            <Col lg={6} sm={9} xs={10}>
                <br></br>
                <br></br>
                <br></br>
                <h1>{props.header}</h1>
                <br></br>
                {/*console.log(props.contents)*/}
                {props.contents.map( (txt, index) => {
                    return (
                    <p className='fader' key={index}>
                        {txt}
                    </p>
                    )
                } )}
            </Col>
        </Row>
    )
}

export default InfoRow;