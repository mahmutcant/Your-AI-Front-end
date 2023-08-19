import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, User } from '../store/types';
import { getUserInfo } from '../services/user-service';
import { setUser } from '../store/actions';
const Sidebar = () => {
  const navigate = useNavigate()
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userData = await getUserInfo();
        dispatch(setUser(userData));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    if (!user) {
      fetchUserInfo();
    }
  }, [dispatch, user]);

  const sidebarItems = [
    { text: 'Anasayfa', to: '' },
    { text: user?.name, to: 'profile' },
    { text: 'Modellerim', to: 'mymodels' }
  ];
    return (
        <nav id="navbar">
        {Object.values(sidebarItems).map((item,index) => (
            <Link key={item.to} to={`/main/${item.to}`}>
            <div key={item.text} className="link_text">{item.text}</div>

          </Link>
        ))}
      </nav>
    );
  };
export default Sidebar;
