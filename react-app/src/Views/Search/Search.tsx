import React, { FC } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { RootState } from 'Redux/rootReducer'
import { connect } from 'react-redux'

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

const mapStateToProps = (state: RootState) => {
  return {
    data: state.bookmarks.data,
    search: state.bookmarks.search,
  }
}

export default connect(mapStateToProps)(SearchComponent)
