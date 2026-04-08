# 🏥 Medical Lab System

A comprehensive full-stack application for managing medical laboratory operations, including patient management, test scheduling, result tracking, invoice management, and staff coordination.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 Overview

This Medical Lab Management System is a graduation project built as a full-stack application designed to streamline laboratory operations. It provides comprehensive management tools for:

- **Patient Management**: Track patient information, medical history, and contact details
- **Test Management**: Schedule and manage laboratory tests
- **Results Processing**: Store and retrieve test results with digital signatures
- **Doctor Management**: Manage doctors and their prescription approvals
- **Invoice Management**: Generate and track laboratory invoices with payment processing
- **Staff Management**: Manage laboratory staff and their schedules
- **Notifications**: Real-time notifications via Email, SMS, and WhatsApp
- **Admin Dashboard**: Comprehensive analytics and reporting tools

---

## ✨ Features

### Core Features
- ✅ **Multi-Role Access Control**: Admin, Doctor, Lab Owner, Lab Staff, Patient
- ✅ **Patient Management**: Complete patient health profiles and history
- ✅ **Laboratory Tests**: Comprehensive test catalog and scheduling
- ✅ **Digital Results**: Secure test result storage and retrieval
- ✅ **Invoice Management**: Automated invoicing and payment tracking
- ✅ **Appointment Scheduling**: Seamless appointment management
- ✅ **Document Management**: PDF generation for reports and invoices

### Communication Features
- 📧 **Email Notifications**: Transactional and marketing emails
- 💬 **SMS Notifications**: Real-time alerts via Twilio
- 📱 **WhatsApp Integration**: Direct messaging to patients
- 🔔 **Push Notifications**: Firebase Cloud Messaging (FCM)

### Advanced Features
- 💳 **Payment Processing**: Stripe integration for online payments
- 📊 **Analytics Dashboard**: Real-time business insights
- 🔐 **Security**: JWT authentication, encrypted passwords, role-based access
- 📅 **Scheduled Jobs**: Automated cron jobs for recurring tasks
- ⚕️ **HL7 Server**: Healthcare data interoperability support
- 🔄 **Database Indexing**: Optimized queries for performance

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: 
  - Helmet.js for HTTP headers
  - Express-mongo-sanitize for NoSQL injection prevention
  - bcryptjs for password hashing
  - Express-rate-limit for DDoS protection

### Frontend
- **Framework**: Flutter (v3.9.2+)
- **State Management**: Provider
- **Navigation**: GoRouter
- **HTTP Client**: http package
- **Local Storage**: shared_preferences
- **UI Framework**: Material Design 3

### External Services
- **Firebase**: Cloud Messaging (FCM) and admin SDK
- **Payment**: Stripe API
- **SMS**: Twilio
- **Email**: Nodemailer
- **PDF Generation**: PDFKit

### DevOps & Tools
- **Package Manager**: npm (Node.js), pub (Flutter)
- **Testing**: Jest, Supertest
- **Development**: Nodemon, Flutter dev tools
- **Styling**: Tailwind CSS (unused in current version)

---

## 📁 Project Structure

