import objectPath from 'object-path';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import connect from 'react-redux/es/connect/connect';
import { toast } from 'react-toastify';
import Reserveimg from '../../assets/img/reserve-img.png';
import { Navigation } from '../../components/common/Navigation/Navigation';
import Subsection from '../../components/common/Subsection/Subsection';
import { GetAboutUsData } from '../../redux/actions/helpers';

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const {GetAboutUsData} = this.props;
    this.setState({isLoading: true});
    GetAboutUsData().then((response) => {
      if (objectPath.get(response, 'type') === 'error') {
        toast.error(objectPath.get(response, 'response.message'));
      }
      this.setState({isLoading: false});
    });
  }

  render() {
    const {aboutUsData} = this.props;
    const {isLoading} = this.state;
    return <>
      <Subsection title={'AboutUs'} img={Reserveimg}/>
      <div className="container my-3">
        <Card className="border-0">
          <Card.Body className={'info-card'}>
            {isLoading ? <div className="text-center">
                <div className="spinner-border text-blue"/>
              </div> :
              aboutUsData && Object.keys(aboutUsData).length ? <>
                  <div className={'rental-text mb-0'}>
                    <h3>{aboutUsData?.title}</h3>
                  </div>
                  <div className={'description mb-2'}>
                    <span dangerouslySetInnerHTML={{__html: (aboutUsData?.description)}}/>
                  </div>
                </> :
                <div className="text-center">Data not available!</div>}
          </Card.Body>
        </Card>
      </div>
    </>;
  }
}

const mapStateToProps = (state) => {
  return {aboutUsData: objectPath.get(state, 'AppReducer.aboutus', {})};
};
export default connect(mapStateToProps, {GetAboutUsData})(Navigation(AboutUs));
