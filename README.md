# Donation Portal ✨

The *Donation Portal* is more than just a web-based system—it’s a bridge connecting those who want to help with those in need. Designed to make managing donation cases and interactions seamless, the portal empowers administrators to take charge and donors to make a real impact. With a host of thoughtful features and top-notch security measures, it ensures that every donation counts and every interaction is safe, meaningful, and transparent.

---

## Features 🚀

### *Admin Capabilities*
- *List Cases*: Create and manage new donation cases.  
- *Add Admins*: Grant administrative access to new users.  
- *View Donors*: Access donor details.  
- *View Registered Users*: Monitor all registered user information.  
- *Manage Admins*: View existing admins and track inactive ones.  
- *Delete Cases*: Remove outdated or unnecessary donation cases.  

### *User Capabilities*
- *Create Account*: Register to become a donor.  
- *Make Donations*: Contribute directly to active cases.  
- *Donation Insights*: Track progress on donation goals.  
- *Profile History*: Access a detailed history of past donations.  

---

## Security Measures 🛡

1. *Strong Password Enforcement*: Ensures user account security with strict password requirements.  
2. *ReCAPTCHA Integration*: Blocks bot interactions with user-friendly verification.  
3. *Role-Based Cookies*: Maintains secure sessions based on user roles.  
4. *JWT Authentication*: Uses JSON Web Tokens for safe and scalable user authentication.  
5. *Password Hashing*: Secures passwords with hashing before storage.  
6. *Input Validation & XSS Protection*: Prevents harmful input and cross-site scripting attacks.  
7. *SQL Injection Prevention*: Protects database integrity through secure queries.  
8. *HTTPS Migration*: Ensures secure communication by encrypting data with HTTPS.  

---

## Tech Stack 🛠

- *Frontend*: React.js  
- *Backend*: Node.js  
- *Database*: MySQL  
- *Authentication*: JWT and Cookies  
- *Security*: ReCAPTCHA, HTTPS, and Input Validation  

---

## Installation 🧐

Follow these steps to set up the Donation Portal on your local machine:  

### 1. *Clone the Repository*
   ```bash  
   git clone https://github.com/your-username/donation-portal.git  
   cd donation-portal  
   ```  

### 2. *Install Dependencies*  
```bash  
   npm install  
```   

### 3. *Create the Database Schema*  
   - Use MySQL Workbench to create a database named **donationportal**.  
   - Set all id columns in the tables to auto-increment.  

   *Table Schema*:  
   - *admins*: id, email  
   - *completedcases*: id, heading, description, image, date, total_payments  
   - *donations*: id, userId, caseId, amount  
   - *listcase*: id, heading, description, amount, image, date  
   - *payment*: id, userId, caseId, amount, cardNo, cve, expiryDate, paymentDate  
   - *signup*: id, name, email, street, city, state, zip, password  

### 4. *Add an Admin User*  
   - Insert an admin manually into the database using the following SQL query:  
``` sql  
     INSERT INTO admins (email) VALUES ('admin@example.com');  
```     
   - Create an admin account through the signup page for full admin panel access.  

### 5. *Connect Backend to Database*  
   - Update **index.js** in the backend folder with your database credentials (username, password, etc.).
     ![Connect Database](https://github.com/GlassesMan01/DonationPortal-Website/tree/main/Images/Connect%20Backend%20to%20Database.png)


### 6. *Set Up reCAPTCHA V2*  
   - Obtain SITE and SECRET keys from Google Developers.  
   - Replace these keys in the backend **index.js** and the frontend *Login* and *Signup* pages.  

### 7. *Generate SSL Keys*  
   - Create private and public keys in HTTP folder for HTTPS migration:  
```bash  
     openssl req -nodes -new -x509 -keyout localhost-key.pem -out localhost.pem -days 365  
```   

### 8. *Run the Frontend*  
    
```bash  
   npm start  
```        

### 9. *Run the Backend*  
  
```bash  
   node index.js  
```     

---

This comprehensive setup ensures a fully functional, secure, and user-friendly Donation Portal ready to make a difference. Let us know if further assistance is needed!
