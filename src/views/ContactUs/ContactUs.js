import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import ContactUsImg from '../../assets/img/contactus-banner-img.png';
import { Navigation } from '../../components/common/Navigation/Navigation';
import Subsection from '../../components/common/Subsection/Subsection';
import MapContainer from '../../components/GoogleMap/MapContainer';

class Reserve extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return <>
      <Subsection title={'Contact Us'} img={ContactUsImg}/>
      <div className='container my-5'>
        <h1 className={'text-blue font-weight-bold f-32 mb-3'}>
          Find us on google Maps
        </h1>
        <MapContainer/>
      </div>
      <div className={'reserve-panel'}>
        <div className={'container'}>
          <Row className="py-3">
            <Col sm={12} md={6}
                 className={'payment-title d-flex justify-content-start' +
                 ' align-items-center'}>
              <span className={'title f-32'}>Quick Reserve</span>
            </Col>
            <Col sm={12} md={6}
                 className="my-2 text-sm-center title-section d-flex justify-content-end align-items-center">
              <button type="button" className="btn reserve-btn f-32 px-4">
                409-632-0256
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </>;
  }
}

export default Navigation(Reserve);
