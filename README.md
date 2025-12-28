# CodeBook 📚

> A vibrant community platform built exclusively for developers. Share your code snippets, engage in technical discussions, and connect with fellow developers from around the world.

![CodeBook](https://img.shields.io/badge/CodeBook-Developer%20Platform-blue?style=for-the-badge&logo=github)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Express](https://img.shields.io/badge/Express-4.x-green?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=flat-square&logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)

## 🌟 Overview

CodeBook is a modern, full-stack social platform designed specifically for developers. It provides a space where developers can share code snippets, participate in technical discussions, showcase their work, and build meaningful connections within the developer community.

## ✨ Features

### 🔐 Authentication
- **GitHub OAuth Integration** - Secure login with GitHub
- **User Profiles** - Customizable developer profiles with bio, tagline, and expertise
- **Verified Accounts** - Special verification badges for notable developers

### 💻 Code Sharing
- **Code Snippets** - Share and discover code snippets with syntax highlighting
- **Monaco Editor** - Rich code editing experience with language support
- **Multiple Languages** - Support for various programming languages
- **Code Formatting** - Automatic syntax highlighting and formatting

### 💬 Community Features
- **Posts & Discussions** - Create and engage in technical discussions
- **Comments & Replies** - Threaded comment system for better conversations
- **Likes & Bookmarks** - Save and appreciate content
- **Developer Discovery** - Find and connect with developers worldwide

### 👥 Social Features
- **Follow System** - Follow developers you admire
- **Developer Cards** - Beautiful, interactive developer profile cards
- **Search & Filter** - Advanced search and filtering capabilities
- **Activity Feed** - Stay updated with community activity

### 🎨 User Experience
- **Modern UI/UX** - Beautiful, responsive design with smooth animations
- **Dark Mode** - Full dark mode support
- **Real-time Updates** - Live updates using React Query
- **Toast Notifications** - User-friendly notifications for actions

### 🛠️ Additional Features
- **Bounties** - Post and discover coding bounties
- **Reports & Moderation** - Community-driven content moderation
- **Block System** - Block unwanted users
- **Expertise Tags** - Showcase your skills and expertise

## 🏗️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: React Query (TanStack Query), Redux Toolkit
- **Animations**: Framer Motion
- **Code Editor**: Monaco Editor
- **Authentication**: NextAuth.js
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, GitHub OAuth
- **File Upload**: Express file upload handling

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Dev Tools**: React Query Devtools

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [GitHub OAuth App](https://github.com/settings/developers) (for authentication)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/codebook.git
cd codebook
```

### 2. Install Dependencies

Install client dependencies:
```bash
cd client
npm install
```

Install server dependencies:
```bash
cd ../server
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the `client` directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create a `.env` file in the `server` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/codebook
# or for MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codebook

# JWT Secret
JWT_SECRET=your-jwt-secret-here

# Server Port
PORT=8000
```

### 4. Run the Development Servers

Start the backend server:
```bash
cd server
npm start
```

In a new terminal, start the frontend:
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000](http://localhost:8000)

## 📁 Project Structure

```
codebook/
├── client/                 # Next.js frontend application
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   ├── modals/           # Modal components
│   ├── types/            # TypeScript type definitions
│   ├── services/         # API service functions
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Utility functions
│
├── server/                # Express.js backend application
│   ├── controllers/      # Route controllers
│   ├── routes/           # API routes
│   ├── schemas/          # MongoDB schemas
│   ├── middlewares/      # Express middlewares
│   └── utils/            # Utility functions
│
└── README.md             # This file
```

## 🔧 Available Scripts

### Client Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Server Scripts
```bash
npm start        # Start server with nodemon
```

## 🎯 Key Features in Detail

### Code Snippets
- Create and share code snippets with syntax highlighting
- Support for multiple programming languages
- Monaco editor for a rich editing experience
- Copy code functionality
- Like, comment, and bookmark snippets

### Developer Profiles
- Beautiful profile cards with animations
- Follow/unfollow functionality
- Display follower and following counts
- Showcase bio, tagline, and expertise
- Verified account badges

### Discussions
- Create technical discussions
- Threaded comment system
- Like and reply to comments
- Search and filter discussions

## 🤝 Contributing

Contributions are welcome! However, please note that this is a personal project. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

Copyright (c) 2024 Aziz

All rights reserved.

This project and its source code are proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without the express written permission of the owner.

## 👤 Author

**Aziz**

- GitHub: [@aziz-codes](https://github.com/aziz-codes)
- Email: [Your Email]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [MongoDB](https://www.mongodb.com/) - The database for modern applications
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor

## 📞 Support

For support, email [aziz.codes44@gmail.com] or open an issue in the repository.

---

Made with ❤️ by Aziz

