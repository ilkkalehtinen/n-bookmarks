/**
 * This file is part of nBookmarks.
 * Copyright (c) 2023 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

import {
  bookmarkAction,
 } from 'Redux/api'
import {
  EditBookmarkType,
  EditCategoryType,
  EditValueAction,
  ChangePassword,
  UploadData,
} from 'types'
import { API_ACTIONS, PAGES } from './constants'
import { AppThunk } from './store'
import { setToValue } from './utils'
import { fetchBookmarks, setActivePage} from './bookmarksSlice'

export interface EditState {
  addBookmark: EditBookmarkType,
  modifyBookmark: EditBookmarkType,
  addCategory: EditCategoryType,
  removeCategory: EditCategoryType,
  modifyCategory: EditCategoryType,
  changePassword: ChangePassword,
  uploadData: UploadData,
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
  uploadData: {
    data: '',
  },
}

const edit = createSlice({
  name: 'edit',
  initialState,
  reducers: {
     updateValue(state, action: PayloadAction<EditValueAction>) {
       setToValue(state, action.payload.path, action.payload.value)
    },
    clearValues() {
      return initialState
    }
  },
})

export const {
  updateValue,
  clearValues,
} = edit.actions

export default edit.reducer

export const addBookmarkAndUpdate = (): AppThunk => async (dispatch, getState) => {
  const etag = getState().bookmarks.etag
  const bookmark = getState().edit.addBookmark
  try {
    await bookmarkAction(etag, bookmark, API_ACTIONS.ADD_BOOKMARK)
    dispatch(clearValues())
    dispatch(setActivePage(PAGES.BOOKMARKS))
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
    dispatch(clearValues())
    dispatch(setActivePage(PAGES.BOOKMARKS))
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
      dispatch(clearValues())
      dispatch(setActivePage(PAGES.BOOKMARKS))
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
    dispatch(clearValues())
    dispatch(setActivePage(PAGES.BOOKMARKS))
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
    dispatch(clearValues())
    dispatch(setActivePage(PAGES.BOOKMARKS))
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
    dispatch(clearValues())
    dispatch(setActivePage(PAGES.BOOKMARKS))
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
    dispatch(clearValues())
    dispatch(setActivePage(PAGES.BOOKMARKS))
    toast.success("Password changed");
  } catch (e) {
    toast.error("Password changing failed");
  }
}

export const uploadData = (): AppThunk => async (dispatch, getState) => {
  const etag = getState().bookmarks.etag
  const payload = {
    data: JSON.stringify(getState().edit.uploadData.data),
  }
  try {
    await bookmarkAction(etag, payload, API_ACTIONS.UPLOAD_DATA)
    dispatch(clearValues())
    dispatch(setActivePage(PAGES.BOOKMARKS))
    toast.success("Data uploaded");
  } catch (e) {
    toast.error("Data upload failed");
  }
}
