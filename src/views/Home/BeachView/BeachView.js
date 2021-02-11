import objectPath from 'object-path';
import React from 'react';
import { connect } from 'react-redux';
import CarouselButtonTitle from '../../../components/Carousel/CarouselButtonTitle';
import Slider from '../../../components/common/Fields/Slider/Slider';
import './beachview.css';

const BeachView = ({productsList, isLoading}) => {

  return <div className="beach-view light-bg">
    <div className="container section">
      <CarouselButtonTitle title="BEACH TOYS RENTALS" id={'beach-toys-rental-slider'}/>
      {isLoading ? <div className={'mt-5 d-flex justify-content-center align-items-center'}>
        <div className="spinner-border text-blue"/>
      </div> : <Slider isBeachView={true} data={objectPath.get(productsList, 'beachToysData', [])}
                       id={'beach-toys-rental-slider'}/>}
    </div>
  </div>;
};

const mapStateToProps = state => {
  return {
    productsList: objectPath.get(state, 'AppReducer.productsList', {})
  };
};
export default connect(mapStateToProps, null)(BeachView);
