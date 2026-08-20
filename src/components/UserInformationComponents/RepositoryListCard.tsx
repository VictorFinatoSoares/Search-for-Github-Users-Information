// Componente separado para a lista de repositórios do usuário
// O modal também é usado aqui, usando o repositório selecionado

import { useState } from "react";

import type { RepositoryData } from "../../types/datatypes";
import { Modal } from "../Modal/Modal";

interface RepositoriesCardProps {
  repositories: RepositoryData[];
}

export function RepositoryListCard({ repositories }: RepositoriesCardProps) {
  // Estado que controla o repositório selecionado pelo usuário
  const [selectedRepository, setSelectedRepository] =
    useState<RepositoryData | null>(null);

  return (
    <>
      <article className="rounded-2xl bg-gray-900 p-6 shadow-blue-400 hover:shadow-sm duration-300 transition">
        {/*Limite definido na requisição à API*/}
        <span className="text-xs flex justify-end font-normal mr-2 text-gray-400">
          Limit: 50
        </span>
        <h2 className="text-2xl font-semibold text-gray-100">
          Repositories
          {/*Quantidade de repositórios públicos encontrados*/}
          <span className="ml-3 text-sm font-normal border border-blue-400 px-2 rounded-2xl text-blue-400">
            {repositories.length} found
          </span>
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-[1fr_1fr]">
          {/*Caso tenha encontrado ao menos um repositório, faz um map na lista renderizando cada repo como um card*/}
          {repositories.length > 0 ? (
            repositories.map((repository) => (
              <li key={repository.html_url}>
                <button
                  type="button"
                  // Se o usuário clicou no card, seleciona o repositório atual passando as informações completas dele
                  onClick={() => setSelectedRepository(repository)}
                  className="flex h-full w-full flex-col gap-2 rounded-xl border border-gray-700 px-4 py-4 text-left transition hover:scale-[103%] hover:border-blue-400 hover:bg-gray-800 hover:shadow-sm hover:shadow-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  <span className="font-semibold text-blue-400">
                    {repository.name}
                  </span>

                  {/*Exibe a descrição se houver*/}
                  <span className="text-sm  text-gray-400">
                    {repository.description || "No description provided."}
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li>
              {/*Caso não tenha encontrado nenhum repositório público*/}
              <span className="text-red-400 font-semibold text-lg">
                Sorry! No repositories found...
              </span>
            </li>
          )}
        </ul>
      </article>

      {/*Se o usuário clicou em um repositório, ele renderiza o modal com as informações completas desse repositório*/}
      {selectedRepository && (
        <Modal
          repository={selectedRepository} // Recebe as informações
          onClose={() => setSelectedRepository(null)} // Caso o usuário feche o modal, deseleciona o repositório.
        />
      )}
    </>
  );
}