```
Software-graduation-project/
├── backend/                          # Node.js/Express backend
│   ├── app.js                        # Express app initialization
│   ├── server.js                     # Server entry point
│   ├── package.json                  # Backend dependencies
│   ├── config/                       # Configuration files
│   │   ├── appConfig.js              # App configuration
│   │   └── db.js                     # Database connection
│   ├── models/                       # Mongoose schemas
│   │   ├── Admin.js                  # Admin model
│   │   ├── Doctor.js                 # Doctor model
│   │   ├── Patient.js                # Patient model
│   │   ├── Owner.js                  # Lab owner model
│   │   ├── Staff.js                  # Staff model
│   │   ├── Test.js                   # Test model
│   │   ├── Invoices.js               # Invoice model
│   │   ├── Result.js                 # Test result model
│   │   ├── Notification.js           # Notification model
│   │   ├── FCMToken.js               # FCM token storage
│   │   └── ...                       # Other models
│   ├── controllers/                  # Route handlers
│   │   ├── adminController.js        # Admin operations
│   │   ├── doctorController.js       # Doctor operations
│   │   ├── patientController.js      # Patient operations
│   │   ├── ownerController.js        # Lab owner operations
│   │   ├── staffController.js        # Staff operations
│   │   ├── invoiceController.js      # Invoice management
│   │   ├── notificationController.js # Notification handling
│   │   └── ...                       # Other controllers
│   ├── routes/                       # API routes
│   │   ├── adminRoutes.js            # Admin routes
│   │   ├── doctorRoutes.js           # Doctor routes
│   │   ├── patientRoutes.js          # Patient routes
│   │   ├── invoiceRoutes.js          # Invoice routes
│   │   ├── notificationRoutes.js     # Notification routes
│   │   ├── whatsappRoutes.js         # WhatsApp integration
│   │   └── ...                       # Other routes
│   ├── middleware/                   # Express middleware
│   │   ├── authMiddleware.js         # JWT authentication
│   │   ├── roleMiddleware.js         # Role-based access control
│   │   ├── rateLimitMiddleware.js    # Rate limiting
│   │   ├── validationMiddleware.js   # Input validation
│   │   └── subscriptionMiddleware.js # Subscription verification
│   ├── utils/                        # Utility functions
│   │   ├── sendEmail.js              # Email sending
│   │   ├── sendSMS.js                # SMS sending
│   │   ├── sendWhatsApp.js           # WhatsApp sending
│   │   ├── sendNotification.js       # Push notifications
│   │   ├── pdfGenerator.js           # PDF generation
│   │   ├── logger.js                 # Logging utility
│   │   ├── dateUtils.js              # Date utilities
│   │   └── ...                       # Other utilities
│   ├── validators/                   # Input validators
│   │   ├── doctorValidator.js        # Doctor validation
│   │   ├── patientValidator.js       # Patient validation
│   │   └── ...                       # Other validators
│   ├── cronJobs.js                   # Scheduled tasks
│   ├── logs/                         # Application logs
│   └── tests/                        # Test files
│
├── frontend_flutter/                 # Flutter mobile app
│   ├── pubspec.yaml                  # Flutter dependencies
│   ├── lib/                          # Source code
│   │   ├── main.dart                 # App entry point
│   │   ├── screens/                  # UI screens
│   │   ├── widgets/                  # Reusable widgets
│   │   ├── models/                   # Data models
│   │   ├── services/                 # API services
│   │   └── providers/                # State management
│   ├── android/                      # Android-specific code
│   ├── ios/                          # iOS-specific code
│   ├── web/                          # Web build files
│   ├── windows/                      # Windows build files
│   └── test/                         # Flutter tests
│
├── hl7-server/                       # HL7 health data server
│   ├── server.js                     # HL7 server entry point
│   ├── hl7-server.js                 # HL7 implementation
│   └── package.json                  # HL7 server dependencies
│
├── images/                           # Project images and assets
├── database_erd.tex                  # Database ERD diagram
├── graduation_report.tex             # Graduation project report
├── FIREBASE_SETUP_GUIDE.md           # Firebase configuration guide
├── NOTIFICATIONS_SETUP.md            # Notification setup guide
├── STARTUP_COMMANDS.md               # Project startup commands
└── README.md                         # This file
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Backend Requirements
- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MongoDB** (v4.0 or higher) - Local or Atlas cluster

### Frontend Requirements
- **Flutter** (v3.9.2 or higher)
- **Dart SDK** (included with Flutter)
- **Android Studio** or **Xcode** (for mobile development)

### Development Tools
- **Git** (for version control)
- **VS Code** or **Android Studio IDE**
- **Postman** (for API testing - optional)

### External Services (API Keys Required)
- **Firebase Project** (Cloud Messaging, Admin SDK)
- **Stripe Account** (Payment processing)
- **Twilio Account** (SMS sending)
- **Sendgrid or SMTP Server** (Email sending)
- **WhatsApp Business API** (WhatsApp integration)

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/MotazQarmash25/Medical-Lab-System.git
cd Medical-Lab-System
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with your configuration (see Configuration section)
cp .env.example .env

# Install backend node modules
npm install
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend_flutter

# Get Flutter dependencies
flutter pub get

# (Optional) Clean Flutter build
flutter clean
```

### 4. HL7 Server Setup (Optional)

```bash
# Navigate to HL7 server directory
cd ../hl7-server

# Install dependencies
npm install
```

---

## 🔑 Configuration

### Backend Environment Variables (.env)

Create a `.env` file in the `backend/` directory with the following variables:

```bash
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/medical-lab
MONGODB_USER=your_mongo_user
MONGODB_PASSWORD=your_mongo_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=7d

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_DATABASE_URL=your_firebase_database_url

# Payment Configuration (Stripe)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# SMS Configuration (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_email_password
SENDER_EMAIL=noreply@medicallab.com

# WhatsApp Configuration
WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
WHATSAPP_BUSINESS_PHONE_NUMBER=+1234567890
WHATSAPP_ACCESS_TOKEN=your_access_token

# Frontend Configuration
FRONTEND_URL=http://localhost:3000

# HL7 Configuration
HL7_SERVER_PORT=3001
```

### Firebase Configuration

1. Download your Firebase service account key from Firebase Console
2. Add the credentials to your `.env` file
3. See [FIREBASE_SETUP_GUIDE.md](./FIREBASE_SETUP_GUIDE.md) for detailed setup

### Stripe Configuration

1. Get your API keys from Stripe Dashboard
2. Add `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` to `.env`

### Twilio Configuration

1. Get your credentials from Twilio Console
2. Add to `.env` variables for SMS sending

---

## 🚀 Running the Project

### Running Backend Server

```bash
cd backend

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend will be available at: `http://localhost:8000`

### Running Flutter Frontend

