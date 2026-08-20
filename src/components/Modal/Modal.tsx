// Componente que exibe os detalhes do repositório selecionado

import { useEffect, useRef } from "react";

import type { RepositoryData } from "../../types/datatypes";

// O modal usa as informações do repositório selecionado e uma função quando for fechado
interface ModalProps {
  repository: RepositoryData;
  onClose: () => void;
}

export function Modal({ repository, onClose }: ModalProps) {
  // Referência usada para o foco ir para o botão de fechar
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Effect sempre que o modal é aberto
  useEffect(() => {
    // Guarda o estado atual da rolagem da página
    const previousOverflow = document.body.style.overflow;

    // Permite fechar o modal pelo teclado com ESC
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    // Bloqueia a rolagem do conteúdo ao fundo, registra o evento de teclado
    // e posiciona o foco inicialmente no botão de fechar
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    // Restaura a rolagem e remove o evento quando o modal é fechado
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      // Fecha o modal somente quando o clique ocorre diretamente no fundo
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="repository-modal-title"
        aria-describedby="repository-modal-description"
        className="w-full max-w-sm md:max-w-lg rounded-2xl bg-gray-900 p-6 shadow-sm hover:scale-[103%] duration-300 transition shadow-blue-400"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="repository-modal-title"
            className="text-2xl font-semibold text-blue-400"
          >
            {repository.name}
          </h2>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close repository details"
            className="text-2xl leading-none text-gray-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            &times;
          </button>
        </div>

        {/* Exibe um texto padrão quando o repositório não possui descrição*/}
        <p id="repository-modal-description" className="mt-4 text-gray-300">
          {repository.description || "No description provided."}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-400">Language</dt>
            <dd className="mt-1 text-gray-100">
              {/* A linguagem também pode ser null na resposta da API*/}
              {repository.language || "Not provided."}
            </dd>
          </div>
          <div>
            <dt className="text-gray-400">Visibility</dt>
            <dd className="mt-1 capitalize text-gray-100">
              {repository.visibility}
            </dd>
          </div>
        </dl>

        {/* Abre a página do repositório em uma nova aba*/}
        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-xl bg-blue-400 px-4 py-2 font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          Open on GitHub
        </a>
      </section>
    </div>
  );
}
