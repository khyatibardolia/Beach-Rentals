import React, {Component} from 'react';
import {Carousel, Col, Row} from 'react-bootstrap';
import QuateCardView from '../QuateCardView/QuateCardView';

class DynamicCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  handleSelect = index => {
    this.setState({index});
  };

  render() {
    const {data, id} = this.props;
    const {index} = this.state;
    return <Carousel id={id}
                     interval={3000}
                     className="slider d-flex justify-content-center align-items-center"
                     data-ride="carousel"
                     defaultActiveIndex={index}
                     activeIndex={index}
                     indicators={false}
                     controls={false}
                     onSelect={this.handleSelect}
    >
      {data && data.length ? data.map((item, i) => <Carousel.Item key={i}>
        <Row>
          {item.feedback.map((d, key) => <Col md={6} sm={6} key={key}
                                              className={`card-main-view ${(key !== index) ? 'clearfix d-none d-sm-block' : ''}`}>
            <QuateCardView data={d}/>
          </Col>)
          }
        </Row>
      </Carousel.Item>) : null}
    </Carousel>;
  }
}

export default DynamicCarousel;
