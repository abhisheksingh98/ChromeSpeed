import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// A helper function to render histogram data
const renderHistogram = (histogram) => {
  return histogram.map((bin, index) => (
    <span key={index}>
      {`Start: ${bin.start}, End: ${bin.end || "∞"}, Density: ${(
        bin.density * 100
      ).toFixed(2)}%`}
      <br />
    </span>
  ));
};

const CruxDataTable = ({ data }) => {
  if (!data || !data.record) {
    return <div>No data available</div>;
  }

  const { metrics } = data.record;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Metric</TableCell>
            <TableCell>Value(s)</TableCell>
            <TableCell>Percentile (p75)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Form Factors */}
          <TableRow>
            <TableCell>Form Factors</TableCell>
            <TableCell>
              Desktop:{" "}
              {(metrics.form_factors.fractions.desktop * 100).toFixed(2)}%{" "}
              <br />
              Phone: {(metrics.form_factors.fractions.phone * 100).toFixed(
                2
              )}% <br />
              Tablet: {(metrics.form_factors.fractions.tablet * 100).toFixed(2)}
              %
            </TableCell>
            <TableCell>-</TableCell>
          </TableRow>

          {/* Interaction to Next Paint */}
          <TableRow>
            <TableCell>Interaction to Next Paint</TableCell>
            <TableCell>
              {renderHistogram(metrics.interaction_to_next_paint.histogram)}
            </TableCell>
            <TableCell>
              {metrics.interaction_to_next_paint.percentiles.p75} ms
            </TableCell>
          </TableRow>

          {/* Largest Contentful Paint */}
          <TableRow>
            <TableCell>Largest Contentful Paint</TableCell>
            <TableCell>
              {renderHistogram(metrics.largest_contentful_paint.histogram)}
            </TableCell>
            <TableCell>
              {metrics.largest_contentful_paint.percentiles.p75} ms
            </TableCell>
          </TableRow>

          {/* First Contentful Paint */}
          <TableRow>
            <TableCell>First Contentful Paint</TableCell>
            <TableCell>
              {renderHistogram(metrics.first_contentful_paint.histogram)}
            </TableCell>
            <TableCell>
              {metrics.first_contentful_paint.percentiles.p75} ms
            </TableCell>
          </TableRow>

          {/* Cumulative Layout Shift */}
          <TableRow>
            <TableCell>Cumulative Layout Shift</TableCell>
            <TableCell>
              {renderHistogram(metrics.cumulative_layout_shift.histogram)}
            </TableCell>
            <TableCell>
              {metrics.cumulative_layout_shift.percentiles.p75}
            </TableCell>
          </TableRow>

          {/* Round Trip Time */}
          <TableRow>
            <TableCell>Round Trip Time</TableCell>
            <TableCell>-</TableCell>
            <TableCell>{metrics.round_trip_time.percentiles.p75} ms</TableCell>
          </TableRow>

          {/* Time to First Byte */}
          <TableRow>
            <TableCell>Time to First Byte</TableCell>
            <TableCell>
              {renderHistogram(
                metrics.experimental_time_to_first_byte.histogram
              )}
            </TableCell>
            <TableCell>
              {metrics.experimental_time_to_first_byte.percentiles.p75} ms
            </TableCell>
          </TableRow>

          {/* Navigation Types */}
          <TableRow>
            <TableCell>Navigation Types</TableCell>
            <TableCell>
              Navigate:{" "}
              {(metrics.navigation_types.fractions.navigate * 100).toFixed(2)}%{" "}
              <br />
              Prerender:{" "}
              {(metrics.navigation_types.fractions.prerender * 100).toFixed(
                2
              )}% <br />
              Reload:{" "}
              {(metrics.navigation_types.fractions.reload * 100).toFixed(2)}%
            </TableCell>
            <TableCell>-</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CruxDataTable;
