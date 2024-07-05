import { FormControl, Box, InputAdornment, IconButton, InputLabel, OutlinedInput, Card, Typography,Button } from "@mui/material";
import * as React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider, styled, useTheme } from '@mui/material/styles'
import { login } from "./function/fetch";
import {darkTheme,lightTheme} from "./theme";

const Connexion = () => {
    sessionStorage.clear()
    const [showPassword, setShowPassword] = React.useState(false);
    const [newEntry, setNewEntry] = React.useState({ email: '', password: ''});
    const [darkMode, setDarkMode] = React.useState(false); 
  

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const LinkStyled = styled('a')(({ theme }) => ({
        fontSize: '0.875rem',
        textDecoration: 'none',
        color: theme.palette.primary.main
      }))

    const tryLogin = async () =>{
        try{
            const response = await login(newEntry)
            console.log(response)
            window.sessionStorage.clear()
            window.sessionStorage.setItem('darkmode',lightTheme)
            window.sessionStorage.setItem('prenom',response.forname )
            window.sessionStorage.setItem('admin',response.admin )
            window.sessionStorage.setItem('id',response.id )
            window.sessionStorage.setItem('connecter',true )
            window.location.href ='/home'
            }
            catch(err){
                console.log(err)
            }
        console.log("try login");
    }

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Card sx={{ zIndex: 1, p: 4 }}>
                <Box sx={{ mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ mb: 6 }}>
                        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                            Welcome to PROFINDER! 👋🏻
                        </Typography>
                        <Typography variant='body2'>Please log in</Typography>
                    </Box>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-mail">Mail</InputLabel>
                        <OutlinedInput id="outlined-adornment-mail" label="Mail"
                        value={newEntry.email}
                        onChange={(e) => setNewEntry({ ...newEntry, email: e.target.value })} />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            value={newEntry.password}
                            onChange={(e) => setNewEntry({ ...newEntry, password: e.target.value })}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
            <LinkStyled onClick={()=> window.location.href('/forget')}>Forgot your password ?</LinkStyled>
            </Box>
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} onClick={e => tryLogin()}>
              Log in
            </Button>
                </Box>
            </Card>
        </Box>
        </ThemeProvider>
    );
    
};

export default Connexion;
