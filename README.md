# Parv Jain - Modern Developer Portfolio 🚀

A high-performance, modern developer portfolio website built with pure **HTML5, CSS3, and JavaScript (ES6+)**.

🔗 **LinkedIn**: [linkedin.com/in/parv-jain-3b21b5333/](https://www.linkedin.com/in/parv-jain-3b21b5333/)  
🐙 **GitHub**: [github.com/parvjain7278](https://github.com/parvjain7278)  
🎬 **Project Demo Video**: [Google Drive Live Preview](https://drive.google.com/file/d/1uwKMQvSw_gIWrbjO-j7U-5dwyu3sgROH/view?usp=drive_link)

---

## ✨ Features & What's Included

1. **Identity & Hero Section**:
   - Photo Switcher: Toggle between **🎖️ NCC Cadet Ceremony** and **👔 Studio Portrait**.
   - Photo Lightbox: Click the photo to view the full-screen ceremonial portrait.
   - Dynamic Typewriter Subtitle: *IoT & Cybersecurity Specialist*, *Front-End Developer*, *Problem Solver*.
   - Direct CTAs: **"Watch Demo Video"**, **"View Projects"**, **"Get in Touch"**, **"View Resume"**.
   - Sticky Glassmorphism Header with social links and Dark/Light mode switcher.
2. **Project Showcase & Video Player**:
   - **Drowsiness Detection System (2024)**: Embedded working demo video modal powered by Google Drive, plus architectural breakdown modal and GitHub repo links.
   - **API Integration Web Application (2024)**: Responsive UI with async/await optimization details and GitHub links.
   - Project category filters (*All*, *AI & CV*, *Web Dev*).
3. **Official Documents & Credentials Hub**:
   - Dedicated repository cards for BSNL 5G-IoT Training Certificate, NCC A/B/C Certifications, Cisco Academy Badges, and AWS Certified AI Practitioner.
4. **Dynamic Resume Management (Zero-Code & In-Browser)**:
   - **Method 1 (Instant In-Browser)**: Click *"Upload New Resume"* in the Resume Modal to drag-and-drop any `.pdf` or image. It instantly updates the live preview and remembers it in your browser!
   - **Method 2 (Permanent Folder Drop)**: Just replace `assets/resume_preview.png` (or `assets/resume.pdf`) in the project folder anytime.
5. **Interactive Particle Canvas & Card Mouse Glow**:
   - Responsive particle constellation effect and 3D luminous card hover illumination.

---

## 📂 Project Structure

```
excited-lavoisier/
├── index.html              # Main website markup & semantic sections
├── style.css               # Modern design tokens, glassmorphism, responsive styles
├── script.js               # Typewriter, resume uploader, video modal, filters
├── assets/
│   ├── profile.jpg         # Active profile portrait (NCC Ceremony photo)
│   ├── profile_ncc.jpg     # NCC ceremony photo
│   ├── profile_formal.jpg  # Studio formal headshot
│   ├── resume_preview.png  # Current resume preview file
│   └── docs/               # Put any future PDF documents & certificates here!
└── README.md               # Guide and documentation
```

---

## 📄 How to Add Documents (PDFs / Certificates)

### Step 1: Add your PDF to `assets/docs/`
Place your certificate or document file inside the `assets/docs/` folder. For example:
`assets/docs/bsnl_certificate.pdf`

### Step 2: Link to it from the website
In `index.html`, inside the `<div class="documents-grid">` section, simply link your file like this:
```html
<div class="doc-card">
  <div class="doc-icon"><i class="fa-solid fa-file-pdf"></i></div>
  <div class="doc-info">
    <span class="doc-name">My Certificate Name</span>
    <span class="doc-sub">Issued by Organization • Year</span>
  </div>
  <a href="assets/docs/bsnl_certificate.pdf" target="_blank" class="btn btn-sm btn-outline">
    <i class="fa-solid fa-download"></i> View / Download
  </a>
</div>
```
That's it! Anyone clicking the button will view or download your PDF.

---

## 🌐 How to Publish on GitHub (So Anyone with the Link Can Watch Your Portfolio)

Your code is already committed locally to git. Follow these simple steps:

### Step 1: Create a New Repository on GitHub
1. Open [https://github.com/new](https://github.com/new) in your browser (logged in as **parvjain7278**).
2. Repository name: enter `portfolio` (or `parvjain7278.github.io`).
3. Set visibility to **Public**.
4. Leave *"Initialize this repository with a README"* **unchecked** (we already have one).
5. Click **Create repository**.

### Step 2: Push Your Code from PowerShell
Open your terminal in this project folder and run:
```powershell
git remote add origin https://github.com/parvjain7278/portfolio.git
git branch -M main
git push -u origin main
```
*(If GitHub prompts you to authenticate, log in via your browser or Personal Access Token).*

### Step 3: Turn on GitHub Pages (Free Hosting)
1. Go to your repository on GitHub: `https://github.com/parvjain7278/portfolio`
2. Click **Settings** (gear icon near top right).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment > Branch**:
   - Select `main`
   - Select folder `/ (root)`
5. Click **Save**!

🎉 Within 1–2 minutes, your website will be live worldwide at:
👉 **`https://parvjain7278.github.io/portfolio/`**

Anyone with that link (recruiters, professors, friends) can visit and interact with your portfolio!
