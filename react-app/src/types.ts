
export type BookmarkType = {
  id: string
  name: string
  url: string
}

export type EditBookmarkType = {
  id?: string
  name: string
  url: string
  category: string
}

export type EditCategoryType = {
  id?: string
  name: string
}

export type CategoryType = {
  id: string
  category: string
  bookmarks: BookmarkType[]
  notes: string
}

export type EditValueAction = {
  value: any
  path: Array<string>
}

export type BookmarksDataType = {
  etag: string
  bookmarks: CategoryType[]
}

export type OptionType = {
  id: string
  name: string
}

export type ChangePassword = {
  password: string
}

export type UserType = {
  user: string
  password: string
  admin: string
}

export type AddUserType = {
  name: string
  password: string
  admin: string
}

export type LoggedInUser = {
  id: string
  username: string
  admin: string
}

export type ActiveCategory = {
  id: string
  name: string
  note: string
  noteEdited: boolean
}
