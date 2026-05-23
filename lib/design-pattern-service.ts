import { apiFetch } from "@/lib/api";

export interface DesignPattern {
  id: string;
  numericId: number;
  name: string;
  description: string;
  icon?: string;
  locked: boolean;
}

export async function getDesignPatterns(): Promise<DesignPattern[]> {
  return apiFetch<DesignPattern[]>("/api/design-patterns");
}

