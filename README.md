# ResumeRise — AI-Powered Online Resume Builder 🚀

<p align="center">
  <img src="frontend/public/rb-logo.png" alt="ResumeRise Logo" width="120" />
</p>

<p align="center">
  <b>Build ATS-friendly, high-converting resumes in minutes with intelligent AI writing assistance and real-time interactive previews.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-13.5-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/OpenAI-GPT--4o--Mini-412991?style=for-the-badge&logo=openai" alt="OpenAI" />
</p>

---

## 🌟 Key Features

### 🤖 AI Writing Assistant (Resume Copilot)
- **Profile Summaries**: Enter a short prompt or role title and generate compelling, ATS-optimized 2–4 sentence executive summaries.
- **Work Experience Achievements**: Convert rough bullet points into quantified, high-impact accomplishments following the Google **XYZ formula** (*Accomplished [X], as measured by [Y], by doing [Z]*).
- **Project Descriptions**: Generate concise technical overviews highlighting architecture, tech stacks, and measurable business impact.
- **Quota-Resilient Fallback Engine**: Built-in smart contextual resume copy generator ensures the AI assistant remains responsive even if third-party OpenAI quota limits are reached.

### 🎨 Modern SaaS Studio & Live A4 Previews
- **Real-Time Interactive Editor**: Edit on the left, watch your changes reflect instantaneously on the right.
- **Dynamic A4 Zoom Controls**: Zoom out (70%), zoom in (130%), or reset to 100% to preview your exact printable document.
- **Section Progress Tracker**: Live progress bar and counter (`X / 6 Sections Ready`) keeps track of resume readiness.
- **Authentic Scaled Previews**: Dashboard cards and template pickers render actual miniaturized A4 layouts using dynamic CSS auto-scaling (no generic skeleton placeholders).
- **One-Click Layout Switching**: Easily switch between templates on the fly without losing entered data.

### 📄 4 Tailored ATS-Optimized Templates
1. **Minimalist Clean** (`black_white_minimalist`): Elegant monochrome typography for software engineers and technical leads.
2. **Modern Professional** (`professionalModern`): Two-column layout with subtle cyan accents for modern corporate roles.
3. **Academic & Classic** (`professionalMinimalList`): Traditional structured serif formatting for academia, research, and legal positions.
4. **College & Fresh Graduate** (`WhiteSimpleCollegeAndFreshGraduate`): Clean layout highlighting education, coursework, and early projects.

