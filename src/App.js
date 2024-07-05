import './App.css';
import { useState, useEffect } from 'react';
import ResponsiveAppBar from './header';
import { detectConnexion } from './function/detectConnexion';
import DataTable from './table';
import { fetchData } from './function/fetch';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

function App() {
  const [keySequence, setKeySequence] = useState('');
  const [admin, setAdmin] = useState(sessionStorage.getItem('admin') === 'true');
  const [data, setData] = useState([]);
  const [sites, setSites] = useState([]);
  const [services, setServices] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [isAdminFilter, setIsAdminFilter] = useState(false);
  const [darkMode, setDarkMode] = useState(JSON.parse(sessionStorage.getItem('darkMode')) || false);

  useEffect(() => {
    detectConnexion(sessionStorage);
    fetchData("salaries").then(setData);
    fetchData("sites").then(setSites);
    fetchData("services").then(setServices);

    const handleKeyPress = (event) => {
      setKeySequence((prev) => {
        const newSequence = (prev + event.key).slice(-3);
        if (sessionStorage.getItem("admin") === "true") {
          if (newSequence === 'adm') {
            setAdmin(true);
            sessionStorage.setItem('adminMode', 'true'); // Stocker l'état d'administrateur dans le sessionStorage
          }
        }
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleServiceChange = (event) => {
    const value = event.target.name;
    setSelectedServices((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleCityChange = (event) => {
    const value = event.target.name;
    setSelectedCities((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleAdminChange = (event) => {
    setIsAdminFilter(event.target.checked);
  };

  const filteredData = data.filter((row) => {
    const matchesSearchText = Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesServices = selectedServices.length === 0 || selectedServices.includes(row.service?.name);
    const matchesCities = selectedCities.length === 0 || selectedCities.includes(row.site?.city);
    const matchesAdmin = !isAdminFilter || row.admin === true;
    return matchesSearchText && matchesServices && matchesCities && matchesAdmin;
  });

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    sessionStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    setDarkMode(newDarkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App" style={{ backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default }}>
        <ResponsiveAppBar admin={sessionStorage.getItem('adminMode')} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerClose}
        >
          <Box p={2} width={300} role="presentation">
            <Typography variant="h6">Filters</Typography>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchText}
              onChange={handleSearchChange}
              sx={{ my: 2 }}
            />
            <Typography variant="subtitle1">Services</Typography>
            <FormGroup>
              {services.map((service) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      name={service.name}
                      onChange={handleServiceChange}
                      checked={selectedServices.includes(service.name)}
                    />
                  }
                  label={service.name}
                  key={service.id}
                />
              ))}
            </FormGroup>
            <Typography variant="subtitle1">Cities</Typography>
            <FormGroup>
              {sites.map((site) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      name={site.city}
                      onChange={handleCityChange}
                      checked={selectedCities.includes(site.city)}
                    />
                  }
                  label={site.city}
                  key={site.id}
                />
              ))}
            </FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdminFilter}
                  onChange={handleAdminChange}
                  name="isAdmin"
                  color="primary"
                />
              }
              label="Admin"
              sx={{ my: 2 }}
            />
            <Button onClick={handleDrawerClose} variant="contained" color="secondary">Close</Button>
          </Box>
        </Drawer>
        <DataTable rows={filteredData} sites={sites} services={services} />
        <Button onClick={handleDrawerOpen} variant="contained" color="primary" >Open Filters</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
