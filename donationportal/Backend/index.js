const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const moment = require("moment");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { RecaptchaV2 } = require('express-recaptcha');

//Replace your recaptha key
const recaptcha = new RecaptchaV2('SITE KEY', 'SECRET KEY');

const bcrypt = require('bcrypt');
const { error } = require("console");
const saltRounds = 10; // Number of salt rounds for bcrypt hashing

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Verification Process!: ", authHeader);
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7); // Remove 'Bearer ' from the token string
    try {
      const decoded = jwt.verify(token, 'your-secret-key');
      console.log("From Token got this ID: ", decoded.userid);
      // console.log(req);
      if (req.headers.userid == decoded.userId) {
        console.log("Verified")
        next();
        return;

      }
      else {
        console.log("Different")
        return res.status(401).json({ error: 'Invalid token', message: 'Unauthorized access' });

      }
      console.log("verifyToken: ", userId, decoded.userId)
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token', message: 'Unauthorized access' });
    }
  } else {
    console.log("verifyToken: ", userId, decoded.userId, token)
    return res.status(401).json({ error: 'Unauthorized', message: 'Token missing or invalid' });
  }
};


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use(
  "/images",
  express.static(
    path.join(__dirname, "E:\donationportal\\Backend\\uploads")
  )
);
app.use(bodyParser.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "donationportal",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});


app.post("/create", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const password = req.body.password;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);

    // Store the hashed password in the database
    db.query(
      "INSERT INTO signup (name, email, street, city, state, zip, password) VALUES (?,?,?,?,?,?,?)",
      [name, email, street, city, state, zip, hashedPassword],
      (err, result) => {
        if (err) {
          console.error('Error inserting into database:', err);
          res.status(500).send("Error creating account");
        } else {
          console.log('Account created successfully!');
          res.status(200).send("Account Created!");
        }
      }
    );
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).send("Error creating account");
  }
});

app.get("/getAllUsers", (req, res) => {
  db.query("SELECT * FROM signup", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(result);
    }
  });
});

// img storage confing
var imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
    console.log("Image Passed");
  } else {
    callback(null, Error("Only Image is Allowed"));
  }
};

var upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