### 🔒 Security & User Management
- **Official Google OAuth 2.0**: Fast one-click sign-in and sign-up with Google profile sync.
- **Email / Password Authentication**: Secure password hashing with `bcrypt` and stateless `JWT` token authorization.
- **Print & PDF Export**: Clean vector-accurate browser printing directly to PDF with `@media print` CSS overrides.
- **Aesthetic Dark / Light Modes**: Electric cyan & purple ambient glow matching the brand palette.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | [Next.js 13 (App Router)](https://nextjs.org/), [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) |
| **Backend** | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Mongoose](https://mongoosejs.com/) |
| **Database** | [MongoDB Atlas / Community Edition](https://www.mongodb.com/) |
| **Authentication** | [Google OAuth 2.0 (@react-oauth/google & google-auth-library)](https://developers.google.com/identity), [JWT (jsonwebtoken)](https://jwt.io/), [bcryptjs](https://www.npmjs.com/package/bcryptjs) |
| **AI Integration** | [OpenAI API (gpt-4o-mini)](https://platform.openai.com/) with smart contextual fallback |

---

## 📂 Project Structure

```text
online-resume-builder/
├── backend/                   # Express.js REST API Server
│   ├── config/                # Database & server configuration
│   ├── controllers/           # Route logic (auth, resume, AI)
│   ├── middlewares/           # JWT verification & error handling
│   ├── models/                # Mongoose schemas (User, Resume)
│   ├── routes/                # API route definitions
│   ├── uploads/               # Temporary uploads & user assets (ignored)
│   ├── .env.example           # Backend environment variables template
│   ├── .gitignore             # Backend Git ignore rules
│   ├── package.json           # Backend dependencies
│   └── server.js              # Entrypoint server script
│
├── frontend/                  # Next.js 13 App Router Frontend
│   ├── app/                   # App Router pages and layouts
│   │   ├── (auth)/            # Sign-in and sign-up pages
│   │   ├── dashboard/         # User workspace dashboard
│   │   ├── resume-templates/  # Template gallery & [resumeId] Studio Editor
│   │   ├── globals.css        # Custom scrollbars & ambient styles
│   │   └── page.tsx           # Modern SaaS landing page
│   ├── components/            # Reusable UI components
│   │   ├── ai/                # AI assistant modal & trigger buttons
│   │   ├── forms/             # Section forms (Profile, Experience, etc.)
│   │   ├── templates/         # 4 A4 printable resume templates
│   │   └── ui/                # Radix UI primitives & theme controls
│   ├── constants/             # Template definitions & presets
│   ├── utils/                 # Axios instance & API path constants
│   ├── .env.example           # Frontend environment variables template
│   ├── .gitignore             # Frontend Git ignore rules
│   ├── next.config.js         # Next.js configuration
│   └── package.json           # Frontend dependencies
│
├── .gitignore                 # Root-level Git safeguard
└── README.md                  # Project documentation
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js**: `v18.0.0` or later
- **npm** or **yarn** / **pnpm**
- **MongoDB**: A running local MongoDB instance or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

---

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/online-resume-builder.git
cd online-resume-builder
```

---

### 2. Configure Backend
1. Navigate to the `backend` folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create your local `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
3. Update the values in `backend/.env`:
   ```env
   PORT=8000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/resume-builder?retryWrites=true&w=majority
   DB_NAME=resume-builder
   JWT_SECRET=your_super_secret_jwt_key

   # Google OAuth 2.0 (From Google Cloud Console)
   GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # OpenAI API Key (Optional for AI assistant)
   OPENAI_API_KEY=sk-proj-your_openai_api_key
   ```
4. Start the backend API server:
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```
   The backend will be live at `http://localhost:8000`. Verify with `http://localhost:8000/api/health`.

---

### 3. Configure Frontend
1. In a new terminal, navigate to the `frontend` folder and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Create your local `.env.local` file from the example:
   ```bash
   cp .env.example .env.local
   ```
3. Update `frontend/.env.local`:
   ```env
   # Google OAuth Client ID (Must match backend GOOGLE_CLIENT_ID)
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application!

---

## 📡 API Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user with email/password | No |
| `POST` | `/api/auth/login` | Login user & return JWT token | No |
| `POST` | `/api/auth/google` | Google OAuth verification & account sync | No |
| `GET` | `/api/auth/profile` | Get current authenticated user profile | **Yes** |

### Resumes (`/api/resume`)
| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/resume` | Retrieve all resumes for authenticated user | **Yes** |
| `POST` | `/api/resume` | Create a new resume | **Yes** |
| `GET` | `/api/resume/:id` | Get full resume details by ID | **Yes** |
| `PUT` | `/api/resume/:id` | Update resume sections & template | **Yes** |
| `POST` | `/api/resume/:id/duplicate` | Duplicate an existing resume | **Yes** |
| `DELETE` | `/api/resume/:id` | Permanently delete a resume | **Yes** |

### AI Resume Assistant (`/api/ai`)
| Method | Endpoint | Description | Protected |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/ai/generate-description` | Generate ATS copy for Summary, Experience, or Project | **Yes** |

---

## 🔒 Security Best Practices
- **Environment Isolation**: `.env`, `.env.local`, and sensitive secrets are strictly excluded via `.gitignore` files at the root, backend, and frontend levels.
- **Safe Template Files**: `.env.example` files are provided in both directories so developers can configure credentials safely without committing sensitive data.
- **CORS Protection**: Configured in Express to only permit authorized origins.
- **Stateless Tokens**: Auth tokens expire and are validated per request via bearer authentication.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

