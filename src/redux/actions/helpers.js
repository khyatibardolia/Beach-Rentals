import objectPath from 'object-path';
import {reset} from 'redux-form';
import {Axios} from '../../config/api-config';
import {ApiRoutes} from '../../config/api-routes';
import {
  CHECK_GOLF_CART_AVAILABILITY,
  CHECK_PRODUCT_AVAILABILITY,
  CHECK_PRODUCT_AVAILABILITY_ERROR, CREATE_INTENT,
  CREATE_RESERVATION,
  CREATE_RESERVATION_ERROR,
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
  FETCH_SOCIAL_MEDIA_DATA_ERROR, FUELS, FUELS_ERROR,
  GET_FEEDBACK_DATA,
  GET_FEEDBACK_DATA_ERROR,
  GET_RESERVATION_DETAILS,
  GET_RESERVATION_DETAILS_ERROR,
  INQUIRY,
  INQUIRY_ERROR, PASSENGERS, PASSENGERS_ERROR,
  PRODUCT_LIST,
  PRODUCT_LIST_ERROR,
  TERMS_OF_SERVICE,
  TERMS_OF_SERVICE_ERROR,
  VERIFY_ORDER,
  VERIFY_ORDER_ERROR
} from '../constants';

export const ResetReduxForm = (formName) => {
  return dispatch => {
    dispatch(reset(formName));
  };
};

const getCommonPostErrorResponse = (error) => {
  if (objectPath.get(error, 'response.status') === 400) {
    return {
      type: 'error',
      response: objectPath.get(error, 'response.data', {message: objectPath.get(error, 'response.statusText')})
    };
  } else {
    return {
      type: 'error',
      response: objectPath.get(error, 'response.data', {message: objectPath.get(error, 'response.statusText')})
    };
  }
};

const getCommonPostSuccessResponse = (dispatch, response, successType, errorType) => {
  if (objectPath.get(response, 'data.meta.code') === 1) {
    dispatch({
      type: successType,
      payload: objectPath.get(response, 'data.data')
    });
    return objectPath.get(response, 'data');
  } else {
    dispatch({
      type: errorType,
      payload: []
    });
    return {
      type: 'error',
      response: {message: objectPath.get(response, 'data.meta.message')}
    };
  }
};

//Check Product Availability
export const CheckProductAvailability = (obj) => {
  let data = new FormData();
  data.set('product_id', obj.product_id);
  data.set('product_type', obj.product_type);
  data.set('check_in', obj.check_in);
  data.set('check_out', obj.check_out);
  return (dispatch) => {
    return Axios.post(`${ApiRoutes.CHECK_PRODUCT_AVAILABILITY}`, data, Axios)
      .then(response => {
        return getCommonPostSuccessResponse(dispatch, response, CHECK_PRODUCT_AVAILABILITY,
          CHECK_PRODUCT_AVAILABILITY_ERROR);
      })
      .catch(error => {
        return getCommonPostErrorResponse(error);
      });
  };
};

//Create Reservation (Booking)
export const CreateReservation = (obj) => {
  return dispatch => {
    return Axios.post(`${ApiRoutes.CREATE_RESERVATION}`, obj, Axios)
      .then(response => {
        return getCommonPostSuccessResponse(dispatch, response, CREATE_RESERVATION, CREATE_RESERVATION_ERROR);
      })
      .catch(error => {
        return getCommonPostErrorResponse(error);
      });
  };
};

//Send Inquiry
export const Inquiry = (obj) => {
  let data = new FormData();
  data.set('first_name', obj.first_name);
  data.set('last_name', obj.last_name);
  data.set('email', obj.email);
  data.set('message', obj.message);
  return (dispatch) => {
    return Axios.post(`${ApiRoutes.INQUIRY}`, data, Axios)
      .then(response => {
        return getCommonPostSuccessResponse(dispatch, response, INQUIRY, INQUIRY_ERROR);
      })
      .catch(error => {
        return getCommonPostErrorResponse(error);
      });
  };
};

