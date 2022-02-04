import React, { FC } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

import { CategoryType, BookmarkType } from 'types'

interface SearchComponentProps {
  data: CategoryType[],
  search: string,
}

const SearchComponent: FC<SearchComponentProps> = ({
  data,
  search,
}: SearchComponentProps) => {
  const bookmarks: BookmarkType[] = [];

  data.map((category) => {
    category.bookmarks.map((bookmark) => {
      if (bookmark.name.toLowerCase().includes(search.toLowerCase())) {
        bookmarks.push(bookmark);
      }
    })
  });

  return (
    <ListGroup>
      {bookmarks.map(bookmark =>
        <ListGroup.Item key={bookmark.id}>
          <a href={bookmark.url}>{bookmark.name}</a>
        </ListGroup.Item>
       )}
    </ListGroup>
  )
}

export default SearchComponent
