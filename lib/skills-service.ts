export interface GenerateSkillRequest {
  languageId: number;
  frameworkId: number;
  architectureId: number;
  designPatternIds: number[];
}

export interface GenerateSkillResponse {
  // Adjust fields according to the actual API response
  [key: string]: unknown;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export async function generateSkill(
  payload: GenerateSkillRequest
): Promise<GenerateSkillResponse> {
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

  return response.json() as Promise<GenerateSkillResponse>;
}