const getCommonResponse = (dispatch, response, successType, errorType) => {
  if (objectPath.get(response, 'data.meta.code') === 1) {
    dispatch({
      type: successType,
      payload: objectPath.get(response, 'data.data')
    });
    return objectPath.get(response, 'data.data');
  } else {
    dispatch({
      type: errorType,
      payload: []
    });
    return {type: 'error', response: {message: objectPath.get(response, 'data.meta.message')}};
  }
};

const getCommonCatchError = (dispatch, error, type, payload = []) => {
  return dispatch => {
    dispatch({
      type: PRODUCT_LIST_ERROR,
      payload
    });
    return {type: 'error', response: {message: objectPath.get(error, 'response')}};
  };
};

//Get Product List
export const GetProductList = () => {
  return dispatch => {
    return Axios.get(`${ApiRoutes.PRODUCT_LIST}`, Axios)
      .then(response => {
        return getCommonResponse(dispatch, response, PRODUCT_LIST, PRODUCT_LIST_ERROR);
      })
      .catch(error => {
        return getCommonCatchError(dispatch, error, PRODUCT_LIST_ERROR);
      });
  };
};

//Faq API
export const GetFaqData = () => {
  return (dispatch) => {
    return Axios.get(`${ApiRoutes.FAQ}`, Axios)
      .then(response => {
        return getCommonResponse(dispatch, response, FETCH_FAQ_DATA, FETCH_FAQ_DATA_ERROR);
      })
      .catch(error => {
        return getCommonCatchError(dispatch, error, FETCH_FAQ_DATA_ERROR);
      });
  };
};

//Aboutus API
export const GetAboutUsData = () => {
  return (dispatch) => {
    return Axios.get(`${ApiRoutes.ABOUTUS}`, Axios)
      .then(response => {
        return getCommonResponse(dispatch, response, FETCH_ABOUTUS_DATA, FETCH_ABOUTUS_DATA_ERROR);
      })
      .catch(error => {
        return getCommonCatchError(dispatch, error, FETCH_ABOUTUS_DATA_ERROR);
      });
  };
};

//Privacy Policy API
export const GetPrivacyPolicyData = () => {
  return (dispatch) => {
    return Axios.get(`${ApiRoutes.PRIVACY_POLICY}`, Axios)
      .then(response => {
        return getCommonResponse(dispatch, response, FETCH_PRIVACY_POLICY, FETCH_PRIVACY_POLICY_ERROR);
      })
      .catch(error => {
        return getCommonCatchError(dispatch, error, FETCH_PRIVACY_POLICY_ERROR);
      });
  };
};

//all-policy API
export const GetCmsData = (path) => {
  return (dispatch) => {
    return Axios.get(`${path}`, Axios)
      .then(response => {
        return getCommonResponse(dispatch, response, FETCH_CMS_DATA, FETCH_CMS_DATA_ERROR);
      })
      .catch(error => {
        return getCommonCatchError(dispatch, error, FETCH_CMS_DATA_ERROR);
      });
  };
};

//social-media API
export const GetSocialMediaData = () => {
  return (dispatch) => {
    return Axios.get(`${ApiRoutes.SOCIAL_MEDIA}`, Axios)
      .then(response => {
        return getCommonResponse(dispatch, response, FETCH_SOCIAL_MEDIA_DATA, FETCH_SOCIAL_MEDIA_DATA_ERROR);
      })
      .catch(error => {
        return getCommonCatchError(dispatch, error, FETCH_SOCIAL_MEDIA_DATA_ERROR);
      });
  };
};

//Product-details API
export const GetProductDetails = (id) => {
  return (dispatch) => {
    return Axios.post(`${ApiRoutes.PRODUCT_DETAILS}`, id, Axios)
      .then(response => {
        return getCommonPostSuccessResponse(dispatch, response, FETCH_PRODUCT_DETAILS, FETCH_PRODUCT_DETAILS_ERROR);
      })
      .catch(error => {
        return getCommonPostErrorResponse(error);
      });
  };
};

