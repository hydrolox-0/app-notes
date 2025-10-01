import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function NotesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl font-bold">Your Notes</h1>
      <p>Notes page placeholder for {user.displayName}</p>
    </div>
  );
}
export default NotesPage;