import { useEffect, useState } from "react";
import ResponsiveAppBar from "./header";
import DataTableAdmin from "./tableAdmin";
import { fetchData, createRows, updateRows, deleteRows } from './function/fetch';
import { detectConnexion } from "./function/detectConnexion";
import { CssBaseline, ThemeProvider, Alert, Stack, Snackbar } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";


const Salarie = () => {
    const [data, setData] = useState([]);
    const [services, setServices] = useState([]);
    const [sites, setSites] = useState([]);
    const [darkMode, setDarkMode] = useState(JSON.parse(sessionStorage.getItem('darkMode')) || false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    useEffect(() => {
        detectConnexion(sessionStorage);
        fetchData("salaries").then(setData);
        fetchData("sites").then(setSites);
        fetchData("services").then(setServices);
    }, []);

    const handleCreate = async (newSalarie) => {
        try {
            const createdSalarie = await createRows("salaries", newSalarie);
            setData(prevData => [...prevData, createdSalarie]);
            setAlertMessage('Salarie created successfully!');
            setAlertSeverity('success');
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('Failed to create salarie.');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    };

    const handleUpdate = async (updatedSalarie) => {
        try {
            const updatedData = await updateRows("salaries", updatedSalarie);
            setData(prevData => prevData.map(salarie => salarie.id === updatedData.id ? updatedData : salarie));
            setAlertMessage('Salarie updated successfully!');
            setAlertSeverity('success');
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('Failed to update salarie.');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    };

    const handleDelete = async (ids) => {
        try {
            for (const id of ids) {
                await deleteRows("salaries", id);
            }
            setData(prevData => prevData.filter(salarie => !ids.includes(salarie.id)));
            setAlertMessage('Salarie(s) deleted successfully!');
            setAlertSeverity('success');
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('Failed to delete salarie(s).');
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
            <CssBaseline />
            <div style={{ backgroundColor: darkMode ? darkTheme.palette.background.default : lightTheme.palette.background.default }}>
                <ResponsiveAppBar admin={sessionStorage.getItem('adminMode')} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <div className="container">
                    <DataTableAdmin col="employees" rows={data} onCreate={handleCreate} onUpdate={handleUpdate} onDelete={handleDelete} sites={sites} services={services} />
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

export default Salarie;

