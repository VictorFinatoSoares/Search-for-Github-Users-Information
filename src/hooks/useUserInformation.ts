import axios from "axios";
import { useEffect, useState } from "react";

import { getUser, getUserRepositories } from "../services/api.service";

import type { UserData, RepositoryData } from "../types/datatypes";

// Definindo como os dados que o hook retorna são organizados
interface UseUserInformationResult {
  user: UserData | null;
  repositories: RepositoryData[];
  isLoading: boolean;
  error: string | null;
}

// Trata os erros da requisição retornando em string para exibir
function getErrorMessage(error: unknown): string {
  // Caso o erro encontrado não seja do axios
  if (!axios.isAxiosError(error)) {
    return "An unexpected error occurred.";
  }

  // Caso não tenha uma resposta obtida
  if (!error.response) {
    return "Unable to connect to GitHub. Check your connection.";
  }

  // Caso o usuário não tenha sido encontrado
  if (error.response.status === 404) {
    return "404: User not found.";
  }

  // Caso a API tenha o limite atingido
  if (error.response.status === 403) {
    return "GitHub API rate limit exceeded. Try again later.";
  }

  // Caso seja outro erro, retorna o código do erro
  return `GitHub API error (${error.response.status}).`;
}

export function useUserInformation(
  username?: string,
): UseUserInformationResult {
  // Dados e estados que serão consumidos pelo componente
  const [user, setUser] = useState<UserData | null>(null);
  const [repositories, setRepositories] = useState<RepositoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effect que carrega as informações sempre que o username da URL for alterado
  useEffect(() => {
    async function loadUserInformation() {
      // Caso o username não esteja na URL
      if (!username) {
        setUser(null);
        setRepositories([]);
        setError("No username provided.");
        setIsLoading(false);
        return;
      }

      // Define os estados iniciais na requisição
      try {
        setIsLoading(true);
        setError(null);
        setUser(null);
        setRepositories([]);

        // As duas chamadas vão ser executadas em paralelo
        const [userData, repositoriesData] = await Promise.all([
          getUser(username),
          getUserRepositories(username),
        ]);

        // Guarda os dados obtidos
        setUser(userData);
        setRepositories(repositoriesData);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        // Encerra estado de carregamento assim que a requisição termina
        setIsLoading(false);
      }
    }

    loadUserInformation();
  }, [username]);

  // O hook vai devolver as informações, estado de carregamento e possível erro
  return {
    user,
    repositories,
    isLoading,
    error,
  };
}
