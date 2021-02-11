import objectPath from 'object-path';
import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import BikeImage from '../../assets/img/beach-cart/cart-img2.png';
import FaqImg from '../../assets/img/faq_bg.jpg';
import { Navigation } from '../../components/common/Navigation/Navigation';
import Subsection from '../../components/common/Subsection/Subsection';
import { GetFaqData } from '../../redux/actions/helpers';
import './Faq.css';

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCollapse: {},
      isLoading: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const {GetFaqData} = this.props;
    this.setState({isLoading: true});
    GetFaqData().then((response) => {
      if (objectPath.get(response, 'type') === 'error') {
        toast.error(objectPath.get(response, 'response.message'));
      }
      this.setState({isLoading: false});
    });
  }

  toggle = (key) => {
    this.setState(state => {
      state.toggleCollapse[key] = !state.toggleCollapse[key];
      return state;
    });
  };

  render() {
    const {toggleCollapse, isLoading} = this.state;
    const {faqData} = this.props;
    return (<>
      <Subsection title={'FAQ'} img={FaqImg}/>
      <div className="container">
        <div className={'row'}>
          <div className={'col-sm-8 my-3'}>
            <Accordion
              className={`${isLoading ? 'w-100 h-100 d-flex justify-content-center align-items-center' : ''}`}>
              {isLoading ? <div className="spinner-border text-blue"/> :
                faqData && faqData.length ? faqData.map((item, i) => {
                  return <Card key={i} className={`faq-card card border-0 rounded cursor-pointer
                ${i !== 0 ? 'my-2' : ''}`}>
                    <Accordion.Toggle className="topic-title border-bottom-0" as={Card.Header}
                                      eventKey={`"${i}"`}
                                      onClick={() => this.toggle(i)}>
                      <div>
                        <strong>
                          <span>{item.question}</span>
                          <span className={'arrows'}>
                            <i aria-hidden="true"
                               className={`fa fa-angle-${toggleCollapse && toggleCollapse[i] ? 'up' : 'down'}`}/>
                        </span>
                        </strong>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={`"${i}"`}>
                      <Card.Body className={'faq-desc'}>{item.answer}</Card.Body>
                    </Accordion.Collapse>
                  </Card>;
                }) : <div>Data not available!</div>
              }
            </Accordion>
          </div>
          <div className={'col-sm-4 my-3 faq-bike-img'}>
            <div className="">
              <img src={BikeImage} alt={'Bike'} className="bike-img w-100"/>
            </div>
          </div>
        </div>
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
    </>);
  }
}

const mapStateToProps = (state) => {
  return {faqData: objectPath.get(state, 'AppReducer.faq', [])};
};
export default connect(mapStateToProps, {GetFaqData})(Navigation(Faq));
