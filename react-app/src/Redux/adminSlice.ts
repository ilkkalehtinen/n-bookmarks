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
  getUsers,
  bookmarkAction,
 } from 'Redux/api'
import {
  EditAdminValueAction,
  UserType,
  AddUserType,
  LoggedInUser,
} from 'types'
import { API_ACTIONS } from './constants'
import { AppThunk } from './store'
import { setToValue } from './utils'

export interface AdminState {
  user: AddUserType
  changePassword: UserType
  removeUser: UserType
  setAdmin: UserType,
  users: LoggedInUser[] | null
}

const initialState: AdminState = {
  user: {
    name: '',
    password: '',
    admin: '0',
  },
  changePassword: {
    user: '',
    password: '',
    admin: '0',
  },
  removeUser: {
    user: '',
    password: '',
    admin: '0',
  },
  setAdmin: {
    user: '',
    password: '',
    admin: '0',
  },
  users: null,
}

const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {
     updateValue(state, action: PayloadAction<EditAdminValueAction>) {
       setToValue(state, action.payload.path, action.payload.value)
    },
    updateUsers(state, action: PayloadAction<LoggedInUser[]>) {
      state.users = action.payload
    }
  },
})

export const {
  updateValue,
  updateUsers,
} = admin.actions

export default admin.reducer

export const fetchUsers = (): AppThunk => async (dispatch) => {
  try {
    const users = await getUsers()
    dispatch(updateUsers(users))
  } catch (e) {
    toast.error("Fetching users failed");
  }
}

export const addUser = (): AppThunk => async (dispatch, getState) => {
  const etag = getState().bookmarks.etag
  const user = getState().admin.user
  try {
    await bookmarkAction(etag, user, API_ACTIONS.ADD_USER)
    dispatch(fetchUsers())
    toast.success("User added");
  } catch (e) {
    toast.error("Adding user failed");
  }
}

export const changePassword = (): AppThunk => async (dispatch, getState) => {
  const etag = getState().bookmarks.etag
  const user = getState().admin.changePassword
  try {
    await bookmarkAction(etag, user, API_ACTIONS.ADMIN_CHANGE_PASSWORD)
    toast.success("Password changed")
  } catch (e) {
    toast.error("Changing password failed");
  }
}

export const removeUser = (): AppThunk => async (dispatch, getState) => {
  const etag = getState().bookmarks.etag
  const user = getState().admin.removeUser
  try {
    await bookmarkAction(etag, user, API_ACTIONS.REMOVE_USER)
    dispatch(fetchUsers())
    toast.success("User removed")
  } catch (e) {
    toast.error("Removing user failed");
  }
}

export const setAdmin = (): AppThunk => async (dispatch, getState) => {
  const etag = getState().bookmarks.etag
  const user = getState().admin.setAdmin
  try {
    await bookmarkAction(etag, user, API_ACTIONS.CHANGE_ADMIN_USER)
    dispatch(fetchUsers())
    toast.success("Admin status changed")
  } catch (e) {
    toast.error("Changing status failed");
  }
}
