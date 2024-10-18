const mongoose = require('mongoose');
const User = require('./user');

// Connect to MongoDB
mongoose.connection('mongodb://localhost:27017/lab04', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error(`MongoDB conection error: ${error}`);
});

db.once('open', async () => {
    console.log('Connected to MongoDB');

    try {
        // Creating a new User interface
        const newUser = new User({
            name: 'Prayag Tandon',
            email: '101571637@georgebrown.ca',
            age: 25,
        });

        // Saving the user to the database using async/await
        await newUser.save();

        console.log('User saved successfully');
    } catch (error) {
        console.error(`Error saving user: ${error}`);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
});