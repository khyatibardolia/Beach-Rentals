import React from 'react';
import quote from '../../../../assets/img/icons/quote.png';
import userimage from '../../../../assets/img/user.svg';
import './QuateCardView.css';

const QuateCardView = ({data}) => {
  return <div className="qaute-view d-flex flex-column justify-content-between">
    <div className="desc-quote-text h-67 overflow-auto">
      <img src={quote} alt={'quote'} className="quote-icon"/>
      <p> {data.description ? data.description : ''} </p>
    </div>
    <div className="quote-user-view">
      <div className="row mt-2">
        <div className="col-sm-12 d-flex">
          <img className="img-fluid" src={data.photo ? data.photo : userimage} alt={''}/>
          <div className={'w-100 ml-2'}>
            <p className="user-name mb-0"> {data.title ? data.title : ''} </p>
            {data.position ? <p className="user-bio"> data.position </p> : null}
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default QuateCardView;
