import { apiFetch } from "@/lib/api";

export interface Language {
  id: string;
  numericId: number;
  name: string;
  description: string;
  icon?: string;
  locked: boolean;
}

export async function getLanguages(): Promise<Language[]> {
  return apiFetch<Language[]>("/api/languages");
}

