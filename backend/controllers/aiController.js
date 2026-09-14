const OpenAI = require("openai");

/**
 * Intelligent Fallback Resume Copy Generator
 * Generates ATS-optimized, high-impact resume descriptions and bullet points
 * tailored to user prompt, keywords, and target role when OpenAI is unavailable or rate-limited.
 */
function generateContextualResumeCopy({ prompt, section, roleTitle, tone }) {
  const p = (prompt || "").trim();
  const role = (roleTitle || "Professional").trim();

  // Extract relevant keywords/technologies mentioned in user prompt
  const cleanTokens = p.split(/[\s,.;]+/).filter((w) => w.length > 2);
  const techKeywords = cleanTokens.filter((w) =>
    /^(react|node|next|vue|angular|python|java|golang|typescript|javascript|aws|docker|kubernetes|sql|nosql|mongodb|postgresql|redis|graphql|ci\/cd|devops|agile|scrum|figma|tailwind|fintech|saas|ai|ml|data|cloud)/i.test(
      w
    )
  );

  const keywordsString =
    techKeywords.length > 0 ? techKeywords.join(", ") : "modern best practices";

  if (section === "summary") {
    if (tone === "leadership") {
      return `Results-driven ${role} with proven track record in architecting scalable solutions and leading cross-functional engineering teams. Experienced in ${p || "delivering enterprise-grade systems with high availability and engineering excellence"}. Adept at aligning technology strategy with core business objectives to accelerate product velocity and team performance.`;
    }
    if (tone === "action_metrics") {
      return `Performance-focused ${role} recognized for optimizing system scalability and user conversion. Leveraged expertise in ${p || "full-lifecycle application development"} to drive a 40% reduction in processing latency and 99.98% operational uptime. Committed to rapid experimentation, robust code quality, and continuous delivery.`;
    }
    // Default / ATS Optimized
    return `Accomplished ${role} with specialized proficiency in ${p || "full-stack development, modern architectures, and collaborative product delivery"}. Demonstrated expertise utilizing ${keywordsString} to build secure, fault-tolerant solutions that exceed organizational KPIs. Strong collaborator passionate about clean code, high reliability, and scalable impact.`;
  }

  if (section === "experience") {
    // Bullet points for work experience
    const bullets = [
      `Architected and deployed high-throughput systems focused on ${p || "scalable application delivery"}, improving throughput by 35% and reducing infrastructure overhead.`,
      `Collaborated across product, design, and QA teams to engineer resilient features using ${keywordsString}, delivering sprint deliverables 2 weeks ahead of schedule.`,
      `Spearheaded performance benchmarking and automated testing pipelines, decreasing production defect rates by 42% while sustaining 99.9% uptime SLA.`,
      `Mentored junior team members and instituted modern engineering standards, fostering an agile culture of automated testing and code maintainability.`,
    ];
    return bullets.join("\n");
  }

  if (section === "project") {
    return `Engineered ${p || "an end-to-end full-stack web platform"} utilizing ${keywordsString}. Designed responsive, accessible client interfaces paired with robust backend APIs, achieving sub-200ms latency and high test coverage. Implemented secure authentication, continuous deployment workflows, and containerized cloud hosting.`;
  }

  // Generic fallback
  return `Engineered high-performance solutions for ${p || role}, improving system reliability and user satisfaction through modern technical standards and data-driven iterations.`;
}

/**
 * Controller to handle AI description generation for resumes
 * POST /api/ai/generate-description
 */
const generateResumeDescription = async (req, res) => {
  const { prompt, section = "summary", roleTitle = "", currentText = "", tone = "ats" } = req.body;

  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  const openaiApiKey = process.env.OPENAI_API_KEY;

  // Try calling OpenAI if key is present
  if (openaiApiKey && openaiApiKey.startsWith("sk-")) {
    try {
      const client = new OpenAI({ apiKey: openaiApiKey });

      let systemPrompt = "";
      if (section === "summary") {
        systemPrompt = `You are an elite executive resume writer and career coach.
Write a powerful, concise 2 to 3-sentence professional summary for an ATS-optimized resume.
Role: ${roleTitle || "Professional"}
Tone style: ${tone}
Requirements:
- High impact, active verbs, zero fluff or filler words
- Highlight technical strengths, quantifiable metrics, and value proposition
- Output ONLY the finished summary text, no conversational preamble or markdown quotes.`;
      } else if (section === "experience") {
        systemPrompt = `You are an elite ATS resume specialist.
Write 3 to 4 impactful, quantifiable bullet points for a candidate's work experience section.
Role: ${roleTitle || "Professional"}
Tone style: ${tone}
Requirements:
- Each bullet point must start with a strong action verb (Architected, Engineered, Spearheaded, Implemented, Streamlined)
- Include realistic quantifiable metrics (%, $, scale, or time saved)
- Output ONLY the bullet points separated by newlines, with each starting with a dash or bullet, no conversational intro.`;
      } else {
        systemPrompt = `You are an elite technical resume writer.
Write a compelling 2 to 3-sentence project description highlighting technical architecture, tools used, and measurable impact.
Role/Topic: ${roleTitle || "Project"}
Tone style: ${tone}
Requirements:
- Emphasize problem solved, technologies utilized, and measurable outcomes
- Output ONLY the finished description text, no quotes or conversation.`;
      }

      const userContent = `User context / prompt: "${prompt}". ${
        currentText ? `Current draft text to improve or replace: "${currentText}"` : ""
      }`;

      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        temperature: 0.7,
        max_tokens: 350,
      });

      const reply = completion.choices?.[0]?.message?.content?.trim();
      if (reply) {
        return res.status(200).json({
          success: true,
          text: reply,
          source: "openai",
        });
      }
    } catch (error) {
      console.warn("OpenAI API call failed, falling back to smart contextual AI engine:", error?.message);
      // Fall through to contextual engine
    }
  }

  // Graceful fallback to Contextual Resume Copy Generator
  const generatedText = generateContextualResumeCopy({ prompt, section, roleTitle, tone });
  return res.status(200).json({
    success: true,
    text: generatedText,
    source: "contextual_engine",
  });
};

/**
 * Backward-compatible generic chat endpoint
 * POST /api/ai/chat
 */
const getReplyFromAi = async (req, res) => {
  try {
    const { model = "gpt-4o-mini", messages } = req.body;
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return res.status(500).json({ error: "OpenAI API key not configured." });
    }

    const client = new OpenAI({ apiKey: openaiApiKey });

    const completion = await client.chat.completions.create({
      model: model,
      messages: messages,
    });

    return res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("AI Error:", error);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: error.message || "Failed to generate AI reply" });
    }
  }
};

module.exports = {
  generateResumeDescription,
  getReplyFromAi,
};

