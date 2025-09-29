# WalletPro - Digital Wallet Management System


#live Link client: https://wallet-client-teal.vercel.app/
#live link beckend: https://digital-wallet-system-gamma.vercel.app/




### for testing ## 
   ## admin 
    admin email : jabed1780@gmail.com 
    password: jabed1780
  ## agent 
    agent email : jabed17@gmail.com
    password: jabed1780
  ## user
    user email : jaed17@gmail.com
    password : jabed1780

## Project Overview
**WalletPro** is a secure and fast digital wallet application designed for users, agents, and administrators. It allows users to manage their funds, make cash-in and cash-out transactions, track transaction history, and manage profiles. Agents can handle transactions and monitor cash flow, while administrators can manage users, agents, and system settings.

**Key Features:**
- User registration and authentication (email/password & social login)
- Wallet management (Add, Withdraw, Send Money)
- Role-based dashboards (User, Agent, Admin)
- Transaction history with search and pagination
- Profile update functionality
- Secure and encrypted transactions
- Responsive UI with professional animations

---

## Technology Stack

**Frontend:**
- React.js (with TypeScript)
- Tailwind CSS & DaisyUI
- Framer Motion & GSAP for animations
- React Icons & Lucide Icons
- React Router DOM
- Firebase (for authentication & storage)
- React Toastify & Sonner (for notifications)

**Backend:**
- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- JWT Authentication & Authorization
- Bcrypt for password hashing
- Zod for validation
- Cors & dotenv

**State Management / API:**
- Redux Toolkit
- RTK Query for API requests

---

## Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/developer-jabed/Wallet-Client
cd walletpro
Install dependencies:

bash
Copy code
# For backend
cd server
npm install

# For frontend
cd ../client
npm install
Environment Variables:

Create a .env file in both client and server directories with the following:

Server (.env)

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Client (.env)

env
Copy code
VITE_API_URL=http://localhost:5000/api
Run the application:

bash
Copy code
# Start backend server
cd server
npm run dev

# Start frontend client
cd ../client
npm run dev
Open the app:
Visit http://localhost:5173 in your browser.

Project Structure
bash
Copy code
client/           # React frontend
  ├─ src/
      ├─ components/
      ├─ features/
      ├─ pages/
      └─ App.tsx

server/           # Express backend
  ├─ controllers/
  ├─ models/
  ├─ routes/
  ├─ services/
  └─ app.ts

All Features
User Features

Authentication & Authorization

Sign up and login with email/password or social login (Google, Facebook).

JWT-based secure authentication.

Dashboard

Overview of wallet balance, recent transactions, and quick actions.

Wallet Management

Add money via agents.

Withdraw funds via agents.

Send money to other users instantly.

Transaction History

View all transactions (cash-in, cash-out, send money).

Filter transactions by type, status, and date.

Search by transaction ID or user.

Paginated transaction list for better UX.

Profile Management

Update name, phone number, and password.

Profile picture upload.

Notifications

Real-time notifications for transaction status updates.

Responsive UI

Mobile-friendly card layout and desktop table layout.

Smooth animations using Framer Motion and GSAP.

Agent Features

Agent Dashboard

Overview of transactions and cash flow.

Cash-In & Cash-Out

Process user deposits and withdrawals.

Instant status update for completed transactions.

Transaction History

View all agent-handled transactions.

Filter and search by user or transaction ID.

Profile Management

Update personal information.

Role-Specific Access

Access only agent-specific functionalities.

Responsive & Animated UI

Mobile-first design with animated tables and cards.

Admin Features

Admin Dashboard

Full overview of platform statistics.

Track all users and agents.

User & Agent Management

View, update, or delete users and agents.

Change user/agent roles.

System Settings

Configure system parameters.

Manage application-level settings securely.

Transaction Oversight

View all transactions across users and agents.

Filter and search transactions by user, agent, type, or status.

Profile Management

Update admin profile.

Security & Permissions

Role-based access control for secure operations.

Monitor suspicious activity.

Responsive UI & Animations

Interactive dashboards with Framer Motion animations.

Global Features

Real-time Updates

Transaction and wallet updates reflected instantly.

Animations & Interactions

Smooth transitions, hover effects, and animated charts.

Notifications

Transaction success/failure alerts.

Responsive Design

Mobile, tablet, and desktop-friendly layouts.

Secure Transactions

Password hashing with bcrypt.

JWT-based authentication.

Input validation with Zod.

Search & Pagination

Efficient navigation through large transaction datasets.

Professional Styling

Tailwind CSS + DaisyUI components.

Eye-catching gradients, cards, tables, and hover effects.


Live URL
WalletPro Live Demo (if deployed)

Additional Notes
Role-based access ensures users, agents, and admins only see authorized dashboards.

Transaction history supports search, pagination, and type filtering.

All forms include client-side validation and notifications.

Fully responsive design with mobile-friendly card layout and desktop tables.

Animations are implemented using Framer Motion and GSAP for smooth UI effects.

Security: JWT authentication, password hashing, and HTTPS recommended in production.

Contribution
Fork the repository

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m "Add feature")

Push to the branch (git push origin feature-name)

Create a pull request

