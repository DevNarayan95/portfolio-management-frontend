<div align="center">
  <h1>📊 Portfolio Management System (PMS) - Frontend</h1>
  <p><strong>Professional Investment Portfolio Management Web Application</strong></p>
  
  [![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![Zustand](https://img.shields.io/badge/Zustand-4.x-FF6B6B?style=flat-square)](https://github.com/pmndrs/zustand)
  
  [📚 Full Documentation](https://devnarayan95.github.io/portfolio-management-docs/) • [🌐 Live Demo](#) • [🚀 Quick Start](#-quick-start)
</div>

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [🏗️ Project Structure](#️-project-structure)
- [🌍 Environment Configuration](#-environment-configuration)
- [📝 Available Scripts](#-available-scripts)
- [🎨 Pages & Features](#-pages--features)
- [🐳 Docker Setup](#-docker-setup)
- [🧪 Testing](#-testing)
- [🔒 Security](#-security)
- [🤝 Contributing](#-contributing)

<br>

## ✨ Features

### 🎯 Core Features

- ✅ **Authentication System** - Secure login/register with JWT tokens
- ✅ **Dashboard Analytics** - Real-time portfolio overview and performance metrics
- ✅ **Portfolio Management** - Create, view, update, and delete portfolios
- ✅ **Investment Tracking** - Manage investments across 4 asset classes
  - 💰 Mutual Funds
  - 📈 Stocks
  - 📊 Bonds
  - ₿ Cryptocurrency
- ✅ **SIP Management** - Track systematic investment plans
- ✅ **Transaction History** - Complete buy/sell transaction records
- ✅ **Performance Analytics** - Gain/loss calculations, ROI, and trends
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Interactive Charts** - Visual data representation with Recharts

### 🔧 Technical Features

- ⚡ **Lightning Fast** - Vite-powered development with HMR
- 🎨 **Modern UI** - TailwindCSS with custom design system
- 🔄 **State Management** - Zustand for efficient global state
- 🛡️ **Type Safety** - Full TypeScript implementation
- 🔐 **Secure** - Token-based authentication, protected routes
- 📱 **PWA Ready** - Progressive Web App capabilities
- ♿ **Accessible** - WCAG 2.1 compliant
- 🌐 **API Integration** - Axios with interceptors and error handling

<br>

## 🛠️ Tech Stack

<table>
  <tr>
    <td align="center" width="16.66%">
      <img src="https://raw.githubusercontent.com/vitejs/vite/main/docs/public/logo.svg" width="60" alt="Vite"/>
      <br><strong>Vite</strong><br/>5.x
    </td>
    <td align="center" width="16.66%">
      <img src="https://raw.githubusercontent.com/facebook/react/main/fixtures/logo.svg" width="60" alt="React"/>
      <br><strong>React</strong><br/>18.x
    </td>
    <td align="center" width="16.66%">
      <img src="https://www.typescriptlang.org/favicon.ico" width="60" alt="TypeScript"/>
      <br><strong>TypeScript</strong><br/>5.x
    </td>
    <td align="center" width="16.66%">
      <img src="https://tailwindcss.com/favicons/favicon-32x32.png" width="60" alt="TailwindCSS"/>
      <br><strong>Tailwind</strong><br/>3.x
    </td>
    <td align="center" width="16.66%">
      <img src="https://axios-http.com/assets/favicon.ico" width="60" alt="Axios"/>
      <br><strong>Axios</strong><br/>1.6+
    </td>
    <td align="center" width="16.66%">
      <img src="https://www.docker.com/favicon.ico" width="60" alt="Docker"/>
      <br><strong>Docker</strong><br/>24+
    </td>
  </tr>
</table>

### Additional Libraries

- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Class Validator** - Runtime validation
- **Jest & Cypress** - Testing frameworks

<br>

## 📦 Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Backend API** - Portfolio Management Backend running
- **Docker** >= 24.0 (optional)

### 🔍 Verify Installations

```bash
node --version    # v18.x.x or higher
npm --version     # 9.x.x or higher
docker --version  # 24.x or higher (optional)
```

<br>

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/DevNarayan95/portfolio-management-frontend.git
cd portfolio-management-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration (see [Environment Configuration](#-environment-configuration))

### 4️⃣ Start Development Server

```bash
npm run dev
```

You should see:

```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3001/
  ➜  Network: http://192.168.1.x:3001/
  ➜  press h to show help
```

### 5️⃣ Access Application

- **Application**: http://localhost:3001
- **Login Page**: http://localhost:3001/login
- **Dashboard**: http://localhost:3001/dashboard (after login)

### 6️⃣ Backend Setup

Make sure the backend API is running:

```bash
# Backend should be running at http://localhost:3000
# See backend README for setup instructions
```

<br>

## 🏗️ Project Structure

```
portfolio-management-frontend/
├── public/                  # Static assets
│   ├── favicon.ico
│   └── logo.png
├── src/
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable components
│   │   ├── common/        # Shared components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Loader.tsx
│   │   ├── layout/        # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── charts/        # Chart components
│   │   │   ├── PerformanceChart.tsx
│   │   │   ├── AllocationChart.tsx
│   │   │   └── TrendChart.tsx
│   │   └── forms/         # Form components
│   │       ├── LoginForm.tsx
│   │       ├── RegisterForm.tsx
│   │       └── InvestmentForm.tsx
│   ├── pages/              # Page components
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Portfolio.tsx
│   │   ├── PortfolioDetail.tsx
│   │   ├── Investment.tsx
│   │   ├── InvestmentDetail.tsx
│   │   ├── Transactions.tsx
│   │   ├── SIP.tsx
│   │   ├── Analytics.tsx
│   │   ├── Profile.tsx
│   │   └── NotFound.tsx
│   ├── services/           # API services
│   │   ├── api.ts         # Axios instance
│   │   ├── auth.service.ts
│   │   ├── portfolio.service.ts
│   │   ├── investment.service.ts
│   │   ├── transaction.service.ts
│   │   └── dashboard.service.ts
│   ├── store/              # Zustand stores
│   │   ├── auth.store.ts
│   │   ├── portfolio.store.ts
│   │   ├── investment.store.ts
│   │   └── ui.store.ts
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── usePortfolio.ts
│   │   ├── useInvestment.ts
│   │   └── useDebounce.ts
│   ├── utils/              # Utility functions
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── types/              # TypeScript types
│   │   ├── auth.types.ts
│   │   ├── portfolio.types.ts
│   │   ├── investment.types.ts
│   │   └── api.types.ts
│   ├── routes/             # Route configuration
│   │   ├── AppRoutes.tsx
│   │   └── ProtectedRoute.tsx
│   ├── styles/             # Global styles
│   │   ├── index.css
│   │   └── tailwind.css
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── vite-env.d.ts       # Vite types
├── cypress/                # E2E tests
│   ├── e2e/
│   ├── fixtures/
│   └── support/
├── tests/                  # Unit tests
│   └── components/
├── .env.example            # Environment template
├── .eslintrc.json          # ESLint config
├── .prettierrc             # Prettier config
├── cypress.config.ts       # Cypress config
├── jest.config.js          # Jest config
├── postcss.config.js       # PostCSS config
├── tailwind.config.js      # Tailwind config
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
├── Dockerfile              # Docker image
├── docker-compose.yml      # Docker compose
└── package.json            # Dependencies
```

<br>

## 🌍 Environment Configuration

### .env.example

```env
# ==============================================
# APPLICATION CONFIGURATION
# ==============================================
VITE_APP_NAME=Portfolio Management System
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Track and manage your investment portfolios

# ==============================================
# API CONFIGURATION
# ==============================================
# Backend API URL
VITE_API_BASE_URL=http://localhost:3000

# API Endpoints
VITE_API_AUTH_ENDPOINT=/auth
VITE_API_PORTFOLIO_ENDPOINT=/portfolios
VITE_API_INVESTMENT_ENDPOINT=/investments
VITE_API_TRANSACTION_ENDPOINT=/transactions
VITE_API_DASHBOARD_ENDPOINT=/dashboard

# ==============================================
# ENVIRONMENT
# ==============================================
VITE_ENV=development
# Options: development | staging | production

# ==============================================
# FEATURE FLAGS
# ==============================================
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PWA=false
VITE_ENABLE_DEBUG=true

# ==============================================
# APPLICATION SETTINGS
# ==============================================
VITE_DEFAULT_LANGUAGE=en
VITE_DEFAULT_CURRENCY=USD
VITE_ITEMS_PER_PAGE=10

# ==============================================
# AUTHENTICATION
# ==============================================
VITE_TOKEN_STORAGE_KEY=pms_access_token
VITE_REFRESH_TOKEN_STORAGE_KEY=pms_refresh_token
VITE_USER_STORAGE_KEY=pms_user

# ==============================================
# UI CONFIGURATION
# ==============================================
VITE_THEME_MODE=light
# Options: light | dark | system

# Chart Colors
VITE_CHART_PRIMARY_COLOR=#3B82F6
VITE_CHART_SUCCESS_COLOR=#10B981
VITE_CHART_DANGER_COLOR=#EF4444
VITE_CHART_WARNING_COLOR=#F59E0B

# ==============================================
# PERFORMANCE
# ==============================================
VITE_API_TIMEOUT=30000
# API request timeout in milliseconds

VITE_DEBOUNCE_DELAY=300
# Debounce delay for search/filter in milliseconds

# ==============================================
# DEVELOPER INFO
# ==============================================
VITE_DEVELOPER_NAME=Narayan Shaw
VITE_DEVELOPER_EMAIL=nshaw.dev@gmail.com
```

### Environment Files

- `.env` - Active environment (never commit)
- `.env.example` - Template (commit to git)
- `.env.development` - Development settings
- `.env.staging` - Staging settings
- `.env.production` - Production settings

**⚠️ Never commit `.env` files to git!**

<br>

## 📝 Available Scripts

### Development

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run build:staging    # Build for staging
npm run build:production # Build for production
npm run preview          # Preview production build
npm run preview:staging  # Preview staging build
```

### Code Quality

```bash
npm run lint             # Lint code
npm run lint:fix         # Fix linting issues
npm run format           # Format with Prettier
npm run format:check     # Check formatting
npm run type-check       # Type check without emitting
npm run validate         # Run all checks
```

### Testing

```bash
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run cypress          # Open Cypress
npm run cypress:headless # Run Cypress headless
```

### Docker

```bash
npm run docker:build     # Build Docker image
npm run docker:run       # Run Docker container
```

<br>

## 🎨 Pages & Features

### 🔐 Authentication Pages

#### Login (`/login`)

- Email/password authentication
- "Remember me" functionality
- Password visibility toggle
- Forgot password link
- Redirect to register page

#### Register (`/register`)

- User registration form
- Email validation
- Password strength indicator
- Terms and conditions checkbox
- Auto-login after successful registration

### 📊 Dashboard Page (`/dashboard`)

**Overview Section**

- Total portfolio value
- Total gain/loss (amount & percentage)
- Number of active portfolios
- Number of investments
- Recent transaction summary

**Charts & Analytics**

- Portfolio performance over time (line chart)
- Asset allocation by type (pie chart)
- Top performing investments
- Recent activity timeline

**Quick Actions**

- Create new portfolio
- Add investment
- View all portfolios
- View all transactions

### 💼 Portfolio Pages

#### Portfolio List (`/portfolios`)

- Grid/list view toggle
- Portfolio cards with:
  - Portfolio name and description
  - Total value
  - Gain/loss
  - Number of investments
  - Asset allocation preview
- Create new portfolio button
- Search and filter options
- Sort by (name, value, performance)

#### Portfolio Detail (`/portfolios/:id`)

- Portfolio overview metrics
- Investment list table
- Performance chart
- Asset allocation chart
- Edit/delete portfolio actions
- Add investment button
- Transaction history

### 📈 Investment Pages

#### Investment List (`/investments`)

- All investments across portfolios
- Filterable by:
  - Asset type (Mutual Funds, Stocks, Bonds, Crypto)
  - Portfolio
  - Performance (gainers/losers)
- Sortable columns:
  - Name, Type, Investment amount, Current value, Gain/Loss
- Search functionality
- Bulk actions

#### Investment Detail (`/investments/:id`)

- Investment overview
  - Asset name and symbol
  - Asset type
  - Purchase details
  - Current value
  - Performance metrics
- Performance chart over time
- Transaction history for this investment
- Related SIP details (if applicable)
- Edit/delete actions

### 💰 Transaction Pages

#### Transaction History (`/transactions`)

- Complete transaction log
- Filter by:
  - Type (Buy/Sell)
  - Asset type
  - Portfolio
  - Date range
- Export to CSV/PDF
- Transaction details modal

### 📅 SIP Management (`/sip`)

- Active SIPs list
- SIP details:
  - Investment name
  - Amount per installment
  - Frequency (Monthly/Quarterly)
  - Start/end date
  - Total invested
  - Current value
- Create new SIP
- Pause/Resume SIP
- SIP transaction history

### 📊 Analytics (`/analytics`)

- Advanced portfolio analytics
- Comparative performance charts
- Sector-wise allocation
- Risk analysis
- Historical trends
- Custom date range selection
- Export reports

### 👤 Profile (`/profile`)

- User information
- Account settings
- Change password
- Notification preferences
- Theme selection
- Language preferences
- Logout option

<br>

## 🐳 Docker Setup

### Dockerfile

The project includes a multi-stage Dockerfile for optimized production builds:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3001:80'
    environment:
      - VITE_API_BASE_URL=http://localhost:3000
    depends_on:
      - backend
    networks:
      - portfolio-network

networks:
  portfolio-network:
    external: true
```

### Quick Start with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop
docker-compose down

# Rebuild
docker-compose build --no-cache
```

<br>

## 🧪 Testing

### Unit Testing (Jest)

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### E2E Testing (Cypress)

```bash
# Interactive mode
npm run cypress

# Headless mode
npm run cypress:headless
```

### Test Structure

```
tests/
├── unit/
│   ├── components/
│   ├── services/
│   └── utils/
└── e2e/
    ├── auth.cy.ts
    ├── portfolio.cy.ts
    └── investment.cy.ts
```

<br>

## 🔒 Security

### Implemented Security Features

- ✅ JWT Token Management
- ✅ Automatic token refresh
- ✅ Protected routes
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Input validation & sanitization
- ✅ Secure HTTP headers
- ✅ Environment variable protection

### Best Practices

**🔐 Authentication**

- Tokens stored in memory or httpOnly cookies
- Automatic logout on token expiration
- Refresh token rotation
- Secure password handling

**🔐 API Security**

- Request/response interceptors
- Error handling
- Rate limiting awareness
- Timeout configuration

**🔐 Production**

- Environment variables never exposed
- HTTPS only
- Content Security Policy
- Regular dependency updates

<br>

## 🚀 Performance Optimization

### Build Optimization

- Code splitting with React.lazy
- Tree shaking
- Minification and compression
- Asset optimization

### Runtime Optimization

- Memoization with React.memo
- Lazy loading images
- Debounced search/filter
- Virtual scrolling for large lists

### Monitoring

```bash
# Analyze bundle size
npm run build
npx vite-bundle-visualizer
```

<br>

## 🎨 Theming & Customization

### TailwindCSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
      },
    },
  },
};
```

### Custom Themes

Users can switch between light/dark themes from the profile page.

<br>

## 🐛 Troubleshooting

### API Connection Issues

```bash
# Verify backend is running
curl http://localhost:3000/health

# Check environment variables
cat .env | grep VITE_API_BASE_URL

# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Build Errors

```bash
# Clear cache
rm -rf node_modules .vite dist

# Reinstall dependencies
npm install

# Type check
npm run type-check
```

### CORS Issues

Make sure backend CORS is configured:

```typescript
// Backend: main.ts
app.enableCors({
  origin: 'http://localhost:3001',
  credentials: true,
});
```

<br>

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio-management-frontend.git
   cd portfolio-management-frontend
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Commit your changes**

   ```bash
   git commit -m 'feat: add amazing feature'
   ```

   **Commit Convention:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation update
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `test:` - Add tests
   - `chore:` - Maintenance

5. **Push and create PR**
   ```bash
   git push origin feature/amazing-feature
   ```

### Code Quality

```bash
npm run validate  # Run all checks
npm run lint:fix  # Fix linting issues
npm run format    # Format code
```

<br>

## 📞 Support & Resources

### Documentation

- 📖 **Full Documentation**: https://devnarayan95.github.io/portfolio-management-docs/
- 📖 [React Docs](https://react.dev/)
- 📖 [Vite Docs](https://vitejs.dev/)
- 📖 [TailwindCSS Docs](https://tailwindcss.com/)
- 📖 [Zustand Docs](https://github.com/pmndrs/zustand)

### Community

- 💬 [GitHub Issues](https://github.com/DevNarayan95/portfolio-management-frontend/issues)
- 💬 [GitHub Discussions](https://github.com/DevNarayan95/portfolio-management-frontend/discussions)

### Related Repositories

- 🔗 [Backend Repository](https://github.com/DevNarayan95/portfolio-management-backend)
- 🔗 [Documentation](https://github.com/DevNarayan95/portfolio-management-docs)

### Contact

- **Developer**: Narayan Shaw
- **Email**: nshaw.dev@gmail.com
- **GitHub**: [@DevNarayan95](https://github.com/DevNarayan95)

<br>

## 🌟 Acknowledgments

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Recharts](https://recharts.org/) - Chart library
- [Axios](https://axios-http.com/) - HTTP client
- [React Router](https://reactrouter.com/) - Routing
- [Claude](https://claude.ai/) - AI assistance

<br>

---

<div align="center">

### Made with ❤️ by [Narayan Shaw](https://github.com/DevNarayan95)

**[⬆ Back to top](#-portfolio-management-system-pms---frontend)**

**[⭐ Star us on GitHub!](https://github.com/DevNarayan95/portfolio-management-frontend)**

**Version 1.0.0** • Last Updated: January 29, 2026

</div>
