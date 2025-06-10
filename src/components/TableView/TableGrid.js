import React, { useEffect, useState } from 'react';
import Table from './Table';
import '../../components/TableView/tables.css';
import { Col, Dropdown, Row } from 'react-bootstrap';

const TableGrid = () => {
  const [tables, setTables] = useState([]);

  const hardcodedTables = [
    { size: 136, shape: 'rectangle' },
    { size: 136, shape: 'round' },
    { size: 342, shape: 'round' },
    { size: 136, shape: 'round' },
    { size: 136, shape: 'rectangle' },
    { size: 136, shape: 'rectangle' },
    { size: 136, shape: 'round' },
    { size: 342, shape: 'round' },
    { size: 136, shape: 'round' },
    { size: 136, shape: 'rectangle' },
    { size: 136, shape: 'round' },
    { size: 136, shape: 'round' },
    { size: 136, shape: 'round' },
    { size: 136, shape: 'rectangle' },
    { size: 342, shape: 'round' },
    // Add more table specifications as needed
  ];

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch("https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/GetTable", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "fetch" }),
        });
        const fetchedTables = await response.json();
        const combinedTables = fetchedTables.map((table, index) => ({
          ...table,
          size: hardcodedTables[index]?.size || 136,  // Default size if not found
          shape: hardcodedTables[index]?.shape || 'round',  // Default shape if not found
        }));
        setTables(combinedTables);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };

    fetchTables();
  }, []);

  return (
    <div className="table-grid">
      <Row className='tableheadingRow'>
        <Col lg={4}><h1 className='TableTitle'>2D TABLE MAPPING</h1></Col>
        <Col lg={4} className='d-flex'>
          <div className='st-legend'>
            <span className='st available'>● Available</span>
            <span className='st reserved'>● Reserved</span>
          </div>
        </Col>
        <Col lg={4} className='tabledrop'>
          <Dropdown className='tablefloordropdown'>
            <Dropdown.Toggle variant='light' id='dropdown-basic-floor' className='tablefloordrop'>
              First Floor
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href='#'>First Floor</Dropdown.Item>
              <Dropdown.Item href='#'>Second Floor</Dropdown.Item>
              <Dropdown.Item href='#'>Third Floor</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <div className='container-fluid' style={{ justifyContent: 'center', display: 'flex' }}>
        <div className='row' style={{
          gap: '8pc 10pc',
          justifyContent: 'center',
          width: '90pc',
          marginBottom: '25px',
        }}>
          {tables.map(table => (
            <Table
              key={table.Table_ID}
              id={table.Table_ID}
              size={table.size}
              shape={table.shape}
              seatingCapacity={table.SeatQty}
              tableNumber={table["Table#"]}
              isReserved={table.IsReserved}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableGrid;
