import objectPath from 'object-path';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import connect from 'react-redux/es/connect/connect';
import { toast } from 'react-toastify';
import { Axios } from '../../config/api-config';
import { ApiRoutes } from '../../config/api-routes';
import { GetCmsData } from '../../redux/actions/helpers';

class WaterRentalPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      policyData: []
    };
  }

  componentDidMount() {
    const {GetCmsData} = this.props;
    let array = [];
    this.setState({isLoading: true});
    array.push(GetCmsData(ApiRoutes.SAME_DAY_RENTALS));
    array.push(GetCmsData(ApiRoutes.RENTAL_POLICY));
    array.push(GetCmsData(ApiRoutes.SAFETY_POLICY));
    array.push(GetCmsData(ApiRoutes.CANCELLATION_POLICY));
    Axios.all(array).then((response) => {
      if (response && response.length) {
        let flag = false;
        response.forEach(d => {
          if (d.type === 'error') {
            flag = true;
            toast.error(objectPath.get(d, 'response.message'));
          }
        });
        if (!flag) {
          this.setState({policyData: response, isLoading: false});
        } else {
          this.setState({isLoading: false});
        }
      } else {
        this.setState({isLoading: false});
      }
    });
  }

  render() {
    const {isLoading, policyData} = this.state;
    return <div className={`mt-2 col-sm-12
        ${isLoading ? 'w-100 h-100 d-flex justify-content-center align-items-center' : ''}`}>
      <Card className="border-0">
        {isLoading ? <div className="spinner-border text-blue"/> :
          <Card.Body className={'info-card'}>
            {policyData && policyData.length ? policyData?.map((d, i) => <div key={i}>
              <div className={'rental-text mb-0'}>
                <h3>{d?.title}</h3>
              </div>
              <div className={'description'}>
                <div><span dangerouslySetInnerHTML={{__html: (d?.description)}}/>
                </div>
              </div>
            </div>) : <span>Data Not available!</span>}
          </Card.Body>}
      </Card>
    </div>;
  }
}

export default connect(null, {GetCmsData})(WaterRentalPolicy);
