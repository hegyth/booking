import './App.css';
import { Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';
import CheckPage from './components/CheckPage';
import RoomsPage from './components/RoomsPage';
import GuestsPage from './components/GuestsPage';
import { checkAuth } from './redux/actions/userActions';
import ProtectedRoute from './components/HOCs/ProtectedRoute';
import ErrorPage from './components/ErrorPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  const user = useSelector((state) => state.user);
  return (
    <>
      <CssBaseline />

      {user.id ? <Navbar /> : <div />}

      <Routes>
        <Route element={<ProtectedRoute redirect="/check" isAllowed={!user.id} />}>

          <Route path="/login" element={<AuthPage />} />

        </Route>
        <Route element={<ProtectedRoute redirect="/login" isAllowed={!!user.id} />}>

          <Route path="/check" element={<CheckPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/guests" element={<GuestsPage />} />

        </Route>
        <Route path="/*" element={<ErrorPage />} />
      </Routes>

    </>
  );
}

export default App;
