import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Note-ify</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm">{user.displayName || user.email}</span>
          <button
            onClick={() => logout().then(() => navigate('/'))}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;