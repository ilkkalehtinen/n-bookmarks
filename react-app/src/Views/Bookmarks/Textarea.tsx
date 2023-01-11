import React, { FC } from 'react';
import styled from 'styled-components'
import Form from 'react-bootstrap/Form'
import { bindActionCreators } from 'redux'
import { AppDispatch } from 'Redux/store'
import { RootState } from 'Redux/rootReducer'
import { connect } from 'react-redux'

import * as bookmarksSliceActions from 'Redux/bookmarksSlice'

const StyledFormGroup = styled(Form.Group)`
  flex: 1;
`

interface TextareaProps {
  bookmarksActions: typeof bookmarksSliceActions
  note: string
  noteEdited: boolean
}

const Textarea: FC<TextareaProps> = ({ bookmarksActions, note, noteEdited }) => {
  if (!note && !noteEdited) {
    return null
  }

  return (
    <StyledFormGroup>
      <Form.Control
        as="textarea"
        value={note}
        onChange={(e) => {
          if (e.nativeEvent.type === "input") {
            bookmarksActions.editNote(e.target.value)
          }
        }}
        // eslint-disable-next-line
        onKeyDown={(e: any) => {
          if ((e.ctrlKey || e.metaKey) && e.which === 83) {
            bookmarksActions.saveNote()
            e.preventDefault()
          } else if (e.keyCode === 9) {
            const val = note
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
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  bookmarksActions: bindActionCreators(bookmarksSliceActions, dispatch),
})

const mapStateToProps = (state: RootState) => {
  return {
    noteEdited: state.bookmarks.activeCategory.noteEdited,
    note: state.bookmarks.activeCategory.note,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Textarea)
