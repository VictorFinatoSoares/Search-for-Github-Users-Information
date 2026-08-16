import axios from "axios";

import { getUser, getUserRepositories } from "../../services/api.service";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import type { UserData, RepositoryData } from "../../types/datatypes";

import { UserCard } from "./UserCard";
import { RepositoryListCard } from "./RepositoryListCard";
import { Loading } from "../Loading/Loading";

export function MainCard() {
  // Username que o usuário digitou vem da URL
  const { username } = useParams();

  // Estados para controlar a renderização (os dados do user e seus repositórios) e exibir o carregamento ou algum possível erro
  const [user, setUser] = useState<UserData | null>(null);
  const [repositories, setRepositories] = useState<RepositoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca os dados controlando carregamento/erro
  useEffect(() => {
    const controller = new AbortController();

    async function loadUserInformation() {
      if (!username) {
        setError("No username provided");
        setIsLoading(false);
        return;
      }

      // A função inicia o estado de carregamento e busca os dados do usuário e seus repos com promise.all
      try {
        setIsLoading(true);
        setError(null);

        const [userData, repositoriesData] = await Promise.all([
          getUser(username, controller.signal),
          getUserRepositories(username, controller.signal),
        ]);

        // Em caso de sucesso define os estados acima com seus respectivos dados
        setUser(userData);
        setRepositories(repositoriesData);
        // Em caso de erro, atualiza o estado de erro que é renderizado posteriormente
      } catch (error) {
        // O cancelamento já é esperado
        if (axios.isCancel(error)) return;

        if (axios.isAxiosError(error)) {
          if (!error.response) {
            setError("Unable to connect to GitHub. Check your connection."); // Em caso de problemas com conexão
          } else if (error.response.status === 404) {
            setError("404: User not found."); // caso o usuário não seja encontrado
          } else if (error.response.status === 403) {
            setError("GitHub API rate limit exceeded. Try again later."); // caso o limite da api tenha sido atingido
          } else {
            setError(`GitHub API error (${error.response.status}).`); // outros erros com o código exibido
          }
        } else {
          setError("An unexpected error occurred."); // se não for um erro do axios, é dito como inesperado
        }
        // Ao fim da requisição encerra o estado de carregamento
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadUserInformation();

    return () => {
      controller.abort();
    };
  }, [username]);

  // Apenas renderiza o componente Loading durante o estado de carregamento
  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Loading />
      </div>
    );
  }

  // Em caso de erro, renderiza o erro vindo da função
  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div
          role="alert"
          className="rounded-2xl bg-gray-900 p-6 text-center hover:scale-[103%] hover:shadow-md shadow-red-400 duration-300 transition"
        >
          <p className="text-red-400 text-2xl">{error}</p>

          <Link
            to="/"
            className="mt-16 inline-block rounded-xl bg-red-400 px-4 py-2 text-white hover:scale-[103%] active:scale-100 transition duration-300"
          >
            Keep Searching
          </Link>
        </div>
      </div>
    );
  }

  // Caso user seja null
  if (!user) {
    return null;
  }

  // Em caso de sucesso retorna os componentes de usercard e repositorylistcard passando como propriedade os dados obtidos
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        to="/"
        className="mt-4 inline-block text-sm hover:text-blue-300 py-2 text-blue-400 font-semibold"
      >
        Keep Searching
      </Link>
      <h1 className="text-2xl font-bold text-gray-300">
        Results for "{user.login}"
      </h1>

      <section className="mt-4 grid gap-8 sm:grid-cols-[1fr_2fr]">
        <UserCard user={user} />
        <RepositoryListCard repositories={repositories} />
      </section>
    </div>
  );
}
