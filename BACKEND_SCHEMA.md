# Backend Data Structure

## Contacts Schema

```json
{
  "id": "string - timestamp based unique ID",
  "name": "string - contact name",
  "email": "string - contact email",
  "phone": "string - contact phone (optional)",
  "subject": "string - message subject",
  "message": "string - message content",
  "createdAt": "string - ISO timestamp",
  "status": "string - 'unread' or 'read'"
}
```

## Storage

- Contacts are stored in `/data/contacts.json`
- Directory is created automatically on first contact submission
- Data persists between server restarts

## API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form
  - No authentication required
  - Required fields: name, email, subject, message
  - Optional fields: phone

### Admin Login
- **POST** `/api/admin/login` - Get JWT token
  - Required: username, password
  - Returns: JWT token valid for 24 hours

### Admin Contacts
- **GET** `/api/admin/contacts` - Fetch all contacts
  - Requires: Bearer token
  - Returns: array of all contacts

- **DELETE** `/api/admin/contacts` - Delete contact
  - Requires: Bearer token
  - Body: { id: "contact-id" }
  - Returns: success message

## Authentication

- JWT tokens are generated with 24-hour expiry
- Tokens are validated on protected routes
- Default credentials: admin / admin123456
- Change credentials in `.env.local`
