import React, {Component} from 'react';
import './Rentals.css';

class RentalCard extends Component {
  render() {
    const {data, text} = this.props;
    return (<>
        <div className="">
          <div id="multi-item-example1" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
              {data.map((item, index) => {
                return (<div
                  className={index === 0 ? 'carousel-item active car-view' : "carousel-item  car-view"}>
                  <>
                    <ul className=" mt-3">
                      <li className=" mb-3">
                        <img alt={''} src={item.image} className="cart-image"/>
                        <div className="card-image-layer"/>
                        <div className="layer-text-view">
                          <div>
                            <h1 className="overlay-title"
                                dangerouslySetInnerHTML={{__html: item.title}}/>
                          </div>
                          {text ? null :
                            <div className="activity-view">
                              $125 Day <br/><br/>
                              $255 Weekend <br/> <br/>
                              $330 Week
                            </div>}
                        </div>
                      </li>
                    {/*  <div className="col-md-6 mb-3">
                        <img src={item.image} alt={''} className="cart-image"/>
                        <div className="card-image-layer"/>
                        <div className="layer-text-view">
                          <div>
                            <h1 className="overlay-title"
                                dangerouslySetInnerHTML={{__html: item.title}}/>
                          </div>
                          {text ? null :
                            <div className="activity-view">
                              $125 Day <br/><br/>
                              $255 Weekend <br/> <br/>
                              $330 Week
                            </div>}
                        </div>
                      </div>*/}
                    </ul>
                  </>
                </div>);
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RentalCard;