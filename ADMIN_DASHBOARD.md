# Admin Dashboard Documentation

## Overview
The Turnkey Admin Dashboard is a complete admin management system with JWT authentication, MongoDB integration, and real-time status monitoring.

## Features

### 1. **Admin Login** (`/admin`)
- Beautiful, modern login interface
- JWT-based authentication
- Demo credentials: 
  - Username: `admin`
  - Password: `admin123456`
- Secure token storage in localStorage

### 2. **Dashboard** (`/admin/dashboard`)
- Welcome message with admin name (Moin)
- Real-time statistics:
  - Total Contacts
  - Unread Messages
  - Newsletter Subscribers
- System status overview
- Responsive design for all devices

### 3. **Contact Enquiries** (`/admin/dashboard/contacts`)
- View all contact messages
- Detailed contact information view
- Unread/Read status indicators
- Delete messages functionality
- Email, phone, and submission date tracking
- Side-by-side layout for easy management

### 4. **Newsletter Enquiries** (`/admin/dashboard/newsletter`)
- Manage newsletter subscribers
- Subscriber statistics (active/inactive)
- Subscription date tracking
- Quick unsubscribe functionality
- Demo data for testing

### 5. **Dashboard Header**
- Real-time clock with date
- Database connection status (live indicator)
- Server status (online/offline)
- Admin profile display
- Logout button

### 6. **Dashboard Sidebar**
- Navigation to all admin sections
- Active route highlighting
- Admin profile section
- Icons and descriptions for each section

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB (local or MongoDB Atlas connection string)

### 1. Install Dependencies
```bash
npm install
npm install jsonwebtoken @types/jsonwebtoken mongoose
```

### 2. Configure Environment Variables
Add to `.env.local`:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/turnkey

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123456

# API Configuration
API_URL=http://localhost:3000
```

### 3. MongoDB Connection
- **Local MongoDB**: Ensure MongoDB is running on `localhost:27017`
- **MongoDB Atlas**: Use your connection string with the correct database name
- **Connection format**: `mongodb://username:password@host:port/database`

### 4. Start Development Server
```bash
npm run dev
```

Access the admin panel at: `http://localhost:3000/admin`

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx (Login page)
│   │   └── dashboard/
│   │       ├── layout.tsx (Dashboard layout)
│   │       ├── page.tsx (Main dashboard)
│   │       ├── contacts/
│   │       │   └── page.tsx (Contact enquiries)
│   │       └── newsletter/
│   │           └── page.tsx (Newsletter enquiries)
│   ├── api/
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── route.ts (Login endpoint)
│   │   │   ├── contacts/
│   │   │   │   └── route.ts (Contact management)
│   │   │   ├── stats/
│   │   │   │   └── route.ts (Dashboard statistics)
│   │   │   └── status/
│   │   │       └── route.ts (Server/DB status)
│   │   └── contact/
│   │       └── route.ts (Public contact form)
│   ├── components/
│   │   ├── AdminLogin.tsx
│   │   ├── DashboardHeader.tsx
│   │   └── DashboardSidebar.tsx
│   └── globals.css
└── lib/
    ├── auth.ts (JWT utilities)
    ├── db.ts (MongoDB connection)
    └── models/
        ├── Contact.ts
        └── User.ts
```

## API Endpoints

### Authentication
- **POST** `/api/admin/login` - Admin login with JWT token

### Contact Management (Protected with JWT)
- **GET** `/api/admin/contacts` - Fetch all contacts
- **DELETE** `/api/admin/contacts` - Delete a contact

### Statistics (Protected with JWT)
- **GET** `/api/admin/stats` - Get dashboard statistics

### Status Monitoring
- **GET** `/api/admin/status` - Check server and DB connection status

### Public Contact Form
- **POST** `/api/contact` - Submit contact message

## Security Features

### JWT Authentication
- Secure token-based authentication
- 24-hour token expiration
- Automatic token verification on protected routes
- Token stored securely in browser localStorage

### Protected Routes
All admin dashboard routes require valid JWT token:
- Middleware checks token on every protected route
- Automatic redirect to login if token is invalid or expired
- Token validation on all API endpoints

### Data Validation
- Email format validation
- Required field validation
- Input sanitization

## Database Models

### Contact Model
```typescript
{
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: 'read' | 'unread',
  createdAt: Date
}
```

### User Model
```typescript
{
  username: String,
  password: String,
  role: String
}
```

## Real-time Features

### Dashboard Header Status Indicators
- **Database Status**: Green (connected) / Red (disconnected)
- **Server Status**: Green (online) / Red (offline)
- **Live Clock**: Updates every second
- **Current Date**: Displays in readable format

### Statistics Auto-Update
- Contact count updates in real-time
- Unread message tracking
- Newsletter subscriber statistics

## Admin Information

- **Admin Name**: Moin
- **Role**: System Administrator
- **Default Username**: admin
- **Default Password**: admin123456

## Styling & UI

- **Framework**: React + Next.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Color Scheme**: Dark theme (Gray-900 base)
- **Responsive**: Mobile-first responsive design

## Usage Examples

### Login to Admin Panel
1. Navigate to `/admin`
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123456`
3. Click "Sign In"
4. Access dashboard at `/admin/dashboard`

### View Contact Enquiries
1. From dashboard, click "Contact Enquiry" in sidebar
2. View list of all contacts
3. Click any contact to view full details
4. Delete message if needed

### Manage Newsletter
1. From dashboard, click "Newsletter Enquiry" in sidebar
2. View subscriber statistics
3. See subscription dates
4. Unsubscribe any email from the list

### Monitor System Status
- Check header for real-time DB and Server status
- View date/time for current session info
- See admin profile details

## Troubleshooting

### MongoDB Connection Issues
```
Error: ECONNREFUSED
Solution: Ensure MongoDB is running on localhost:27017
         or update MONGODB_URI in .env.local
```

### JWT Token Errors
```
Error: Invalid token
Solution: Clear browser localStorage and re-login
         Check JWT_SECRET in .env.local
```

### Database Not Connected
- Check MongoDB service is running
- Verify MONGODB_URI is correct
- Check network connectivity for Atlas connections

## Future Enhancements

- [ ] Password hashing with bcrypt
- [ ] Admin user management
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Export data functionality
- [ ] Activity logging
- [ ] Two-factor authentication

## Support

For issues or feature requests, please contact the development team.

---

**Last Updated**: December 25, 2025  
**Version**: 1.0.0
