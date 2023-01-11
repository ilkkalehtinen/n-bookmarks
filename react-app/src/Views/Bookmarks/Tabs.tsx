import React, { FC } from 'react';
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup'
import styled from 'styled-components'
import { FaTrashAlt } from 'react-icons/fa'
import Nav from 'react-bootstrap/Nav'
import { bindActionCreators } from 'redux'
import { AppDispatch } from 'Redux/store'
import { RootState } from 'Redux/rootReducer'
import { connect } from 'react-redux'

import { CategoryType } from 'types'
import * as editSliceActions from 'Redux/editSlice'
import * as bookmarksSliceActions from 'Redux/bookmarksSlice'

import Textarea from "./Textarea"

interface TabsComponentProps {
  data: CategoryType[],
  editActions: typeof editSliceActions,
  bookmarksActions: typeof bookmarksSliceActions
  activeCategoryName: string
}

const DeleteIcon = styled(FaTrashAlt)`
  float: right;
  color: SteelBlue;
  height: 18px;
  cursor: pointer;
`

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const TabsComponent: FC<TabsComponentProps> = ({
  data,
  editActions,
  bookmarksActions,
  activeCategoryName,
}: TabsComponentProps) => {
  const deleteBookmark = (bookmarkId: string) => () => {
    editActions.deleteBookmarkAndUpdate(bookmarkId)
  }

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey={activeCategoryName}>
      <Nav>
        {data.map(category =>
          <Nav.Item
            key={category.id}
            // eslint-disable-next-line
            onClick={(e: any) => {
              e.preventDefault();
              bookmarksActions.setActiveCategory(category.id)
            }}
          >
            <Nav.Link eventKey={category.category}>{category.category}</Nav.Link>
          </Nav.Item>
        )}
      </Nav>
      <Tab.Content className="w-100 h-100">
        {data.map(category =>
          <Tab.Pane className="h-100" key={category.id} eventKey={category.category}>
            <TabContent>
              <ListGroup>
                {category.bookmarks && category.bookmarks.map(bookmark =>
                  <ListGroup.Item key={bookmark.id}>
                    <a href={bookmark.url}>{bookmark.name}</a>
                    <DeleteIcon
                      onClick={deleteBookmark(bookmark.id)}
                    />
                  </ListGroup.Item>
                )}
              </ListGroup>
              <Textarea />
            </TabContent>
          </Tab.Pane>
        )}
      </Tab.Content>
    </Tab.Container>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  editActions: bindActionCreators(editSliceActions, dispatch),
  bookmarksActions: bindActionCreators(bookmarksSliceActions, dispatch),
})

const mapStateToProps = (state: RootState) => {
  return {
    data: state.bookmarks.data,
    activeCategoryName: state.bookmarks.activeCategory.name,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsComponent)
