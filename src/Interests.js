import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavigationBar from './NavigationBar';
import { useState, useEffect } from "react";
import scrollToId from './scrollToId';
import { MyCarousel } from './MyCarousel';
import ImgAndCap from './ImgAndCap';
import InfoRow from './InfoRow';
import ModalAndBackgroundBtn from './ModalAndBackgroundBtn';

import files_data from './images/FilesData';


const INFO_ROW_ID = "interestInfo";


const Interests = (props) => {

    const [selected, setSelected] = useState(undefined);
    const [captions, setCaptions] = useState(undefined);
    const [about, setAbout] = useState(undefined);

    useEffect( () => {
            if (selected !== undefined ) scrollToId(INFO_ROW_ID);
        }, [selected])
    useEffect( () => {
        files_data.about()
            .then(abt => setAbout(abt));
    }, [])


    const interestProfileImgs = files_data.interestProfileImgs
        .map( (imgName) => {
            return require("./images/" + imgName);
        });

    // if click on alread selected --> scroll down
    // if click on new --> change selected
    const select = (interest) => {
        if (selected === interest) {
            scrollToId(INFO_ROW_ID);
        } else {
            files_data.get_captions(interest)
                .then( (caps) => {
                    setCaptions(caps);
                    setSelected(interest);
                });
        }
    }
      

    var moreInfo;
    // selected: highlighted interested
    if (selected !== undefined) {
        moreInfo = (<InfoRow
                        header={selected}
                        contents={about[selected]}
                        id={INFO_ROW_ID} />);
    

        const captionsFound = captions !== undefined;
        var captionLocation = 'left';
        const rowParams = captionsFound ?
                            {xs:1} :
                            {lg:3, md:2, xs:1};
    
        const getImgDisplayContents = () => {
            return files_data.images[selected].map( (image, index) => {
                const noCaption = !captionsFound || 
                                captions[index] === undefined;
                // alternate between right and left, but always
                // start on left (when current has no caption, set to
                // right, so will be left for next img with caption)
                if (captionLocation === 'right' || noCaption) {
                    captionLocation = 'left';
                } else {
                    captionLocation = 'right';
                }
                return (
                    <ImgAndCap
                        imgContent={
                            <ModalAndBackgroundBtn
                                btnContent={
                                    <img src={image}
                                         alt=""
                                         className='imgBtn'
                                    ></img>}
                                modalContent={
                                    <MyCarousel 
                                        activeIndex={index}
                                        slides={
                                            files_data.images[selected].map( (image) => {
                                                return (
                                                    <div className='carouselView'>
                                                        <img src={image} alt=""></img>
                                                    </div>
                                                );
                                            }
                                        )}
                                    />
                                }
                            />
                        }
                        capContent={noCaption?
                                        undefined:
                                        <p>{captions[index]}</p>}
                        captionLocation={captionLocation}
                        captionColProps={{xs:4}}
                        containerColProps={{
                            lg:8
                        }}
                        key={index}
                    />
                )
            })
        }
    
        // add images / captions about interest to moreInfo
        let clsName = "imgDisplay";
        if (captionsFound) clsName += " justify-content-center";
        moreInfo = (
        <>
          {moreInfo}
          <Row {...rowParams} className={clsName} >
            {getImgDisplayContents()}
          </Row>
        </>
        )
    }


    // FUNCTION RETURN
    return (
        <div id="interestsContainer">
            <NavigationBar setPage={props.setPage} />
            <Container>
                <Row className="justify-content-center">
                    {files_data.headers.map( (header, index) => {
                        return (
                            <Col
                                className='interestsProfile imgBtn'
                                lg={4}
                                md={5}
                                xs={8}
                                key={index} >
                                <div
                                    className='ratio ratio-1x1'
                                    onClick={ () => {select(header)}}  >
                                    <h1>{header}</h1>
                                    <img alt={header}
                                        src={interestProfileImgs[index]} >
                                    </img>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
                {moreInfo}
            </Container>
    
            <br></br>
        </div>
    )
}

export default Interests;