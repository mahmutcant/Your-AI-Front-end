import { Link } from 'react-router-dom';
import './Sidebar.css'
const Sidebar = () => {
  const sidebarItems = [
    { text: 'Anasayfa', to: '' },
    { text: 'Profil', to: 'profile' },
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