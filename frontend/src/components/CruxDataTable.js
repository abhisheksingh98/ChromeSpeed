import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
  CircularProgress,
} from "@mui/material";
import { XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

const CruxDataTable = ({ data, isLoading }) => {
  const [sortBy, setSortBy] = useState("p75");
  const [order, setOrder] = useState("asc");

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!data || !data.record || !data.record.metrics) return null;

  const metrics = Object.keys(data.record.metrics).map((metric) => ({
    key: metric,
    label: metric.replace(/_/g, " "),
    data: data.record.metrics[metric],
  }));

  const handleSortChange = (metric) => {
    setSortBy(metric);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const sortedMetrics = metrics.slice().sort((a, b) => {
    const valueA = a.data?.percentiles?.[sortBy] || 0;
    const valueB = b.data?.percentiles?.[sortBy] || 0;

    if (order === "asc") {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                border: "1px solid #ddd",
                width: "30%",
                textAlign: "center",
              }}
            >
              <Typography fontWeight="bold">Metric</Typography>
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid #ddd",
                width: "30%",
                textAlign: "center",
              }}
            >
              <TableSortLabel
                active={sortBy === "p75"}
                direction={order}
                onClick={() => handleSortChange("p75")}
              >
                <Typography fontWeight="bold">p75</Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid #ddd",
                width: "40%",
                textAlign: "center",
              }}
            >
              <Typography fontWeight="bold">Histogram</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedMetrics.map((metric) => {
            const metricData = metric.data;
            const p75 = metricData?.percentiles?.p75 || "-";
            const histogram = metricData?.histogram || [];

            return (
              <TableRow key={metric.key}>
                <TableCell
                  sx={{
                    border: "1px solid #ddd",
                    width: "30%",
                    textAlign: "center",
                    textTransform: "capitalize",
                  }}
                >
                  {metric.label}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid #ddd",
                    width: "30%",
                    textAlign: "center",
                  }}
                >
                  {p75}
                </TableCell>
                <TableCell
                  sx={{
                    border: "1px solid #ddd",
                    width: "40%",
                    textAlign: "center",
                  }}
                >
                  {histogram.length > 0 ? (
                    <BarChart width={300} height={150} data={histogram}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="start"
                        tickFormatter={(value) => `${value}ms`}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="density" fill="#009dda" />
                    </BarChart>
                  ) : (
                    <Typography>No data available</Typography>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CruxDataTable;