//Get Feedback List
export const GetFeedbackList = () => {
  return dispatch => {
    return Axios.get(`${ApiRoutes.FEEDBACK}`, Axios)
      .then(response => {
        return getCommonResponse(dispatch, response, GET_FEEDBACK_DATA, GET_FEEDBACK_DATA_ERROR);
      })
      .catch(error => {
        return getCommonCatchError(dispatch, error, GET_FEEDBACK_DATA_ERROR);
      });
  };
};

//Reservation-details API
export const GetReservationDetails = (id) => {
  return (dispatch) => {
    return Axios.post(`${ApiRoutes.RESERVATION_DETAILS}`, id, Axios)
      .then(response => {
        return getCommonPostSuccessResponse(dispatch, response, GET_RESERVATION_DETAILS, GET_RESERVATION_DETAILS_ERROR);
      })
      .catch(error => {
        return getCommonPostErrorResponse(error);
      });
  };
};

//create-intent API
export const createIntent = (id) => {
  return (dispatch) => {
    return Axios.post(`${ApiRoutes.CREATE_INTENT}`, id, Axios)
      .then(response => {
        dispatch({
          type: CREATE_INTENT,
          payload: response.data.data
        });
        return response.data;
      })
      .catch(error => {
        if (objectPath.get(error, 'response.status') === 400) {
          return {
            type: 'error',
            response: objectPath.get(error, 'response.data', {message: objectPath.get(error, 'response.statusText')})
          };
        } else {
          return {
            type: 'error',
            response: objectPath.get(error, 'response.data', {message: objectPath.get(error, 'response.statusText')})
          };
        }
      });
  };
};

//Verify-Order API
export const verifyOrder = (obj) => {
  return (dispatch) => {
    return Axios.post(`${ApiRoutes.VERIFY_ORDER}`, obj, Axios)
      .then(response => {
        return getCommonPostSuccessResponse(dispatch, response, VERIFY_ORDER, VERIFY_ORDER_ERROR);
      })
      .catch(error => {
        return getCommonPostErrorResponse(error);
      });
  };
};

// get passengers list
export const getPassengersList = () => {
  return (dispatch) => {
    return Axios.get(`${ApiRoutes.PASSENGERS}`, Axios)
      .then(response => {
        return getCommonPostSuccessResponse(dispatch, response, PASSENGERS, PASSENGERS_ERROR);
      })
      .catch(error => {
        return getCommonPostErrorResponse(error);
      });
  };
};

// get fuels list
export const getfuelsList = () => {
  return (dispatch) => {
    return Axios.get(`${ApiRoutes.FUELS}`, Axios)
      .then(response => {
        return getCommonPostSuccessResponse(dispatch, response, FUELS, FUELS_ERROR);
      })
      .catch(error => {
        return getCommonPostErrorResponse(error);
      });
  };
};

// check golf cart availability
export const checkGolfCartAvailabiity = (obj) => {
  return (dispatch) => {
    return Axios.post(`${ApiRoutes.CHECK_GOLF_CART_AVAILABILITY}`, obj, Axios)
      .then(response => {
        return getCommonPostSuccessResponse(dispatch, response, CHECK_GOLF_CART_AVAILABILITY, CHECK_PRODUCT_AVAILABILITY_ERROR);
      })
      .catch(error => {
        return getCommonPostErrorResponse(error);
      });
  };
};

//terms-of-service API
export const getTermsOfService = () => {
  return (dispatch) => {
    return Axios.get(`${ApiRoutes.TERMS_OF_SERVICE}`, Axios)
      .then(response => {
        return getCommonPostSuccessResponse(dispatch, response, TERMS_OF_SERVICE, TERMS_OF_SERVICE_ERROR);
      })
      .catch(error => {
        return getCommonPostErrorResponse(error);
      });
  };
};
