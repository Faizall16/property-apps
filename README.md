# Property App

A modern property listing and management application built with Next.js, TanStack Query, and Tailwind CSS.

## Features

- **Authentication System**: Login and registration with form validation
- **Property Listings**: Browse properties with advanced filtering and search
- **User Profiles**: Manage user information and preferences
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Data Fetching**: Efficient data management with TanStack Query
- **Form Handling**: Robust form management with React Hook Form and Zod validation

## Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS 4
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Form Management**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **State Management**: React hooks and TanStack Query

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── properties/       # Property listings page
│   ├── profile/          # User profile page
│   ├── layout.js         # Root layout with providers
│   └── page.js           # Home page (redirects to properties)
├── components/           # Reusable UI components
│   ├── Header.js         # Navigation header
│   ├── LoginForm.js      # Login form component
│   ├── RegisterForm.js   # Registration form component
│   ├── PropertyList.js   # Property listings with filters
│   ├── Profile.js        # User profile management
│   └── QueryProvider.js  # TanStack Query provider
├── hooks/                # Custom React hooks
│   ├── useAuth.js        # Authentication hooks
│   └── useProperties.js  # Property data hooks
├── services/             # API service layer
│   ├── authService.js    # Authentication API calls
│   └── propertyService.js # Property API calls
└── lib/                  # Utility libraries
    └── api.js            # Axios configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd property-apps
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Configuration

The app is configured to work with the Swagger API at:
`https://app.swaggerhub.com/apis/ADMIN_186/Frontend/1.0.0`

Update the base URL in `src/lib/api.js` if you need to use a different API endpoint.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features in Detail

### Authentication

- User registration with validation
- User login with JWT tokens
- Protected routes and API calls
- Automatic token management

### Property Management

- Property listings with pagination
- Advanced filtering (status, location, type, price range)
- Search functionality
- Property booking system
- Responsive property cards

### User Profile

- Editable user information
- Account preferences
- Profile picture support
- Account statistics

### Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Consistent design system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
