# 🎨 AkTech Website - Design Documentation

## Design Philosophy

The AkTech website embodies a **modern, digital-first aesthetic** that combines premium visual design with exceptional user experience. Every element has been crafted to create an engaging, professional, and memorable digital presence.

## 🌈 Color System

### Primary Colors
- **Indigo** `#6366f1` - Primary brand color, represents trust and innovation
- **Purple** `#8b5cf6` - Secondary color, adds vibrancy and creativity
- **Cyan** `#06b6d4` - Accent color, provides contrast and energy

### Gradients
```css
--gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--gradient-2: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)
--gradient-3: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)
```

### Neutrals
- **Dark** `#0f172a` - Text and dark backgrounds
- **Light** `#f1f5f9` - Light backgrounds and surfaces
- **Text** `#475569` - Body text color

## ✨ Key Design Features

### 1. **Glassmorphism Navigation**
The navigation bar features a frosted glass effect with:
- `backdrop-filter: blur(20px)` for the blur effect
- Semi-transparent white background `rgba(255, 255, 255, 0.8)`
- Subtle border with gradient accent
- Smooth shadow that intensifies on scroll

### 2. **Gradient Text Effects**
Headlines and important text use gradient fills:
```css
background: var(--gradient-2);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### 3. **Animated Backgrounds**
Multiple layers of subtle animations create depth:
- Radial gradients that pulse
- Mesh gradients that shift
- Pattern overlays that move

### 4. **Card Design System**

#### Feature Cards
- 20px border radius for modern feel
- Elevated with layered shadows
- Hover: `translateY(-15px) scale(1.02)`
- Background gradient overlay on hover
- Icon scales and rotates on interaction

#### Service Cards
- Gradient backgrounds `linear-gradient(145deg, #ffffff, #f8fafc)`
- Radial gradient overlay on hover
- 4rem gradient icons
- Smooth 0.4s cubic-bezier transitions

#### Team Cards
- 4px gradient top border that scales on hover
- Member icons with gradient fill
- Hover lifts card by 10px
- Border changes to primary color

### 5. **Button Interactions**

#### Ripple Effect
Buttons have a ripple animation:
```css
.btn::before {
    /* Expanding circle on hover */
    width: 0 → 300px;
    height: 0 → 300px;
}
```

#### Magnetic Effect (JavaScript)
Buttons follow cursor movement:
```javascript
transform: translate(${x * 0.1}px, ${y * 0.1}px)
```

### 6. **Custom Cursor**
Desktop users see an enhanced cursor:
- Small dot that follows directly
- Larger outline with slight delay
- Scales up on interactive elements
- Gradient colors matching brand

### 7. **Scroll Effects**

#### Progress Bar
Fixed bar at top showing page scroll progress:
- 4px height
- Gradient background
- Smooth width transition

#### Parallax Hero
Hero section moves at 0.5x scroll speed creating depth

#### Reveal Animations
Elements fade in as they enter viewport:
```css
@keyframes reveal {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
```

## 🎭 Animation Timing

All animations use carefully chosen timing functions:

- **Buttons**: `cubic-bezier(0.4, 0, 0.2, 1)` - Snappy and responsive
- **Cards**: `0.4s ease` - Smooth and elegant
- **Scroll**: `0.3s ease` - Quick feedback
- **Hover**: `0.4s cubic-bezier(0.4, 0, 0.2, 1)` - Natural feel

## 📐 Spacing System

Consistent spacing creates visual rhythm:
- **Sections**: 100px vertical padding
- **Cards**: 40-50px internal padding
- **Elements**: 20-30px margins
- **Gaps**: 25-30px in grids

## 🔤 Typography

### Font: Inter
Modern, clean, highly legible sans-serif from Google Fonts

### Font Weights
- **400** - Regular body text
- **500** - Medium emphasis
- **600** - Semi-bold labels
- **700** - Bold headings
- **800** - Extra-bold titles
- **900** - Black for highlight text

### Font Sizes
- **Hero**: 3.5rem (56px)
- **H1**: 3rem (48px)
- **H2**: 2.5-3rem (40-48px)
- **H3**: 1.4-1.8rem (22-28px)
- **Body**: 1rem (16px)
- **Small**: 0.95rem (15px)

## 🎯 Interactive States

### Hover States
- Cards lift up (translateY)
- Shadows intensify
- Colors brighten
- Icons scale/rotate
- Borders appear

### Focus States
- Input fields: glow effect with `box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1)`
- Links: underline expands from center
- Buttons: slight translation

### Active States
- Buttons scale down slightly
- Background darkens
- Shadow compresses

## 📱 Responsive Design

### Breakpoints
```css
@media (max-width: 768px) { /* Tablets */ }
@media (max-width: 480px) { /* Mobile */ }
```

### Mobile Adaptations
- Hamburger menu replaces horizontal nav
- Cards stack in single column
- Font sizes scale down
- Padding reduces
- Custom cursor disabled

## 🌟 Special Effects

### Pulse Animation
Product badges breathe:
```css
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}
```

### Float Animation
Icons and elements gently float:
```css
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}
```

### Shimmer Effect
Loading states and highlights shimmer across:
```css
@keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
}
```

## 🎨 Design Principles

1. **Consistency** - Repeated patterns throughout
2. **Hierarchy** - Clear visual weight differences
3. **Contrast** - Strong color and size contrasts
4. **Balance** - Symmetric and asymmetric balance
5. **Proximity** - Related items grouped
6. **White Space** - Generous breathing room
7. **Feedback** - Every interaction acknowledged
8. **Performance** - Smooth 60fps animations

## 🚀 Performance Considerations

- GPU-accelerated properties (transform, opacity)
- CSS containment where appropriate
- Debounced scroll handlers
- Lazy loading for images
- Minimal repaints/reflows
- Efficient selectors

---

**Design crafted with ❤️ for optimal user experience**
