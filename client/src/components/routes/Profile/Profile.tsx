import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Autocomplete, Checkbox, Chip, CircularProgress, FormControlLabel, Snackbar, TextField, Typography } from "@mui/material";
import PageHeader from "../../lib/Header/Header";

export function Profile() {
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const validateSchema = yup.object({
    username: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    preferences: yup.array().of(yup.string()),
    dailyEmailOptIn: yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      preferences: [],
      daily_email_opt_in: false,
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true); // Start loading

        const preferences = values.preferences.reduce<Record<string, number>>(
          (acc, keyword) => {
            acc[keyword] = 100;
            return acc;
          },
          {}
        );

        await axios.put(
          "update_user/",
          {
            ...values,
            preferences,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setToastMessage("User profile updated");
        setToastOpen(true);
      } catch (error) {
        console.error(error);
        setToastMessage("Failed to update user profile");
        setToastOpen(true);
      } finally {
        setLoading(false);
      }
    },
  });

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("user/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      formik.setValues({
        ...response.data,
        preferences: Object.keys(response.data.preferences ?? {}),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className='page'>
      <PageHeader
        title='User Profile'
        subheader='Manage your account info'
      />
      {loading && (
        <div
          style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}
        >
          <CircularProgress />
        </div>
      )}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1 }}></Avatar>
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
              formik.setFieldValue("preferences", newValue);
              console.log(formik.values.preferences);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Preferences" margin="normal" />
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
            label={
              <Typography color="primary">
                Opt-in for daily emails
              </Typography>
            }
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
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={toastOpen}
        autoHideDuration={6000}
        onClose={() => setToastOpen(false)}
        message={toastMessage}
      />
    </div>
  );
}
