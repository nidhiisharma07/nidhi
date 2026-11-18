import type { Project } from "@/types/portfolio";

/**
 * Projects shown in Work and on /projects/[slug].
 * Content comes from the previous portfolio (portnew-nu.vercel.app).
 * Leave repoUrl / demoUrl as "" to hide the button. Add accuracy figures to
 * `results` once the dataset and evaluation method are written down.
 */
const allProjects: Project[] = [
  {
    slug: "disease-prediction",
    title: "Disease Prediction System",
    category: "Machine Learning · Web App",
    year: "2024",
    status: "completed",
    summary: "Predicts likely diseases from a list of symptoms and serves the prediction through a Flask web app.",
    problem:
      "People often want a quick, first-level idea of what their symptoms might point to before seeing a doctor. This system gives a preliminary prediction from a list of symptoms. It is not medical advice.",
    objectives: [
      "Build the full pipeline: data preprocessing, training and comparing models.",
      "Serve real-time predictions through a Flask web interface where a user selects symptoms.",
    ],
    technologies: ["Python", "scikit-learn", "Naive Bayes", "SVM", "Flask", "SQLite"],
    implementation: [
      "User selects their symptoms in the web form.",
      "Flask backend converts them into the model's feature vector.",
      "Trained classifier (Naive Bayes / SVM) predicts the most likely disease.",
      "Result is shown instantly; inputs are stored in SQLite.",
    ],
    decisions: [
      "Compared Naive Bayes and SVM on the same data before choosing the final model.",
      "Kept the app lightweight with Flask + SQLite so it is easy to run and deploy.",
    ],
    challenges: [
      {
        challenge: "Symptom data is sparse: most symptoms are absent for any one case.",
        solution: "Careful preprocessing and model tuning to get reliable predictions.",
      },
    ],
    results: ["Real-time predictions through the web interface."],
    nextSteps: [
      "Report precision and recall per disease, not only overall accuracy.",
      "Show which symptoms drove each prediction.",
      "Deploy publicly with a clear not-medical-advice disclaimer.",
    ],
    repoUrl: "",
    accent: "terracotta",
    sketch: "form",
  },
  {
    slug: "fraud-detection",
    title: "Credit Card Fraud Detection",
    category: "Machine Learning · Classification",
    year: "2025",
    status: "completed",
    summary: "Flags suspicious card transactions in highly imbalanced data, judged on how many frauds it actually catches.",
    problem:
      "Fraudulent transactions are a tiny fraction of all card payments, which makes them hard to catch manually and easy for a naive model to miss.",
    objectives: [
      "Build the end-to-end model: data cleaning, feature selection, training and evaluation.",
      "Evaluate on the fraud class specifically, not overall accuracy.",
    ],
    technologies: ["Python", "pandas", "NumPy", "scikit-learn"],
    implementation: [
      "Load and clean the transaction data.",
      "Scale features and select the most useful ones.",
      "Handle the class imbalance.",
      "Train and compare classifiers, then evaluate on held-out data.",
    ],
    decisions: [
      "Evaluated on the fraud class specifically, because overall accuracy is misleading when almost every transaction is legitimate.",
    ],
    challenges: [
      {
        challenge: "Class imbalance: predicting 'not fraud' for everything still looks highly accurate.",
        solution: "Judged the model on how many frauds it actually catches rather than on accuracy.",
      },
    ],
    results: [],
    nextSteps: [
      "Wrap the model in a small API or Streamlit app to score new transactions.",
      "Add threshold tuning to trade off missed fraud against false alarms.",
    ],
    repoUrl: "",
    accent: "blue",
    sketch: "chart",
  },
  {
    slug: "ai-learning-system",
    title: "AI-Based Learning System",
    category: "Machine Learning · NLP",
    year: "2025",
    status: "completed",
    summary: "Adapts recommended study material to each learner based on how they are performing.",
    problem:
      "The same study material does not suit every learner. This system changes what it recommends next based on how each user is performing.",
    objectives: [
      "Track each user's performance per topic.",
      "Recommend the most suitable next content using ML and NLP.",
    ],
    technologies: ["Python", "NLTK", "TensorFlow", "Flask"],
    implementation: [
      "User works through content and answers questions.",
      "System tracks performance per topic.",
      "ML + NLP model picks the most suitable next content.",
      "Flask app serves the personalised recommendation.",
    ],
    decisions: [
      "Used NLP (NLTK) to understand content, so recommendations are based on topic and not just difficulty.",
    ],
    challenges: [],
    results: ["Personalised recommendations per learner."],
    nextSteps: ["Use an LLM to generate personalised questions and explanations."],
    repoUrl: "",
    accent: "green",
    sketch: "chat",
  },
];

/** Only published projects reach the page, routes and sitemap. */
export const projects = allProjects.filter((p) => p.published !== false);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
