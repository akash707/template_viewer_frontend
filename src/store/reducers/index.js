import * as actionTypes from '../actions/actionTypes';

const initialState = {
  error: [],
  loading: false,
  images: [],
  nextPage: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_IMAGES_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        images: [...action.payload.data],
        nextPage: action.payload.pagesRemaining,
        currentPage: action.payload.currentPageNo
      }
    case actionTypes.GET_IMAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
};

export default reducer;