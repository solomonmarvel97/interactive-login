# Interactive Login

A playful, animated login page where characters react to your input.

## Features

- **Mouse Tracking**: Characters' eyes follow your cursor in real-time.
- **Privacy Mode**: When typing in the password field, characters "look away" to respect your privacy.
- **Interactive Animations**: Smooth entrance and state transitions using Framer Motion.
- **Responsive Design**: Works on desktop and mobile (stacking layout).

## Usage

```tsx
import { InteractiveLogin } from '@/sd-components/d4ea2ac6-4533-48a5-97d0-28decbb17b74';

function App() {
  return <InteractiveLogin />;
}
```

## Props

The component is self-contained and currently accepts no external props for configuration, but can be easily extended.

## Dependencies

- `framer-motion`: For animations
- `lucide-react`: For icons
- `clsx` & `tailwind-merge`: For styling
