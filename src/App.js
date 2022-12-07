import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import DefaultLayout from './layouts/DefaultLayout'
import Entry from './pages/Entry';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserLists';
import UnderDevelopment from './pages/UnderDevelopment';
import Page404 from './pages/Page404';
import UserDetail from './pages/UserDetail';
import UserNew from './pages/UserNew';
import MovieNew from './pages/MovieNew';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';

function App() {
  const { user } = useSelector(state => state.auth)

  const ProtectRoute = ({ children }) => {
    if (!user) {
      return <Navigate to='/login' />
    }
    else {
      return children
    }
  }


  return (
    <div className="App">
      <Routes>
        {/* Route */}
        {/* Route Public */}
        <Route path='/' element={<Entry />} />


        {/* Route Authen */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />


        {/* Route Private */}
        <Route path='/admin' element={<ProtectRoute><DefaultLayout /></ProtectRoute>}>
          <Route index element={<Home />} />
          {/* user Routes */}
          <Route path='users' element={<UserList />} />
          <Route path='users/new' element={<UserNew />} />
          <Route path='users/:id' element={<UserDetail />} />
          {/* Movie Routes */}
          <Route path='movies' element={<MovieList />} />
          <Route path='movies/new' element={<MovieNew />} />
          <Route path='movies/:id' element={<MovieDetail />} />


          {/* Cinenma routes */}
          {/* Underdevelopment*/}


          <Route path='*' element={<UnderDevelopment />} />
        </Route>


        <Route path='*' element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
