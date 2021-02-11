import objectPath from 'object-path';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import connect from 'react-redux/es/connect/connect';
import Reserveimg from '../../assets/img/reserve-img.png';
import { Navigation } from '../../components/common/Navigation/Navigation';
import Subsection from '../../components/common/Subsection/Subsection';
import { ApiRoutes } from '../../config/api-routes';
import { GetCmsData } from '../../redux/actions/helpers';
import '../PrivacyPolicy/PrivacyPolicy.css';

class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const {GetCmsData} = this.props;
    this.setState({isLoading: true});
    GetCmsData(ApiRoutes.TERMS_AND_CONDITIONS).then((response) => {
      if (response) {
        this.setState({isLoading: false});
      }
    });
  }

  render() {
    const {isLoading} = this.state;
    const {data} = this.props;
    return (<>
      <Subsection title={'Terms And Conditions'} img={Reserveimg}/>
      <div className="container my-3">
        <div className={'row'}>
          <div
            className={`col-sm-12 ${isLoading ? 'w-100 h-100 d-flex justify-content-center align-items-center' : ''}`}>
            {isLoading ? <div className="spinner-border text-blue"/> : <Card className="border-0">
              <Card.Body className={'info-card'}>
                <div>
                  <div className={'rental-text mb-0'}>
                    <h3>{data?.title}</h3>
                  </div>
                  <div className={'description mb-2'}>
                    <span dangerouslySetInnerHTML={{__html: (data?.description)}}/>
                  </div>
                </div>
              </Card.Body>
            </Card>}
          </div>
        </div>
      </div>
    </>);
  }
}

const mapStateToProps = (state) => {
  const data = objectPath.get(state, 'AppReducer.cms_data');
  return {data};
};
export default connect(mapStateToProps, {
  GetCmsData
})(Navigation(TermsAndConditions));
