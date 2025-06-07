

## UI Theme Stack (Admin Panels)

### Current Implementation Analysis

**Buttons:**
- Primary: `bg-primary text-primary-foreground hover:bg-primary/90` (shadcn defaults)
- Secondary: `bg-secondary text-secondary-foreground hover:bg-secondary/80`
- Outline: `border border-input bg-background hover:bg-accent hover:text-accent-foreground`

**Badges:**
- Default: `bg-primary text-primary-foreground` 
- Variant outline: `text-foreground`
- Custom colors used: `bg-red-100 text-red-700`, `bg-green-100 text-green-700`, `bg-yellow-100 text-yellow-700`, `bg-blue-100 text-blue-700`, `bg-gray-100 text-gray-700`, `bg-purple-100 text-purple-700`

**Cards:**
- Background: `bg-card text-card-foreground`
- Border: `border`
- Shadow: `shadow-sm`
- Rounded: `rounded-lg`

**Tables/Lists:**
- No custom table styling implemented
- Using basic `space-y-4` for list spacing

**Headings:**
- H2: `text-lg font-bold text-gray-700` (neutral color)
- CardTitle: `text-2xl font-semibold leading-none tracking-tight`

**Backgrounds:**
- Card content: `bg-gradient-to-br from-white to-gray-50`
- Specific colored backgrounds: `bg-gray-50`, `bg-red-50`, `bg-green-50`, `bg-blue-50`, `bg-yellow-50`, `bg-purple-50`
- Main background: `bg-background`

**Text Colors:**
- Primary: `text-card-foreground`
- Secondary: `text-gray-500`, `text-gray-600`, `text-gray-700`
- Accent colors: Neutral grays only

**Glow Effects:** No

**Gradient Use:** 
- Yes, minimal usage:
  - `bg-gradient-to-br from-white to-gray-50` (subtle card gradients)
  - `bg-gradient-to-br from-red-50 to-gray-50` (failure events)
  - `bg-gradient-to-br from-cyan-50 to-blue-50` (edge logs)
  - `bg-gradient-to-br from-purple-50 to-pink-50` (learning feedback)

### ✅ THEME COMPLIANCE STATUS: NEUTRAL

**Changes Applied:**
1. **Removed All Orange Classes**: Completely eliminated `text-orange-*`, `bg-orange-*`, `border-orange-*` classes
2. **Neutral Color Palette**: Replaced with muted grays and system colors
3. **Consistent Gray Usage**: All accent text now uses `text-gray-700` for consistency
4. **Updated Backgrounds**: Orange backgrounds replaced with neutral `bg-gray-50`
5. **Theme Token Compliance**: Using shadcn/ui default tokens where appropriate

### CURRENT COLOR SCHEME:
- Primary accent: Gray (`text-gray-700`, `bg-gray-50`)
- Status indicators: Red (errors), Green (success), Yellow (warnings), Blue (info)
- Background gradients: Subtle white-to-gray transitions
- No fire/orange theme elements present

