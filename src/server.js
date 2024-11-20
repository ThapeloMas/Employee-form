const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const admin = require("firebase-admin");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Firebase Admin SDK using environment variables
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Handling new lines in private key
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const upload = multer({ storage: multer.memoryStorage() });

// Add new employee
app.post("/employees", upload.single("photo"), async (req, res) => {
  const { name, surname, age, idNumber, role } = req.body;
  const photo = req.file;

  try {
    let photoBase64 = null;

    // Convert photo to Base64 if provided
    if (photo) {
      photoBase64 = `data:${photo.mimetype};base64,${photo.buffer.toString(
        "base64"
      )}`;
    }

    const employeeData = {
      name,
      surname,
      age: parseInt(age),
      idNumber,
      role,
      photo: photoBase64, // Save Base64 string in Firestore
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("employees").add(employeeData);
    res.status(201).send({ id: docRef.id, ...employeeData });
  } catch (error) {
    console.error("Error saving employee:", error.message);
    res.status(500).send({ error: error.message });
  }
});

// Fetch all employees
app.get("/employees", async (req, res) => {
  try {
    const snapshot = await db.collection("employees").get();
    const employees = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send(employees);
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    res.status(500).send({ error: error.message });
  }
});

// Update employee
app.put("/employees/:id", upload.single("photo"), async (req, res) => {
  const employeeId = req.params.id;
  const { name, surname, age, idNumber, role } = req.body;
  const photo = req.file;

  try {
    let photoBase64 = null;

    if (photo) {
      photoBase64 = `data:${photo.mimetype};base64,${photo.buffer.toString(
        "base64"
      )}`;
    }

    const employeeData = {
      name,
      surname,
      age: parseInt(age),
      idNumber,
      role,
      photo: photoBase64, // Save Base64 string in Firestore
    };

    const docRef = db.collection("employees").doc(employeeId);
    await docRef.update(employeeData);
    res.status(200).send({ id: employeeId, ...employeeData });
  } catch (error) {
    console.error("Error updating employee:", error.message);
    res.status(500).send({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
