const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Account = require('../models/Account'); // Adjust schema path

// Establish database connection
mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected successfully!');
        runAddAccount();
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

// Function to convert image file to Base64
const convertImageToBase64 = (imagePath) => {
    const absoluteImagePath = path.resolve(__dirname, imagePath); // Resolving the absolute path
    console.log('Resolving image path:', absoluteImagePath); // Debugging log
    const imageBuffer = fs.readFileSync(absoluteImagePath);
    return imageBuffer.toString('base64');
};

// Function to add accounts to the database
const runAddAccount = async () => {
    try {
        console.log('Starting to add accounts with images...');
        
        const accountsData = [
            {
                accountNumber: '101',
                userName: 'User1',
                email: 'user1@example.com',
                image: 'E:\\data\\data\\test\\geniune\\\original_31_1.png', // Example local image path
            },
            {
                accountNumber: '102',
                userName: 'User2',
                email: 'user2@example.com',
                image: 'E:\\data\\data\\test\\geniune\\\original_31_2.png', // Example local image path
            },
            {
                accountNumber: '103',
                userName: 'User3',
                email: 'user3@example.com',
                image: 'E:\\data\\data\\test\\geniune\\\original_31_3.png', // Example local image path
            },
            {
                accountNumber: '104',
                userName: 'User4',
                email: 'user4@example.com',
                image: 'E:\\data\\data\\test\\geniune\\\original_31_4.png', // Example local image path
            },
            {
                accountNumber: '105',
                userName: 'User5',
                email: 'user5@example.com',
                image: 'E:\\data\\data\\test\\geniune\\\original_31_5.png', // Example local image path
            },
            {
                accountNumber: '106',
                userName: 'User6',
                email: 'user6@example.com',
                image: 'E:\\data\\data\\test\\geniune\\\original_31_6.png', // Example local image path
            },
            {
                accountNumber: '107',
                userName: 'User7',
                email: 'user7@example.com',
                image: 'E:\\data\\data\\test\\geniune\\\original_31_7.png', // Example local image path
            },
            {
                accountNumber: '108',
                userName: 'User8',
                email: 'user8@example.com',
                image: 'E:\\data\\data\\test\\geniune\\\original_31_8.png', // Example local image path
            },
            // Add more accounts as needed
        ];

        const accounts = accountsData.map((account) => {
            const base64Image = convertImageToBase64(account.image);
            return {
                accountNumber: account.accountNumber,
                userName: account.userName,
                email: account.email,
                image: base64Image,
            };
        });

        // Insert accounts into the database
        const result = await Account.insertMany(accounts);
        console.log('Accounts added successfully:', result);
    } catch (error) {
        console.error('Error while adding accounts:', error);
    } finally {
        mongoose.connection.close(); // Close the database connection
        console.log('Database connection closed.');
    }
};