```bash
cd frontend_flutter

# Run on connected device or emulator
flutter run

# Run on web
flutter run -d web

# Run on Android
flutter run -d android

# Run on iOS
flutter run -d ios
```

### Running HL7 Server (Optional)

```bash
cd hl7-server

# Start HL7 server
npm start
```

### Running Multiple Services (Recommended)

Use the provided startup script:

```bash
# Windows
./start_hl7.bat

# Linux/Mac
bash startup.sh
```

Or open multiple terminals and run each service separately.

---

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:8000/api`
- **Production**: `https://your-domain.com/api`

### Authentication
All API requests (except login/register) require JWT token in header:

```
Authorization: Bearer <your_jwt_token>
```

### Main API Endpoints

#### Admin Routes
```
POST   /api/admin/login              - Admin login
GET    /api/admin/dashboard          - Admin dashboard
GET    /api/admin/analytics          - Analytics data
```

#### Doctor Routes
```
GET    /api/doctor/profile           - Get doctor profile
POST   /api/doctor/prescriptions     - Create prescription
GET    /api/doctor/patients          - List patients
```

#### Patient Routes
```
GET    /api/patient/profile          - Get patient profile
POST   /api/patient/appointments     - Book appointment
GET    /api/patient/results          - Get test results
GET    /api/patient/invoices         - Get invoices
```

#### Lab Owner Routes
```
GET    /api/owner/lab-info           - Get lab information
POST   /api/owner/staff              - Add staff member
GET    /api/owner/analytics          - Lab analytics
```

#### Test Routes
```
GET    /api/tests                    - Get available tests
POST   /api/tests                    - Create new test
GET    /api/tests/:id                - Get test details
PUT    /api/tests/:id                - Update test
DELETE /api/tests/:id                - Delete test
```

#### Invoice Routes
```
GET    /api/invoices                 - Get invoices
POST   /api/invoices                 - Create invoice
GET    /api/invoices/:id             - Get invoice details
PUT    /api/invoices/:id/status      - Update invoice status
```

#### Notification Routes
```
POST   /api/notifications/email      - Send email
POST   /api/notifications/sms        - Send SMS
POST   /api/notifications/whatsapp   - Send WhatsApp
POST   /api/notifications/push       - Send push notification
```

For detailed API documentation, see the individual route files in `backend/routes/`

---

## 🗄️ Database Schema

### Core Models

#### User Models
- **Admin**: System administrators with full access
- **Doctor**: Healthcare providers
- **Patient**: End patients using the system
- **Owner**: Laboratory owners/managers
- **Staff**: Laboratory staff members

#### Medical Data Models
- **Test**: Laboratory test types and information
- **TestComponent**: Components of a test (e.g., parameters)
- **Result**: Test results for patients
- **ResultComponent**: Individual result components

#### Business Models
- **Invoices**: Laboratory billing records
- **Order**: Test orders
- **OrderDetails**: Details of orders
- **Device**: Connected devices/equipment

#### Communication Models
- **Notification**: Notification records
- **FCMToken**: Firebase Cloud Messaging tokens
- **AuditLog**: System audit trail
- **Feedback**: User feedback

See `database_erd.tex` for complete entity-relationship diagram.

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage report
npm run test:coverage

# Run with verbose output
npm run test:verbose
```

### Frontend Tests

```bash
cd frontend_flutter

# Run Flutter tests
flutter test

# Run with coverage
flutter test --coverage
```

---

## 🔒 Security Considerations

- ✅ JWT tokens for stateless authentication
- ✅ bcryptjs for password hashing
- ✅ Helmet.js for HTTP security headers
- ✅ MongoDB sanitization to prevent NoSQL injection
- ✅ Rate limiting on API endpoints
- ✅ CORS configuration for cross-origin requests
- ✅ Input validation on all endpoints
- ✅ Role-based access control (RBAC)

**Note**: Review code quality and security recommendations before production deployment.

---

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow Node.js conventions for backend
- Follow Dart/Flutter style guide for frontend
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👥 Project Team & Contact

**Project**: Medical Lab Management System (Graduation Project)

For questions or support, please:
- Create an issue on GitHub
- Contact the project maintainers
- Check existing documentation in the project

---

## 🙏 Acknowledgments

- Express.js and Node.js community
- Flutter and Dart team
- MongoDB for excellent database
- Firebase for cloud services
- All open-source contributors

---

## 📚 Additional Resources

- [FIREBASE_SETUP_GUIDE.md](./FIREBASE_SETUP_GUIDE.md) - Firebase configuration
- [NOTIFICATIONS_SETUP.md](./NOTIFICATIONS_SETUP.md) - Notification system setup
- [STARTUP_COMMANDS.md](./STARTUP_COMMANDS.md) - Quick start commands
- [FIREBASE_COMPLETE_SETUP.md](./FIREBASE_COMPLETE_SETUP.md) - Complete Firebase guide

---



**Status**: ✅ Ready for Development/Testing

---

## ⭐ If you find this project helpful, please consider giving it a star!