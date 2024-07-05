import { useEffect, useState } from "react";
import ResponsiveAppBar from "./header";
import DataTableAdmin from "./tableAdmin";
import { fetchData, createRows, updateRows, deleteRows } from './function/fetch';
import { detectConnexion } from "./function/detectConnexion";
import { CssBaseline, ThemeProvider, Alert, Snackbar } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import { detectAdmin } from "./function/detectAdmin";


const Services = () => {
    const [data, setData] = useState([]);
    const [sites, setSites] = useState([]);
    const [services, setServices] = useState([]);
    const [darkMode, setDarkMode] = useState(JSON.parse(sessionStorage.getItem('darkMode')) || false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    useEffect(() => {
        detectConnexion(sessionStorage);
        detectAdmin(sessionStorage);
        fetchData("services").then(setData);
        fetchData("sites").then(setSites);
    }, []);

    const handleCreate = async (newService) => {
        try {
            const createdService = await createRows("services", newService);
            setData(prevData => [...prevData, createdService]);
            setAlertMessage('Service created successfully!');
            setAlertSeverity('success');
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('Failed to create service.');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    };

    const handleUpdate = async (updatedService) => {
        try {
            const updatedData = await updateRows("services", updatedService);
            setData(prevData => prevData.map(service => service.id === updatedData.id ? updatedData : service));
            setAlertMessage('Service updated successfully!');
            setAlertSeverity('success');
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('Failed to update service.');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    };

    const handleDelete = async (ids) => {
        try {
            for (const id of ids) {
                await deleteRows("services", id);
            }
            setData(prevData => prevData.filter(service => !ids.includes(service.id)));
            setAlertMessage('Service(s) deleted successfully!');
            setAlertSeverity('success');
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('Failed to delete service(s).');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    };

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        sessionStorage.setItem('darkMode', JSON.stringify(newDarkMode));
        setDarkMode(newDarkMode);
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline/>
            <div style={{ backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default }}>
                <ResponsiveAppBar admin={sessionStorage.getItem('adminMode')} darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
                <div className="container">
                    <DataTableAdmin col="services" rows={data} onCreate={handleCreate} onUpdate={handleUpdate} onDelete={handleDelete} sites={sites} services={services} />
                </div>
                <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </div>
        </ThemeProvider>
    );
};

export default Services;

