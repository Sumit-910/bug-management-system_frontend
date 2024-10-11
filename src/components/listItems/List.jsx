import './list.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons from react-icons

const List = ({ data, onRowClick, userRoles, requiredRole, onEdit, onDelete }) => {
  const allowedAccess = (userRoles && userRoles.includes(requiredRole));
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const headers = Object.keys(data[0]).filter((key) => key !== '_id');

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header.toUpperCase()}</th>
            ))}
            {allowedAccess && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              onClick={() => onRowClick(item)}
              className={item._id ? 'clickable-row' : ''}
            >
              {headers.map((header) => (
                <td key={header}>{item[header]}</td>
              ))}
              {allowedAccess && (
                <td className="action-icons">
                  <FaEdit 
                    className="edit-icon" 
                    onClick={(e) => { e.stopPropagation(); onEdit(item); }} 
                  />
                  <FaTrash 
                    className="delete-icon" 
                    onClick={(e) => { e.stopPropagation(); onDelete(item._id); }} 
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;