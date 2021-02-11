import React from 'react';
import './ContactView.css'

const IconText = props => {
    const { Icon , text } = props;
    return(<div className="row icon-text-main">
    <div className="col-md-5">
        <div className="icon-view">
        <img src={Icon} alt={''} className="icon-size" />
        </div>
    </div>
    <div className="col-md-7">
        <p className="icon-text"> { text } </p>
    </div>
        </div>)
}

export default IconText;