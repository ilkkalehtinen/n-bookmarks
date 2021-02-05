import { combineReducers } from '@reduxjs/toolkit';

import bookmarksReducer from './bookmarksSlice';
import editReducer from './editSlice'
import adminReducer from './adminSlice'

const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
  edit: editReducer,
  admin: adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
