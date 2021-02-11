import objectPath from 'object-path';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Navigation } from '../../components/common/Navigation/Navigation';
import { GetProductList, ResetReduxForm } from '../../redux/actions/helpers';
import AboutView from './AboutView/AboutView';
import BeachView from './BeachView/BeachView';
import ContactView from './ContactView/ContactView';
import FollowUs from './FollowUs/FollowUs';
import HouseRental from './HouseRental/HouseRental';
import Rentals from './Rentals/Rentals';

// import Carousel from '../../components/Carousel/Carousel';
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    const {GetProductList} = this.props;
    window.scrollTo(0, 0);
    this.setState({isLoading: true});
    GetProductList().then((response) => {
      if (objectPath.get(response, 'type') === 'error') {
        toast.error(objectPath.get(response, 'response.message'));
      }
      this.setState({isLoading: false});
    });
  }

  componentWillUnmount() {
    const {ResetReduxForm} = this.props;
    if (typeof ResetReduxForm === 'function') {
      ResetReduxForm('BookingPage');
    }
  }

  render() {
    const {isLoading} = this.state;
    return (
      <div className="container-fluid p-0">
        <AboutView/>
        <Rentals isLoading={isLoading} title="GOLF CART RENTALS"/>
        <ContactView/>
        <BeachView isLoading={isLoading}/>
        <HouseRental/>
        <FollowUs/>
      </div>
    );
  }
}

export default Navigation(connect(null, {GetProductList, ResetReduxForm})(Home));
