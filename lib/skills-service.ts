export type SkillType = "business" | "student";

export interface GenerateSkillRequest {
  languageId: string;
  frameworkId: string;
  architectureId: string;
  designPatternIds: string[];
  type: SkillType;
}

export interface SkillReference {
  folder: string;
  fileName: string;
  content: string;
}

export interface GenerateSkillResponse {
  content: string;
  references: SkillReference[];
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

  const json = await response.json() as GenerateSkillResponse;
  return json;
}

