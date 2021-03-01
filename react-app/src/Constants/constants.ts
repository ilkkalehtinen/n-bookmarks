export const API_URL = process.env.REACT_APP_API_URL;

export const API_ACTIONS = {
  ADD_CATEGORY: 'addCategory',
  REMOVE_CATEGORY: 'removeCategory',
  RENAME_CATEGORY: 'renameCategory',
  SET_CATEGORY_NOTES: 'setCategoryNotes',

  ADD_BOOKMARK: 'addBookmark',
  MODIFY_BOOKMARK: 'modifyBookmark',
  REMOVE_BOOKMARK: 'removeBookmark',

  CHANGE_PASSWORD: 'change-password',
  ADD_USER: 'add-user',
  ADMIN_CHANGE_PASSWORD: 'admin-change-password',
  REMOVE_USER: 'remove-user',
  CHANGE_ADMIN_USER: 'change-admin-user',
}

export const PAGES = {
  BOOKMARKS: 'BOOKMARKS',
  EDIT: 'EDIT',
  ADMIN: 'ADMIN',
}
