import Table from 'react-bootstrap/Table';
import { useState } from 'react';

const Input1Table = () => {
  const [tableData, setTableData] = useState([
    { id: 1, name: '항목 A', description: '설명 A' },
    { id: 2, name: '항목 B', description: '설명 B' },
    { id: 3, name: '항목 C', description: '설명 C' },
  ]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>이름</th>
          <th>설명</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Input1Table;
