# Exercise 4.4 — Contact Form với useState

## 🎬 Opening Scenario

*Xây dựng contact form với React state. Form sẽ có validation và submit handling.*

---

## 📋 Requirements

### 1. Contact Component với Form State

```jsx
// src/components/Contact.jsx
import { useState } from 'react';

function Contact() {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Error state
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        return newErrors;
    };

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Submit logic here
        console.log('Form submitted:', formData);

        // Reset form
        setFormData({ name: '', email: '', message: '' });
        alert('Message sent successfully!');
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <h2 className="text-center mb-5">Get In Touch</h2>

                <form onSubmit={handleSubmit} className="contact-form">
                    {/* Name Field */}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    {/* Message Field */}
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className={errors.message ? 'error' : ''}
                        />
                        {errors.message && <span className="error">{errors.message}</span>}
                    </div>

                    <button type="submit" className="submit-btn">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contact;
```

---

## 🎨 Error Styling

```css
/* Error input styling */
input.error,
textarea.error {
    border-color: #ef4444;
    background-color: #fef2f2;
}

span.error {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
}

/* Success input */
input.valid,
textarea.valid {
    border-color: #22c55e;
}
```

---

## 🐛 Hints

### Controlled Input
```jsx
// value + onChange = controlled input
<input
    value={formData.name}
    onChange={handleChange}
/>
```

### Form Reset
```jsx
// Spread to reset all fields
setFormData({ name: '', email: '', message: '' });
```

### Prevent Default
```jsx
// Must call preventDefault on form submit
const handleSubmit = (e) => {
    e.preventDefault(); // Stop page reload
    // ... validation and submit
};
```

---

## ✅ Success Criteria

- [ ] Form state managed with useState
- [ ] handleChange updates all fields
- [ ] Validation runs on submit
- [ ] Error messages displayed inline
- [ ] Form resets after successful submit
- [ ] Name min 2 chars validation
- [ ] Email format validation
- [ ] Message min 10 chars validation

---

**← [ Quay lại Session 4](../README.md) | Kết thúc Session 4 →**