# Solution 4.4 — Contact Form với useState

## Complete React Form with Validation

### src/components/Contact.jsx

```jsx
import { useState } from 'react'
import './Contact.css'

function Contact() {
  // Form state - manages all form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  // Error state - stores validation messages
  const [errors, setErrors] = useState({})

  // Submit state - tracks submission
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target

    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  // Validate form data
  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email (e.g., name@example.com)'
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    return newErrors
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Focus first error field
      const firstErrorField = Object.keys(validationErrors)[0]
      document.getElementById(firstErrorField)?.focus()
      return
    }

    // Submit form
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Success
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Check if field has error
  const hasError = (fieldName) => errors[fieldName] ? 'error' : ''
  const isValid = (fieldName) => formData[fieldName] && !errors[fieldName] ? 'valid' : ''

  return (
    <section id="contact" className="contact-section py-5 bg-light">
      <div className="container py-5">
        <h2 className="display-6 fw-bold text-center mb-3">Get In Touch</h2>
        <p className="text-center text-muted mb-5">
          Have a question or want to work together? Send me a message!
        </p>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Success Alert */}
            {submitStatus === 'success' && (
              <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                <i className="bi bi-check-circle-fill fs-4 me-3"></i>
                <div>
                  <strong>Message sent successfully!</strong>
                  <p className="mb-0 mt-1">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {submitStatus === 'error' && (
              <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                <i className="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
                <div>
                  <strong>Something went wrong!</strong>
                  <p className="mb-0 mt-1">Please try again later.</p>
                </div>
              </div>
            )}

            {/* Contact Form */}
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-4">
                    {/* Name Field */}
                    <div className="col-md-6">
                      <div className={`form-group ${hasError('name')}`}>
                        <label htmlFor="name" className="form-label fw-semibold">
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control form-control-lg ${hasError('name')} ${isValid('name')}`}
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                          <span className="input-icon">
                            <i className="bi bi-person"></i>
                          </span>
                        </div>
                        {errors.name && (
                          <div className="error-message">
                            <i className="bi bi-exclamation-circle me-1"></i>
                            {errors.name}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="col-md-6">
                      <div className={`form-group ${hasError('email')}`}>
                        <label htmlFor="email" className="form-label fw-semibold">
                          Email Address <span className="text-danger">*</span>
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control form-control-lg ${hasError('email')} ${isValid('email')}`}
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                          <span className="input-icon">
                            <i className="bi bi-envelope"></i>
                          </span>
                        </div>
                        {errors.email && (
                          <div className="error-message">
                            <i className="bi bi-exclamation-circle me-1"></i>
                            {errors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="col-12">
                      <div className={`form-group ${hasError('subject')}`}>
                        <label htmlFor="subject" className="form-label fw-semibold">
                          Subject <span className="text-danger">*</span>
                        </label>
                        <div className="input-wrapper">
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            className={`form-control form-control-lg ${hasError('subject')} ${isValid('subject')}`}
                            placeholder="Project Inquiry"
                            value={formData.subject}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                          <span className="input-icon">
                            <i className="bi bi-chat-left-text"></i>
                          </span>
                        </div>
                        {errors.subject && (
                          <div className="error-message">
                            <i className="bi bi-exclamation-circle me-1"></i>
                            {errors.subject}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="col-12">
                      <div className={`form-group ${hasError('message')}`}>
                        <label htmlFor="message" className="form-label fw-semibold">
                          Message <span className="text-danger">*</span>
                        </label>
                        <div className="input-wrapper">
                          <textarea
                            id="message"
                            name="message"
                            className={`form-control form-control-lg ${hasError('message')} ${isValid('message')}`}
                            rows="5"
                            placeholder="Tell me about your project, timeline, and budget..."
                            value={formData.message}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          ></textarea>
                          <span className="textarea-icon">
                            <i className="bi bi-pencil-square"></i>
                          </span>
                        </div>
                        <div className="char-counter">
                          <span className={formData.message.length < 10 ? 'text-warning' : 'text-success'}>
                            {formData.message.length}
                          </span> / 10 minimum
                        </div>
                        {errors.message && (
                          <div className="error-message">
                            <i className="bi bi-exclamation-circle me-1"></i>
                            {errors.message}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center mt-5">
              <p className="text-muted mb-3">Or reach out directly via:</p>
              <div className="d-flex justify-content-center gap-4">
                <a href="mailto:your.email@example.com" className="contact-link">
                  <i className="bi bi-envelope me-2"></i>your.email@example.com
                </a>
                <a href="#" className="contact-link">
                  <i className="bi bi-linkedin me-2"></i>LinkedIn
                </a>
                <a href="#" className="contact-link">
                  <i className="bi bi-github me-2"></i>GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
```

### src/components/Contact.css

```css
.contact-section {
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
}

/* Input wrapper */
.input-wrapper {
  position: relative;
}

.form-control-lg {
  padding: 1rem 1.25rem;
  padding-left: 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control-lg:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
  outline: none;
}

/* Input icon */
.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 1.25rem;
  transition: color 0.3s ease;
  pointer-events: none;
}

.form-control:focus ~ .input-icon {
  color: #6366f1;
}

/* Textarea icon */
.textarea-icon {
  position: absolute;
  left: 1rem;
  top: 1.25rem;
  color: #94a3b8;
  font-size: 1.25rem;
  transition: color 0.3s ease;
}

.form-control:focus ~ .textarea-icon {
  color: #6366f1;
}

/* Validation states */
.form-group.error .form-control-lg {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.form-group.error .input-icon,
.form-group.error .textarea-icon {
  color: #ef4444;
}

.form-group.valid .form-control-lg {
  border-color: #22c55e;
}

.form-group.valid .input-icon,
.form-group.valid .textarea-icon {
  color: #22c55e;
}

/* Error message */
.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  animation: shake 0.4s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}

/* Character counter */
.char-counter {
  font-size: 0.8rem;
  color: #94a3b8;
  text-align: right;
  margin-top: 0.5rem;
}

.char-counter .text-warning {
  color: #f59e0b;
}

.char-counter .text-success {
  color: #22c55e;
}

/* Submit button */
.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  border-radius: 12px;
  font-weight: 600;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.btn-primary:disabled {
  background: #94a3b8;
  opacity: 1;
}

/* Contact links */
.contact-link {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
}

.contact-link:hover {
  color: #6366f1;
}

/* Alert animations */
.alert {
  border-radius: 12px;
  animation: slideIn 0.4s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Required star */
.text-danger {
  color: #ef4444;
}
```

---

## Commit Message Examples

```bash
git commit -m "[STATE] Create contact form state

- Define formData object with name, email, subject, message
- Use useState to manage all form fields
- Create handleChange to update fields
- Destructure name and value from event"

git commit -m "[FEATURE] Add form validation

- Create validateForm function with rules
- Validate name (min 2 chars), email (regex), message (min 10)
- Set errors state on validation failure
- Focus first error field after validation"

git commit -m "[UI] Implement submit handling

- Add isSubmitting state for loading
- Show spinner during submission
- Display success alert after submit
- Reset form data after success"

git commit -m "[STYLE] Create input validation styles

- Add error/success border colors
- Show error messages with icon
- Style character counter
- Add shake animation on error"
```

---

## Key Learning Points

### 1. Controlled Input Pattern
```jsx
// value + onChange = controlled input
<input
  value={formData.name}
  onChange={handleChange}
/>

// handleChange updates specific field
const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({ ...prev, [name]: value }))
}
```

### 2. Form Validation Pattern
```jsx
const validateForm = () => {
  const newErrors = {}
  if (!formData.name.trim()) newErrors.name = 'Name is required'
  if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email'
  return newErrors
}

const handleSubmit = (e) => {
  const errors = validateForm()
  if (Object.keys(errors).length > 0) {
    setErrors(errors)
    return
  }
  // submit
}
```

### 3. Prevent Default
```jsx
const handleSubmit = (e) => {
  e.preventDefault() // Stop page reload
  // ...validation and submit
}
```

### 4. Form Reset
```jsx
setFormData({ name: '', email: '', subject: '', message: '' })
```

### 5. Loading State
```jsx
const [isSubmitting, setIsSubmitting] = useState(false)

<button disabled={isSubmitting}>
  {isSubmitting ? 'Sending...' : 'Send Message'}
</button>
```

---

**← [ Quay lại Exercise 4.4](../exercises/04_contact_form.md)**