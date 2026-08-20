// Componente que renderiza as informações do usuário
import { useParams, Link } from "react-router-dom";

// Separação de cada informação em componentes
import { UserCard } from "./UserCard";
import { RepositoryListCard } from "./RepositoryListCard";

// Componente de carregamento
import { Loading } from "../Loading/Loading";

// Hook para a requisição
import { useUserInformation } from "../../hooks/useUserInformation";

export function MainCard() {
  // Username que o usuário digitou vem da URL
  const { username } = useParams();

  // Obtém os dados da requisição do hook
  const { user, repositories, isLoading, error } = useUserInformation(username);

  // Enquanto a requisição ainda não foi completada
  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Loading />
      </div>
    );
  }

  // Em caso erro, renderiza a mensagem de erro do hook
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

  // Não renderiza o conteúdo se não tiver dados do usuário
  if (!user) return null;

  // Em caso de sucesso retorna os componentes de userCard e repositoryListCard passando como propriedade os dados obtidos do hook
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
