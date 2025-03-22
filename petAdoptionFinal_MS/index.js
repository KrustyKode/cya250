const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/submit-adoption', (req, res) => {
    const { name, email, message } = req.body;
    // Validate required fields
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required');
    }
    // Validate email format (basic check)
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).send('Invalid email address');
    }
    // Create adoption inquiry object
    const adoptionInquiry = {
        name,
        email: Array.isArray(email) ? email[0] : email,
        message,
        date: new Date().toISOString()
    };
    // Read existing inquiries, add new one, and save
    fs.readFile('adoptionInquiry.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data file');
        }
        let inquiries = [];
        if (data.length) {
            inquiries = JSON.parse(data);
        }
        inquiries.push(adoptionInquiry);
        fs.writeFile('adoptionInquiry.json', JSON.stringify(inquiries, null, 2), err => {
            if (err) {
                return res.status(500).send('Error saving data file');
            }
            res.status(200).json({ message: 'Adoption inquiry submitted successfully' });
        });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
