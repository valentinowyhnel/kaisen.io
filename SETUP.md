# Firebase Setup Guide

This guide will help you set up Firebase for your Kaisen.io cybersecurity portfolio.

## Prerequisites

- A Google account
- Node.js 18+ installed
- Firebase CLI (optional, but recommended)

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "kaisen-portfolio")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Register Your Web App

1. In the Firebase Console, click the web icon (`</>`) to add a web app
2. Enter an app nickname (e.g., "Kaisen Portfolio Web")
3. Check "Also set up Firebase Hosting" if you want to use Firebase Hosting (optional)
4. Click "Register app"
5. Copy the Firebase configuration object - you'll need this for your `.env.local` file

The configuration will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## Step 3: Enable Firestore Database

1. In the Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode" (we'll add security rules next)
4. Select a Cloud Firestore location (choose one close to your users)
5. Click "Enable"

## Step 4: Set Up Firestore Security Rules

1. In Firestore Database, go to the "Rules" tab
2. Replace the default rules with the content from `firestore.rules` in the project:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Portfolio collection - public read, authenticated write
    match /portfolio/{document=**} {
      // Anyone can read portfolio data
      allow read: if true;
      
      // Only authenticated users can write/update
      allow write, update, delete: if request.auth != null;
    }
    
    // Default deny all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click "Publish"

## Step 5: Enable Authentication

1. In the Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" provider:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"

## Step 6: Create Your Admin User

1. In the Authentication section, go to the "Users" tab
2. Click "Add user"
3. Enter your admin email and password
4. Click "Add user"

**Important**: Save these credentials securely. This is the account you'll use to access the admin dashboard.

## Step 7: Configure Environment Variables

1. In your project root, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

## Step 8: (Optional) Set Up AI Bio Generation

If you want to use AI-powered bio generation, configure one of these providers:

### Option A: OpenAI
1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_AI_PROVIDER=openai
   NEXT_PUBLIC_OPENAI_API_KEY=sk-...
   ```

### Option B: Anthropic (Claude)
1. Get an API key from [Anthropic](https://console.anthropic.com/)
2. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_AI_PROVIDER=anthropic
   NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...
   ```

### Option C: Mock (Development)
No configuration needed. The app will use a mock bio generator:
```env
NEXT_PUBLIC_AI_PROVIDER=mock
```

## Step 9: Initialize Portfolio Data

After setting up Firebase and starting your application:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`

3. Sign in with your admin credentials created in Step 6

4. Go to the admin dashboard at `http://localhost:3000/admin`

5. Fill in your portfolio information:
   - Name and title
   - Email and social links
   - Skills
   - Bio (or use AI to generate one)

6. Click "Save Changes"

7. View your portfolio at `http://localhost:3000`

## Step 10: (Optional) Install Firebase CLI

For easier deployment and management:

```bash
npm install -g firebase-tools
firebase login
firebase init
```

Select:
- Firestore (to deploy security rules)
- Hosting (if you want to deploy on Firebase Hosting)

## Troubleshooting

### "Firebase not initialized" error
- Make sure all environment variables are set in `.env.local`
- Restart the development server after changing environment variables

### "Permission denied" when writing to Firestore
- Check that you're signed in with the admin account
- Verify security rules are properly deployed
- Make sure the user is authenticated before trying to write data

### Cannot sign in
- Verify the admin user was created in Firebase Console
- Check that Email/Password authentication is enabled
- Ensure the email and password are correct

### Data not updating in real-time
- Check browser console for errors
- Verify Firestore security rules allow reading
- Make sure the Firestore database is in the same region/project

## Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use strong passwords** for your admin account
3. **Regularly review** Firebase security rules
4. **Enable 2FA** on your Firebase/Google account
5. **Monitor usage** in Firebase Console to detect unusual activity
6. **Limit API keys** to specific domains in production

## Next Steps

- Customize the portfolio design in `src/components/PortfolioPage.tsx`
- Add more fields to the portfolio schema in `src/lib/portfolio.ts`
- Deploy to Vercel, Netlify, or Firebase Hosting
- Set up a custom domain
- Add analytics to track visitors

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
