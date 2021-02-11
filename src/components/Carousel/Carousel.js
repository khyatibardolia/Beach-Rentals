import React, { Component } from 'react';
// import './Rentals.css'
import arrowImage from '../../../assets/img/Mask-Group-3.png';
import CardView from './CardView';
import Image1 from '../../../assets/img/Image-7.png';
class Carousel extends Component {
    constructor(props)
    {
        super(props);
        this.state = { Rentalscard: [{image: Image1},
                                     {image: Image1}] }
    }
    render()
    {
        const { Rentalscard } = this.state;
        return(<div className="rental-view">
            <div className="row">
        <div className="col-md-6">
            <h1 className="rental-text"> GOLF CART RENTALS </h1>
        </div>
        <div className="col-md-6 arrow-view">
            <a className="round-button btn-floating"  href="#multi-item-example" data-slide="next">
               <img src={arrowImage} alt={''} className="arrow-image" />
            </a>
        </div>
            </div>
            <CardView data={Rentalscard} />
        </div>)
    }
}

export default Carousel;