import './list.css';
import { useNavigate } from 'react-router-dom';

const List = ({ data }) => {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const headers = Object.keys(data[0]).filter((key) => key !== '_id');

  const handleRowClick = (link) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(item._id)}
              className={item._id ? 'clickable-row' : ''}
            >
              {headers.map((header) => (
                <td key={header}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
