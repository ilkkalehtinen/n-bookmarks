import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

import {
  getBookmarks,
  bookmarkAction,
 } from 'Redux/api'
import {
  EditBookmarkType,
  EditCategoryType,
  EditValueAction,
  ChangePassword,
} from 'types'
import { API_ACTIONS } from 'Constants/constants'
import { AppThunk } from './store'
import { extractQuickLinks, setToValue } from './utils'
import { fetchBookmarks} from 'Redux/bookmarksSlice'

export interface EditState {
  addBookmark: EditBookmarkType,
  modifyBookmark: EditBookmarkType,
  addCategory: EditCategoryType,
  removeCategory: EditCategoryType,
  modifyCategory: EditCategoryType,
  changePassword: ChangePassword,
}

const initialState: EditState = {
  addBookmark: {
    name: '',
    url: '',
    category: '',
  },
  modifyBookmark: {
    id: '',
    name: '',
    url: '',
    category: '',
  },
  addCategory: {
    name: '',
  },
  removeCategory: {
    id: '',
    name: '',
  },
  modifyCategory: {
    id: '',
    name: '',
  },
  changePassword: {
    password: '',
  },
}

const edit = createSlice({
  name: 'edit',
  initialState,
  reducers: {
     updateValue(state, action: PayloadAction<EditValueAction>) {
       setToValue(state, action.payload.path, action.payload.value)
    },
  },
})

export const {
  updateValue,
} = edit.actions

export default edit.reducer

export const addBookmarkAndUpdate = (): AppThunk => async (dispatch, getState) => {
  const etag = getState().bookmarks.etag
  const bookmark = getState().edit.addBookmark
  try {
    await bookmarkAction(etag, bookmark, API_ACTIONS.ADD_BOOKMARK)
    dispatch(fetchBookmarks())
    toast.success("Bookmark added")
  } catch (e) {
    toast.error("Outdated data. Please, reload data.");
  }
}

export const modifyBookmarkAndUpdate = (): AppThunk => async (dispatch, getState) => {
  const etag = getState().bookmarks.etag
  const bookmark = getState().edit.modifyBookmark
  try {
    await bookmarkAction(etag, bookmark, API_ACTIONS.MODIFY_BOOKMARK)
    dispatch(fetchBookmarks())
    toast.success("Bookmark modified")
  } catch (e) {
    toast.error("Outdated data. Please, reload data.");
  }
}

export const deleteBookmarkAndUpdate = (bookmarkId: string): AppThunk =>
  async (dispatch, getState) => {
    const etag = getState().bookmarks.etag
    const bookmark = { id: bookmarkId }
    try {
      await bookmarkAction(etag, bookmark, API_ACTIONS.REMOVE_BOOKMARK)
      dispatch(fetchBookmarks())
    } catch (e) {
      toast.error("Outdated data. Please, reload data.");
    }
  }

export const addCategoryAndUpdate = (): AppThunk => async (dispatch, getState) => {
  const etag = getState().bookmarks.etag
  const category = getState().edit.addCategory
  try {
    await bookmarkAction(etag, category, API_ACTIONS.ADD_CATEGORY)
    dispatch(fetchBookmarks())
    toast.success("Category added")
  } catch (e) {
    toast.error("Outdated data. Please, reload data.");
  }
}

export const removeCategoryAndUpdate = (): AppThunk => async (dispatch, getState) => {
  const etag = getState().bookmarks.etag
  const category = getState().edit.removeCategory
  try {
    await bookmarkAction(etag, category, API_ACTIONS.REMOVE_CATEGORY)
    dispatch(fetchBookmarks())
    toast.success("Category removed")
  } catch (e) {
    toast.error("Outdated data. Please, reload data.");
  }
}

export const modifyCategoryAndUpdate = (): AppThunk => async (dispatch, getState) => {
  const etag = getState().bookmarks.etag
  const category = getState().edit.modifyCategory
  try {
    await bookmarkAction(etag, category, API_ACTIONS.RENAME_CATEGORY)
    dispatch(fetchBookmarks())
    toast.success("Category modified")
  } catch (e) {
    toast.error("Outdated data. Please, reload data.");
  }
}

export const changePassword = (): AppThunk => async (dispatch, getState) => {
  const etag = getState().bookmarks.etag
  const user = getState().edit.changePassword
  try {
    await bookmarkAction(etag, user, API_ACTIONS.CHANGE_PASSWORD)
    toast.success("Password changed");
  } catch (e) {
    toast.error("Password changing failed");
  }
}
