const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb+srv://tejashirve:tejashirve@cluster0.a7ews.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Connection Error:", err));

// Define a Schema with various fields including an array (for push, pull, addToSet, pop)
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    hobbies: [String],
    extra: String,
    createdAt: Date
});

// Create Model
const User = mongoose.model("User", userSchema);

// Asynchronous IIFE to run all operations sequentially
(async () => {
    try {
        // ----- INSERT Operations -----

        // Insert one document
        const user1 = new User({
            name: "Tejas",
            email: "tejashirve@example.com",
            password: "1212",
            hobbies: ["Coding"],
            createdAt: new Date()
        });
        await user1.save();
        console.log("Inserted one user:", user1);

        // Insert many documents
        const usersToInsert = [
            { name: "Alice", email: "alice@example.com", password: "1234", hobbies: ["Reading"], createdAt: new Date() },
            { name: "Bob", email: "bob@example.com", password: "5678", hobbies: ["Gaming"], createdAt: new Date() }
        ];
        await User.insertMany(usersToInsert);
        console.log("Inserted multiple users:", usersToInsert);

        // ----- FIND Operations -----

        // Find all documents
        const allUsers = await User.find();
        console.log("All Users:", allUsers);

        // Find one document (by email)
        const foundUser = await User.findOne({ email: "alice@example.com" });
        console.log("Found one user:", foundUser);

        // ----- UPDATE Operations -----

        // Update one document: Change name where email is "bob@example.com"
        let updateOneResult = await User.updateOne({ email: "bob@example.com" }, { name: "Bobby" });
        console.log("Update One Result:", updateOneResult);

        // Update many documents: Add extra info to all documents with password "1212"
        let updateManyResult = await User.updateMany({ password: "1212" }, { extra: "Updated Extra Field" });
        console.log("Update Many Result:", updateManyResult);

        // Upsert example: Update document if exists; otherwise, insert a new one
        let upsertResult = await User.updateOne(
            { email: "newuser@example.com" },
            { name: "New User", password: "0000", hobbies: ["Newbie"], createdAt: new Date() },
            { upsert: true }
        );
        console.log("Upsert Result:", upsertResult);

        // ----- DELETE Operations -----

        // Delete one document (by email)
        let deleteOneResult = await User.deleteOne({ email: "bob@example.com" });
        console.log("Delete One Result:", deleteOneResult);

        // Delete many documents (for example, remove all with a specific name)
        let deleteManyResult = await User.deleteMany({ name: "Alice" });
        console.log("Delete Many Result:", deleteManyResult);

        // ----- Field Operations -----

        // Unset a field ("extra") from one document (using updateOne)
        let unsetResult = await User.updateOne({ email: "tejashirve@example.com" }, { $unset: { extra: "" } });
        console.log("Unset Field Result:", unsetResult);

        // Rename a field ("password" to "pwd") in one document
        let renameResult = await User.updateOne({ email: "tejashirve@example.com" }, { $rename: { "password": "pwd" } });
        console.log("Rename Field Result:", renameResult);

        // Update the "createdAt" field to the current date using $currentDate
        let currentDateResult = await User.updateOne({ email: "tejashirve@example.com" }, { $currentDate: { createdAt: true } });
        console.log("Current Date Update Result:", currentDateResult);

        // ----- Array Operations -----

        // Add an item to the array using $addToSet (avoids duplicates)
        let addToSetResult = await User.updateOne({ email: "tejashirve@example.com" }, { $addToSet: { hobbies: "Cooking" } });
        console.log("AddToSet Result:", addToSetResult);

        // Push an item into the array (allows duplicates)
        let pushResult = await User.updateOne({ email: "tejashirve@example.com" }, { $push: { hobbies: "Dancing" } });
        console.log("Push Result:", pushResult);

        // Pull (remove) an item from the array
        let pullResult = await User.updateOne({ email: "tejashirve@example.com" }, { $pull: { hobbies: "Coding" } });
        console.log("Pull Result:", pullResult);

        // Pop the last element from the array
        let popResult = await User.updateOne({ email: "tejashirve@example.com" }, { $pop: { hobbies: 1 } });
        console.log("Pop Result:", popResult);

    } catch (error) {
        console.error("Error during operations:", error);
    } finally {
        // Close the connection when done
        mongoose.connection.close();
    }
})();
