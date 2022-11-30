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


const INFO_ROW_ID = "interestInfo";


const Interests = (props) => {

  const [interestTitlesData, setInterestTitlesData] = useState(undefined);
  const [selected, setSelected] = useState(undefined);
  const [interestData, setInterestData] = useState(undefined);

  useEffect( () => {
    fetch("http://localhost:8000/interests")
      .then( (res) => res.json() )
      .then( (data) => {
        setInterestTitlesData(data);
      });
  }, [])

  useEffect( () => {
    if (selected !== undefined ) scrollToId(INFO_ROW_ID);
  }, [selected])

  useEffect( () => {
    if (selected !== undefined) {
      fetch("http://localhost:8000/images/" + selected)
        .then( (res) => res.json() )
        .then( (data) => {
          if (data.captions !== undefined) {
            data.captions = data.images.map( (img) => {
              return data.captions[img];
            });
          }
          data.images = data.images.map( (img) => {
            return require('./images/' + selected + '/' + img);
          });
          setInterestData(data)
        });
    }
  }, [selected]);





  // need interestTitlesData loaded
  if (interestTitlesData === undefined) return;

  /*
    interestTitlesData: {
      headers: [Strings],
      about: {
        <header1>:[Strings],
        ...
      }
      profileImgs: [Strings]
    }
  */

  const interestProfileImgs = interestTitlesData.profileImgs
    .map( (imgName) => {
      return require("./images/" + imgName);
    });

  // if click on alread selected --> scroll down
  // if click on new --> change selected
  const select = (interest) => {
    if (selected === interest) {
      scrollToId(INFO_ROW_ID);
    } else {
      setSelected(interest);
    }
  }
      

  var moreInfo;
  // selected: highlighted interested
  if (selected !== undefined) {
    moreInfo = (<InfoRow
                  header={selected}
                  contents={interestTitlesData.about[selected]}
                  id={INFO_ROW_ID} />);
    
    // interestData: images / text about selected interest
    // if interestData is defined, add the images / text about
    // interest to moreInfo
    if (interestData !== undefined) {

      /*
        interestData: {
          images: [Strings]
          captions: {
            <img1>: Strings
            ...
          }
        }
      */


      const captionsFound = interestData.captions !== undefined;
      var captionLocation = 'left';
      const rowParams = captionsFound ?
                          {xs:1} :
                          {lg:3, md:2, xs:1};
    
      const getImgDisplayContents = () => {
        return interestData.images.map( (image, index) => {
          const noCaption = !captionsFound || 
                            interestData.captions[index] === undefined;
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
                      slides={interestData === undefined ?
                        []:
                        interestData.images.map( (image) => {
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
                            <p>{interestData.captions[index]}</p>}
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
      moreInfo = (
        <>
          {moreInfo}
          <Row {...rowParams} className="imgDisplay justify-content-center">
            {getImgDisplayContents()}
          </Row>
        </>
      )
    }
  } else {
    // selected was undefined --> no additional info to display

    moreInfo = <></>;
  }

  return (
    <div id="interestsContainer">
      <NavigationBar setPage={props.setPage} />
      <Container>
        <Row className="justify-content-center">
          {interestTitlesData.headers.map( (header, index) => {
            return (
            <Col
              className='interestsProfile imgBtn'
              lg={4}
              md={5}
              xs={8}
              key={index}>
                <div
                  className='ratio ratio-1x1'
                  onClick={ () => {select(header)}}  >
                  <h1>{header}</h1>
                  <img alt={header}
                    src={interestProfileImgs[index]}
                    >
                  </img>
                </div>
              </Col>
            )
          })}
        </Row>
        {moreInfo}
      </Container>
    </div>
  )
}

export default Interests;