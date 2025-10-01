import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function SharedNotePage() {
  const { noteId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl font-bold">Shared Note: {noteId}</h1>
      <p>Shared note page placeholder for {user.displayName}</p>
    </div>
  );
}
export default SharedNotePage;