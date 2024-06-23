import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint
      //   await axios.post("http://localhost:8080/api/v1/contact", form);
      toast.success("Message Sent Successfully!", {
        position: "top-right",
        autoClose: 2000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
        toast.error("Error in message sending!", {
            position: "top-right",
            autoClose: 2000, // Close the toast after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
  };

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: "2rem" }}>
      <Paper style={{ padding: "2rem" }} elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={form.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="subject"
                label="Subject"
                variant="outlined"
                fullWidth
                value={form.subject}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="message"
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Grid container spacing={2} style={{ marginTop: "2rem" }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h2">
            Contact Information
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> 1234 Street Name, City, State, Zip
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> contact@example.com
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> (123) 456-7890
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" component="h2">
            Our Location
          </Typography>
          <div style={{ width: "100%", height: "300px" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093745!2d144.95373631550483!3d-37.8172097420201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57788d7fc9e7e33!2sVictoria%20State%20Library%20of%20Victoria!5e0!3m2!1sen!2sau!4v1630910423383!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
