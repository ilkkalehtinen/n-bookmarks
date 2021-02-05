import { CategoryType, ActiveCategory } from 'types'


export const extractQuickLinks = (data: CategoryType[]) => {
  const toolbar = data.find(category => category.category === 'Toolbar')

  if (toolbar && toolbar.bookmarks) {
    return [...toolbar.bookmarks.sort((a, b) => a.name.localeCompare(b.name))]
  } else {
    return []
  }
}

export const sortBookmarkData = (data: CategoryType[]) => {
  const bookmarks = data.sort((a, b) =>
    a.category.localeCompare(b.category)
  )

  return bookmarks.map(category => ({
    ...category,
    bookmarks: category.bookmarks ? category.bookmarks.sort((a, b) =>
      a.name.localeCompare(b.name)
    ) : []
  }))
}

export const getActiveCategory = (data: CategoryType[], activeCategory: ActiveCategory) => {
  let newActiveCategory = {
    id: data[0].id,
    name: data[0].category,
    note: data[0].notes,
    noteEdited: false,
  }
  if (activeCategory.id) {
    const category = data.find(category =>
      category.id === activeCategory.id
    )
    if (category) {
      newActiveCategory = {
        id: category.id,
        name: category.category,
        note: category.notes,
        noteEdited: false,
      }
    }
  }
  return newActiveCategory
}

export const setToValue = (obj: any, path: Array<string>, value: any) => {
    let i;
    for (i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];

    obj[path[i]] = value;
}
