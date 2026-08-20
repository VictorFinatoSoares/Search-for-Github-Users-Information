// Componente separado apenas para exibir as informações do usuário
import type { UserData } from "../../types/datatypes";

interface UserCardProps {
  user: UserData;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <article className="rounded-2xl bg-gray-900 p-6 hover:shadow-sm duration-300 transition  shadow-blue-400 h-fit">
      <div className="flex flex-col items-center gap-2 text-center">
        <img
          className="size-32 object-cover rounded-full border-2 border-blue-400 hover:scale-[103%] hover:shadow-xs transition shadow-blue-400 duration-300"
          src={user.avatar_url}
          alt={`Profile picture of ${user.login}`}
        />
        <a
          href={`https://github.com/${user.login}`}
          className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300"
        >
          @{user.login}
        </a>
      </div>

      {/*O nome de exibição de um usuário pode ser null, assim como a bio e localização*/}
      <dl className="mt-8 space-y-5 flex flex-col justify-center text-center items-center sm:justify-start sm:items-start sm:text-left">
        <div>
          <dt className="text-sm text-gray-400">Name</dt>
          <dd className="mt-1 text-gray-100 w-full">
            {user.name || "Not provided."}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Bio</dt>
          <dd className="mt-1 text-gray-100 w-full">
            {user.bio || "Not provided."}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Location</dt>
          <dd className="mt-1 text-gray-100 w-full">
            {user.location || "Not provided."}
          </dd>
        </div>
      </dl>
    </article>
  );
}
