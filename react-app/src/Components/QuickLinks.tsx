import React, { FC } from 'react';
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import { FaSync } from 'react-icons/fa'

import * as bookmarksSliceActions from 'Redux/bookmarksSlice'
import { BookmarkType, ActiveCategory } from 'types'

const SyncIcon = styled(FaSync)`
  float: right;
  color: SteelBlue;
  height: 50px;
  margin-left: 20px;
  cursor: pointer;
`

const StyledQuickLinks = styled.div`
  display: flex;
  flex: 2;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 2px;
`

const StyledActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 10px;
  border-radius: 2px;
`

const TopBarContainer = styled.div`
  display: flex;
  height: 50px;
`

interface QuickLinksComponentProps {
  data: BookmarkType[]
  bookmarksActions: typeof bookmarksSliceActions
  activeCategory: ActiveCategory
}

const QuickLinks: FC<QuickLinksComponentProps> = ({
  data,
  bookmarksActions,
  activeCategory,
}: QuickLinksComponentProps) =>
  <TopBarContainer>
    <StyledQuickLinks>
      {data.map(bookmark =>
        <a
          key={bookmark.id}
          className="btnCustom"
          href={bookmark.url}
        >
          {bookmark.name}
        </a>
      )}
    </StyledQuickLinks>
    <StyledActions>
      {(activeCategory.note || activeCategory.noteEdited) &&
        <a
          className="btnCustom"
          href=""
          onClick={(e) => {
            e.preventDefault()
            bookmarksActions.saveNote()
          }}
        >
          Save note {activeCategory.noteEdited && <span style={{color: 'red'}}>*</span>}
        </a>
      }
      {(!activeCategory.note && !activeCategory.noteEdited) &&
        <a
          className="btnCustom"
          href=""
          onClick={(e) => {
            e.preventDefault()
            bookmarksActions.editNote('Type a note...')
          }}
        >
          Add note
        </a>
      }
    </StyledActions>
    <SyncIcon
      onClick={bookmarksActions.fetchBookmarks}
    />
  </TopBarContainer>


export default QuickLinks
