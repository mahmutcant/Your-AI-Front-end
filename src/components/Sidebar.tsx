import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'
import { useEffect, useState } from 'react';
import { validatorService } from '../services/user-service';
const Sidebar = () => {
  const navigate = useNavigate()
  const [user,setUser] = useState<UserDTO | null>(null);
    useEffect(() => {
        validatorService()
            .then((data) => setUser(data))
            .catch(err => {navigate("/")})
    }, []);
    
  const sidebarItems = [
    { text: 'Anasayfa', to: '' },
    { text: user?.username, to: 'profile' },
    { text: 'Modellerim', to: 'mymodels' }
  ]
    return (
        <nav id="navbar">
        {Object.values(sidebarItems).map((item,index) => (
            <Link to={`/main/${item.to}`}>
            <div className="link_text">{item.text}</div>
          </Link>
        ))}
      </nav>
    );
  };
export default Sidebar;