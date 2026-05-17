# 🚀 Serverless AI Portfolio & RAG Architecture Guide

This document breaks down the entire technical architecture of your portfolio website. It explains how the Google Gemini Retrieval-Augmented Generation (RAG) system operates completely without a traditional database or backend server, and provides the exact steps to recreate this project from scratch.

---

## 🏗️ System Architecture Overview

The portfolio is designed as a **Static Frontend Single-Page Application (SPA)** with a decoupled **Serverless Micro-Backend** for secure AI generation.

### 1. The Core UI (Static Web)
*   **`index.html`:** The primary interface featuring glassmorphic design, floating RAG chatbot, interactive terminal, and dynamic particles.
*   **`style.css`:** Vanilla CSS utilizing CSS Grid/Flexbox and custom variables (`--accent-cyan`, `--accent-indigo`) to achieve the neon dark-mode aesthetic.
*   **`app.js`:** The brain of the frontend. It manages the Canvas API particle animations, scroll triggers, and the client-side vector search logic.

### 2. The Data Pipeline (Admin Console)
*   **`resume.md`:** Your raw, unstructured LaTeX/Markdown resume acts as the single source of truth.
*   **`admin.html`:** A secure, private operator panel. It runs a custom JavaScript Regular Expression (Regex) pipeline to strip LaTeX syntax (`\section{}`, `\resumeItem{}`) and chunks your experiences into semantic paragraphs. 
*   **Local Vector Cache:** The admin panel calls Gemini `gemini-embedding-001` for each chunk, receives 768-dimensional float arrays (using Matryoshka Representation Learning), and saves the matrix directly into the browser's `localStorage`.

### 3. The RAG Search Engine (Client-Side)
Instead of paying for an expensive vector database (like Pinecone), `app.js` runs a mathematically optimized **Cosine Similarity** function directly in the browser's memory. When a visitor asks a question, the browser embeds their query, compares it against the local vector cache, and extracts the top 3 most relevant chunks.

### 4. The Secure Backend (GCP Cloud Run function)
*   **`cloud-functions/gemini-relay/`:** To prevent exposing your Gemini API key in the public frontend, all AI queries are routed to a tiny Node.js serverless proxy on Google Cloud. This proxy attaches your private `GEMINI_API_KEY` to the request securely before forwarding it to Google.

---

## 🛠️ How to Rebuild This from Scratch

If you ever need to recreate this system for a new project, follow these sequential steps:

### Step 1: Scaffold the Static UI
1. Create `index.html` and `style.css`.
2. Build the layout using CSS variables for consistent dark-mode colors.
3. Build the floating chatbot widget UI (a toggleable `div` in the bottom right).
4. Build an interactive HTML Terminal simulator (using an input field that listens for `Enter` and pushes `div` lines to a scrolling container).

### Step 2: Build the Admin LaTeX Parser
1. Create a separate `admin.html` page (never link to this from your public header!).
2. Write a JS script that fetches `resume.md` using the native `fetch()` API.
3. Use sequential `.replace()` regex rules to clean out formatting (e.g., removing `%` comments, stripping `\resumeSubheading`).
4. Split the text into an array of JSON objects: `{ tag: "EXPERIENCE_1", text: "..." }`.

### Step 3: Implement Client-Side Vector Generation
1. In `admin.html`, loop through your chunk array.
2. For each chunk, execute an HTTP `POST` to Google's embedding API (`https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent`).
3. Store the resulting 768-D arrays alongside the text in `localStorage`.

### Step 4: Write the Client-Side Cosine Similarity Engine
In your `app.js` chatbot logic, implement the math to compare vectors:
```javascript
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
```

### Step 5: Build the Secure Gateway (GCP)
1. Create a simple Node.js HTTP handler (`index.js`).
2. Program it to accept `POST` requests, read `process.env.GEMINI_API_KEY`, and proxy the payload to Google via standard HTTPS.
3. Deploy it to **Google Cloud Run functions** with "Allow unauthenticated invocations" enabled.

### Step 6: Connect the Frontend to the Gateway
1. Take the Trigger URL provided by GCP.
2. Inside `app.js`, update your chatbot `fetch()` calls to send their requests to your custom GCP URL instead of directly to Google.
3. On a chat query, pass the Top 3 highest-scoring chunks + the user's prompt to the gateway.
4. Render the streamed response text into a chat bubble on the UI.

### Step 7: Analyze and Deploy via Google Cloud Platform (GCP)
Deploying this architecture to GCP involves a two-pronged strategy: serverless computing for the backend and static object storage for the frontend.

#### Deployment Phase A: Secure Backend (Cloud Run function)
1. **Analyze:** The backend is a stateless Node.js HTTP proxy. It requires zero cold-boot setup beyond environment variables, making Cloud Run functions perfect.
2. **Deploy Steps:**
   * Go to the GCP Web Console and open **Cloud Run functions**.
   * Click **Create Function**. Configure it as `2nd gen`, region `us-central1`, and allow unauthenticated invocations.
   * Add your `GEMINI_API_KEY` in the **Runtime environment variables** section.
   * In the Code editor, select **Node.js 20**. Paste your `index.js` and `package.json` contents, and set the entry point to `geminiRelay`.
   * Deploy and copy the resulting HTTPS Trigger URL.

#### Deployment Phase B: Frontend Application (Cloud Storage)
1. **Analyze:** The frontend is entirely static (HTML/CSS/JS) and does not require Node.js, Next.js, or any active web server. GCP Cloud Storage can act as an ultra-fast, globally distributed web server for static files at practically zero cost.
2. **Deploy Steps:**
   * Open `app.js` locally and paste your Cloud Run function Trigger URL into the `gcpRelayUrl` variable.
   * Go to **Cloud Storage** in the GCP Console and create a new bucket (e.g., `www.yourdomain.com`).
   * Grant public access by navigating to the bucket's Permissions tab and granting `Storage Object Viewer` to `allUsers`.
   * Under bucket settings, select **Edit website configuration** and set the Main page and Error page to `index.html`.
   * Upload `index.html`, `admin.html`, `style.css`, `app.js`, and `resume.md` directly into the bucket via the Objects tab.

**Your zero-maintenance, RAG-powered, high-performance portfolio is live on Google Cloud!**
