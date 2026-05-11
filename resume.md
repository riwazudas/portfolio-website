%-------------------------
% Resume in Latex
% Author : Harshibar
% Based off of: https://github.com/jakeryang/resume
% License : MIT
%------------------------

\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
% only for pdflatex
% \input{glyphtounicode}

% fontawesome
\usepackage{fontawesome5}

% fixed width
\usepackage[scale=0.90,lf]{FiraMono}

% light-grey
\definecolor{light-grey}{gray}{0.83}
\definecolor{dark-grey}{gray}{0.3}
\definecolor{text-grey}{gray}{.08}

\DeclareRobustCommand{\ebseries}{\fontseries{eb}\selectfont}
\DeclareTextFontCommand{\texteb}{\ebseries}

% custom underilne
\usepackage{contour}
\usepackage[normalem]{ulem}
\renewcommand{\ULdepth}{1.8pt}
\contourlength{0.8pt}
\newcommand{\myuline}[1]{%
  \uline{\phantom{#1}}%
  \llap{\contour{white}{#1}}%
}


% custom font: helvetica-style
\usepackage{tgheros}
\renewcommand*\familydefault{\sfdefault} 
%% Only if the base font of the document is to be sans serif
\usepackage[T1]{fontenc}


\pagestyle{fancy}
\fancyhf{} % clear all header and footer fields
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{0in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting - serif
% \titleformat{\section}{
%   \vspace{2pt} \scshape \raggedright\large % header section
% }{}{0em}{}[\color{black} \titlerule \vspace{-5pt}]

% TODO EBSERIES
% sans serif sections
\titleformat {\section}{
    \bfseries \vspace{2pt} \raggedright \large % header section
}{}{0em}{}[\color{light-grey} {\titlerule[2pt]} \vspace{-4pt}]

% only for pdflatex
% Ensure that generate pdf is machine readable/ATS parsable
% \pdfgentounicode=1

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-1pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-1pt}\item
    \begin{tabular*}{\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & {\color{dark-grey}\small #2}\vspace{1pt}\\ % top row of resume entry
      \textit{#3} & {\color{dark-grey} \small #4}\\ % second row of resume entry
    \end{tabular*}\vspace{-4pt}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{\textwidth}{l@{\extracolsep{\fill}}r}
      #1 & {\color{dark-grey}} \\
    \end{tabular*}\vspace{-4pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

% CHANGED default leftmargin  0.15 in
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{0pt}}

\color{text-grey}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\begin{document}
%----------HEADING----------
\begin{center}
    \textbf{\Huge Riwaz Udas} \\ \vspace{5pt}
    \small \faPhone* \texttt{0451337510} \hspace{1pt} $|$
    \hspace{1pt} \faEnvelope \hspace{2pt} \texttt{udasriwaz@gmail.com} \hspace{1pt} $|$
    \hspace{1pt} \faLinkedin \hspace{2pt} \href{https://www.linkedin.com/in/riwaz-udas-7aab521b1/}{riwaz-udas} \hspace{1pt} $|$
    \hspace{1pt} \faGithub \hspace{2pt} \href{https://github.com/riwazudas}{github.com/riwazudas}
    \\ \vspace{-3pt}
\end{center}

%-----------SUMMARY-----------
\section{PROFESSIONAL SUMMARY}

\begin{itemize}[leftmargin=0in, label={}]
\small{\item{

AI Engineer with a Master's degree in Computer Science from the University of Melbourne specializing in Large Language Models, multimodal machine learning, and geospatial AI systems. Experienced in fine-tuning and deploying transformer models using PyTorch and Hugging Face, and building production-grade backend systems using Go and Spring Boot. Strong background in scalable APIs, authentication infrastructure, database optimization, and monitoring systems supporting high-traffic platforms.

}}
\end{itemize}

%-----------TECHNICAL SKILLS-----------
\section{TECHNICAL SKILLS}

\begin{itemize}[leftmargin=0in, label={}]
\small{\item{

\textbf{AI / Machine Learning:} PyTorch, TensorFlow, Scikit-learn, Reinforcement Learning (PPO, SAC, A2C, IMPALA) \\

\textbf{LLM \& NLP Tooling:} Hugging Face Transformers, Prompt Engineering, Instruction Tuning, LoRA Fine-tuning, RAG \\

\textbf{Programming Languages:} Python, Go, Java, JavaScript, C, C\# \\

\textbf{Backend \& APIs:} Spring Boot, FastAPI, NodeJS, REST API Design, Authentication Systems, Microservices \\

\textbf{Databases:} PostgreSQL, MySQL, MongoDB, Query Optimization, Indexing, VectorDB \\

\textbf{Cloud \& DevOps:} AWS, Google Cloud, Firebase, Kafka, Linux, Git \\

\textbf{Data \& Geospatial Tools:} OpenStreetMap, GIS

}}
\end{itemize}

%-----------EXPERIENCE-----------
\section{EXPERIENCE}
\resumeSubHeadingListStart

\resumeSubheading
{Byju’s}{Oct 2023 -- Jan 2024}
{Member of Technical Staff I}{Bangalore, India}
\resumeItemListStart

\resumeItem{Developed and maintained authentication and authorization systems based on \textbf{OAuth 2.0} using \textbf{Ory Hydra}, supporting secure identity management across multiple internal platforms}

\resumeItem{Designed and maintained \textbf{30+ production REST APIs} supporting login flows, token validation, and identity services used across large-scale educational products}

\resumeItem{Coordinated with \textbf{third-party service providers} to integrate \textbf{mobile OTP authentication and secure login-link systems}, improving user login reliability and security}

\resumeItem{Implemented a \textbf{sliding-window rate limiting middleware} with IP filtering to mitigate DDoS attacks, blocking \textbf{50K+ malicious requests} and strengthening authentication security}

\resumeItem{Explored the use of \textbf{machine learning-based anomaly detection} techniques to identify malicious traffic patterns and improve adaptive rate limiting strategies}

\resumeItem{Diagnosed and resolved \textbf{cross-service production incidents} across distributed identity microservices while providing \textbf{Level 3 operational support}}

\resumeItem{Optimized \textbf{SQL queries and indexing strategies} for databases supporting \textbf{2M+ daily users}, improving API response latency and system throughput}

\resumeItem{Containerized backend microservices using \textbf{Docker} and deployed them on \textbf{AWS ECS and EKS}, enabling scalable and fault-tolerant service deployment}

\resumeItem{Implemented \textbf{CI/CD pipelines} to automatically build, test, and deploy services from \textbf{GitHub repositories} to \textbf{AWS ECS}, enabling faster and reliable production releases}

\resumeItem{Automated lifecycle management scripts for expired \textbf{OAuth records} in \textbf{Ory Hydra} using Golang, processing \textbf{100M+ records annually}}

\resumeItem{Refactored legacy services into an \textbf{interface-based modular architecture} and authored \textbf{200+ automated tests} across production APIs}

\resumeItemListEnd

\resumeSubheading
{Byju’s}{Jan 2023 -- Sep 2023}
{Software Engineering Intern}{Bangalore, India}
\resumeItemListStart

\resumeItem{Contributed to a \textbf{Golang-based OAuth 2.0 identity platform} responsible for authentication and authorization across \textbf{10+ internal product verticals}}

\resumeItem{Designed and implemented scalable \textbf{REST APIs} supporting login flows, token validation, OTP authentication, and user identity services}

\resumeItem{Collaborated with \textbf{third-party providers} to integrate \textbf{mobile OTP authentication and secure login-link systems} into production authentication workflows}

\resumeItem{Integrated \textbf{Prometheus custom metrics} to monitor request latency, authentication failures, and system throughput across \textbf{30+ APIs}}

\resumeItem{Built monitoring dashboards and alert pipelines using \textbf{Grafana and Prometheus}, configuring \textbf{15+ automated alerts} to improve system observability and reliability}

\resumeItem{Worked with an \textbf{8-person platform engineering team} to improve authentication reliability, operational monitoring, and security across distributed microservices}

\resumeItem{Proposed and implemented \textbf{custom monitoring metrics} tracking OTP usage, login success rates, API errors, and system performance}

\resumeItemListEnd


\resumeSubheading
{Quantum AI Cloud}{Jul 2024 -- Sep 2024}
{Research Intern}{Melbourne, Australia}
\resumeItemListStart
\resumeItem{Developed reinforcement learning frameworks for \textbf{intelligent task scheduling} in quantum cloud computing environments}
\resumeItem{Implemented and benchmarked advanced RL algorithms including \textbf{A2C, PPO, SAC, and IMPALA} for dynamic workload allocation}
\resumeItem{Simulated quantum computing task placement scenarios and evaluated performance improvements in distributed resource allocation}
\resumeItem{Collaborated with researchers to evaluate AI-driven orchestration strategies for hybrid classical–quantum infrastructure}
\resumeItemListEnd

\resumeSubHeadingListEnd


%-----------PROJECTS-----------
\section{PROJECTS}
\resumeSubHeadingListStart

\resumeProjectHeading
{\textbf{Social Media Geotagging using Large Language Models (Master's Thesis)}}{}
\resumeItemListStart

\resumeItem{Designed a \textbf{multimodal geolocation prediction system} combining textual signals, metadata, and hierarchical location structures from social media posts}

\resumeItem{Fine-tuned transformer models including \textbf{LLaMA, Gemma, and Mistral} using \textbf{PyTorch and Hugging Face Transformers}}

\resumeItem{Implemented a \textbf{hierarchical multi-task learning architecture} predicting state, city, municipality, and suburb levels}

\resumeItem{Applied \textbf{instruction tuning, prompt engineering, and LoRA-based fine-tuning} to improve model reasoning over geospatial cues}

\resumeItem{Trained and evaluated models on a large-scale dataset of \textbf{millions of geotagged social media posts across Australia}}

\resumeItem{Combined textual features, metadata, and structured geographic hierarchies to improve geospatial prediction accuracy}

\resumeItemListEnd

\resumeProjectHeading
{\textbf{Nepal Law AI Chatbot using Retrieval-Augmented Generation (RAG)}}{}
\resumeItemListStart

\resumeItem{Built a \textbf{self-healing legal AI assistant} capable of answering queries related to Nepalese laws and regulations using \textbf{Retrieval-Augmented Generation (RAG)} pipelines}

\resumeItem{Developed autonomous \textbf{web scraping and ingestion systems} to continuously collect and update legal documents, acts, and government regulations from online law repositories}

\resumeItem{Implemented a \textbf{multilingual RAG pipeline} supporting legal question answering across multiple languages including English and Nepali}

\resumeItem{Integrated \textbf{multilingual embedding models and semantic vector search} to improve cross-language legal document retrieval and contextual understanding}

\resumeItem{Implemented intelligent \textbf{document chunking, embedding generation, and vector database retrieval} for context-aware legal question answering}

\resumeItem{Integrated \textbf{Large Language Models} with semantic search pipelines to generate accurate and explainable responses grounded in retrieved legal sources}

\resumeItem{Designed automated \textbf{knowledge base self-repair mechanisms} to detect outdated legal data, refresh embeddings, and maintain retrieval accuracy over time}

\resumeItem{Built scalable backend APIs and retrieval workflows using \textbf{Python, FastAPI, Hugging Face, and vector search infrastructure}}

\resumeItemListEnd

\resumeProjectHeading
{\textbf{Sentiment Analysis Web Application}}{}
\resumeItemListStart

\resumeItem{Fine-tuned a \textbf{BERT transformer model} using \textbf{Hugging Face Transformers} for restaurant review sentiment classification}

\resumeItem{Developed a \textbf{FastAPI-based inference service} to serve ML predictions through REST APIs}

\resumeItem{Built a \textbf{React frontend} and deployed the system using \textbf{Firebase Hosting and Cloud Functions}}

\resumeItemListEnd

\resumeProjectHeading
{\textbf{Signature Forgery Detection using CNN}}{}
\resumeItemListStart
\resumeItem{Trained a \textbf{ResNet-based CNN} to detect forged handwritten signatures}
\resumeItem{Constructed and labelled a dataset of \textbf{ 1200+ training samples}}
\resumeItemListEnd

\resumeProjectHeading
{\textbf{Acute Kidney Injury Prediction}}{}
\resumeItemListStart

\resumeItem{Developed predictive models for \textbf{Acute Kidney Injury (AKI)} risk using ICU patient medication records and demographic data}
s
\resumeItem{Implemented machine learning models including \textbf{Random Forest and Gradient Boosting classifiers} for patient risk prediction}

\resumeItem{Performed data analytics, feature engineering, data preprocessing, and evaluation using metrics such as \textbf{ROC-AUC and precision-recall}}

\resumeItemListEnd

\resumeSubHeadingListEnd


%-----------EDUCATION-----------
\section{EDUCATION}
\resumeSubHeadingListStart

\resumeSubheading
{University of Melbourne}{Feb 2024 -- Dec 2025}
{Master of Computer Science}{Melbourne, Australia}
\resumeItemListStart
\resumeItem{Thesis: \textbf{Multimodal Social Media Geotagging using Large Language Models}}
\resumeItem{\textbf{Coursework:} Computer Vision, Distributed Systems, Advanced Databases, AI Planning for Autonomy, Machine Learning in Health, Computational Modelling and Simulation}
\resumeItemListEnd

\resumeSubheading
{Vellore Institute of Technology}{2019 -- 2023}
{Bachelor of Technology, Computer Science and Engineering}{India}

\resumeSubHeadingListEnd

%-----------CERTIFICATIONS-----------
\section{CERTIFICATIONS}

\begin{itemize}[leftmargin=0in, label={}]
\small{\item{

\textbf{Salesforce Certified AI Associate} \\

\textbf{Algorithmic Thinking} – Rice University (Coursera) \\

\textbf{Artificial Intelligence Foundation Certification} – NASSCOM \\

\textbf{Big Data Foundation Certification} – NASSCOM \\

\textbf{Kotlin for Java Developers} – JetBrains (Coursera)

}}
\end{itemize}

%-------------------------------------------


\end{document}
