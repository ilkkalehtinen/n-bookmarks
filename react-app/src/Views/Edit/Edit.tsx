/**
 * This file is part of nBookmarks.
 * Copyright (c) 2023 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
import React, { FC } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import * as editSliceActions from 'Redux/editSlice'
import { RootState } from 'Redux/rootReducer'
import { AppDispatch } from 'Redux/store'
import { CategoryType, OptionType } from 'types'
import FormInput from 'Common/FormInput'
import FormPassword from 'Common/FormPassword'
import FormSelect from 'Common/FormSelect'


const StyledFormLabel = styled(Form.Label)`
  width: 115px;
  justify-content: flex-start !important;
`

const StyledButton = styled(Button)`
  width: 90px;
`

interface EditComponentProps {
  bookmarkData: CategoryType[]
  editData: editSliceActions.EditState
  editActions: typeof editSliceActions
}

const Edit: FC<EditComponentProps> = ({ bookmarkData, editData, editActions }: EditComponentProps) => {
  const bookmarks = bookmarkData.reduce((acc, category) => {
    if (category.bookmarks) {
      const bookmarks = category.bookmarks.map(bookmark => ({
        id: bookmark.id,
        name: `${category.category} - ${bookmark.name}`
      }))
      return acc.concat(bookmarks)
    }
    return acc
  }, [] as OptionType[])

  const categories = bookmarkData.map(category => ({
    id: category.id,
    name: category.category,
  }))

  const onChange = (path: Array<string>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    editActions.updateValue({ path, value: e.target.value })
  }

  const onSelectBookmark = (e: React.ChangeEvent<HTMLInputElement>) => {
    const path = ['modifyBookmark']
    const bookmarkId = e.target.value
    let bookmark = null

    for (let i = 0; i < bookmarkData.length; i++) {
      if (bookmarkData[i].bookmarks) {
        for (let j = 0; j < bookmarkData[i].bookmarks.length; j++) {
          if (bookmarkData[i].bookmarks[j].id === bookmarkId) {
            bookmark = bookmarkData[i].bookmarks[j]
          }
        }
      }
    }
    if (bookmark) {
      editActions.updateValue({ path, value: bookmark })
    } else {
      editActions.updateValue({ path, value: {
        id: '',
        name: '',
        url: '',
        category: '',
      }})
    }
  }

  return (
    <React.Fragment>
      <Form inline>
        <StyledFormLabel>Add bookmark</StyledFormLabel>
        <FormInput
          value={editData.addBookmark.url}
          onChange={onChange(['addBookmark', 'url'])}
          placeholder="Url"
          data-cy="add-bookmark-url"
        />
        <FormInput
          value={editData.addBookmark.name}
          onChange={onChange(['addBookmark', 'name'])}
          placeholder="Name"
          data-cy="add-bookmark-name"
        />
        <FormSelect
          onChange={onChange(['addBookmark', 'category'])}
          placeholder="Category"
          options={categories}
          data-cy="add-bookmark-category"
        />
        <StyledButton
          className="m-2"
          disabled={
            !editData.addBookmark.url ||
            !editData.addBookmark.name ||
            !editData.addBookmark.category
          }
          onClick={editActions.addBookmarkAndUpdate}
          data-cy="add-bookmark-add"
        >
          Add
        </StyledButton>
      </Form>
      <Form inline>
        <StyledFormLabel>Modify bookmark</StyledFormLabel>
        <FormSelect
          onChange={onSelectBookmark}
          placeholder="Category"
          options={bookmarks}
          data-cy="modify-bookmark-bookmark"
        />
      </Form>
      <Form inline>
        <StyledFormLabel />
        <FormInput
          value={editData.modifyBookmark.url}
          onChange={onChange(['modifyBookmark', 'url'])}
          placeholder="Url"
          data-cy="modify-bookmark-url"
        />
        <FormInput
          value={editData.modifyBookmark.name}
          onChange={onChange(['modifyBookmark', 'name'])}
          placeholder="Name"
          data-cy="modify-bookmark-name"
        />
        <FormSelect
          onChange={onChange(['modifyBookmark', 'category'])}
          placeholder="Category"
          options={categories}
          data-cy="modify-bookmark-bookmark"
        />
        <StyledButton
          className="m-2"
          disabled={
            !editData.modifyBookmark.url ||
            !editData.modifyBookmark.name ||
            !editData.modifyBookmark.category
          }
          onClick={editActions.modifyBookmarkAndUpdate}
          data-cy="modify-bookmark-modify"
        >
          Modify
        </StyledButton>
      </Form>
      <Form inline>
        <StyledFormLabel>Add category</StyledFormLabel>
        <FormInput
          value={editData.addCategory.name}
          onChange={onChange(['addCategory', 'name'])}
          placeholder="Name"
          data-cy="add-category-name"
        />
        <StyledButton
          className="m-2"
          disabled={
            !editData.addCategory.name
          }
          onClick={editActions.addCategoryAndUpdate}
          data-cy="add-category-add"
        >
          Add
        </StyledButton>
      </Form>
      <Form inline>
        <StyledFormLabel>Remove category</StyledFormLabel>
        <FormSelect
          onChange={onChange(['removeCategory', 'id'])}
          placeholder="Category"
          options={categories}
          data-cy="remove-category-name"
        />
        <StyledButton
          className="m-2"
          disabled={
            !editData.removeCategory.id
          }
          onClick={editActions.removeCategoryAndUpdate}
          data-cy="remove-category-remove"
        >
          Remove
        </StyledButton>
      </Form>
      <Form inline>
        <StyledFormLabel>Modify category</StyledFormLabel>
        <FormSelect
          onChange={onChange(['modifyCategory', 'id'])}
          placeholder="Category"
          options={categories}
          data-cy="modify-category-name"
        />
        <FormInput
          value={editData.modifyCategory.name}
          onChange={onChange(['modifyCategory', 'name'])}
          placeholder="Name"
          data-cy="modify-category-new-name"
        />
        <StyledButton
          className="m-2"
          disabled={
            !editData.modifyCategory.id ||
            !editData.modifyCategory.name
          }
          onClick={editActions.modifyCategoryAndUpdate}
          data-cy="modify-category-modify"
        >
          Modify
        </StyledButton>
      </Form>
      <Form inline>
        <StyledFormLabel>Upload data</StyledFormLabel>
        <FormInput
          value={editData.uploadData.data}
          onChange={onChange(['uploadData', 'data'])}
          placeholder="Upload data"
          data-cy="upload-data-data"
        />
        <StyledButton
          className="m-2"
          disabled={
            !editData.uploadData.data
          }
          onClick={editActions.uploadData}
          data-cy="upload-data-upload"
        >
          Upload
        </StyledButton>
      </Form>
      <Form inline>
        <StyledFormLabel>Change password</StyledFormLabel>
        <FormPassword
          value={editData.changePassword.password}
          onChange={onChange(['changePassword', 'password'])}
          placeholder="Password"
          data-cy="change-password-password"
        />
        <StyledButton
          className="m-2"
          disabled={
            !editData.changePassword.password
          }
          onClick={editActions.changePassword}
          data-cy="change-password-change"
        >
          Change
        </StyledButton>
      </Form>
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  editActions: bindActionCreators(editSliceActions, dispatch)
})

const mapStateToProps = (state: RootState) => {
  return {
    bookmarkData: state.bookmarks.data,
    editData: state.edit,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
