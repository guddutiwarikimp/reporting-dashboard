# ECharts Project Structure

This project follows a well-organized, scalable architecture with clear separation of concerns.

## Directory Structure

```
EchartjsProject/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Main page
│   │   └── globals.css        # Global styles
│   ├── components/             # UI Component Library
│   │   ├── charts/            # Chart-specific components
│   │   │   ├── EChartsComponent.tsx
│   │   │   ├── ChartContainer.tsx
│   │   │   └── ChartsDemo.tsx
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── ChartSelector.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   └── layout/            # Layout components
│   ├── types/                 # TypeScript type definitions
│   │   ├── chart.ts           # Chart-related types
│   │   └── index.ts           # Type exports
│   ├── constants/             # Application constants
│   │   ├── chartTypes.ts      # Chart type definitions
│   │   ├── theme.ts           # Theme constants
│   │   └── index.ts           # Constant exports
│   ├── utils/                 # Helper functions
│   │   ├── theme.ts           # Theme utilities
│   │   └── index.ts           # Utility exports
│   └── hooks/                 # Custom React hooks
│       ├── useTheme.ts        # Theme management hook
│       ├── useChartData.ts    # Chart data management hook
│       └── index.ts           # Hook exports
├── public/                    # Static assets
│   └── chartData.json        # Chart configuration data
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## Architecture Principles

### 1. **Separation of Concerns**
- **Components**: UI logic and presentation
- **Hooks**: Business logic and state management
- **Types**: Type definitions and interfaces
- **Utils**: Pure utility functions
- **Constants**: Application-wide constants

### 2. **Component Organization**
- **charts/**: Domain-specific chart components
- **ui/**: Reusable, generic UI components
- **layout/**: Layout and structural components

### 3. **Type Safety**
- Centralized type definitions
- Consistent interfaces across components
- Proper TypeScript usage throughout

### 4. **Reusability**
- Modular component design
- Custom hooks for common functionality
- Utility functions for shared logic

### 5. **Maintainability**
- Clear file naming conventions
- Logical grouping of related functionality
- Easy to locate and modify specific features

## Key Features

### Theme Management
- System theme detection
- Light/dark mode toggle
- Consistent color schemes
- CSS custom properties

### Chart Management
- Multiple chart types support
- Dynamic chart switching
- Theme-aware chart rendering
- Error handling and loading states

### Component Library
- Reusable UI components
- Consistent styling patterns
- Accessibility considerations
- Responsive design

## Usage Examples

### Importing Components
```typescript
import { ChartsDemo, ChartSelector, ThemeToggle } from "@/components";
```

### Using Hooks
```typescript
import { useTheme, useChartData } from "@/hooks";
```

### Type Definitions
```typescript
import { ChartType, Theme, ChartData } from "@/types";
```

## Development Guidelines

1. **New Components**: Place in appropriate subdirectory under `components/`
2. **New Types**: Add to `types/` directory and export via index
3. **New Hooks**: Add to `hooks/` directory and export via index
4. **New Utils**: Add to `utils/` directory and export via index
5. **Constants**: Add to `constants/` directory and export via index

This structure ensures scalability, maintainability, and a clean development experience.
