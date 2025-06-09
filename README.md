
# FreePropList - AI-Powered Real Estate Platform

A modern, AI-enhanced real estate platform built with React, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Bun (recommended) or npm
- Supabase account

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd freeproplist

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase URL and keys
```

### Environment Setup

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Development

```bash
# Start development server
bun run dev

# Type checking
bun run typecheck

# Build for production
bun run build
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom glassmorphism theme
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **State**: React Query, Context API
- **Icons**: Lucide React

### Key Features
- AI-powered property search and matching
- Real-time negotiation system
- Credit-based AI tool usage
- Role-based dashboards (Seeker, Agent, Developer, Admin)
- PWA with offline capabilities
- SEO optimization with JSON-LD

## 🗄️ Database Schema

### Core Tables
- `users` - User profiles and roles
- `listings` - Property listings
- `ai_tool_transactions` - Credit usage tracking
- `ai_negotiations` - AI-powered negotiations
- `listing_offers` - Special offers and discounts
- `saved_searches` - User saved search alerts

### AI Features Tables
- `ai_locality_reports` - AI-generated area insights
- `ai_listing_suggestions` - AI content suggestions
- `ai_followups` - Automated follow-up messages
- `ai_fraud_flags` - Fraud detection logs

## 🤖 AI Tools & Credit System

### Available AI Tools
| Tool | Credits | Description |
|------|---------|-------------|
| Property Search | 5 | AI-enhanced search with matching |
| Negotiation Chat | 100 | Real-time AI negotiation assistance |
| Listing Enhancement | 10 | AI content optimization |
| Locality Report | 15 | Comprehensive area analysis |
| Follow-up Generator | 3 | Automated message creation |

### Credit Management
- Users start with 100 free credits
- Credits are deducted per AI tool usage
- Admin can override credit limits
- Transaction logging for audit

## 🎨 Design System

### Color Scheme
- **AI Buttons**: Orange to red gradient (`from-orange-500 to-red-500`)
- **Manual Actions**: Orange outline (`bg-orange-100 text-orange-600`)
- **Glass Cards**: `bg-white/10 backdrop-blur-xl border-white/20`
- **Navigation**: White background with orange accents

### Typography
- **Headings**: Rajdhani font family
- **Body**: DM Sans font family
- **Display**: Orbitron for special elements

## 🔐 Security & RLS

### Row Level Security Policies
- Users can only access their own data
- Role-based access control (RBAC)
- Secure API endpoints with authentication
- Admin-only sensitive operations

### User Roles
- **Seeker**: Property buyers/renters
- **Agent**: Real estate agents
- **Developer**: Property developers
- **Admin**: Platform administrators

## 📱 Mobile & PWA

### Mobile Optimization
- Responsive design (360px+ support)
- Touch-friendly interface (44px+ tap targets)
- Glassmorphism effects optimized for mobile
- Progressive Web App (PWA) capabilities

### PWA Features
- Offline functionality
- App-like experience
- Push notifications (future)
- Install prompts

## 🚀 Deployment

### Build Process
```bash
# Type check
bun run typecheck

# Build optimized bundle
bun run build

# Preview build
bun run preview
```

### Supabase Setup
1. Create new Supabase project
2. Run SQL migrations from `/supabase/tables/`
3. Deploy Edge Functions from `/supabase/functions/`
4. Configure RLS policies
5. Set up authentication providers

### Environment Variables
```env
# Production
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Optional
VITE_STAGING_MODE=false
```

## 📋 Development Guidelines

### Code Standards
- TypeScript strict mode
- Flat types only (no nested structures)
- Modular component structure
- Custom hooks for business logic
- Edge Functions for server logic

### Component Structure
```
src/
├── components/
│   ├── common/          # Shared UI components
│   ├── layout/          # Layout components
│   ├── forms/           # Form components
│   └── [feature]/       # Feature-specific components
├── hooks/               # Custom React hooks
├── pages/               # Route components
├── types/               # TypeScript definitions
└── utils/               # Utility functions
```

## 🧪 Testing & QA

### Quality Assurance
- TypeScript strict checking
- Build verification
- Mobile responsiveness testing
- Cross-browser compatibility
- Performance optimization

### Admin Tools
- `/admin/devtools` - Development utilities
- AI usage monitoring
- Credit management
- User management

## 📊 Analytics & Monitoring

### Built-in Analytics
- AI tool usage tracking
- User engagement metrics
- Credit consumption monitoring
- Error logging and reporting

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@freeproplist.com or join our Discord community.

---

Built with ❤️ using Lovable AI Development Platform
