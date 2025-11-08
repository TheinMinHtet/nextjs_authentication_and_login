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

Create a file named **`.env.local`** in the root of the project directory and populate it with your specific configuration details.

```bash
# Create the environment file
touch .env.local
```

### **Step 4: Environment Variables (`.env.local` contents)**

Copy the following structure into your newly created `.env.local` file and replace the placeholder values with your actual secrets and configuration.

```bash
# Application Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="A_VERY_LONG_AND_SECURE_SECRET_FOR_NEXTAUTH"
# Tip: Generate a secure secret using: openssl rand -base64 32

# 1. MongoDB Configuration
MONGODB_URI="your_mongodb_connection_string"

# 2. JWT Configuration (For Email Verification & General Tokens)
# This is a separate secret used for manual JWT implementation (e.g., email verification token)
JWT_SECRET="YOUR_CUSTOM_JWT_SECRET_FOR_VERIFICATION"

# 3. Google OAuth Configuration
# NEXT_PUBLIC_ is required for Client-Side access (if any)
NEXT_PUBLIC_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

# 4. Email/SMTP Configuration (For Email Verification)
# Use your service provider's details (e.g., Google, SendGrid, Mailtrap)
EMAIL_HOST="smtp.example.com"
EMAIL_PORT=587
EMAIL_USER="your_email_account@example.com"
EMAIL_PASS="your_email_password_or_app_password"
FROM_EMAIL="noreply@yourdomain.com"
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

```
```
