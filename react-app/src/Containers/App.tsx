import React, { FC, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Toast from 'react-bootstrap/Toast'
import styled from 'styled-components'
import { ToastContainer, Flip } from 'react-toastify';
import classNames from 'classnames'
import { API_URL, PAGES } from 'Constants/constants'
import Tabs from 'Components/Tabs'
import QuickLinks from 'Components/QuickLinks'
import Edit from 'Containers/Edit'
import Admin from 'Containers/Admin'
import { CategoryType, BookmarkType, LoggedInUser, ActiveCategory } from 'types'
import { fetchBookmarks, fetchUser } from 'Redux/bookmarksSlice'
import * as editSliceActions from 'Redux/editSlice'
import * as bookmarksSliceActions from 'Redux/bookmarksSlice'
import { AppDispatch } from 'Redux/store'
import { RootState } from 'Redux/rootReducer'

import 'react-toastify/dist/ReactToastify.css';

interface AppComponentProps {
  data: CategoryType[]
  quickLinks: BookmarkType[]
  editActions: typeof editSliceActions
  bookmarksActions: typeof bookmarksSliceActions
  user: LoggedInUser | null
  activeCategory: ActiveCategory
  activePage: string
  loading: boolean
}

const AppContainer = styled.div`
  height: 100%;
`

const ContentContainer = styled.div`
  height: calc(100% - 40px);
  display: flex;
  flex: 2;
  flex-direction: column;
  background: linear-gradient(to bottom, #f0f9ff 0%,#cbebff 47%,#ffffff 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0f9ff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
`

const NavbarBrand = styled(Navbar.Brand)`
  color: #aaa;
`

const App: FC<AppComponentProps> = ({
  data,
  quickLinks,
  editActions,
  bookmarksActions,
  user,
  activeCategory,
  activePage,
  loading,
}: AppComponentProps) => {
  useEffect(() => {
    bookmarksActions.fetchUser()
    bookmarksActions.fetchBookmarks()

    const pollUser = setInterval(() => {
      bookmarksActions.fetchUser()
    }, 3600000) // every hour

    return function cleanup() {
      clearInterval(pollUser)
    };
  }, [bookmarksActions])

  const toggleList = () =>
    bookmarksActions.setActivePage(PAGES.BOOKMARKS)

  const toggleEdit = () =>
    bookmarksActions.setActivePage(PAGES.EDIT)

  const toggleAdmin = () =>
    bookmarksActions.setActivePage(PAGES.ADMIN)

  const renderBookmarks = () =>
    <React.Fragment>
      <QuickLinks
        data={quickLinks}
        bookmarksActions={bookmarksActions}
        activeCategory={activeCategory}
      />
      <Tabs
        data={data}
        quickLinks={quickLinks}
        editActions={editActions}
        bookmarksActions={bookmarksActions}
        activeCategory={activeCategory}
      />
    </React.Fragment>

  const renderEdit = () =>
    <Edit />

  const renderAdmin = () =>
    <Admin />

  if (!user && !loading) {
    return <div>Unable to load application</div>
  }

  return (
    <AppContainer>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Flip}
        hideProgressBar
      />
      <Navbar className="py-0" bg="dark" expand="lg">
        <NavbarBrand href="#home">Bookmarks</NavbarBrand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto" />
          <Nav>
            <Nav.Link
              href=""
              onClick={(e: any) => e.preventDefault()}>
                {user ? user.username : ''}
            </Nav.Link>
            <Nav.Link
              href=""
              onClick={toggleList}
              className={
                classNames({ 'text-underline': activePage === PAGES.BOOKMARKS})
              }
            >
              list
            </Nav.Link>
            <Nav.Link
              href=""
              onClick={toggleEdit}
              className={
                classNames({ 'text-underline': activePage === PAGES.EDIT})
              }
            >
              edit
            </Nav.Link>
            {user && user.admin === "1" &&
              <Nav.Link
                href=""
                onClick={toggleAdmin}
                className={
                  classNames({ 'text-underline': activePage === PAGES.ADMIN})
                }
              >
                admin
              </Nav.Link>
            }
            <Nav.Link href={`${API_URL}/home/logout`}>log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ContentContainer id="bookmarks-content" className="container">
        {!loading && activePage === PAGES.BOOKMARKS && renderBookmarks()}
        {!loading && activePage === PAGES.EDIT && renderEdit()}
        {!loading && activePage === PAGES.ADMIN && renderAdmin()}
      </ContentContainer>
    </AppContainer>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  editActions: bindActionCreators(editSliceActions, dispatch),
  bookmarksActions: bindActionCreators(bookmarksSliceActions, dispatch),
})

const mapStateToProps = (state: RootState) => {
  return {
    data: state.bookmarks.data,
    activeCategory: state.bookmarks.activeCategory,
    activePage: state.bookmarks.activePage,
    quickLinks: state.bookmarks.quickLinks,
    user: state.bookmarks.user,
    loading: state.bookmarks.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
