import objectPath from 'object-path';
import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link, NavLink, withRouter } from 'react-router-dom';
import phone from '../../../assets/img/icons/phone.png';
import logo from '../../../assets/img/logo.png';
import { getfuelsList, getPassengersList } from '../../../redux/actions/helpers';
import BookingForm from '../../BookingForm/BookingForm';
import Button from '../../Button/Button';
import * as routes from '../../constants/routes';
import './style.modules.css';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSideNav: false
    };
  }

  componentDidMount() {
    const {toggleSideNav} = this.state;
    const {getPassengersList, getfuelsList} = this.props;
    getPassengersList().then(() => {});
    getfuelsList().then(() => {});
    window.addEventListener('resize', () => {
      if (toggleSideNav && window.innerWidth > 425) {
        this.toggleSideNav(true);
      }
    });
  }

  toggleSideNav = (flag) => {
    this.setState(state => {
      state.toggleSideNav = flag;
      return state;
    });
  };

  onClick = () => {
    /*const {history} = this.props;
    history.push(routes.BOOKING);*/
    const ele = document.getElementsByClassName('rental-view section')[0];
    if (ele) {
      ele.scrollIntoView();
    }
  };

  render() {
    const {location, passengers_list, fuels_list} = this.props;
    const {toggleSideNav} = this.state;
    const isHomePage = (location.pathname === '/');
    const divStyle2 = {
      position: 'absolute',
      /*left: '143px',*/
      bottom: '70px'
    };
    return <div className={`position-relative w-100 main-nav
    ${isHomePage ? 'home-image home-bg' : ''}`}
                style={{height: isHomePage ? '600px' : 'unset'}}>
      {/*{isHomePage && <img src={background} alt="background-banner" className="background-banner"/>}*/}
      {isHomePage && <div className={`image_layer ${isHomePage ? 'home-image' : ''}`}/>}
      <nav className={`navbar navbar-expand-md navbar-dark py-1
        ${isHomePage ? 'bg-transparent' : 'bg-blue'}`}>
        <div className="container">
          <Link className="navbar-brand mx-0" to={'/'}>
            <img src={logo} className="logo-image" alt="logo"/>
          </Link>
          {!toggleSideNav ?
            <div className="d-flex align-items-center justify-content-end">
              <a href="tel:409-632-0256"
                 className="call-view d-md-none d-block text-white d-flex align-items-center">
                <img alt={''} src={phone} className="footer-icon f-20 mr-1 mt-1"/>
                <span className="font-bold-roman">409-632-0256</span>
              </a>
              <button className="navbar-toggler collapsed border-0 ml-1"
                      onClick={() => this.toggleSideNav(true)}
                      type="button"
                      data-toggle="collapse"
                      data-target="#menubar">
                <span className="navbar-toggler-icon"/>
              </button>
            </div>
            : null}
          <div className={`collapse navbar-collapse d-flex justify-content-end pr-5
          ${toggleSideNav ? 'show' : ''}`} id="menubar">
            {/*<ul className="mr-auto"/>*/}
            <ul className="navbar-nav d-flex align-items-center menu">
              <li className="nav-item">
                <NavLink exact to={routes.HOME} className="nav-link" activeClassName="active">
                  <span className="tab-text">Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to={routes.ABOUTUS} className="nav-link" activeClassName="active">
                  <span className="tab-text">About Us</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to={routes.FAQ} className="nav-link" activeClassName="active">
                  <span className="tab-text">Faq</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to={routes.CONTACTUS} className="nav-link" activeClassName="active">
                <span
                  className="tab-text">Contact Us</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <ul className="call-now-view navbar-nav position-absolute" style={{right: '11px'}}>
          <li className="nav-item text-center ml-5 mr-2">
            <span className="call-text"> Call Now </span>
            <a href="tel:409-632-0256" className="call-number"> 409-632-0256 </a>
          </li>
        </ul>
      </nav>
      {toggleSideNav ?
        <div className={`drawer`}>
          <div className="content p-2 py-3 min-vh-100 position-fixed shadow-lg">
            <div className="nav-item w-100">
              <i className="fa fa-times text-white f-20 float-right mr-1 cursor-pointer"
                 onClick={() => this.toggleSideNav(false)}/>
            </div>
            <ul className="navbar-nav py-4">
              <li className="nav-item">
                <NavLink exact to={routes.HOME} className="nav-link" activeClassName="active">
                  <span className="tab-text">Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to={routes.ABOUTUS} className="nav-link" activeClassName="active">
                  <span className="tab-text">About Us</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to={routes.FAQ} className="nav-link" activeClassName="active">
                  <span className="tab-text">Faq</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to={routes.CONTACTUS} className="nav-link" activeClassName="active">
                    <span
                      className="tab-text">Contact Us
                    </span>
                </NavLink>
              </li>
              <li className={`nav-item ${toggleSideNav ? 'd-none' : ''}`}>
                <div className="call-view">
                  <span className="call-text">Call Now</span>
                  <a href="tel:409-632-0256" className="call-number"> 409-632-0256 </a>
                </div>
                {/* <a className="nav-link" href="/"> Call Now </a>
        <span className="number"> 409-632-0256 </span> */}
              </li>
            </ul>
          </div>
        </div> : null}

      {isHomePage && <div className="container main-page mt-4">
        <div className="row">
          <div className="my-2 col-md-7 d-flex main-title flex-column">
            <div className={'main-title-div'}>
              <h1 className="infotext d-flex"> Golf Cart Rentals, Surf Boards and more</h1>
            </div>
            <div style={divStyle2} className={'sub-title-div'}>
              <Button isHomePage={true} title="Reserve Online"
                      customClass='ml-0'
                      onClick={this.onClick}/>
            </div>
          </div>
          <div className="col-md-5 form-container d-flex justify-content-end align-items-center">
            <BookingForm passengersList={passengers_list} fuels_list={fuels_list}/>
          </div>
        </div>
      </div>}
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    passengers_list: objectPath.get(state, 'AppReducer.passengers', ''),
    fuels_list: objectPath.get(state, 'AppReducer.fuels', '')
  };
};

export default withRouter(connect(mapStateToProps, {
  getPassengersList, getfuelsList
})(TopNav));
