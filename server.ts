import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";

// Load Firebase config for project context
const firebaseConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), "firebase-applet-config.json"), "utf8"));

// Initialize Firebase Admin
const firebaseApp = initializeApp({
  projectId: firebaseConfig.projectId
});

// Access the specific database
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for research summary
  app.post("/api/research-summary", async (req, res) => {
    const { topic, allResearchTopics } = req.body;
    
    if (!topic || !allResearchTopics) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Summarize recent advances in ${topic} in the context of my other research: ${allResearchTopics.join(", ")}. Keep it concise and insightful.`,
        });
        
        res.json({ summary: response.text });
    } catch (error) {
        console.error("Error generating research summary:", error);
        res.status(500).json({ error: "Failed to generate summary" });
    }
  });

  // API Route for Collaboration Requests
  app.post("/api/collaboration", async (req, res) => {
    console.log("POST /api/collaboration - request received:", req.body);
    const { name, organization, email, purpose, collaboration_type, message } = req.body;

    // 1. Basic Validation
    if (!name || !organization || !email || !purpose || !collaboration_type) {
      console.warn("Validation failed - missing fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // 2. Save to Firestore using Admin SDK
      const docRef = await db.collection("collaboration_requests").add({
        name,
        organization,
        email,
        purpose,
        collaboration_type,
        message: message || "",
        timestamp: FieldValue.serverTimestamp(),
        status: "unread"
      });

      // 3. Send Email Notification using Web3Forms (if access key is provided)
      if (process.env.WEB3FORMS_ACCESS_KEY) {
        try {
          const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: process.env.WEB3FORMS_ACCESS_KEY,
              subject: `New Collaboration Request: ${name} (${organization})`,
              from_name: "Research Portal",
              replyto: email, // Quick reply goes back to the requester
              name: name,
              email: email,
              message: `You have received a new collaboration request.\n\nOrganization: ${organization}\nPurpose: ${purpose}\nCollaboration Type: ${collaboration_type}\n\nMessage:\n${message || "No message provided."}`,
            }),
          });
          
          if (web3formsResponse.ok) {
            console.log("Web3Forms email notification sent successfully.");
          } else {
            console.error("Web3Forms error response:", await web3formsResponse.text());
          }
        } catch (emailError) {
          console.error("Failed to send Web3Forms notification:", emailError);
          // Don't fail the overall request if email sending fails
        }
      } else {
        console.warn("WEB3FORMS_ACCESS_KEY not set in environment variables. Email notification skipped.");
      }

      console.log("Submission successful, ID:", docRef.id);
      res.status(201).json({ success: true, id: docRef.id });
    } catch (error) {
      console.error("Error processing collaboration request:", error);
      const errInfo = {
        error: error instanceof Error ? error.message : String(error),
        operationType: 'write',
        path: 'collaboration_requests'
      };
      res.status(500).json({ error: JSON.stringify(errInfo) });
    }
  });

  // API Route for Chat with Assistant
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    try {
      const systemInstruction = `You are a helpful and elegant AI assistant named "Vidur" on the personal research portfolio of Soumitro Kumar Das Shuvro (often referred to simply as Shuvro or Soumitro).
                                 
Here is comprehensive information about Soumitro Kumar Das Shuvro:
- Full Name: Soumitro Kumar Das Shuvro
- Location: Rajshahi, Bangladesh
- Profession: Computational Applied Mathematician | Machine Learning | Fractional-Order Modeling | Data-Driven Physical System Simulation
- Education: M.Sc in Applied Mathematics, University of Rajshahi (2024-2025); B.Sc in Applied Mathematics, University of Rajshahi (2019-2023).
- Experience: Research Assistant at U. of Rajshahi (2025-Present) focusing on Mathematical Epidemiology (Dengue, Chikungunya), Fractional-order models, and Machine Learning. Private Tutor (2019-Present). Former Senior Executive Member at Rajshahi University Debating Forum (2019-2025), where he led "Project Newborn" to mentor first-year students.

Projects & GitHub Links:
- "Dengue Carrying Capacity Model - SEIR-SEI": Published in Arab Journal of Basic and Applied Sciences (2026). Repository: https://github.com/SoumitroDas/dengue-carrying-capacity-model-simulations
- "Pneumonia Detection from Chest X-Ray using CNN": Repository: https://github.com/SoumitroDas/Project-Pneumonia-Detection-from-Chest-Xray-CNN
- "Customer Segmentation Analysis - Comprehensive ML Study": Repository: https://github.com/SoumitroDas/Project-Clustering-Tryouts
- "Online Retail Customer Classification": Repository: https://github.com/SoumitroDas/Project-Online-Retail-Customer-Classfire
- "YouTube Engagement & Audience Analysis": Repository: https://github.com/SoumitroDas/Python-Project-YouTube-Engagement-Audience-Analysis
- "Chocolate Sales Dashboard - Power BI": Repository: https://github.com/SoumitroDas/Edu-Linking-Project-Unwrapping-Global-Chocolate-Sales-Insights-By-PowerBI
- "Superstore Sales Analysis - Tableau": Repository: https://github.com/SoumitroDas/Edu-Linking-Project-Sparking-Retail-Insights-with-Superstore-Sales-by-Tableau
- "Numerical Methods Implementation - C++": Repository: https://github.com/SoumitroDas/Numerical-Methods-CPP

Skills: Python, MATLAB, Mathematica, C++, Data Science (CNN, RNN, Scikit-Learn), Fractional Calculus.
Certifications & Training:
- 2 Day AI for Engineers (Outskill)
- 2 Day AI Generalist Program (Outskill)
- English Proficiency C1-Advanced (British Council)
- Data Analytics: Excel, Power BI, Python & SQL (Tutorials Point Bangladesh)
- Research Methodology (Research Help Bangladesh)

Achievements: 2nd Place at UiPath Global Bootcamp Challenge (Generative AI), International Top Breaking Adjudicator (Debate).

Speak concisely and warmly. If asked about his work, reference the specific latest information above, and provide direct GitHub links when queried about his projects.
You have a dark, elegant, modern cyberpunk vibe just like the website. Keep responses short and to the point. Give brief overviews if someone asks about his research.
You have access to Google Search. ALWAYS use Google Search if the user asks for his latest publications from Google Scholar, his recent work on GitHub, or his professional updates on LinkedIn. Search specifically for "Soumitro Kumar Das Shuvro" combined with the platform requested to give the most accurate, live information.`;

      // Simplified chat approach, combining history into one prompt to avoid strict alternating-role validation issues
      const formattedHistory = (history || []).map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`).join("\n\n");
      const prompt = formattedHistory 
        ? `${formattedHistory}\n\nUser: ${message}\nAssistant:`
        : `User: ${message}\nAssistant:`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
          tools: [{ googleSearch: {} }]
        }
      });

      res.json({ reply: response.text });
    } catch (error) {
      console.error("Error generating chat response:", error);
      res.status(500).json({ error: "Failed to generate chat response" });
    }
  });

  // Test endpoint for Firebase verification
  app.get("/api/test-firebase", async (req, res) => {
    try {
      const docRef = await db.collection("test_connection").add({
        test: true,
        timestamp: FieldValue.serverTimestamp()
      });
      res.status(200).json({
        success: true,
        documentId: docRef.id,
        database: firebaseConfig.firestoreDatabaseId,
        project: firebaseConfig.projectId,
        collection: "test_connection"
      });
    } catch (error) {
      console.error("Firebase test failed:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
