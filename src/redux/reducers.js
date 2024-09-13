import { ADD_BOOKMARK, REMOVE_BOOKMARK } from './actions';

const initialState = {
  bookmarks: [],
};

export const pdfReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    case REMOVE_BOOKMARK:
      return { ...state, bookmarks: state.bookmarks.filter((page) => page !== action.payload) };
    default:
      return state;
  }
};
