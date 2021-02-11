import React, { Component } from 'react';
// import './Rentals.css';
class CardView extends Component {
    render()
    {
        const { data } = this.props;
        return(<>
<div className="card-view">
<div id="multi-item-example" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner" role="listbox">
      {data.map((item,index)=> {
          return(<div className={index == 0? 'carousel-item active': "carousel-item"}>
          <img src={item.image} alt={''} className="cart-image" />
          <div className="card-image-layer"/>
          <div className="layer-text-view">
              <div>
                <h1 className="overlay-title"> 6 Passenger <br /> Golf Cart </h1>
              </div>
              <div className="activity-view">
              $125 Day <br /><br />
              $255 Weekend <br /> <br />
              $330 Week
              </div>
          </div>
       </div>)
      })}
  </div>
</div>
</div>
        </>
            )
    }
}

export default CardView;