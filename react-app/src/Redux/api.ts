import axios from 'axios';

import { API_URL } from 'Constants/constants'
import {
  CategoryType,
  EditBookmarkType,
  EditCategoryType,
} from 'types'

const dataApiUrl = `${API_URL}/data`;
const actionApiUrl = `${API_URL}/data/action`;

const logoutOrThrow = (e: any) => {
  if (e.response.status === 401) {
    window.location.href = `${API_URL}/login`
  } else {
    throw(e)
  }
}

export const getBookmarks = async (): Promise<any>  => {
  try {
    const response = await axios.get<CategoryType[]>(dataApiUrl)
    return response.data
  } catch(e) {
    logoutOrThrow(e)
  }
}

export const getUser = async (): Promise<any> => {
  try {
    const response = await axios.get<CategoryType[]>(`${dataApiUrl}/user`)
    return response.data
  } catch(e) {
    logoutOrThrow(e)
  }
}

export const getUsers = async (): Promise<any> => {
  try {
    const response = await axios.get<CategoryType[]>(`${dataApiUrl}/users`)
    return response.data
  } catch(e) {
    logoutOrThrow(e)
  }
}


export const bookmarkAction = async (etag: string, data: any, action: string): Promise<any> => {
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
    logoutOrThrow(e)
  }
}
