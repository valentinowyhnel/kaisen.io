# kaisen.io - Cybersecurity Portfolio

A modern, secure cybersecurity portfolio built with Next.js, TypeScript, Firebase, and AI-powered features.

## Features

✨ **Modern Stack**
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS & ShadCN UI for beautiful design
- Firebase (Firestore + Authentication) for backend

🔐 **Security First**
- Public read access for portfolio data
- Protected write operations requiring authentication
- Firebase security rules enforcing access control
- Single admin authentication system

⚡ **Real-time Updates**
- Custom `useDoc` and `useCollection` hooks for real-time Firestore data
- Instant UI updates when data changes
- Optimistic UI patterns

🤖 **AI-Powered**
- AI copilot for generating professional bios
- Supports OpenAI and Anthropic integrations
- Fallback mock implementation for development

📱 **Responsive Design**
- Mobile-first approach
- Dark mode support
- Cybersecurity-themed aesthetics

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/valentinowyhnel/kaisen.io.git
cd kaisen.io
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)

2. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Deploy the security rules from `firestore.rules`

3. Enable Authentication:
   - Go to Authentication
   - Enable Email/Password sign-in method
   - Create an admin user account

4. Deploy Firestore rules:
```bash
firebase deploy --only firestore:rules
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## Usage

### First Time Setup

1. Navigate to `/login` and sign in with your admin credentials
2. Go to `/admin` to access the dashboard
3. Fill in your:
   - Basic information (name, title, email)
   - Social links (GitHub, LinkedIn, Twitter)
   - Skills and expertise
   - Professional bio (or use AI to generate one)
4. Save your changes

### Admin Dashboard (`/admin`)

The admin dashboard allows you to:
- Update personal information
- Manage skills
- Generate AI-powered bio
- Add/edit projects and certifications
- All changes are saved in real-time to Firestore

### Public Portfolio (`/`)

The main portfolio page displays:
- Professional introduction
- Skills and expertise
- Projects with links
- Certifications
- Social media links

## Security Model

### Firestore Rules

The application follows a **public read, protected write** model:

```javascript
// Anyone can read portfolio data
allow read: if true;

// Only authenticated users can write
allow write: if request.auth != null;
```

### Authentication Flow

1. Admin signs in via `/login`
2. Firebase Auth token is stored
3. `requireAuth()` function validates authentication before write operations
4. All write operations are protected at both client and server level

## Custom Hooks

### `useDoc`

Real-time document listener:
```typescript
const { data, loading, error } = useDoc<PortfolioData>('portfolio', 'main');
```

### `useCollection`

Real-time collection listener:
```typescript
const { data, loading, error } = useCollection<Project>('projects');
```

## AI Bio Generation

The portfolio includes AI-powered bio generation:

1. Configure your AI provider in `.env.local`:
```env
NEXT_PUBLIC_AI_PROVIDER=openai  # or 'anthropic'
NEXT_PUBLIC_OPENAI_API_KEY=your_key
```

2. Click "AI Generate" in the admin dashboard
3. The AI creates a professional bio based on your name, title, and skills

## Project Structure

```
kaisen.io/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── login/             # Login page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/                # ShadCN UI components
│   │   └── PortfolioPage.tsx  # Main portfolio component
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx    # Authentication context
│   ├── hooks/                 # Custom React hooks
│   │   ├── useDoc.ts          # Firestore document hook
│   │   └── useCollection.ts   # Firestore collection hook
│   ├── lib/                   # Utility libraries
│   │   ├── utils.ts           # Helper functions
│   │   ├── requireAuth.ts     # Auth middleware
│   │   ├── portfolio.ts       # Portfolio data service
│   │   └── aiGenerator.ts     # AI bio generation
│   └── config/                # Configuration files
│       └── firebase.ts        # Firebase initialization
├── firestore.rules            # Firestore security rules
├── .env.example               # Environment variables template
└── package.json               # Dependencies
```

## Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Backend**: Firebase (Firestore + Auth)
- **Icons**: Lucide React
- **AI**: OpenAI / Anthropic (optional)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The application can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Self-hosted

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ for the cybersecurity community