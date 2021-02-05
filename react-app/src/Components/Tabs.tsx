import React, { FC } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup'
import styled from 'styled-components'
import { FaTrashAlt } from 'react-icons/fa'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { CategoryType, BookmarkType, ActiveCategory } from 'types'
import * as editSliceActions from 'Redux/editSlice'
import * as bookmarksSliceActions from 'Redux/bookmarksSlice'
import QuickLinks from './QuickLinks'

interface TabsComponentProps {
  data: CategoryType[],
  quickLinks: BookmarkType[],
  editActions: typeof editSliceActions,
  bookmarksActions: typeof bookmarksSliceActions
  activeCategory: ActiveCategory
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

const StyledFormGroup = styled(Form.Group)`
  flex: 1;
`

const TabsComponent: FC<TabsComponentProps> = ({
  data,
  quickLinks,
  editActions,
  bookmarksActions,
  activeCategory,
}: TabsComponentProps) => {
  const deleteBookmark = (bookmarkId: string) => () => {
    editActions.deleteBookmarkAndUpdate(bookmarkId)
  }

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey={activeCategory.name}>
      <Nav>
        {data.map(category =>
          <Nav.Item
            key={category.id}
            onClick={() => bookmarksActions.setActiveCategory(category.id)}
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
              {(activeCategory.note || activeCategory.noteEdited) &&
                <StyledFormGroup>
                  <Form.Control
                    as="textarea"
                    value={activeCategory.note}
                    onChange={(e) =>
                      bookmarksActions.editNote(e.target.value)
                    }
                    onKeyDown={(e: any) => {
                      if ((e.ctrlKey || e.metaKey) && e.which === 83) {
                        bookmarksActions.saveNote()
                        e.preventDefault()
                      } else if (e.keyCode === 9) {
                        const val = activeCategory.note
                        const start = e.target.selectionStart
                        const end = e.target.selectionEnd
                        const editedNote = val.substring(0, start) + '\t' + val.substring(end)
                        bookmarksActions.editNote(editedNote)
                        setTimeout(() => {
                          e.target.selectionStart = e.target.selectionEnd = start + 1
                        })
                        e.preventDefault()
                      }}
                    }
                  />
                </StyledFormGroup>
              }
            </TabContent>
          </Tab.Pane>
        )}
      </Tab.Content>
    </Tab.Container>
  )
}

export default TabsComponent
