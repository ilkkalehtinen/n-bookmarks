/**
 * This file is part of nBookmarks.
 * Copyright (c) 2023 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
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
