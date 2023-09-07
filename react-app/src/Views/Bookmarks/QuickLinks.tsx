/**
 * This file is part of nBookmarks.
 * Copyright (c) 2023 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
import React, { FC } from 'react';
import styled from 'styled-components'
import { FaSync } from 'react-icons/fa'
import { bindActionCreators } from 'redux'
import { AppDispatch } from 'Redux/store'
import { RootState } from 'Redux/rootReducer'
import { connect } from 'react-redux'

import * as bookmarksSliceActions from 'Redux/bookmarksSlice'
import { BookmarkType } from 'types'

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
  quickLinks: BookmarkType[]
  bookmarksActions: typeof bookmarksSliceActions
  note: string
  noteEdited: boolean
}

const QuickLinks: FC<QuickLinksComponentProps> = ({
  quickLinks,
  bookmarksActions,
  note,
  noteEdited
}: QuickLinksComponentProps) =>
  <TopBarContainer>
    <StyledQuickLinks>
      {quickLinks.map(bookmark =>
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
      {(note || noteEdited) &&
        <a
          className="btnCustom"
          href=""
          onClick={(e) => {
            e.preventDefault()
            bookmarksActions.saveNote()
          }}
        >
          Save note {noteEdited && <span style={{color: 'red'}}>*</span>}
        </a>
      }
      {(!note && !noteEdited) &&
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

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  bookmarksActions: bindActionCreators(bookmarksSliceActions, dispatch),
})

const mapStateToProps = (state: RootState) => {
  return {
    quickLinks: state.bookmarks.quickLinks,
    noteEdited: state.bookmarks.activeCategory.noteEdited,
    note: state.bookmarks.activeCategory.note,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickLinks)
