export const ADD_BOOKMARK = 'ADD_BOOKMARK';
export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';

export const addBookmark = (page) => ({
  type: ADD_BOOKMARK,
  payload: page,
});

export const removeBookmark = (page) => ({
  type: REMOVE_BOOKMARK,
  payload: page,
});
