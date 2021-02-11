import React, {Component} from 'react';
import './beachview.css';

class BeachSlider extends Component {
  render() {
    const {data} = this.props;
    return (<>
        <div className="card-view row mt-2">
          <div id="multi-item-example" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner " role="listbox">
              {data.map((item, index) => {
                return (<div className={index == 0 ? 'carousel-item active' : "carousel-item row"}>
                  <div className="col-md-4 three-col">
                    <img src={item.img} alt={''} className="cart-image"/>
                  </div>
                  {/*<div className="col-md-4 three-col">
                    <img src={item.image} alt={''} className="cart-image"/>
                  </div>
                  <div className="col-md-4 three-col">
                    <img src={item.image} alt={''} className="cart-image"/>
                  </div>*/}
                </div>);
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BeachSlider;