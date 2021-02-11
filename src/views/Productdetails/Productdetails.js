import React, { Component } from 'react';
import './style.css'

class Productdetails extends Component {
    render()
    {
        return(<div>
        <div class="mainimg">
        <img src="Image12.png" alt="" />
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-sm-12  row">
                <div class="carimg col-md-9"></div>
                <div class="col-md-3">
                    <div class="cartimg"></div>
                    <div class="cartimg"></div>
                    <div class="cartimg"></div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="titlebox">
                    <h6 class="title">8 Passenger Golf Cart</h6>
                    <div class="cartcontent">
                        <div class="contenttxt">Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                            unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
                        <div><span class="price"> $150 Per Day</span><span><a href="" class="bookbtn">Book
                                    Now</a></span></div>
                        <div> <span class="star"><img src="star.svg" alt="" /></span>
                            <span class="star"><img src="star.svg" alt="" /></span>
                            <span class="star"><img src="star.svg" alt="" /></span>
                            <span class="star"><img src="star.svg" alt="" /></span>
                            <span class="star"><img src="starempty.svg" alt="" /></span></div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>)
    }
}
export default Productdetails;