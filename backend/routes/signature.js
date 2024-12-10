const express = require('express');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const Signature = require('../models/Signature'); // Mongoose model

const router = express.Router();

// Example: Verify signature
router.post('/verify', async (req, res) => {
    const { accountNumber, signature } = req.body; // Input signature in base64 format
    try {
        const storedSignature = await Signature.findOne({ accountNumber });
        if (!storedSignature) {
            return res.status(404).send({ message: 'Account not found' });
        }

        // Save both signatures temporarily as files for verification
        const storedSignaturePath = `temp_stored_${Date.now()}.jpg`;
        const verifyingSignaturePath = `temp_verifying_${Date.now()}.jpg`;

        // Decode base64 to file
        fs.writeFileSync(storedSignaturePath, Buffer.from(storedSignature.signature, 'base64'));
        fs.writeFileSync(verifyingSignaturePath, Buffer.from(signature, 'base64'));

        // Send files to Python microservice for verification
        const formData = new FormData();
        formData.append('stored_signature', fs.createReadStream(storedSignaturePath));
        formData.append('verifying_signature', fs.createReadStream(verifyingSignaturePath));

        const pythonResponse = await axios.post('http://localhost:5000/verify', formData, {
            headers: formData.getHeaders(),
        });

        // Cleanup temporary files
        fs.unlinkSync(storedSignaturePath);
        fs.unlinkSync(verifyingSignaturePath);

        // Send verification result back to the client
        // res.status(200).send(pythonResponse.data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error during verification', error: err.message });
    }
});

module.exports = router;
