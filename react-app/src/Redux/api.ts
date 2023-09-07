/**
 * This file is part of nBookmarks.
 * Copyright (c) 2023 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
import axios, { AxiosError } from 'axios';

import { API_URL } from './constants'
import {
  BookmarksDataType,
  LoggedInUser,
} from 'types'

const dataApiUrl = `${API_URL}/data`;
const actionApiUrl = `${API_URL}/data/action`;

const logoutOrThrow = (e: AxiosError) => {
  if (e.response && e.response.status === 401) {
    window.location.href = `${API_URL}/login`
  } else {
    throw(e)
  }
}

export const getBookmarks = async (): Promise<BookmarksDataType>  => {
  try {
    const response = await axios.get<BookmarksDataType>(dataApiUrl)

    return response.data
  } catch(e) {
    logoutOrThrow(<AxiosError>e)
    return { etag: 0, bookmarks: []}
  }
}

export const getUser = async (): Promise<LoggedInUser | null> => {
  try {
    const response = await axios.get<LoggedInUser>(`${dataApiUrl}/user`)
    return response.data
  } catch(e) {
    logoutOrThrow(<AxiosError>e)
    return null
  }
}

export const getUsers = async (): Promise<LoggedInUser[]> => {
  try {
    const response = await axios.get<LoggedInUser[]>(`${dataApiUrl}/users`)
    return response.data
  } catch(e) {
    logoutOrThrow(<AxiosError>e)
    return []
  }
}

export const bookmarkAction = async (
  etag: number,
  // eslint-disable-next-line
  data: any,
  action: string,
): Promise<void> => {
  const postData = {
    etag,
    action,
    ...data,
  }
  const formData = new FormData()
  Object.keys(postData).forEach(key => {
    formData.append(key, postData[key])
  })
  try {
    return axios.post(actionApiUrl, formData)
  } catch(e) {
    logoutOrThrow(<AxiosError>e)
  }
}
