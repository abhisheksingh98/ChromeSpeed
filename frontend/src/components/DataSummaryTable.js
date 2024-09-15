import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Divider,
} from "@mui/material";

const DataSummaryTable = ({ data }) => {
  const computeAverages = (data) => {
    const metrics = data.flatMap((item) =>
      Object.keys(item.data.record.metrics)
    );
    const metricTotals = metrics.reduce((acc, metric) => {
      acc[metric] = { sum: 0, count: 0 };
      return acc;
    }, {});

    data.forEach((item) => {
      Object.entries(item.data.record.metrics).forEach(
        ([metric, metricData]) => {
          const p75 = metricData.percentiles?.p75 || 0;
          if (!isNaN(p75)) {
            metricTotals[metric].sum += p75;
            metricTotals[metric].count += 1;
          }
        }
      );
    });

    return Object.entries(metricTotals).map(([metric, { sum, count }]) => ({
      metric,
      average: count > 0 ? (sum / count).toFixed(2) : "N/A",
    }));
  };

  const averages = computeAverages(data);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom color="#009dda" sx={{ p: 2 }}>
        Average Report
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography fontWeight="bold">Metric</Typography>
            </TableCell>
            <TableCell>
              <Typography fontWeight="bold">Average p75</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {averages.map(({ metric, average }) => (
            <TableRow key={metric}>
              <TableCell style={{ textTransform: "capitalize" }}>
                {metric.replace(/_/g, " ")}
              </TableCell>
              <TableCell>{average}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataSummaryTable;
