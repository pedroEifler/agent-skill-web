import { apiFetch } from "@/lib/api";

export interface Framework {
  id: string;
  numericId: number;
  name: string;
  description: string;
  icon?: string;
  locked: boolean;
}

export async function getFrameworks(): Promise<Framework[]> {
  return apiFetch<Framework[]>("/api/frameworks");
}

export async function getFrameworksByLanguage(languageId: string | number): Promise<Framework[]> {
  return apiFetch<Framework[]>(`/api/frameworks/language/${languageId}`);
}

