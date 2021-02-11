import moment from 'moment';
import objectPath from 'object-path';
import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import trash from '../../assets/img/trash.svg';
import * as routes from '../../components/constants/routes';
import { UpdateItemQuantity } from '../../redux/actions/create-booking';
import { GetSocialMediaData } from '../../redux/actions/helpers';
import { UPDATE_ITEM_QUANTITY } from '../../redux/constants';
import { calculateTotal } from '../Common/calculateTotal';
import './Booking.scss';

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedQty: 1
    };
  }

  componentDidMount() {
    const {GetSocialMediaData} = this.props;
    GetSocialMediaData().then((response) => {
      if (objectPath.get(response, 'type') === 'error') {
        toast.error(objectPath.get(response, 'response.message'));
      }
    });
  }

  handleChange = (index, e) => {
    const {UpdateItemQuantity} = this.props;
    const value = e.target.value;
    if (value) {
      this.setState({selectedQty: value});
      UpdateItemQuantity(UPDATE_ITEM_QUANTITY, {index, itemQty: value});
    }
  };

  render() {
    const {data, colSpan, removeItem, social_media, history, productData} = this.props;
    let subTotal = 0;
    let salesTax = 0;
    let dataObj = {};
    let totalNights = 0, itemTotal = 0;
    let fuelCharge = 0;
    return (data && data.length ? <>
      {data.map((d, i) => {
        const isBookingPage = history.location.pathname === '/booking';
        if (d.check_out && d.check_in) {
          let checkoutdate = moment(d.check_out);
          let checkindate = moment(d.check_in);
          totalNights = checkoutdate.diff(checkindate, 'days');
          d.totalNights = totalNights;
        }
        if (!isBookingPage) {
          d.type = d.product_type ? d.product_type : d.type;
        }
        dataObj = calculateTotal(d, isBookingPage ? productData[i].itemQty : d.qty, social_media);
        itemTotal = parseFloat(dataObj.itemTotal);
        subTotal += !isNaN(dataObj.subTotal) ? parseFloat(dataObj.subTotal) : parseFloat(d.subtotal);
        if (isBookingPage) {
          salesTax += !isNaN(dataObj.salesTax) ? parseFloat(dataObj.salesTax) : parseFloat(objectPath.get(social_media, [0, 'value']));
        } else {
          salesTax = (((subTotal).toFixed(2) * objectPath.get(social_media, [0, 'value'])) / 100).toFixed(2);
        }
        fuelCharge = (objectPath.get(d, 'fuel_charge') === '15' || objectPath.get(d, 'fuel_charge') === 15) ||
          (objectPath.get(d, 'fuel_id') === '1' || objectPath.get(d, 'fuel_id') === 1);
        return <tr key={i}>
          <td>
            <div className="d-flex">
              <div className="position-relative">
                <img src={`${d.main_image ? d.main_image : d.image}?h=${90}&w=${120}`} alt="image1"
                     className="table-image"/>
                <span className="position-absolute table-trash-icon">
                  <img src={trash} alt="image1" className="img-icon"
                       onClick={() => removeItem && typeof removeItem === 'function' && removeItem(d.id || d.product_id, d.product_name)}/>
                  </span>
              </div>
              <div className="ml-2">
                <div className={'font-weight-bold text-blue'}>
                  {isBookingPage ?
                    <Link to={routes.RESERVE.replace(':productId', objectPath.get(d, 'id'))
                      .replace(':type', objectPath.get(d, ['product_image', 0, 'type']))}
                          className="text-blue">
                      {d.product_name ? d.product_name : ''}
                    </Link> :
                    d.product_name ? d.product_name : ''}
                </div>
                <div className={'gray-text mt-0'}>
                  {d.selectedStartDate ? moment(d.selectedStartDate).format('ddd, MMM D YYYY,' +
                    ' HH:mm:ss') :
                  moment(d.check_in).format('ddd, MMM D YYYY, HH:mm:ss')} -
                  {d.selectedEndDate ? moment(d.selectedEndDate).format('ddd, MMM D YYYY, HH:mm:ss') :
                  moment(d.check_out).format('ddd, MMM D YYYY, HH:mm:ss')}
                </div>
              </div>
            </div>
          </td>
          <td className={'d-flex w-100'}>
            <div className={'gray-text mt-0 w-75'}>
              {d.totalNights ? d.totalNights : totalNights}{' '}Night{' '}@{' '}
              ${parseFloat(dataObj.amount)}
            </div>
            {!isBookingPage && d.product_type === 2 ?
              <div className={'color-gray mt-0 w-75 text-center'}>Qty : {d.qty}</div> :
              d.type === '2' ? <div className={'gray-text w-25 my-0'}>
                Qty: <select id={'selectedQty'}
                             onChange={(e) => this.handleChange(i, e)}
                             defaultValue={productData[i].itemQty ? productData[i].itemQty : 1}>
                {d.qtyArr.map((item, key) =>
                  <option key={key} value={item}>
                    {item}</option>)}
              </select>
              </div> : null}
          </td>
          {fuelCharge ? <td>
            <span className={'gray-text'}>
              {fuelCharge ? '$15.00' : ''}
            </span>
          </td> : <td>{'$0.00'}</td>}
          <td className={'text-blue font-weight-bold text-right this'}>
            ${itemTotal ? itemTotal.toFixed(2) : 0}</td>
        </tr>;
      })}
      <tr>
        <td className={'text-right'} colSpan={3}>
          <div className={'text-blue font-weight-bold'}>Sub-Total:</div>
          <div className={'gray-text'}>Texas Sales Tax
            ({objectPath.get(social_media, [0, 'value'])})%:
          </div>
        </td>
        <td>
          <div className={'text-blue font-weight-bold text-right 1111'}>${(subTotal).toFixed(2)}</div>
          <div className={'gray-text text-right'}>
            ${parseFloat(salesTax).toFixed(2)}
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={3} className={'text-right text-blue font-weight-bold'}>
          <div>Total:</div>
        </td>
        <td>
          <div
            className={'text-right text-blue font-weight-bold'}>${(+subTotal + +salesTax).toFixed(2)}</div>
        </td>
      </tr>
    </> : <tr>
      <td colSpan={colSpan} className="text-center py-3">Items not found!</td>
    </tr>);
  }
};
const mapStateToProps = (state) => {
  const social_media = objectPath.get(state, 'AppReducer.social_media');
  return {
    social_media,
    productData: objectPath.get(state, 'CreateBooking.productData', [])
  };
};
export default withRouter(connect(mapStateToProps, {
  GetSocialMediaData, UpdateItemQuantity
})(Booking));
