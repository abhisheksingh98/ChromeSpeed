import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Box,
  Divider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import CruxDataTable from "./components/CruxDataTable";
import DataSummaryTable from "./components/DataSummaryTable";
import { BASE_URL } from "./constants";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009dda",
    },
    background: {
      default: "whitesmoke",
    },
  },
});

const sortOptions = [
  { label: "First Contentful Paint", value: "first_contentful_paint" },
  { label: "Largest Contentful Paint", value: "largest_contentful_paint" },
  { label: "Interaction to Next Paint", value: "interaction_to_next_paint" },
];

const App = () => {
  const [urls, setUrls] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterThreshold, setFilterThreshold] = useState(0);
  const [sortField, setSortField] = useState("None");
  const [filterApplied, setFilterApplied] = useState(false);

  const handleFetchData = async () => {
    if (!urls) {
      setError("URLs cannot be empty");
      return;
    }

    const urlList = urls.split(",").map((url) => url.trim());
    setLoading(true);
    setError("");
    setData([]);

    try {
      const fetchedData = [];
      for (const url of urlList) {
        const response = await axios.post(BASE_URL, { url });
        fetchedData.push({ url, data: response.data });
      }
      setData(fetchedData);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortData = () => {
    let filteredData = [...data];

    if (filterApplied) {
      filteredData = filteredData.map((item) => {
        const filteredMetrics = Object.keys(item.data.record.metrics).reduce(
          (acc, metric) => {
            if (item.data.record.metrics[metric].histogram) {
              const filteredHistogram = item.data.record.metrics[
                metric
              ].histogram.filter(
                (entry) => entry.density * 100 >= filterThreshold
              );
              acc[metric] = {
                ...item.data.record.metrics[metric],
                histogram: filteredHistogram,
              };
            } else {
              acc[metric] = item.data.record.metrics[metric];
            }
            return acc;
          },
          {}
        );
        return {
          ...item,
          data: {
            ...item.data,
            record: { ...item.data.record, metrics: filteredMetrics },
          },
        };
      });
    }

    if (sortField) {
      filteredData = filteredData.sort((a, b) => {
        const aValue = a.data.record.metrics[sortField]?.percentiles?.p75 || 0;
        const bValue = b.data.record.metrics[sortField]?.percentiles?.p75 || 0;
        return aValue - bValue;
      });
    }

    return filteredData;
  };

  const filteredSortedData = filterAndSortData();

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{ minHeight: "100vh", backgroundColor: "whitesmoke", p: 2 }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Chrome UX Report Data
        </Typography>

        <TextField
          label="Enter URLs (comma separated)"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error && "Please enter valid URLs"}
        />

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Filter by Density (%)"
              value={filterThreshold}
              onChange={(e) => {
                setFilterThreshold(Number(e.target.value));
                setFilterApplied(true);
              }}
              fullWidth
              margin="normal"
              SelectProps={{ native: true }}
            >
              <option value={0}>No Filter</option>
              <option value={10}>10%</option>
              <option value={20}>20%</option>
              <option value={30}>30%</option>
              <option value={40}>40%</option>
              <option value={50}>50%</option>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Sort by Metric"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              fullWidth
              margin="normal"
              SelectProps={{ native: true }}
            >
              <option value="None">None</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFetchData}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Fetch Data"}
            </Button>
          </Grid>
        </Grid>

        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}

        {filteredSortedData.length > 0 && (
          <Box mt={4}>
            {filteredSortedData.map((item, index) => (
              <Paper key={index} sx={{ mb: 2, p: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Data for: {item.url}
                </Typography>
                <CruxDataTable data={item.data} />
                <Divider sx={{ my: 2 }} />
              </Paper>
            ))}
            <Box mt={4}>
              <DataSummaryTable data={filteredSortedData} />
            </Box>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
