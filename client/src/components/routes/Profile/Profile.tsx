import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Field, useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, Checkbox, Chip, FormControlLabel } from '@mui/material';

export function Profile() {
  const navigate = useNavigate();
  const validateSchema = yup.object({
    username: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    preferences: yup.array().of(yup.string()),
    dailyEmailOptIn: yup.boolean(),
  });


  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      preferences: [],
      daily_email_opt_in: false,
    },
    validationSchema: validateSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const preferences = values.preferences.reduce<Record<string, number>>((acc, keyword) => {
          acc[keyword] = 100;
          return acc;
        }, {});
        
        console.log(preferences)
        const res = await axios.put('update_user/', {
          ...values,
          preferences,
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        // resetForm();
        navigate(0);
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('user/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        formik.setValues({
          ...response.data,
          preferences: Object.keys(response.data.preferences ?? {})
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
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
        <Avatar sx={{ m: 1 }}></Avatar>
        <Typography component="h1" variant="h5">
          User Profile
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            onBlur={formik.handleBlur}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onBlur={formik.handleBlur}
          />
          <Autocomplete
            clearIcon={false}
            options={[]}
            freeSolo
            multiple
            value={formik.values.preferences}
            onChange={(event, newValue) => {
              formik.setFieldValue('preferences', newValue);
              console.log(formik.values.preferences)
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Preferences"
                margin="normal"
              />
            )}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="daily_email_opt_in"
                color="primary"
                checked={formik.values.daily_email_opt_in}
                onChange={formik.handleChange}
              />
            }
            label="Opt-in for daily emails"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            disabled={!formik.isValid || !formik.dirty}
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Container>
  );
}