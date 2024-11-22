const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Firebase Admin SDK
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
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

// Root route handler
app.get("/", (req, res) => {
  res.send("Welcome to the Employee & Admin Management API!");
});

// Utility: Handle Base64 photo conversion
const processPhoto = (photo) => {
  return photo
    ? `data:${photo.mimetype};base64,${photo.buffer.toString("base64")}`
    : null;
};

// --------------------- Employee Routes ---------------------

// Add new employee
app.post("/employees", upload.single("photo"), async (req, res) => {
  const { name, surname, age, idNumber, role } = req.body;
  const photo = req.file;

  try {
    const employeeData = {
      name,
      surname,
      age: parseInt(age),
      idNumber,
      role,
      photo: processPhoto(photo),
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
    const employeeData = {
      name,
      surname,
      age: parseInt(age),
      idNumber,
      role,
      photo: processPhoto(photo),
    };

    await db.collection("employees").doc(employeeId).update(employeeData);
    res.status(200).send({ id: employeeId, ...employeeData });
  } catch (error) {
    console.error("Error updating employee:", error.message);
    res.status(500).send({ error: error.message });
  }
});

// --------------------- Admin Routes ---------------------

// Add a new admin
app.post("/admins", upload.single("photo"), async (req, res) => {
  const { name, surname, email, password, age, idNumber, role } = req.body;
  const photo = req.file;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: `${name} ${surname}`,
    });

    const adminData = {
      uid: userRecord.uid,
      name,
      surname,
      email,
      age: parseInt(age),
      idNumber,
      role: role || "general-admin",
      photo: processPhoto(photo),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("admins").doc(userRecord.uid).set(adminData);
    res
      .status(201)
      .send({ message: "Admin added successfully!", admin: adminData });
  } catch (error) {
    console.error("Error adding admin:", error.message);
    res.status(500).send({ error: error.message });
  }
});

// Fetch all admins
app.get("/admins", async (req, res) => {
  try {
    const snapshot = await db.collection("admins").get();
    const admins = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send(admins);
  } catch (error) {
    console.error("Error fetching admins:", error.message);
    res.status(500).send({ error: error.message });
  }
});

// Update admin
app.put("/admins/:id", upload.single("photo"), async (req, res) => {
  const adminId = req.params.id;
  const { name, surname, age, idNumber, role } = req.body;
  const photo = req.file;

  try {
    const adminData = {
      name,
      surname,
      age: parseInt(age),
      idNumber,
      role,
      photo: processPhoto(photo),
    };

    await db.collection("admins").doc(adminId).update(adminData);
    res.status(200).send({ id: adminId, ...adminData });
  } catch (error) {
    console.error("Error updating admin:", error.message);
    res.status(500).send({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
