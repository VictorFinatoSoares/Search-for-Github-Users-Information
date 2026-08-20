import { Header } from "../components/Header";
import { MainCard } from "../components/UserInformationComponents/MainCard";

export function UserInformation() {
  return (
    <main className="min-h-screen bg-gray-800">
      <Header />
      <MainCard />
    </main>
  );
}
