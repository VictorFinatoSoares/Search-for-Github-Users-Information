import githubLogo from "../assets/github_logo.png";

export function Header() {
  return (
    <header className="flex flex-col md:flex-row justify-center items-center  bg-gray-900 border-b-4 border-blue-400 py-2 md:py-4">
      <img className="h-20 md:h-24" alt="Github Logo" src={githubLogo} />
      <h3 className="text-2xl md:text-3xl text-white font-bold text-center px-4">
        Search for User Information
      </h3>
    </header>
  );
}
