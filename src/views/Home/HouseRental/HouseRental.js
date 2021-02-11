import React, { Component } from 'react';
import Image1 from '../../../assets/img/beach-house/beach-house-img1.png';
import Image2 from '../../../assets/img/beach-house/beach-house-img2.png';
import CarouselButtonTitle from '../../../components/Carousel/CarouselButtonTitle';
import './HouseRental.scss';

class HouseRental extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseRentalArr: [{
        path: '/reserve',
        images: [{
          img: Image2,
          colWidth: '6',
          showOverlay: true,
          isTextCenter: true,
          isBgTransparent: true,
          title: 'The Shipwreck',
          url: 'https://waterboyrentals.com/the-shipwreck'
        },
          {
            img: Image1,
            colWidth: '6',
            showOverlay: true,
            isTextCenter: true,
            isBgTransparent: true,
            title: 'The Wet Mermaid',
            url: 'https://waterboyrentals.com/the-wet-mermaid'
          }]
      }]
    };
  }

  render() {
    const {houseRentalArr} = this.state;
    return (
      <div className="house-rental">
        <div className="container section">
          <CarouselButtonTitle title="Vacation Rentals" id={'beach-house-rental-slider'}
                               hideArrows={true}/>
          {/*
          <Slider data={houseRentalArr} id={"beach-house-rental-slider"}/>
*/}
          <div className="row">
            {houseRentalArr[0].images.map((item, i) => <div className="col-md-6 my-2 my-md-0 "
                                                            key={i}>
                <a target={'_blank'} href={item.url}
                   rel="noopener noreferrer">
                  <div className={'img-container '}>
                    <img
                      className="d-block  img-fluid images"
                      src={item.img}
                      alt=""
                    />
                    <div className=" overlay-effect"/>
                    <div className="background-transparent">
                      <div className="caption d-flex justify-content-center align-items-center">
                        <h3 className="">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>);
  }
}

export default HouseRental;
