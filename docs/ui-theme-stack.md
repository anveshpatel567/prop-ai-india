
## UI Theme Stack (Admin Panels)

### Current Implementation Analysis

**Buttons:**
- Primary: `bg-primary text-primary-foreground hover:bg-primary/90` (shadcn defaults)
- Secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80`
- Outline: `border border-input bg-background hover:bg-accent hover:text-accent-foreground`

**Badges:**
- Default: `bg-primary text-primary-foreground` 
- Variant outline: `text-foreground`
- Custom colors used: `bg-red-100 text-red-700`, `bg-green-100 text-green-700`, `bg-yellow-100 text-yellow-700`, `bg-blue-100 text-blue-700`, `bg-orange-100 text-orange-700`, `bg-purple-100 text-purple-700`

**Cards:**
- Background: `bg-card text-card-foreground`
- Border: `border`
- Shadow: `shadow-sm`
- Rounded: `rounded-lg`

**Tables/Lists:**
- No custom table styling implemented
- Using basic `space-y-4` for list spacing

**Headings:**
- H2: `text-lg font-bold text-orange-600` (ONLY orange usage found)
- CardTitle: `text-2xl font-semibold leading-none tracking-tight`

**Backgrounds:**
- Card content: `bg-gradient-to-br from-white to-gray-50`
- Specific colored backgrounds: `bg-orange-50`, `bg-red-50`, `bg-green-50`, `bg-blue-50`, `bg-yellow-50`, `bg-purple-50`
- Main background: `bg-background`

**Text Colors:**
- Primary: `text-card-foreground`
- Secondary: `text-gray-500`, `text-gray-600`, `text-gray-700`
- Accent colors: `text-orange-600` (limited usage)

**Glow Effects:** No

**Gradient Use:** 
- Yes, minimal usage:
  - `bg-gradient-to-br from-white to-gray-50` (subtle card gradients)
  - `bg-gradient-to-br from-red-50 to-orange-50` (failure events)
  - `bg-gradient-to-br from-cyan-50 to-blue-50` (edge logs)
  - `bg-gradient-to-br from-purple-50 to-pink-50` (learning feedback)

### ⚠️ THEME COMPLIANCE STATUS: NON-COMPLIANT

**Issues Identified:**
1. **Missing Fiery-Orange Theme**: Despite claims, the admin panels do NOT implement a consistent fiery-orange theme
2. **Inconsistent Color Usage**: Scattered use of various colors (red, blue, green, yellow, purple) without a cohesive orange-based palette
3. **Limited Orange Implementation**: Only `text-orange-600` is used for some headings
4. **No Fire/Gradient System**: Missing the fire-gradient classes and fiery color system mentioned in design requirements
5. **Default shadcn Colors**: Most components use default shadcn/ui color tokens instead of custom orange theme

### REQUIRED ACTIONS:
- Implement consistent fiery-orange color palette across all admin panels
- Replace scattered color usage with orange-based variants
- Add fire-gradient backgrounds and glow effects as specified
- Update badge system to use orange-themed variants
- Apply consistent orange-based typography colors
