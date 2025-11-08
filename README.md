This is a comprehensive README for your Next.js Authentication and Login project.

````markdown
# Next.js Authentication and Login

This project implements a robust authentication system for a Next.js application. It supports traditional credential-based sign-up/login, Google social authentication, and a secure email verification process using JWT and SMTP, all backed by a MongoDB database.

---

## ✨ Features

* **Credential Authentication**: Users can register and log in using a traditional **email and password** approach.
* **Google Social Login**: Seamless sign-up and login using a **Google account**.
* **Secure User Logout**: Provides a secure way for users to end their session.
* **Email Verification**: New users who sign up with credentials must verify their email address.
    * Uses **JSON Web Tokens (JWT)** for generating secure, time-sensitive verification links.
    * Employs **SMTP** (Simple Mail Transfer Protocol) to send verification emails.
* **MongoDB Integration**: All user and session data are stored securely in a **MongoDB** database.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed and configured:

1.  **Node.js & npm**: (LTS version recommended)
2.  **MongoDB**: A running instance (local or cloud like MongoDB Atlas).
3.  **Google OAuth Credentials**: A Google Cloud Project with OAuth 2.0 credentials (Client ID and Secret) for social login.
4.  **SMTP Service Credentials**: Credentials (e.g., from Gmail, SendGrid, or another provider) for sending verification emails.

---

## 🚀 Installation and Setup

Follow these steps to get the project running on your local machine.

### **Step 1: Clone the Repository**

Clone the project from GitHub and navigate into the directory.

```bash
git clone [https://github.com/TheinMinHtet/nextjs_authentication_and_login.git](https://github.com/TheinMinHtet/nextjs_authentication_and_login.git)
cd nextjs_authentication_and_login
````

### **Step 2: Install Dependencies**

Install the necessary npm packages required for the project.

```bash
npm install
# Or using yarn:
# yarn install
```

### **Step 3: Configure Environment Variables**

Create a file named **`.env`** in the root of the project directory and populate it with your specific configuration details.

```bash
# Create the environment file
touch .env
```

### **Step 4: Environment Variables (`.env.local` contents)**

Copy the following structure into your newly created `.env` file and replace the placeholder values with your actual secrets and configuration.

```bash
# --- Next.js Application & Authentication Configuration ---

# The base URL of your application (required for NextAuth callbacks)
NEXTAUTH_URL=http://localhost:3000

# A secure secret used by NextAuth to encrypt tokens and hash cookies.
# Tip: Generate a secure secret using a tool or command line (e.g., openssl rand -base64 32)
NEXTAUTH_SECRET=[A_LONG_AND_SECURE_NEXTAUTH_SECRET]

# A separate secret specifically for manual JWT creation (e.g., email verification tokens).
JWT_SECRET=[YOUR_CUSTOM_JWT_SECRET_FOR_VERIFICATION]

# --- Database Configuration ---

# MongoDB Connection String
MONGODB_URI=[YOUR_MONGODB_URI]

# --- Google OAuth Configuration ---

# Google Client ID (Publicly visible in your app)
GOOGLE_CLIENT_ID=[YOUR_GOOGLE_CLIENT_ID]

# Google Client Secret (Keep this private)
GOOGLE_CLIENT_SECRET=[YOUR_GOOGLE_CLIENT_SECRET]

# --- Email (SMTP) Configuration for Verification ---

# The host and port for your SMTP server
SMTP_HOST=[YOUR_SMTP_HOST_ADDRESS]
SMTP_PORT=587

# Your email address and the corresponding App Password
SMTP_USER=[YOUR_EMAIL_ACCOUNT]
SMTP_PASS=[YOUR_EMAIL_PASSWORD_OR_APP_PASSWORD]

# The email address that the verification emails will be sent FROM
FROM_EMAIL=[NOREPLY@YOURDOMAIN.COM]
```

### **Step 5: Run the Development Server**

Start the application in development mode.

```bash
npm run dev
# The application will be accessible at: http://localhost:3000
```

-----

## 🔑 Usage

1.  **Sign Up (Credential)**: Navigate to the Sign Up page and register with an email and password. A verification link will be sent to the provided email address using the configured SMTP server.
2.  **Email Verification**: Click the link in the received email. The embedded JWT will be validated, and your account will be activated.
3.  **Login**: Use your verified credentials to log in, or click the **"Continue with Google"** button for social authentication.
4.  **Logout**: Access the protected routes, then click the Logout button to securely terminate your session.

<!-- end list -->
