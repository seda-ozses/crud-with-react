import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

// --------------------
// Material UI
// --------------------
import { Badge, Box, Container, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { grey, orange, teal } from "@mui/material/colors"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const theme = createTheme({
  palette: {
    background: {
      default: grey[200]
    },
    primary: {
      light: teal[300],
      main: teal[500],
      dark: teal[800],
    },
    secondary: {
      light: orange[200],
      main: orange[800],
      dark: orange[900],
    },
  },
  typography: {
    fontFamily: [
      "Century Gothic", "Raleway", "Roboto", "Verdana"
    ].join(","),
  }
})

// --------------------
// APP
// --------------------
export default function App(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userList, setUserList] = useState([])
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');

    // --------------------
    // CREATE - POST
    // --------------------

    const submitUser = () => {
        Axios.post('http://localhost:3001/api/insert', { firstName: firstName, lastName: lastName })
        setUserList([ ...userList, { firstName: firstName, lastName: lastName } ])
    }

    // --------------------
    // READ - GET
    // --------------------

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => { setUserList(response.data) })
    }, [])

    // --------------------
    // UPDATE - PUT
    // --------------------
    const updateUser = (id) => {
      Axios.put("http://localhost:3001/api/update", { id: id, newFirstName: newFirstName, newLastName: newLastName });
      setNewFirstName("");
      setNewLastName("");
  };

    // --------------------
    // DELETE
    // --------------------
    const deleteUser = (id) => {
      Axios.delete("http://localhost:3001/api/delete", { data: { id: id } });
    };

    // ====================
    // BODY
    // ====================
    return (
      <ThemeProvider theme={theme}>
        
        <React.Fragment>
            <Container>
                <Paper elevation={24} sx={{ p: { xs: 5 } }}>

                    <Box >
                        <Typography mb={5} component="h1" variant="h3" color="primary">
                            <Badge badgeContent={userList.length} color="secondary" showZero max={9}>USERS</Badge>
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        
                        {/* NEW */}
                        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" key="0" sx={{ mb: 8 }}>

                            <Grid item xs="auto">
                                <TextField fullWidth margin="normal" id="0_firstName"
                                    label="First name" helperText="Enter the first name"
                                    inputProps={{ style: { textTransform: 'capitalize' }, maxLength: 50 }}
                                    onChange={(event) => { setFirstName(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)); }} />
                            </Grid>

                            <Grid item xs="auto">
                                <TextField fullWidth margin="normal" id="0_lastName"
                                    label="Last name" helperText="Enter the last name"
                                    inputProps={{ style: { textTransform: 'capitalize' }, maxLength: 50 }}
                                    onChange={(event) => { setLastName(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)); }} />
                            </Grid>

                            <Grid item xs={1}>
                                <IconButton color="primary" onClick={() => {
                                    submitUser();
                                    document.getElementById("0_firstName").value = "";
                                    document.getElementById("0_lastName").value = "";
                                }}>
                                    <AddCircleIcon fontSize='large' />
                                </IconButton>
                            </Grid>

                            <Grid item xs={1}>
                            </Grid>

                        </Grid>

                        {/* LIST */}

                        {
                            userList.map((user) => {
                                return <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" key={user.id}>

                                    <Grid item xs="auto">
                                        <TextField margin="normal" id={user.id + "_firstName"}
                                            label="First name" defaultValue={user.firstName}
                                            inputProps={{ style: { textTransform: 'capitalize' }, maxLength: 50 }}
                                            onChange={(event) => {
                                                setNewFirstName(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
                                                setNewLastName(user.lastName);
                                            }} />
                                    </Grid>
                                    <Grid item xs="auto">
                                        <TextField margin="normal" id={user.id + "_lastName"}
                                            label="Last name" defaultValue={user.lastName}
                                            inputProps={{ style: { textTransform: 'capitalize' }, maxLength: 50 }}
                                            onChange={(event) => {
                                                setNewFirstName(user.firstName);
                                                setNewLastName(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1));
                                            }} />
                                    </Grid>

                                    <Grid item xs={1}>
                                        <IconButton color="primary" onClick={() => { updateUser(user.id) }}>
                                            <ChangeCircleIcon fontSize='large' />
                                        </IconButton>
                                    </Grid>

                                    <Grid item xs={1}>
                                        <IconButton onClick={() => { deleteUser(user.id); }}>
                                            <DeleteIcon fontSize='large' />
                                        </IconButton>
                                    </Grid>

                                </Grid>
                            })
                        }
                    </Box>

                </Paper>
            </Container>
        </React.Fragment>
      </ThemeProvider>)
}
