import objectPath from 'object-path';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import connect from 'react-redux/es/connect/connect';
import { toast } from 'react-toastify';
import Reserveimg from '../../assets/img/reserve-img.png';
import { Navigation } from '../../components/common/Navigation/Navigation';
import Subsection from '../../components/common/Subsection/Subsection';
import { GetPrivacyPolicyData } from '../../redux/actions/helpers';
import './PrivacyPolicy.css';

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policyData: {},
      isLoading: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const {GetPrivacyPolicyData} = this.props;
    this.setState({isLoading: true});
    GetPrivacyPolicyData().then((response) => {
      if (objectPath.get(response, 'type') === 'error') {
        toast.error(objectPath.get(response, 'response.message'));
      }
      this.setState({policyData: response, isLoading: false});
    });
  }

  render() {
    const {policyData, isLoading} = this.state;
    return (<>
      <Subsection title={'Privacy Policy'} img={Reserveimg}/>
      <div className="container my-3">
        <div className={'row'}>
          <div
            className={`col-sm-12 ${isLoading ? 'w-100 h-100 d-flex justify-content-center align-items-center' : ''}`}>
            <Card className="border-0">
              <Card.Body className={'info-card'}>
                {isLoading ? <div className="text-center">
                    <div className="spinner-border text-blue"/>
                  </div> :
                  policyData && policyData.id ? <>
                      <div className={'rental-text mb-0'}>
                        <h3>{policyData?.title}</h3>
                      </div>
                      <div className={'description mb-2'}>
                        <span dangerouslySetInnerHTML={{__html: (policyData?.description)}}/>
                      </div>
                    </> :
                    <div className="text-center">Data not available!</div>}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>);
  }
}

const mapStateToProps = (state) => {
  const privacy_policy = objectPath.get(state, 'AppReducer.privacy_policy');
  const safety_policy = objectPath.get(state, 'AppReducer.safety_policy');
  const cancellation_policy = objectPath.get(state, 'AppReducer.cancellation_policy');
  const rental_policy = objectPath.get(state, 'AppReducer.rental_policy');
  return {
    privacy_policy,
    safety_policy,
    cancellation_policy,
    rental_policy
  };
};
export default connect(mapStateToProps, {GetPrivacyPolicyData})(Navigation(PrivacyPolicy));
