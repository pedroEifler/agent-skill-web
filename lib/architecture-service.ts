import { apiFetch } from "@/lib/api";

export interface Architecture {
  id: string;
  numericId: number;
  name: string;
  description: string;
  icon?: string;
  locked: boolean;
}

export async function getArchitectures(): Promise<Architecture[]> {
  return apiFetch<Architecture[]>("/api/architectures");
}

