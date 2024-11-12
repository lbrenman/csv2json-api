const express = require('express');
const multer = require('multer');
const csv = require('csv-parse');
const axios = require('axios');

const app = express();
const port = 3000;

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Ensure the file is a CSV
    if (req.file.mimetype !== 'text/csv') {
        return res.status(400).json({ error: 'Please upload a CSV file' });
    }

    // Convert buffer to string
    const csvString = req.file.buffer.toString();

    // Parse CSV
    csv.parse(csvString, {
        columns: true, // Use first row as headers
        skip_empty_lines: true
    }, async (err, records) => {
        if (err) {
            console.error('Error parsing CSV:', err);
            return res.status(400).json({ error: 'Error parsing CSV file' });
        }

        try {
            const response = await axios.post('https://webhook.site/ae427173-4eb8-4ed8-94cd-26f45c6dde4f', {
                data: records
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            res.json({
                message: 'CSV processed successfully',
                recordsProcessed: records.length,
                apiResponse: response.data
            });

        } catch (error) {
            console.error('Error sending data to API:', error);
            res.status(500).json({
                error: 'Error sending data to external API',
                details: error.message
            });
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        details: err.message
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});