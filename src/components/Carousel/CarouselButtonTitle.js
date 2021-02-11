import React from 'react';

const CarouselButtonTitle = props => {
  const {title, id , hideArrows} = props;
  const isHideArrow = (hideArrows && hideArrows === true) ? hideArrows  : false ;
  return (<div className="row my-2">
    <div className="col-md-6 py-2 rental-title d-flex justify-content-start">
      <h1 className="rental-text mb-0"> {title} </h1>
    </div>
    {
      !isHideArrow ?
          <div className="col-md-6 arrow-view pt-2">
            <a className="round-button btn-floating mr-2" href={`#${id}`} data-slide="prev">
              <i className="fa fa-arrow-left text-orange" aria-hidden="true"/>
            </a>
            <a className="round-button btn-floating" href={`#${id}`} data-slide="next">
              <i className="fa fa-arrow-right text-orange" aria-hidden="true"/>
            </a>
          </div>
        :
          <></>
    }
  </div>);
};

export default CarouselButtonTitle;
