import objectPath from 'object-path';
import * as routes from '../../components/constants/routes';
import {
  FETCH_ABOUTUS_DATA,
  FETCH_ABOUTUS_DATA_ERROR,
  FETCH_CMS_DATA,
  FETCH_CMS_DATA_ERROR,
  FETCH_FAQ_DATA,
  FETCH_FAQ_DATA_ERROR,
  FETCH_PRIVACY_POLICY,
  FETCH_PRIVACY_POLICY_ERROR,
  FETCH_PRODUCT_DETAILS,
  FETCH_PRODUCT_DETAILS_ERROR,
  FETCH_SOCIAL_MEDIA_DATA,
  FETCH_SOCIAL_MEDIA_DATA_ERROR,
  GET_FEEDBACK_DATA,
  GET_FEEDBACK_DATA_ERROR,
  PRODUCT_LIST,
  PRODUCT_LIST_ERROR,
  GET_RESERVATION_DETAILS,
  GET_RESERVATION_DETAILS_ERROR,
  CREATE_INTENT,
  CREATE_INTENT_ERROR,
  VERIFY_ORDER,
  VERIFY_ORDER_ERROR,
  PASSENGERS_ERROR,
  PASSENGERS,
  CHECK_GOLF_CART_AVAILABILITY,
  CHECK_GOLF_CART_AVAILABILITY_ERROR,
  TERMS_OF_SERVICE,
  TERMS_OF_SERVICE_ERROR, FUELS, FUELS_ERROR
} from '../constants';

const initialState = {
  faq: [],
  aboutus: {},
  privacy_policy: {},
  cms_data: {},
  social_media: [],
  productsList: {},
  productDetails: [],
  feedbackData: [],
  reservation_details: {},
  create_intent_data: {},
  verify_order_data: {},
  passengers: [],
  fuels: [],
  cart_availability_data : {},
  terms_of_service : {},
};

export const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAQ_DATA:
      return {
        ...state,
        faq: action.payload
      };
    case FETCH_FAQ_DATA_ERROR:
      return {
        ...state,
        faq: action.payload
      };
    case FETCH_ABOUTUS_DATA:
      return {
        ...state,
        aboutus: action.payload
      };
    case FETCH_ABOUTUS_DATA_ERROR:
      return {
        ...state,
        aboutus: action.payload
      };
    case FETCH_PRIVACY_POLICY:
      return {
        ...state,
        privacy_policy: action.payload
      };
    case FETCH_PRIVACY_POLICY_ERROR:
      return {
        ...state,
        privacy_policy: action.payload
      };
    case FETCH_CMS_DATA:
      return {
        ...state,
        cms_data: action.payload
      };
    case FETCH_CMS_DATA_ERROR:
      return {
        ...state,
        cms_data: action.payload
      };
    case FETCH_SOCIAL_MEDIA_DATA:
      return {
        ...state,
        social_media: action.payload
      };
    case FETCH_SOCIAL_MEDIA_DATA_ERROR:
      return {
        ...state,
        social_media: action.payload
      };
    case PRODUCT_LIST:
      return {
        ...state,
        productsList: createProductObj(action.payload)
      };
    case PRODUCT_LIST_ERROR:
      return {
        ...state,
        productsList: action.payload
      };
    case FETCH_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload
      };
    case FETCH_PRODUCT_DETAILS_ERROR:
      return {
        ...state,
        productDetails: action.payload
      };
    case GET_FEEDBACK_DATA:
      return {
        ...state,
        feedbackData: createFeedbackObj(action.payload)
      };
    case GET_FEEDBACK_DATA_ERROR:
      return {
        ...state,
        feedbackData: action.payload
      };
    case GET_RESERVATION_DETAILS:
      return {
        ...state,
        reservation_details: action.payload
      };
    case GET_RESERVATION_DETAILS_ERROR:
      return {
        ...state,
        reservation_details: action.payload
      };
    case CREATE_INTENT:
      return {
        ...state,
        create_intent_data: action.payload
      };
    case CREATE_INTENT_ERROR:
      return {
        ...state,
        create_intent_data: action.payload
      };
    case VERIFY_ORDER:
      return {
        ...state,
        verify_order_data: action.payload
      };
    case VERIFY_ORDER_ERROR:
      return {
        ...state,
        verify_order_data: action.payload
      };
    case PASSENGERS:
      return {
        ...state,
        passengers: action.payload
      };
    case PASSENGERS_ERROR:
      return {
        ...state,
        passengers: action.payload
      };
    case FUELS:
      return {
        ...state,
        fuels: action.payload
      };
    case FUELS_ERROR:
      return {
        ...state,
        fuels: action.payload
      };
    case CHECK_GOLF_CART_AVAILABILITY:
      return {
        ...state,
        cart_availability_data: action.payload
      };
    case CHECK_GOLF_CART_AVAILABILITY_ERROR:
      return {
        ...state,
        cart_availability_data: action.payload
      };
    case TERMS_OF_SERVICE:
      return {
        ...state,
        terms_of_service: action.payload
      };
    case TERMS_OF_SERVICE_ERROR:
      return {
        ...state,
        terms_of_service: action.payload
      };
    default:
      return state;
  }
};

