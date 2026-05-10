# Exercise 3.3 — Contact Form Validation

## 🎬 Opening Scenario

*Contact form cần validation real-time: kiểm tra email format, name required, message min length. Error messages hiển thị inline.*

---

## 📋 Requirements

### HTML Structure

```html
<form id="contact-form" class="contact-form">
    <div class="form-group">
        <label for="name">Full Name</label>
        <input type="text" id="name" name="name" required>
        <span class="error-message" id="name-error"></span>
    </div>

    <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" required>
        <span class="error-message" id="email-error"></span>
    </div>

    <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
        <span class="error-message" id="message-error"></span>
    </div>

    <button type="submit" class="submit-btn">Send Message</button>
</form>

<div id="success-message" class="success-message" hidden>
    Message sent successfully!
</div>
```

### JavaScript Implementation

```javascript
// 1. Select form elements
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('success-message');

// 2. Validation rules
const validators = {
    name: {
        validate: (value) => value.trim().length >= 2,
        message: 'Name must be at least 2 characters'
    },
    email: {
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Please enter a valid email address'
    },
    message: {
        validate: (value) => value.trim().length >= 10,
        message: 'Message must be at least 10 characters'
    }
};

// 3. Show/hide error
function showError(input, message) {
    input.classList.add('error');
    input.classList.remove('success');
    const errorSpan = document.getElementById(`${input.id}-error`);
    errorSpan.textContent = message;
}

function showSuccess(input) {
    input.classList.add('success');
    input.classList.remove('error');
    const errorSpan = document.getElementById(`${input.id}-error`);
    errorSpan.textContent = '';
}

// 4. Validate single field
function validateField(input) {
    const validator = validators[input.name];
    if (!validator) return true;

    if (validator.validate(input.value)) {
        showSuccess(input);
        return true;
    } else {
        showError(input, validator.message);
        return false;
    }
}

// 5. Real-time validation on input
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => validateField(input));
});

// 6. Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isMessageValid = validateField(messageInput);

    if (isNameValid && isEmailValid && isMessageValid) {
        // Submit form (simulated)
        console.log('Form submitted:', {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        });

        // Show success message
        successMessage.hidden = false;
        form.reset();

        // Clear success state after 3s
        setTimeout(() => {
            successMessage.hidden = true;
        }, 3000);
    }
});
```

---

## 🎨 CSS Styling

```css
.form-group input.error,
.form-group textarea.error {
    border-color: #ef4444;
    background-color: #fef2f2;
}

.form-group input.success,
.form-group textarea.success {
    border-color: #22c55e;
}

.error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
    min-height: 1.25rem;
}

.success-message {
    padding: 1rem;
    background: #22c55e;
    color: white;
    border-radius: 8px;
    margin-top: 1rem;
}
```

---

## 🐛 Hints

### Email Regex
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Breakdown:
// ^[^\s@]+  - before @: no spaces, no @
// @         - @ symbol
// [^\s@]+   - between @ and .: no spaces, no @
// \.         - dot
// [^\s@]+$  - after dot: no spaces, no @
```

### Clear Error on Input
```javascript
// Clear previous error when user starts typing
input.addEventListener('input', () => {
    input.classList.remove('error');
    const errorSpan = document.getElementById(`${input.id}-error`);
    errorSpan.textContent = '';
});
```

---

## ✅ Success Criteria

- [ ] Name validation (min 2 chars)
- [ ] Email format validation (regex)
- [ ] Message validation (min 10 chars)
- [ ] Error messages inline display
- [ ] Real-time validation on input
- [ ] Success message on submit

---

**← [ Quay lại Session 3](../README.md)**