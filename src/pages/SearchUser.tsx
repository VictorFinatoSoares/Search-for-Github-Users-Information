// Página inicial de pesquisa

import { Header } from "../components/Header";

// Exibirá os erros de pesquisa caso necessário
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useState, type SubmitEvent } from "react";

export function SearchUser() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  // Função que válida se o formato da pesquisa está válido e redireciona para a página de users passando o username como parâmetro
  function onSubmitUserName(event: SubmitEvent<HTMLFormElement>) {
    // Evita atualização da página
    event.preventDefault();

    // Remove espaços desnecessáriso do username
    const formattedUsername = username.trim();

    // Caso nada tenha sido digitado
    if (!formattedUsername) {
      toast.error("You need to provide the username.");
      return;
      // Caso haja espaços entre as palavras (ex: octo cat), exibe um erro pois o login de um usuário é sem espaços
    } else if (formattedUsername.includes(" ")) {
      toast.error("The username cannot contain spaces.");
      return;
    }

    navigate(`/users/${encodeURIComponent(formattedUsername)}`);
  }

  return (
    <main className="bg-gray-800 min-h-screen">
      <Header />
      <form
        onSubmit={onSubmitUserName}
        className="mt-16 mx-auto w-full max-w-3xl px-6 md:px-10"
      >
        <div className="flex flex-col justify-center items-center hover:scale-[103%] p-6 sm:p-10 md:p-16 gap-4 bg-gray-900 hover:shadow-blue-400 duration-300 transition shadow-sm shadow-neutral-900 rounded-2xl">
          <h1 className="text-3xl md:text-4xl text-white text-center font-semibold">
            Search User
          </h1>
          <p className="text-sm md:text-base text-neutral-400 text-center">
            Enter the username to get information.
          </p>
          <label className="sr-only" htmlFor="username">
            Github Username
          </label>
          <input // Sempre que algo for digitado define o username com o valor do input (será validado na função de submit)
            onChange={(event) => setUsername(event.target.value)}
            className="w-full bg-white hover:scale-[103%] p-2 rounded-2xl flex border-2 border-white focus:shadow-sm hover:border-blue-400 transition outline-hidden duration-75"
            id="username"
            type="text"
            placeholder="Ex: VictorFinatoSoares"
          />
          <button
            className="w-full hover:bg-blue-500 hover:scale-[103%] active:scale-100 bg-blue-400 text-white p-2 rounded-2xl transition duration-75"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </main>
  );
}
