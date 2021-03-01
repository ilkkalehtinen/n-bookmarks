import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

import { getBookmarks, getUser, bookmarkAction } from 'Redux/api'
import {
  CategoryType,
  BookmarkType,
  BookmarksDataType,
  LoggedInUser,
  ActiveCategory,
} from 'types'
import { API_ACTIONS, PAGES } from 'Constants/constants'
import { AppThunk } from './store'
import {
  extractQuickLinks,
  sortBookmarkData,
  getActiveCategory,
} from './utils'

interface BookmarksState {
  etag: string
  data: CategoryType[]
  quickLinks: BookmarkType[]
  user: LoggedInUser | null
  activeCategory: ActiveCategory
  loading: boolean,
  activePage: string,
}

const initialState: BookmarksState = {
  etag: '',
  data: [],
  quickLinks: [],
  user: null,
  activeCategory: {
    id: '',
    name: '',
    note: '',
    noteEdited: false,
  },
  loading: true,
  activePage: PAGES.BOOKMARKS,
}

const bookmarks = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    initBookmarks(state, action: PayloadAction<BookmarksDataType>) {
      state.etag = action.payload.etag

      if (!action.payload.bookmarks || action.payload.bookmarks.length === 0) {
        return
      }

      const bookmarks = sortBookmarkData(action.payload.bookmarks)
      state.data = bookmarks
      state.activeCategory = getActiveCategory(bookmarks, state.activeCategory)
      state.quickLinks = extractQuickLinks(bookmarks)
      state.loading = false
    },
    initUser(state, action: PayloadAction<LoggedInUser>) {
      state.user = action.payload
    },
    setActiveCategory(state, action: PayloadAction<string>) {
      const categoryData = state.data.find(category =>
        category.id === action.payload
      )
      if (categoryData) {
        state.activeCategory = {
          id: categoryData.id,
          name: categoryData.category,
          note: categoryData.notes,
          noteEdited: false,
        }
      }
    },
    setActivePage(state, action: PayloadAction<string>) {
      state.activePage = action.payload
    },
    editNote(state, action: PayloadAction<string>) {
      state.activeCategory.note = action.payload
      state.activeCategory.noteEdited = true
    },
  },
})

export const {
  initBookmarks,
  initUser,
  setActiveCategory,
  setActivePage,
  editNote,
} = bookmarks.actions

export default bookmarks.reducer

export const fetchBookmarks = (): AppThunk => async dispatch => {
  try {
    const bookmarks = await getBookmarks()
    dispatch(initBookmarks(bookmarks))
  } catch (e) {
    toast.error("Fetching bookmarks failed.");
  }
}

export const fetchUser = (): AppThunk => async dispatch => {
  try {
    const user = await getUser()
    dispatch(initUser(user))
  } catch (e) {
    toast.error("Fetching user data failed.");
  }
}

export const saveNote = (): AppThunk => async (dispatch, getState) => {
  const etag = getState().bookmarks.etag
  const noteData = {
    id: getState().bookmarks.activeCategory.id,
    note: getState().bookmarks.activeCategory.note,
  }
  try {
    await bookmarkAction(etag, noteData, API_ACTIONS.SET_CATEGORY_NOTES)
    dispatch(fetchBookmarks())
  } catch (e) {
    toast.error("Outdated data. Please, reload data.");
  }
}
