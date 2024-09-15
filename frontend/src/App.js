import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import CruxDataTable from "./CruxDataTable";

const App = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchData = async () => {
    if (!url) {
      setError("URL cannot be empty");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/crux/fetch",
        { url }
      );
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Chrome UX Report Data
      </Typography>

      <TextField
        label="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchData}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Fetch Data"}
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      {/* Display the Data in Table Format */}
      {data && <CruxDataTable data={data} />}
    </Container>
  );
};

export default App;
