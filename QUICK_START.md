# Admin Dashboard - Quick Start Guide

## 🚀 Quick Start (30 seconds)

```bash
# 1. Start the development server
npm run dev

# 2. Open in browser
# http://localhost:3000/admin

# 3. Login with
Username: admin
Password: admin123456

# 4. You're in! 🎉
```

## 📱 Dashboard Layout

```
┌─────────────────────────────────────────┐
│         DASHBOARD HEADER                 │
│  [Menu] Turnkey | Time | DB✅ | User    │
│                        Server✅ | Logout │
├──────────┬──────────────────────────────┤
│          │                              │
│ SIDEBAR  │     MAIN CONTENT             │
│          │     Dashboard / Contacts     │
│ Dashboard│     Newsletter / Stats       │
│ Contacts │                              │
│ News     │                              │
│          │                              │
└──────────┴──────────────────────────────┘
```

## 🔐 Authentication Flow

```
User visits /admin
    ↓
AdminLogin Component
    ↓
Enter credentials
    ↓
POST /api/admin/login
    ↓
JWT Token Generated
    ↓
Stored in localStorage
    ↓
Redirect to /admin/dashboard
    ↓
Dashboard verifies token
    ↓
✅ Access Granted!
```

## 📊 Dashboard Statistics

Your dashboard shows:

```
┌─────────────┬──────────────┬──────────────┐
│   Total     │   Unread     │  Newsletter  │
│  Contacts   │  Messages    │  Subscribers │
│     42      │      7       │      128     │
└─────────────┴──────────────┴──────────────┘
```

## 📋 Contact Management Flow

```
Admin Dashboard
    ↓
Click "Contact Enquiry"
    ↓
View all contacts in list
    ↓
Click a contact
    ↓
See full details (name, email, phone, message)
    ↓
Option to delete
    ↓
Status shows: unread/read
```

## 📰 Newsletter Management Flow

```
Admin Dashboard
    ↓
Click "Newsletter Enquiry"
    ↓
See statistics:
  - Total subscribers
  - Active count
  - Inactive count
    ↓
View subscriber list with:
  - Email
  - Status
  - Subscribe date
    ↓
Can unsubscribe any email
```

## 🔌 System Status Indicators

In the header, you'll see:

```
Database Status:
  🟢 Connected (green dot)
  🔴 Disconnected (red dot)
  🟡 Checking (yellow dot)

Server Status:
  🟢 Online
  🔴 Offline
```

## 📁 Project Structure

```
turnkey/
├── src/
│   ├── app/
│   │   ├── admin/                  ← Login & Dashboard
│   │   │   ├── page.tsx            ← Login page
│   │   │   └── dashboard/
│   │   │       ├── layout.tsx       ← Layout wrapper
│   │   │       ├── page.tsx         ← Main dashboard
│   │   │       ├── contacts/
│   │   │       │   └── page.tsx     ← Contact management
│   │   │       └── newsletter/
│   │   │           └── page.tsx     ← Newsletter management
│   │   ├── api/
│   │   │   └── admin/
│   │   │       ├── login/
│   │   │       ├── contacts/
│   │   │       ├── stats/
│   │   │       └── status/
│   │   └── components/
│   │       ├── AdminLogin.tsx
│   │       ├── DashboardHeader.tsx
│   │       └── DashboardSidebar.tsx
│   └── lib/
│       ├── auth.ts                 ← JWT utilities
│       ├── db.ts                   ← MongoDB connection
│       └── models/
│           ├── Contact.ts
│           └── User.ts
├── .env.local                      ← Configuration
├── ADMIN_DASHBOARD.md              ← Full docs
├── ADMIN_IMPLEMENTATION.md         ← What was built
└── SETUP_VERIFICATION.md           ← This setup checklist
```

## 🔑 Admin Credentials

```
Username: admin
Password: admin123456
Admin Name: Moin
Role: System Administrator
```

## 🌐 API Endpoints Reference

### Public
- `POST /api/contact` - Submit contact form

### Protected (Require JWT)
- `POST /api/admin/login` - Get JWT token
- `GET /api/admin/contacts` - Fetch all contacts
- `DELETE /api/admin/contacts` - Delete contact
- `GET /api/admin/stats` - Get statistics
- `GET /api/admin/status` - Check system status

## 📊 Database Models

### Contact
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  subject: "Inquiry",
  message: "Hello...",
  status: "unread",
  createdAt: "2024-12-25..."
}
```

### User
```javascript
{
  username: "admin",
  password: "admin123456",
  role: "admin"
}
```

## 🛠️ Common Tasks

### View All Contacts
1. Click "Contact Enquiry" in sidebar
2. See list of contacts
3. Click any to view details

### Delete a Contact
1. Select contact in list
2. Click "Delete Message" button
3. Confirm deletion
4. Contact removed from list

### Check System Status
1. Look at header
2. Green dot = System OK
3. Red dot = Connection issue
4. Check MongoDB is running

### Logout
1. Click logout icon (top right)
2. Redirected to login page
3. Token cleared from localStorage

### Change Admin Password
1. Update ADMIN_PASSWORD in `.env.local`
2. Restart dev server
3. Use new password

## ⚠️ Important Notes

### Before Production
- [ ] Change JWT_SECRET
- [ ] Change admin password
- [ ] Hash passwords with bcrypt
- [ ] Set up HTTPS
- [ ] Configure CORS
- [ ] Add rate limiting
- [ ] Enable logging
- [ ] Regular backups

### First Time Setup
1. Start MongoDB
2. Start dev server: `npm run dev`
3. Visit http://localhost:3000/admin
4. Login with demo credentials
5. Test all features

### Troubleshooting
- **Can't login?** Check `.env.local` has correct credentials
- **Can't connect to DB?** Start MongoDB service
- **Token error?** Clear localStorage and re-login
- **Port in use?** Use different port: `npm run dev -- -p 3001`

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `ADMIN_DASHBOARD.md` | Complete admin documentation |
| `ADMIN_IMPLEMENTATION.md` | What was created & why |
| `SETUP_VERIFICATION.md` | Setup checklist |
| `QUICK_START.md` | This file - quick guide |

## 🎯 Features at a Glance

✅ JWT Authentication
✅ MongoDB Integration
✅ Real-time Status Monitoring
✅ Contact Management
✅ Newsletter Management
✅ Responsive Design
✅ Dark Theme
✅ Smooth Animations
✅ Error Handling
✅ Input Validation

## 🚀 You're All Set!

Everything is configured and ready to use. Start the dev server and enjoy your new admin dashboard!

```bash
npm run dev
# Visit http://localhost:3000/admin
# Login with admin / admin123456
```

---

**Admin**: Moin  
**Created**: December 25, 2025  
**Status**: ✅ Ready to Use
