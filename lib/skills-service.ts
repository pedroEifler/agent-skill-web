export interface GenerateSkillRequest {
  languageId: string;
  frameworkId: string;
  architectureId: string;
  designPatternIds: string[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function generateSkill(
  payload: GenerateSkillRequest
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/skills/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to generate skill: ${response.status} ${response.statusText}`
    );
  }

  const text = await response.text();

  try {
    const json = JSON.parse(text) as Record<string, unknown>;
    if (typeof json.content === "string") {
      return json.content;
    }
  } catch {
    // não é JSON, retorna texto direto
  }

  return text;
}

