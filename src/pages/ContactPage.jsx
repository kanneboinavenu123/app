import React,{useState}from 'react'

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'Please enter your name';
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = 'Enter valid email';
    if (!form.phone.match(/^[0-9]\d{9}$/)) e.phone = 'Enter valid phone number';
    if (!form.message) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    if (!validate()) return;
    if (Object.keys(newErrors).length > 0) return;


            const response = await fetch("http://localhost:4000/Contacted", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            try{
            if (!response.ok) throw new Error("Failed to send message");
            if(!validate) return
              setStatus('sending');
              await new Promise((r) => setTimeout(r, 800));
            setStatus("success");
            setForm({ name: "", email: "", phone: "",message:"" });
        }
         catch (error) {
            setStatus(error.message);
        }
    };

  return (
     <div className="p-10">
        <div className="contact-container">
            <form onSubmit={handleSubmit} className="contact-form">
           <div className="form-group">
                <label>Name</label>
                <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={errors.name ? 'error' : ''}/>
                {errors.name && <p className="error-text">{errors.name}</p>}
           </div>

            <div className="form-group">
                <label>Email:</label>
                <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={errors.email ? 'error' : ''}/>
                {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
            <label>Mobile Number:</label>
                <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className={errors.phone ? 'error' : ''}/>
                {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>

            <div className="form-group">
                <label>Message:</label>
                <textarea
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us your thoughts..."
                className={errors.message ? 'error' : ''}>
                </textarea>
                {errors.message && <p className="error-text">{errors.message}</p>}
            </div>

            <button type="submit" className="submit-btn">
            {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' ? alert("Message sent successfully!") : null}
  </form>
</div>

        </div>
  )
}

export default ContactPage