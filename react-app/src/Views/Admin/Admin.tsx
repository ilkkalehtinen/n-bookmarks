/**
 * This file is part of nBookmarks.
 * Copyright (c) 2023 Ilkka Lehtinen
 *
 * For the full copyright and license information, please view the license.txt
 * file that was distributed with this source code.
 */
import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import * as adminSliceActions from 'Redux/adminSlice'
import { RootState } from 'Redux/rootReducer'
import { AppDispatch } from 'Redux/store'
import { OptionType } from 'types'
import FormInput from 'Common/FormInput'
import FormSelect from 'Common/FormSelect'


const StyledFormLabel = styled(Form.Label)`
  width: 130px;
  justify-content: flex-start !important;
`

const StyledButton = styled(Button)`
  width: 90px;
`

interface AdminComponentProps {
  adminActions: typeof adminSliceActions
  adminData: adminSliceActions.AdminState
}

const Admin: FC<AdminComponentProps> = ({ adminActions, adminData }: AdminComponentProps) => {
  const [users, setUsers] = useState<OptionType[]>([])

  useEffect(() => {
    adminActions.fetchUsers()
  }, [adminActions])

  useEffect(() => {
    const users = adminData.users ?
      adminData.users.map(user => ({ id: user.id, name: user.username })) :
      []
    setUsers(users)
  }, [adminData])

  const onChange = (path: Array<string>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    adminActions.updateValue({ path, value: e.target.value })
  }

  return (
    <React.Fragment>
      <Form inline>
        <StyledFormLabel>Add user</StyledFormLabel>
        <FormInput
          value={adminData.user.name}
          onChange={onChange(['user', 'name'])}
          placeholder="Name"
        />
        <FormInput
          value={adminData.user.password}
          onChange={onChange(['user', 'password'])}
          placeholder="Password"
        />
        <Form.Check
          checked={adminData.user.admin === '1'}
          type={'checkbox'}
          label={`Admin`}
          onChange={(e) =>
            adminActions.updateValue(
              {
                 path: ['user', 'admin'],
                 value: e.target.checked ? '1' : '0',
              }
            )
          }
        />
        <StyledButton
          className="m-2"
          disabled={
            !adminData.user.name ||
            !adminData.user.password
          }
          onClick={adminActions.addUser}
        >
          Add
        </StyledButton>
      </Form>
      <Form inline>
        <StyledFormLabel>Change password</StyledFormLabel>
        <FormSelect
          onChange={onChange(['changePassword', 'user'])}
          placeholder="User"
          options={users}
        />
        <FormInput
          value={adminData.changePassword.password}
          onChange={onChange(['changePassword', 'password'])}
          placeholder="Password"
        />
        <StyledButton
          className="m-2"
          disabled={
            !adminData.changePassword.user ||
            !adminData.changePassword.password
          }
          onClick={adminActions.changePassword}
        >
          Change
        </StyledButton>
      </Form>
      <Form inline>
        <StyledFormLabel>Remove user</StyledFormLabel>
        <FormSelect
          onChange={onChange(['removeUser', 'user'])}
          placeholder="User"
          options={users}
        />
        <StyledButton
          className="m-2"
          disabled={
            !adminData.removeUser.user
          }
          onClick={adminActions.removeUser}
        >
          Remove
        </StyledButton>
      </Form>
      <Form inline>
        <StyledFormLabel>Set admin</StyledFormLabel>
        <FormSelect
          onChange={onChange(['setAdmin', 'user'])}
          placeholder="User"
          options={users}
        />
        <Form.Check
          checked={adminData.setAdmin.admin === '1'}
          type={'checkbox'}
          label={`Admin`}
          onChange={(e) =>
            adminActions.updateValue(
              {
                 path: ['setAdmin', 'admin'],
                 value: e.target.checked ? '1' : '0',
              }
            )
          }
        />
        <StyledButton
          className="m-2"
          disabled={
            !adminData.setAdmin.user
          }
          onClick={adminActions.setAdmin}
        >
          Set
        </StyledButton>
      </Form>
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  adminActions: bindActionCreators(adminSliceActions, dispatch)
})

const mapStateToProps = (state: RootState) => ({
  adminData: state.admin,
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)

