import { useEffect, useState } from "react";
import ResponsiveAppBar from "./header";
import DataTableAdmin from "./tableAdmin";
import { fetchData, createRows, updateRows, deleteRows } from './function/fetch';
import { detectConnexion } from "./function/detectConnexion";
import { CssBaseline, ThemeProvider, Alert, Snackbar } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import { detectAdmin } from "./function/detectAdmin";


const Sites = () => {
    const [data, setData] = useState([]);
    const [services, setServices] = useState([]);
    const [sites, setSites] = useState([]);
    const [darkMode, setDarkMode] = useState(JSON.parse(sessionStorage.getItem('darkMode')) || false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    useEffect(() => {
        detectConnexion(sessionStorage);
        detectAdmin(sessionStorage);
        fetchData("sites").then(setData);
        fetchData("services").then(setServices);
    }, []);

    const handleCreate = async (newSite) => {
        try {
            const createdSite = await createRows("sites", newSite);
            setData(prevData => [...prevData, createdSite]);
            setAlertMessage('Site created successfully!');
            setAlertSeverity('success');
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('Failed to create site.');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    };

    const handleUpdate = async (updatedSite) => {
        try {
            const updatedData = await updateRows("sites", updatedSite);
            setData(prevData => prevData.map(site => site.id === updatedData.id ? updatedData : site));
            setAlertMessage('Site updated successfully!');
            setAlertSeverity('success');
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('Failed to update site.');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    };

    const handleDelete = async (ids) => {
        try {
            for (const id of ids) {
                await deleteRows("sites", id);
            }
            setData(prevData => prevData.filter(site => !ids.includes(site.id)));
            setAlertMessage('Site(s) deleted successfully!');
            setAlertSeverity('success');
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('Failed to delete site(s).');
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
                    <DataTableAdmin col="sites" rows={data} onCreate={handleCreate} onUpdate={handleUpdate} onDelete={handleDelete} services={services} sites={sites} />
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

export default Sites;
