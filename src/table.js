import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';


const columnsEmployee = [
  { field: 'name', headerName: 'Name', width: 130, editable: true },
  { field: 'forname', headerName: 'Forname', width: 130, editable: true },
  { field: 'mobile', headerName: 'Mobile', width: 130, editable: true },
  { field: 'phone', headerName: 'Phone', width: 130, editable: true },
  { field: 'mail', headerName: 'Mail', width: 300, editable: true },
  { field: 'service', headerName: 'Service', width: 300, editable: true },
  { field: 'site', headerName: 'Site', width: 130, editable: true },
  { field: 'admin', headerName: 'Admin', width: 130, editable: true },
];

const flattenEmployeeData = (data) => {
  return data.map(employee => ({
    ...employee,
    service: employee.service?.name,
    site: employee.site?.city,
  }));
};

export default function DataTable({ rows, sites, services }) {

  const transformRows = (rows) => {
  
        return flattenEmployeeData(rows);
    
  };

  const columns = columnsEmployee;
  const transformedRows = transformRows(rows);

  React.useEffect(() => {
    console.log('Rows:', transformedRows);
    console.log('Columns:', columns);
    console.log('Sites:', sites); // Debugging line to check if sites data is passed
    console.log('Services:', services); // Debugging line to check if services data is passed
  }, [transformedRows, columns, sites, services]);

  return (
    <div style={{ height: 400, width: '100%', marginTop:'5vh' }}>
      <DataGrid
        rows={transformedRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
