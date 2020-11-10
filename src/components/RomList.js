import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RomList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/roms`, { credentials: "include" });
      if (response.status === 401) {
        window.location.href = `${apiUrl}/login`;
      }
      else {
        const data = await response.json();
        setItems(data.items);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="gap-4 px-8 py-8 flex flex-wrap">
      {items.map(item => <Link key={item.id} className="truncate flex-auto text-center text-purple-900 text-xl shadow rounded w-80 h-20 p-4 bg-white" to={`/player/${item.id}`}>{item.name}</Link>)}
    </div>
  )
}

export default RomList;