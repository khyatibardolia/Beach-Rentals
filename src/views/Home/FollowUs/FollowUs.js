import objectPath from 'object-path';
import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import facebook from '../../../assets/img/icons/facebook.png';
import instagram from '../../../assets/img/icons/instagram-sketched.png';
import Background from '../../../assets/img/Image-6.png';
import DynamicCarousel from '../../../components/common/Fields/DynamicCarousel/DynamicCarousel';
import { Axios } from '../../../config/api-config';
import { GetFeedbackList, GetSocialMediaData } from '../../../redux/actions/helpers';
import './FollowUs.css';

class FollowUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const {GetSocialMediaData, GetFeedbackList} = this.props;
    this.setState({isLoading: true});
    const arr = [];
    arr.push(GetSocialMediaData());
    arr.push(GetFeedbackList());
    Axios.all(arr).then(() => {
      this.setState({isLoading: false});
    });
  }

  render() {
    const {isLoading} = this.state;
    const {social_media, feedbackList} = this.props;
    return <div className="follow-us-view">
      <img src={Background} alt={''} className="about-us-banner"/>
      <div className="back-img-layer"/>
      <div className="back-laye-text">
        {isLoading ? <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-white"/>
          </div> :
          <div className="row w-100 h-100 m-0 p-0">
            <div className="col-sm-3 d-flex justify-content-center align-items-center
          flex-column text-feedback">
              <div className="content-text">
                <h1 className="followus-text"> Hear what our customers <br/> are saying </h1>
                <h2 className="follow-us-text"> Follow us on </h2>
                <div className="row">
                  {social_media && social_media.length && social_media.map((d, i) => <div key={i}
                                                                                          className="icon-view-followus">
                    <a href={d.value} target={'_blank'} rel="noopener noreferrer">
                      <img alt={''}
                           src={d.name === 'Instagram Link' ? instagram : d.name === 'Facebook Link' ? facebook : ''}/>
                    </a>
                  </div>)}
                </div>
              </div>
            </div>
            <div
              className="py-4 col-sm-12 m-auto col-md-8 d-flex justify-content-center align-items-center flex-row flex-shrink-1">
              <DynamicCarousel data={feedbackList} id={'feedbackslider'}/>
            </div>
          </div>
        }
      </div>
    </div>;
  }
}

const mapStateToProps = (state) => {
  const social_media = objectPath.get(state, 'AppReducer.social_media', []);
  const feedbackList = objectPath.get(state, 'AppReducer.feedbackData.feedBackList', {});
  return {social_media, feedbackList};
};
export default connect(mapStateToProps, {
  GetSocialMediaData, GetFeedbackList
})(FollowUs);
