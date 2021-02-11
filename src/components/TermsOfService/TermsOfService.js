import objectPath from 'object-path';
import React, {Component} from 'react';
import { Col } from 'react-bootstrap';
import './style.scss';
import connect from 'react-redux/es/connect/connect';
import { getTermsOfService } from '../../redux/actions/helpers';

class TermsOfService extends Component {

  componentDidMount() {
    const {getTermsOfService} = this.props;
    getTermsOfService().then(() => {})
  }

  render() {
    const {termsOfServiceData} = this.props;
    return <Col sm={12} className="my-2 gray-text">
      <div className="policies px-2">
        <span className="terms-of-service-data" dangerouslySetInnerHTML={{__html: (termsOfServiceData?.description)}}/>
      </div>

    </Col>;
  }
};

const mapStateToProps = (state) => {
  return {
    termsOfServiceData: objectPath.get(state, 'AppReducer.terms_of_service', '')
  };
};

export default connect(mapStateToProps, {
  getTermsOfService
})(TermsOfService);
