import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';

const columnsSites = [
  { field: 'city', headerName: 'City', width: 230, editable: true },
  { field: 'function', headerName: 'Function', width: 230, editable: true },
];

const columnsServices = [
  { field: 'name', headerName: 'Name', width: 230, editable: true },
  { field: 'description', headerName: 'Description', width: 230, editable: true },
];

const columnsEmployee = [
  { field: 'name', headerName: 'Name', width: 130, editable: true },
  { field: 'forname', headerName: 'Forname', width: 130, editable: true },
  { field: 'mobile', headerName: 'Mobile', width: 130, editable: true },
  { field: 'phone', headerName: 'Phone', width: 130, editable: true },
  { field: 'mail', headerName: 'Mail', width: 230, editable: true },
  { field: 'service', headerName: 'Service', width: 230, editable: true },
  { field: 'site', headerName: 'Site', width: 230, editable: true },
  { field: 'admin', headerName: 'Admin', width: 130, editable: true },
  { field: 'deleted_Date', headerName: 'Delete Date', width: 130, editable: true },
];

const flattenEmployeeData = (data) => {
  return data.map(employee => ({
    ...employee,
    service: employee.service?.name,
    site: employee.site?.city,
  }));
};

export default function DataTableAdmin({ col, rows, onCreate, onUpdate, onDelete, sites, services }) {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [newEntry, setNewEntry] = React.useState({
    id: '',
    name: '',
    forname: '',
    mobile: '',
    phone: '',
    mail: '',
    service: { id: '', name: '', description: '' },
    site: { id: '', city: '', function: '' },
    admin: false,
    delete_Date: null,
    password: '',
  });
  const [selectedRow, setSelectedRow] = React.useState({
    id: '',
    name: '',
    forname: '',
    mobile: '',
    phone: '',
    mail: '',
    service: { id: '', name: '', description: '' },
    site: { id: '', city: '', function: '' },
    admin: false,
    delete_Date: null,
    password: '',
  });
  const [selectionModel, setSelectionModel] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEditOpen = () => {
    if (selectionModel.length === 1) {
      const row = rows.find(r => r.id === selectionModel[0]);
      if (row) {
        setSelectedRow({
          ...row,
          service: {
            id: row.serviceId,
            name: row.serviceName,
            description: row.serviceDescription,
          },
          site: {
            id: row.siteId,
            city: row.siteCity,
            function: row.siteFunction,
          },
        });
        setEditOpen(true);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditOpen(false);
  };

  const handleSave = () => {
    console.log('New Entry:', newEntry);
    onCreate(newEntry);
    setNewEntry({
      id: '',
      name: '',
      forname: '',
      mobile: '',
      phone: '',
      mail: '',
      service: { id: '', name: '', description: '' },
      site: { id: '', city: '', function: '' },
      admin: false,
      delete_Date: null,
      password: '',
    });
    setOpen(false);
  };

  const handleEditSave = () => {
    console.log('Updated Row:', selectedRow);
    onUpdate(selectedRow);
    setEditOpen(false);
  };

  const handleProcessRowUpdate = (newRow) => {
    console.log('Updated Row:', newRow);
    onUpdate(newRow);
    return newRow;
  };

  const handleDelete = () => {
    onDelete(selectionModel);
  };

  const handleSelectionModelChange = (newSelection) => {
    console.log(newSelection);
    setSelectionModel(newSelection);
  };

  const getColumns = () => {
    switch (col) {
      case 'sites':
        return columnsSites;
      case 'services':
        return columnsServices;
      case 'employees':
        return columnsEmployee;
      default:
        return [];
    }
  };

  const transformRows = (rows) => {
    switch (col) {
      case 'employees':
        return flattenEmployeeData(rows);
      default:
        return rows;
    }
  };

  const columns = getColumns();
  const transformedRows = transformRows(rows);

  return (
    <div style={{ height: 400, width: '100%' , marginTop:'5vh'}}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add {col === 'sites' ? 'Site' : col === 'services' ? 'Service' : col === 'employees'}
      </Button>
      <Button
        variant="outlined"
        onClick={handleEditOpen}
        disabled={selectionModel.length !== 1}
        style={{ marginLeft: '10px' }}
      >
        Edit Selected
      </Button>
      <Button
        variant="outlined"
        onClick={handleDelete}
        disabled={selectionModel.length === 0}
        style={{ marginLeft: '10px' }}
      >
        Delete Selected
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New {col === 'sites' ? 'Site' : col === 'services' ? 'Service' : 'Employee'}</DialogTitle>
        <DialogContent>
          {col === 'employees' && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Forname"
                type="text"
                fullWidth
                value={newEntry.forname}
                onChange={(e) => setNewEntry({ ...newEntry, forname: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Mobile"
                type="text"
                fullWidth
                value={newEntry.mobile}
                onChange={(e) => setNewEntry({ ...newEntry, mobile: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Phone"
                type="text"
                fullWidth
                value={newEntry.phone}
                onChange={(e) => setNewEntry({ ...newEntry, phone: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Mail"
                type="text"
                fullWidth
                value={newEntry.mail}
                onChange={(e) => setNewEntry({ ...newEntry, mail: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Password"
                type="text"
                fullWidth
                value={newEntry.password}
                onChange={(e) => setNewEntry({ ...newEntry, password: e.target.value })}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Service</InputLabel>
                <Select
                  value={newEntry.service.id}
                  onChange={(e) => {
                    const selectedService = services.find(service => service.id === e.target.value);
                    setNewEntry({ ...newEntry, service: selectedService });
                  }}
                >
                  {services.map(service => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel>Site</InputLabel>
                <Select
                  value={newEntry.site.id}
                  onChange={(e) => {
                    const selectedSite = sites.find(site => site.id === e.target.value);
                    setNewEntry({ ...newEntry, site: selectedSite });
                  }}
                >
                  {sites.map(site => (
                    <MenuItem key={site.id} value={site.id}>
                      {site.city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={<Checkbox checked={newEntry.admin} onChange={(e) => setNewEntry({ ...newEntry, admin: e.target.checked })} />}
                label="Admin"
              />
            </>
          )}{col === 'sites' && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="City"
                type="text"
                fullWidth
                value={newEntry.city}
                onChange={(e) => setNewEntry({ ...newEntry, city: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Function"
                type="text"
                fullWidth
                value={newEntry.function}
                onChange={(e) => setNewEntry({ ...newEntry, function: e.target.value })}
              />
            </>
          )
          }{col === 'services' && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                value={newEntry.name}
                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                value={newEntry.description}
                onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              />
            </>
          )
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={handleClose}>
        <DialogTitle>Edit {col === 'sites' ? 'Site' : col === 'services' ? 'Service' : 'Employee'}</DialogTitle>
        <DialogContent>
          {col === 'employees' && selectedRow && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                value={selectedRow.name || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Forname"
                type="text"
                fullWidth
                value={selectedRow.forname || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, forname: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Mobile"
                type="text"
                fullWidth
                value={selectedRow.mobile || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, mobile: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Phone"
                type="text"
                fullWidth
                value={selectedRow.phone || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, phone: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Mail"
                type="text"
                fullWidth
                value={selectedRow.mail || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, mail: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Password"
                type="text"
                fullWidth
                value={selectedRow.password || ''}
                onChange={(e) => setSelectedRow({ ...selectedRow, password: e.target.value })}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel>Service</InputLabel>
                <Select
                  value={selectedRow.service?.id || ''}
                  onChange={(e) => {
                    const selectedService = services.find(service => service.id === e.target.value);
                    setSelectedRow({ ...selectedRow, service: selectedService });
                  }}
                >
                  {services.map(service => (
                    <MenuItem key={service.id} value={service.id}>
                      {service.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <InputLabel>Site</InputLabel>
                <Select
                  value={selectedRow.site?.id || ''}
                  onChange={(e) => {
                    const selectedSite = sites.find(site => site.id === e.target.value);
                    setSelectedRow({ ...selectedRow, site: selectedSite });
                  }}
                >
                  {sites.map(site => (
                    <MenuItem key={site.id} value={site.id}>
                      {site.city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={<Checkbox checked={selectedRow.admin || false} onChange={(e) => setSelectedRow({ ...selectedRow, admin: e.target.checked })} />}
                label="Admin"
              />
            </>
          )}{col === 'sites' && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="City"
                type="text"
                fullWidth
                value={selectedRow.city}
                onChange={(e) => setSelectedRow({ ...selectedRow, city: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Function"
                type="text"
                fullWidth
                value={selectedRow.function}
                onChange={(e) => setSelectedRow({ ...selectedRow, function: e.target.value })}
              />
            </>
          )
          }{col === 'services' && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                value={selectedRow.name}
                onChange={(e) => setSelectedRow({ ...selectedRow, name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                value={selectedRow.description}
                onChange={(e) => setSelectedRow({ ...selectedRow, description: e.target.value })}
              />
            </>
          )
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        editMode="row"
        rows={transformedRows}
        columns={columns}
        processRowUpdate={handleProcessRowUpdate}
        onProcessRowUpdateError={(error) => console.error('Process row update error:', error)}
        experimentalFeatures={{ newEditingApi: true }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionModelChange}
        selectionModel={selectionModel}
      />
    </div>
  );
}
