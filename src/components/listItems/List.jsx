import './list.css';

const List = ({ data, onRowClick }) => {

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
