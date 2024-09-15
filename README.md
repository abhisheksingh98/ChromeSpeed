# ChromeSpeed

## Overview

This project consists of a React frontend application and a Node.js backend service for fetching and visualizing data from the Chrome UX Report API. The application allows users to input multiple URLs, fetch performance data, apply filters and sorting, and visualize the results in a well-structured table with interactive charts.

## Features

- **Fetch Data**: Retrieve performance data for one or more URLs from the Chrome UX Report API.
- **Filter and Sort**: Apply filters based on density thresholds and sort data by various metrics.
- **Visualization**: Display histogram data using interactive charts and tables.
- **Responsive Design**: Clean and modern UI with Material UI, suitable for various screen sizes.

## Known Issues

- **Empty Histograms**: When certain metrics do not have histogram data, the application displays "No data available."
- **Sorting Issues**: Sorting might not work as expected if there are inconsistencies in metric data.

## Prerequisites

- Node.js (version 14 or later)
- npm or yarn

## Setup Instructions

### Backend

1. **Clone the Repository**
    ```bash
    git clone https://github.com/abhisheksingh98/ChromeSpeed.git
    cd ChromeSpeed
    ```

2. **Navigate to Backend Directory**
    ```bash
    cd backend
    ```

3. **Install Dependencies**
    ```bash
    npm install
    ```

4. **Run the Backend Server**
    ```bash
    npm start
    ```
   The server will start on [http://localhost:5000](http://localhost:5000). Ensure this is accessible from the frontend.

### Frontend

1. **Navigate to Frontend Directory**
    ```bash
    cd ../frontend
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Configure API Endpoint**
   Update the API endpoint URL in `src/api.js` to match your backend server URL:
    ```javascript
    const API_URL = "http://localhost:5000/api/crux/fetch";
    ```

4. **Run the Frontend Application**
    ```bash
    npm start
    ```
   The application will run on [http://localhost:3000](http://localhost:3000).

## Usage

1. **Enter URLs**: Input URLs separated by commas in the provided text field.
2. **Fetch Data**: Click the "Fetch Data" button to retrieve data from the backend.
3. **Filter Data**: Use the filter dropdown to apply density thresholds.
4. **Sort Data**: Choose a metric to sort the data by.
5. **View Data**: Review the results in the table below, with charts displaying histogram data.

## Documentation

### Design

- **Frontend**: Built with React and Material UI, focusing on a clean and responsive design. The application is modular with components for data tables and charts.
- **Backend**: Implemented in Node.js with Express. Handles API requests to the Chrome UX Report and processes the data.

### Known Issues

- **Metric Data**: Inconsistent metric data might affect sorting and display.
- **Performance**: Large datasets could impact frontend performance.

## Next Steps

- **Enhance Error Handling**: Improve error handling for various edge cases.
- **Improve UI/UX**: Refine the design for better user experience and responsiveness.
- **Expand Features**: Add more filtering options and support for additional metrics.
