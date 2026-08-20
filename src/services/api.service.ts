// Organiza cada requisição em funções, usando a URL base da API junto do tipo esperado de resposta

import { API } from "./api";
import type { UserData, RepositoryData } from "../types/datatypes";

export async function getUser(searchedUser: string): Promise<UserData> {
  const res = await API.get<UserData>(`/${encodeURIComponent(searchedUser)}`);
  return res.data;
}

// OBS: A função vai obter apenas os primeiros 50 repositórios encontrados
export async function getUserRepositories(
  searchedUser: string,
): Promise<RepositoryData[]> {
  const res = await API.get<RepositoryData[]>(
    `/${encodeURIComponent(searchedUser)}/repos`,
    {
      params: { per_page: 50 },
    },
  );
  return res.data;
}
