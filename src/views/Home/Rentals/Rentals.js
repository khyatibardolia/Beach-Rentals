import objectPath from 'object-path';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Image1 from '../../../assets/img/beach-cart/cart-img1.png';
import Image2 from '../../../assets/img/beach-cart/cart-img2.png';
import CarouselButtonTitle from '../../../components/Carousel/CarouselButtonTitle';
import Slider from '../../../components/common/Fields/Slider/Slider';
import './Rentals.css';

class Rentals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartRentalArr: [
        {
          images: [{
            path: '/reserve',
            img: Image1,
            showOverlay: true,
            colWidth: '6',
            title: '1 Passenger Golf Cart',
            activity_prices: ['$125 day', '$255 Weekend', '$330 Week']
          },
            {
              path: '/reserve',
              img: Image2,
              colWidth: '6',
              showOverlay: true,
              title: '2 Passenger Golf Cart',
              activity_prices: ['$125 day', '$255 Weekend', '$330 Week']
            }]
        }]
    };
  }

  render() {
    const {title, productsList, isLoading} = this.props;
    const productList = objectPath.get(productsList, ['golfCartData', 0, 'images'], []).length;
    return (<div className="rental-view section light-bg">
      <div className="container">
        <CarouselButtonTitle title={title} hideArrows={productList < 4} id={'beach-cart-rental-slider'}/>
        {isLoading ? <div className={"mt-5 d-flex justify-content-center align-items-center"}>
            <div className="spinner-border text-blue"/>
          </div>
          :
          <Slider data={objectPath.get(productsList, 'golfCartData', [])}
                  isCartSlider={productList < 4}
                  id={'beach-cart-rental-slider'}/>}
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    productsList: objectPath.get(state, 'AppReducer.productsList', {})
  };
};
export default connect(mapStateToProps, null)(Rentals);
