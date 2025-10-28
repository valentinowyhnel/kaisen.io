# Contributing to Kaisen.io

Thank you for your interest in contributing to Kaisen.io! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:

- Clear description of the feature
- Use case and benefits
- Potential implementation approach
- Any relevant examples or mockups

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/valentinowyhnel/kaisen.io.git
   cd kaisen.io
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm run lint
   npm run build
   npm run dev
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Submit for review

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- Firebase account (for testing)

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
   # Edit .env.local with your Firebase credentials
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use meaningful variable names

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Follow React best practices

### File Organization

```
src/
├── app/              # Next.js pages (App Router)
├── components/       # Reusable components
│   └── ui/          # UI components (buttons, inputs, etc.)
├── contexts/        # React contexts
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and services
└── config/          # Configuration files
```

### Naming Conventions

- **Files**: `camelCase.tsx` or `PascalCase.tsx` for components
- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add project filtering in admin dashboard
fix: resolve authentication redirect loop
docs: update Firebase setup instructions
style: format code with prettier
refactor: simplify portfolio data structure
```

## Testing

### Manual Testing

Before submitting a PR:

1. Test on different browsers (Chrome, Firefox, Safari)
2. Test responsive design (mobile, tablet, desktop)
3. Test authentication flow
4. Test data updates and real-time sync
5. Check console for errors

### Automated Testing (Future)

We plan to add:
- Unit tests (Jest)
- Integration tests (React Testing Library)
- E2E tests (Playwright)

## Documentation

### Code Documentation

- Add JSDoc comments for functions and components
- Explain complex logic with inline comments
- Update README.md if you add features
- Update SETUP.md for configuration changes

### Documentation Files

- `README.md` - Project overview and quick start
- `SETUP.md` - Detailed setup instructions
- `DEPLOYMENT.md` - Deployment guides
- `CONTRIBUTING.md` - This file

## Project Structure

### Key Files

- `src/app/` - Next.js App Router pages
- `src/components/` - React components
- `src/hooks/` - Custom hooks (useDoc, useCollection)
- `src/lib/` - Business logic and utilities
- `src/contexts/` - React contexts (Auth)
- `firestore.rules` - Firestore security rules

### Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration

## Feature Development Guidelines

### Adding a New Page

1. Create page in `src/app/[page-name]/page.tsx`
2. Update navigation if needed
3. Add route to documentation
4. Test responsive design

### Adding a New Component

1. Create component in `src/components/`
2. Use TypeScript with proper types
3. Follow existing component patterns
4. Make it reusable when possible

### Adding Firebase Features

1. Update Firestore rules in `firestore.rules`
2. Update TypeScript interfaces
3. Add service functions in `src/lib/`
4. Test security rules

### Adding UI Components

1. Place in `src/components/ui/`
2. Use Tailwind CSS for styling
3. Make components accessible
4. Follow ShadCN UI patterns

## Security

### Security Practices

- Never commit sensitive data (API keys, passwords)
- Use environment variables for configuration
- Validate user input
- Follow principle of least privilege
- Test Firebase security rules

### Reporting Security Issues

For security vulnerabilities, please create a private security advisory on GitHub instead of creating a public issue. Go to the Security tab and click "Report a vulnerability".

## Review Process

### What We Look For

- Code quality and readability
- Proper TypeScript usage
- Follows project conventions
- No breaking changes (unless discussed)
- Documentation updates
- Tests pass (build, lint)

### Timeline

- Initial review: Within 1 week
- Follow-up reviews: Within 3 days
- Merge: After approval from maintainer

## Community

### Getting Help

- Create an issue for questions
- Check existing issues first
- Be specific and provide context

### Communication

- Be respectful and constructive
- Provide helpful feedback
- Welcome new contributors

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes
- Project documentation (if significant contribution)

## Questions?

If you have questions about contributing, please:
1. Check existing documentation
2. Search closed issues
3. Create a new issue with the "question" label

Thank you for contributing to Kaisen.io! 🎉
