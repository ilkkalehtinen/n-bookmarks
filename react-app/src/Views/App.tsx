import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components'
import { ToastContainer, Flip } from 'react-toastify';
import classNames from 'classnames'

import { API_URL, PAGES } from 'Redux/constants'
import Tabs from 'Views/Bookmarks/Tabs'
import QuickLinks from 'Views/Bookmarks/QuickLinks'
import Search from 'Views/Search/Search'
import Edit from 'Views/Edit/Edit'
import Admin from 'Views/Admin/Admin'
import { LoggedInUser } from 'types'
import * as editSliceActions from 'Redux/editSlice'
import * as bookmarksSliceActions from 'Redux/bookmarksSlice'
import { AppDispatch } from 'Redux/store'
import { RootState } from 'Redux/rootReducer'

import 'react-toastify/dist/ReactToastify.css';

interface AppComponentProps {
  bookmarksActions: typeof bookmarksSliceActions
  user: LoggedInUser | null
  activePage: string
  loading: boolean,
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

const SearchInput = styled(Form.Control)`
  width: 150px;
  height: 20px;
  margin-right: 20px;
  background-color: #ddd;
`

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const App: FC<AppComponentProps> = ({
  bookmarksActions,
  user,
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

  if (!user && !loading) {
    return <div>Unable to load application</div>
  }

  if (loading) {
     return (
       <SpinnerContainer>
         <Spinner animation="border" />
       </SpinnerContainer>
     );
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
          {/* eslint-disable-next-line */}
          <SearchInput type="text" placeholder="Search..." onChange={(e: any) => {
            bookmarksActions.search(e.target.value);
          }} />
          <Nav>
            <Nav.Link
              href=""
              // eslint-disable-next-line
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
        {activePage === PAGES.BOOKMARKS &&
          <React.Fragment>
            <QuickLinks />
            <Tabs />
          </React.Fragment>
        }
        {activePage === PAGES.EDIT && <Edit />}
        {activePage === PAGES.ADMIN && <Admin />}
        {activePage === PAGES.SEARCH && <Search />}
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
    activePage: state.bookmarks.activePage,
    user: state.bookmarks.user,
    loading: state.bookmarks.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