//listing cases in database
app.post("/listedCase", upload.single("image"), (req, res) => {
  const { heading, description, amount } = req.body;
  const image = req.file.filename; // Assuming that multer renames the file and stores the filename in req.file.filename

  console.log("Sucuess");

  if (!heading || !description || !amount || !image) {
    return res
      .status(422)
      .json({ status: 422, message: "Fill all the details" });
  }

  try {
    let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    db.query(
      "INSERT INTO listcase SET ?",
      {
        heading: heading,
        description: description,
        amount: amount,
        image: image,
        date: date,
      },
      (err, result) => {
        if (err) {
          console.log("Error:", err);
          res
            .status(500)
            .json({ status: 500, message: "Internal Server Error" });
        } else {
          console.log("Data added");
          res.status(201).json({ status: 201, data: req.body });
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(422).json({ status: 422, error: error.message });
  }
});

// get cases data
app.get("/getAllCases", (req, res) => {
  try {
    db.query("SELECT * FROM listcase", (err, result) => {
      if (err) {
        console.log("Error:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Data get:", result);
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(422).json({ status: 422, error });
  }
});

//delete users
app.post("/deleteUsers", (req, res) => {
  const { id } = req.body;
  try {
    db.query(`DELETE FROM listcase WHERE id = ?`, [id], (err, result) => {
      if (err) {
        console.log("error", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("data delete");
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Getting in login");
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email and password in MySQL database
    const getUserQuery = "SELECT * FROM signup WHERE email = ?";
    db.query(getUserQuery, [email], async (err, results) => {
      if (err) {
        console.error("MySQL error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (results.length > 0) {
        const user = results[0];
        console.log("Password from user:", user.password);

        // Compare the hashed password from the database with the input password
        const match = await bcrypt.compare(password, user.password);

        // Checking if user is admin or not
        const checkAdmin = "SELECT * FROM admin WHERE email = ?";
        db.query(checkAdmin, [email], (err, adminResults) => {
          if (err) {
            console.error("SQL Error", err);
            return res.status(500).json({ message: "Internal Server Error" });
          }

          // Assuming your admin table has a column named 'id' to check if the user is an admin
          const isAdmin = adminResults.length > 0;

          if (match) {
            // Passwords match, create a token
            const token = jwt.sign(
              { userId: user.id, email: user.email, isAdmin: isAdmin },
              "your-secret-key",
              { expiresIn: "1h" }
            );

            // Include userId and isAdmin in the response
            res.json({ token, isAdmin, userId: user.id });
          } else {
            // Passwords do not match
            console.log("Wrong Password");
            res.status(401).json({ message: "Invalid credentials" });
          }
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// add admin
app.post("/newAdmin", (req, res) => {
  const email = req.body.email;

  // Check if the email already exists in the admin table
  db.query("SELECT * FROM admin WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error checking email existence");
    } else {
      // If the email exists, send a response indicating that it's already an admin
      if (results.length > 0) {
        res.status(400).send("Email is already an admin");
      } else {
        // If the email doesn't exist, insert a new admin
        db.query(
          "INSERT INTO admin (email) VALUES (?)",
          [email],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send("Error creating account");
            } else {
              res.status(200).send("Account Created!");
            }
          }
        );
      }
    }
  });
});

// donations
app.post("/userDonations", verifyToken, (req, res) => {
  console.log("Trying!!");
  const userId = req.body.userId;
  const caseID = req.body.caseID;
  const amount = req.body.amount;

  console.log(req.body.userId);
  console.log(req.body.caseID);
  console.log(req.body.amount);

  db.query(
    "INSERT INTO donations (userId, caseId, amount) VALUES (?,?,?)",
    [userId, caseID, amount],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error creating donation" });
      } else {
        res.status(200).json({ message: "Donation Created!" });
      }
    }
  );
});

// payment
app.post("/paymentDonation", verifyToken, (req, res) => {
  console.log("In Payment: ", req.body)
  const userId = req.body.userId;
  const caseID = req.body.caseID;
  const amount = req.body.amount;
  const cardNo = req.body.cardNo;
  const cve = req.body.cve;
  const expiryDate = req.body.expiryDate;



  // Get the current date in the format 'YYYY-MM-DD HH:MM:SS'
  const paymentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  console.log(req.body.userId);
  console.log(req.body.caseID);
  console.log(req.body.amount);
  console.log(req.body.cardNo);
  console.log(req.body.cve);
  console.log(req.body.expiryDate);


  db.query(
    "INSERT INTO payment (userId, caseId, amount, cardNo, cve, expiryDate, paymentDate) VALUES (?,?,?,?,?,?,?)",
    [userId, caseID, amount, cardNo, cve, expiryDate, paymentDate],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error creating Payment" });
      } else {
        return res.status(200).json({ message: "Payment Done!" });
      }
    }
  );
});
app.get("/getdonationCase/:caseID", verifyToken, (req, res) => {
  const caseID = parseInt(req.params.caseID);

  const query = `
    SELECT
      lc.*,
      COALESCE(p.total_payments, 0) AS total_payments,
      lc.amount - COALESCE(p.total_payments, 0) AS remaining_amount
    FROM
      listcase lc
    LEFT JOIN (
      SELECT
        caseID,
        SUM(amount) AS total_payments
      FROM
        payment
      GROUP BY
        caseID
    ) p ON lc.id = p.caseID
    WHERE
      lc.id = ?;
  `;

  db.query(query, [caseID], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }

    if (result.length === 0) {
      console.log("Case not found:", caseID);
      return res.status(404).json({ status: 404, message: "Case not found" });
    }

    console.log("Data retrieved from database:", result);

    // Extract the first (and only) item from the result array
    const caseItem = result[0];

    // Modify the response data to include both original payment and remaining amount
    const responseData = {
      data: {
        heading: caseItem.heading,
        description: caseItem.description,
        image: caseItem.image,
        date: caseItem.date,
        totalPayment: caseItem.total_payments,
        remainingAmount: caseItem.remaining_amount,
      },
    };

    console.log("Total Payment:", caseItem.total_payments);
    console.log("Remaining Amount:", caseItem.remaining_amount);
    console.log(responseData);
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
    return res.json(responseData); // Send the response here

  });
});


// Check completed case API
app.get("/checkDonationCase/:caseID", verifyToken, (req, res) => {
  const caseID = parseInt(req.params.caseID);

  console.log("Incoming request:", req.method, req.originalUrl);
  console.log("Authorization Header:", req.headers.authorization);

  // Fetch case information along with total payments
  const query = `
    SELECT
      lc.*,
      COALESCE(p.total_payments, 0) AS total_payments
    FROM
      listcase lc
    LEFT JOIN (
      SELECT
        caseID,
        SUM(amount) AS total_payments
      FROM
        payment
      GROUP BY
        caseID
    ) p ON lc.id = p.caseID
    WHERE
      lc.id = ?;
  `;

  db.query(query, [caseID], (err, result) => {
    if (err) {
      console.log("Error:", err);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    } else {
      // Extract the first (and only) item from the result array
      const caseItem = result[0];

      // Calculate remaining amount
      const remainingAmount = caseItem.amount - caseItem.total_payments;

      // Check if the remaining amount is zero or less
      if (remainingAmount <= 0) {
        // Move the case to the completedcases table
        const moveCaseQuery = `
        INSERT INTO completedcases (heading, description, image, date, total_payments)
        VALUES (?, ?, ?, NOW(), ?);
        `;
        db.query(
          moveCaseQuery,
          [
            caseItem.heading,
            caseItem.description,
            caseItem.image,
            caseItem.total_payments || 0,
          ],
          (moveErr, moveResult) => {
            if (moveErr) {
              console.log("Error moving case to completed_cases:", moveErr);
              res
                .status(500)
                .json({ status: 500, message: "Internal Server Error" });
            } else {
              // Delete the case from the listcase table
              const deleteQuery = `
                DELETE FROM listcase WHERE id = ?;
              `;
              db.query(deleteQuery, [caseID], (deleteErr, deleteResult) => {
                if (deleteErr) {
                  console.log("Error deleting case:", deleteErr);
                  res
                    .status(500)
                    .json({ status: 500, message: "Internal Server Error" });
                } else {
                  console.log("Case deleted successfully");
                  res.status(200).json({
                    status: 200,
                    message: "Case deleted successfully",
                  });
                }
              });
            }
          }
        );
      } else {
        // Remaining amount is not zero or less
        const responseData = {
          status: 200,
          data: {
            heading: caseItem.heading,
            description: caseItem.description,
            image: caseItem.image,
            date: caseItem.date,
            totalPayment: caseItem.total_payments,
            remainingAmount: remainingAmount,
          },
        };

        console.log("totalPayment:", caseItem.total_payments);
        console.log("remainingAmount:", remainingAmount);
        res.status(200).json(responseData);
      }
    }
  });
});

//get completed cases
app.get("/getCompletedCases", (req, res) => {
  try {
    db.query("SELECT * FROM completedcases", (err, result) => {
      if (err) {
        console.log("Error:", err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
      } else {
        console.log("Data get:", result);
        res.status(200).json({ status: 200, data: result });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(422).json({ status: 422, error });
  }
});

//get donor users
app.get("/donorUsers", (req, res) => {
  const sqlQuery = `
  SELECT DISTINCT signup.id, signup.name, signup.email, signup.street, signup.city, signup.state, signup.zip
  FROM signup
  JOIN payment ON signup.id = payment.userId;
  `;

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ data: results });
    }
  });
});

app.get("/getUserDonations/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Query to get user donation records with case name
    const query = `
    SELECT p.id AS donationId, lc.id AS caseId, lc.heading, p.amount, DATE_FORMAT(p.paymentDate, '%Y-%m-%d') AS formattedPaymentDate
    FROM payment AS p
    JOIN listcase AS lc ON p.caseid = lc.id
    LEFT JOIN completedcases AS cc ON lc.heading = cc.heading
    WHERE p.userId = ?;
    
    `;

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }

      console.log(userId);
      console.log(results);

      // Check if results is an array and not empty
      if (Array.isArray(results) && results.length > 0) {
        // Extract necessary data and send as JSON
        const extractedData = results.map((result) => ({
          donationId: result.donationId,
          caseId: result.caseId,
          heading: result.heading,
          amount: result.amount,
          date: result.formattedPaymentDate,
        }));

        res.status(200).json({ success: true, data: extractedData });
      } else {
        // Handle the case when results is not an array or is empty
        res.status(404).json({ success: false, error: "No data found" });
      }
    });
  } catch (error) {
    console.error("Error fetching user donations:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//get admins
app.get("/getAllAdmins", async (req, res) => {
  try {
    // Query to get all users present in both "admin" and "signup" tables
    const query = `
      SELECT s.name, s.email, s.city, s.state, s.zip
      FROM signup s
      JOIN admin a ON s.email = a.email
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }

      // Send the results back to the client
      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get admins not in signup table
app.get("/getAdminsNotInSignup", async (req, res) => {
  try {
    // Query to get admins in "admin" table but not in "signup" table
    const query = `
      SELECT a.email
      FROM admin a
      LEFT JOIN signup s ON a.email = s.email
      WHERE s.email IS NULL
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }

      // Send the results back to the client
      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});