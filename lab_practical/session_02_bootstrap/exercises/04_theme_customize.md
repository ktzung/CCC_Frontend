# Exercise 2.4 — Customize Bootstrap Theme

## 🎬 Opening Scenario

*Default Bootstrap theme (indigo/purple) không phù hợp với brand. Bạn cần tùy biến thành teal/green color scheme và custom spacing.*

---

## 📋 Requirements

### 1. Override Primary Color

```css
/* Option A: Via CSS (quick) */
:root {
    --bs-primary: #14b8a6;        /* Teal 500 */
    --bs-primary-rgb: 20, 184, 166;
    --bs-secondary: #64748b;      /* Slate 500 */
}

/* Option B: Via Sass (recommended) */
$primary: #14b8a6;
$secondary: #64748b;
```

### 2. Custom Spacing Scale

```css
/* Add custom spacing class */
.py-section {
    padding-top: 5rem;
    padding-bottom: 5rem;
}

/* Custom gap for grids */
.gap-4 { gap: 2rem; }
```

### 3. Custom Border Radius

```css
/* Make cards rounder */
.card {
    border-radius: 16px;
}

/* Make buttons less rounded */
.btn {
    border-radius: 8px;
}

/* Make inputs more rounded */
.form-control, .form-select {
    border-radius: 10px;
}
```

### 4. Complete Custom Theme Example

```html
<!DOCTYPE html>
<html lang="en" data-bs-theme="light">
<head>
    <!-- Custom CSS override -->
    <style>
        :root {
            /* Primary: Teal */
            --bs-primary: #14b8a6;
            --bs-primary-hover: #0d9488;
            --bs-primary-rgb: 20, 184, 166;

            /* Secondary: Slate */
            --bs-secondary: #64748b;
            --bs-secondary-rgb: 100, 116, 139;

            /* Custom colors */
            --custom-success: #22c55e;
            --custom-warning: #f59e0b;
            --custom-danger: #ef4444;

            /* Typography */
            --bs-body-font-family: 'Inter', system-ui, sans-serif;
            --bs-body-font-size: 1rem;
            --bs-body-line-height: 1.6;

            /* Border radius */
            --bs-border-radius: 0.5rem;
            --bs-border-radius-sm: 0.375rem;
            --bs-border-radius-lg: 1rem;
        }

        /* Button styles */
        .btn-primary {
            background-color: var(--bs-primary);
            border-color: var(--bs-primary);
        }
        .btn-primary:hover {
            background-color: var(--bs-primary-hover);
            border-color: var(--bs-primary-hover);
        }

        /* Card styles */
        .card {
            border: none;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        /* Navbar styles */
        .navbar {
            box-shadow: 0 2px 15px rgba(0,0,0,0.05);
        }
    </style>
</head>
</html>
```

---

## 🎨 Complete Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Teal 500 | `#14b8a6` | Primary buttons, links |
| Teal 600 | `#0d9488` | Primary hover |
| Teal 100 | `#ccfbf1` | Light backgrounds |
| Slate 900 | `#0f172a` | Headers, dark text |
| Slate 700 | `#334155` | Body text |
| Slate 500 | `#64748b` | Secondary text |
| Slate 200 | `#e2e8f0` | Borders, dividers |
| Slate 50 | `#f8fafc` | Light backgrounds |

---

## 🐛 Hints

### Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### CSS Variable Override Order
```css
/* 1. Override Bootstrap default */
:root {
    --bs-primary: #newcolor;
}

/* 2. Additional custom properties */
:root {
    --custom-primary: #14b8a6;
    --custom-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

/* 3. Component-specific overrides */
.navbar {
    box-shadow: var(--custom-shadow);
}
```

### Bootstrap Reboot
```css
/* Override Bootstrap reboot defaults */
body {
    font-family: 'Inter', system-ui, sans-serif;
    background-color: #f8fafc;
}
```

---

## ✅ Success Criteria

- [ ] Primary color changed to teal
- [ ] Button styles updated
- [ ] Card border-radius increased
- [ ] Typography consistent (Inter font)
- [ ] Shadow effects consistent
- [ ] Color palette documented in CSS comments

---

**← [ Quay lại Session 2](../README.md) | Kết thúc Session 2 →**