const createFeedbackObj = (feedBackData) => {
  let obj = {};
  if (feedBackData && feedBackData.length) {
    obj.feedBackList = feedBackData.map((d, i, data) => {
      let feedback = [];
      feedback.push(d);
      if (data[i + 1]) {
        feedback.push(data[i + 1]);
        delete data[i + 1];
      }
      return {
        feedback
      };
    }).filter(d => d && Object.keys(d).length);
  }
  return obj;
};

const createProductObj = (data) => {
  const obj = {};
  if (data && Object.keys(data).length) {
    const golf_carts = objectPath.get(data, 'golf_carts', []);
    const beach_toys = objectPath.get(data, 'beach_toys', []);
    if (golf_carts && golf_carts.length) {
      obj.golfCartData = golf_carts.map((d, i, data) => {
        let images = [];
        let obj1 = resolveGolfCartObj(d);
        images.push(obj1);
        if (data[i + 1]) {
          images.push(resolveGolfCartObj(data[i + 1]));
          delete data[i + 1];
        }
        if (data[i + 2]) {
          images.push(resolveGolfCartObj(data[i + 2]));
          delete data[i + 2];
        }
        return {
          images
        };
      }).filter(d => d && Object.keys(d).length);
    }
    if (beach_toys && beach_toys.length) {
      obj.beachToysData = beach_toys.map((d, i, data) => {
        let images = [];
        let obj1 = resolveBeachToysObj(d);
        images.push(obj1);
        if (data[i + 1]) {
          images.push(resolveBeachToysObj(data[i + 1]));
          delete data[i + 1];
        }
        if (data[i + 2]) {
          images.push(resolveBeachToysObj(data[i + 2]));
          delete data[i + 2];
        }
        return {
          images
        };
      }).filter(d => d && Object.keys(d).length);
    }
  }
  return obj;
};

const resolveGolfCartObj = (e) => {
  return {
    id: objectPath.get(e, 'id'),
    passenger: objectPath.get(e, 'passenger'),
    path: `${routes.RESERVE.replace(':productId', objectPath.get(e, 'id')).replace(':type', objectPath.get(e, ['product_image', 0, 'type']))}`,
    img: objectPath.get(e, 'main_image', ''),
    colWidth: '4',
    isGolfCart: true,
    showOverlay: true,
    type: objectPath.get(e, ['product_image', 0, 'type']),
    title: objectPath.get(e, 'product_name', ''),
    activity_prices: [
      `$${parseFloat(objectPath.get(e, 'day_price', 0.0)).toFixed(2)} Daily`,
      `$${parseFloat(objectPath.get(e, 'week_price', 0.0)).toFixed(2)} Week`
    ]
  };
};

const resolveBeachToysObj = (e) => {
  return {
    id: objectPath.get(e, 'id'),
    path: `${routes.RESERVE.replace(':productId', objectPath.get(e, 'id')).replace(':type', objectPath.get(e, ['product_image', 0, 'type']))}`,
    img: objectPath.get(e, 'main_image', ''),
    colWidth: '4',
    type: objectPath.get(e, ['product_image', 0, 'type']),
    showOverlay: true,
    isTextCenter: false,
    isBgTransparent: true,
    title: objectPath.get(e, 'product_name', ''),
    activity_prices: [
      `$${parseFloat(objectPath.get(e, 'day_price', 0.0)).toFixed(2)} Daily`,
      `$${parseFloat(objectPath.get(e, 'week_price', 0.0)).toFixed(2)} Week`
    ]
  };
};
