import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link to="/roms">
        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Open games
        </button>
      </Link>
    </div>
  );
}

export default Welcome;