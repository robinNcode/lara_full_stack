import * as React from 'react';
import {useRef, useState} from "react";
import axiosClient from "../axios_client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Copyright} from "@mui/icons-material";

export default function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setCurrentUser, setToken } = useStateContext();

  /**
   * To set errors
   */
  const [errors, setErrors] = useState(null);

  function onSubmit(e) {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    /**
     * Send the payload to the backend API
     */
    axiosClient.post("/login", payload)
      .then((result) => {
        /**
         * If the user is successfully created, we will set the current user and token
         * automatically redirect to the home page ...
         */
        setCurrentUser(result.data.data.user);
        setToken(result.data.data.token);
      })
      .catch((err) => {
        const response = err.response;

        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              {
                errors &&
                Object.keys(errors).map((key) => {
                  return (
                    <p key={key} className={"alert"}>{errors[key][0]}</p>
                  );
                })
              }
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              ref={emailRef}
              name={"email"}
              label={"Email"}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              ref={passwordRef}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  <a href={"/signup"}>Create an account</a>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
