# Deployment Guide

This guide covers deploying your Kaisen.io cybersecurity portfolio to various platforms.

## Table of Contents

- [Vercel (Recommended)](#vercel-recommended)
- [Netlify](#netlify)
- [Firebase Hosting](#firebase-hosting)
- [Self-Hosted](#self-hosted)
- [Environment Variables](#environment-variables)

## Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

### Prerequisites
- GitHub account with your repository
- Vercel account (free tier available)

### Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - In the Vercel project settings, go to "Environment Variables"
   - Add all variables from `.env.local`:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
     NEXT_PUBLIC_FIREBASE_PROJECT_ID
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
     NEXT_PUBLIC_FIREBASE_APP_ID
     NEXT_PUBLIC_AI_PROVIDER
     NEXT_PUBLIC_OPENAI_API_KEY (if using OpenAI)
     NEXT_PUBLIC_ANTHROPIC_API_KEY (if using Anthropic)
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - Your site will be available at `https://your-project.vercel.app`

5. **Set up Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches and pull requests

## Netlify

### Steps

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Framework: Next.js

4. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add all Firebase and AI configuration variables

5. **Deploy**
   - Click "Deploy site"
   - Your site will be at `https://your-site.netlify.app`

## Firebase Hosting

Deploy alongside your Firebase backend.

### Prerequisites
- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project set up (see SETUP.md)

### Steps

1. **Login to Firebase**
   ```bash
   firebase login
   ```

2. **Initialize Hosting**
   ```bash
   firebase init hosting
   ```
   
   Select:
   - Use existing project
   - Public directory: `out`
   - Configure as SPA: No
   - Set up automatic builds: No

3. **Update `package.json`**
   Add export script:
   ```json
   {
     "scripts": {
       "export": "next build && next export"
     }
   }
   ```

4. **Build and Export**
   ```bash
   npm run build
   npx next export
   ```

5. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

6. **Your site will be at**: `https://your-project.web.app`

### Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

## Self-Hosted

Deploy on your own server or VPS.

### Prerequisites
- Server with Node.js 18+
- PM2 or similar process manager
- Nginx or Apache (recommended)

### Steps

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Transfer Files**
   Upload these directories to your server:
   - `.next/`
   - `public/`
   - `node_modules/`
   - `package.json`
   - `.env.local` (with production values)

3. **Install PM2**
   ```bash
   npm install -g pm2
   ```

4. **Start the Application**
   ```bash
   pm2 start npm --name "kaisen-io" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

## Environment Variables

### Required Variables

All platforms require these environment variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Optional Variables

```env
# AI Configuration (optional)
NEXT_PUBLIC_AI_PROVIDER=mock  # or 'openai' or 'anthropic'
NEXT_PUBLIC_OPENAI_API_KEY=
NEXT_PUBLIC_ANTHROPIC_API_KEY=
```

## Post-Deployment Checklist

- [ ] Verify the site loads correctly
- [ ] Test login functionality at `/login`
- [ ] Ensure admin dashboard works at `/admin`
- [ ] Check that portfolio data displays on homepage
- [ ] Test real-time updates (edit data in admin, see it update on homepage)
- [ ] Verify Firebase security rules are working
- [ ] Test on mobile devices
- [ ] Set up custom domain (if applicable)
- [ ] Configure SSL certificate
- [ ] Set up monitoring/analytics
- [ ] Create backups of Firestore data

## Security Considerations

### Production Checklist

- [ ] Use environment variables for all sensitive data
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS if needed
- [ ] Review and test Firestore security rules
- [ ] Limit Firebase API keys to specific domains
- [ ] Enable 2FA on admin accounts
- [ ] Set up Firebase App Check (advanced)
- [ ] Regular security audits
- [ ] Monitor Firebase usage quotas

### Firebase Console Settings

1. **Restrict API Key**
   - Go to Google Cloud Console
   - Navigate to Credentials
   - Edit your API key
   - Add website restrictions

2. **Set Usage Quotas**
   - Firebase Console → Firestore → Usage
   - Set daily limits to prevent abuse

3. **Enable Audit Logs**
   - Monitor authentication attempts
   - Track Firestore operations

## Performance Optimization

### Next.js Optimizations

1. **Enable Image Optimization**
   - Use Next.js `<Image>` component
   - Configure image domains in `next.config.ts`

2. **Static Generation**
   - Portfolio page can be statically generated
   - Admin pages remain dynamic

3. **Caching Strategy**
   - Configure CDN caching headers
   - Use Vercel's edge network

### Firestore Optimization

1. **Indexing**
   - Create composite indexes for queries
   - Monitor index usage in console

2. **Data Structure**
   - Denormalize data where appropriate
   - Minimize document reads

## Monitoring

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Firebase Performance Monitoring

1. Enable in Firebase Console
2. Add to your app:
```bash
npm install firebase
```

### Error Tracking

Consider adding:
- Sentry
- LogRocket
- Bugsnag

## Backup Strategy

### Firestore Backup

1. **Automated Backups**
   ```bash
   # Set up scheduled exports in Google Cloud Console
   ```

2. **Manual Export**
   ```bash
   gcloud firestore export gs://your-bucket/backups
   ```

### Version Control

- Keep all code in Git
- Tag releases: `git tag -a v1.0.0 -m "Release v1.0.0"`
- Maintain changelog

## Rollback Procedure

### Vercel
- Go to Deployments
- Find previous working deployment
- Click "Promote to Production"

### Firebase Hosting
```bash
firebase hosting:rollback
```

### Self-Hosted
```bash
pm2 list
pm2 delete kaisen-io
# Deploy previous version
pm2 start npm --name "kaisen-io" -- start
```

## Troubleshooting

### Build Failures

1. Check Node.js version matches requirements
2. Clear cache: `rm -rf .next`
3. Reinstall dependencies: `rm -rf node_modules && npm install`
4. Check environment variables are set

### Runtime Errors

1. Check browser console for errors
2. Verify Firebase configuration
3. Check Firestore security rules
4. Review server logs

### Performance Issues

1. Enable production mode
2. Check bundle size: `npx @next/bundle-analyzer`
3. Optimize images
4. Review Firestore queries

## Support

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [GitHub Issues](https://github.com/valentinowyhnel/kaisen.io/issues)
