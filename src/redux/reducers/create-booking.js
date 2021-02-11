import {
  CREATE_BOOKING,
  SELECTED_PRODUCT_DETAILS,
  SET_BOOKING_DATES,
  UPDATE_ITEM_QUANTITY
} from '../constants';

const initialState = {
  selectedBookingDates: {},
  bookingData: {},
  productData: []
};

export const CreateBooking = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOOKING:
      return {
        ...state,
        bookingData: action.payload
      };
    case SELECTED_PRODUCT_DETAILS:
      return {
        ...state,
        productData: action.payload
      };
    case SET_BOOKING_DATES:
      return {
        ...state,
        selectedBookingDates: action.payload
      };
    case UPDATE_ITEM_QUANTITY:
      let productData = state.productData;
      const payload = action.payload;
      productData[payload.index].itemQty = payload.itemQty;
      return {
        ...state,
        productData
      };
    default:
      return state;
  }
};
