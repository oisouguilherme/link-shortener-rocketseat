import { IconBrevLy } from "../../assets/Icons";
import { CreateLinkForm } from "../../components/CreateLinkForm";
import { LinksList } from "../../components/LinksList";

export function Home() {
  return (
    <div className="py-20 max-w-6xl mx-auto px-6 space-y-8">
      <header className="flex items-center justify-center md:items-start md:justify-start">
        <IconBrevLy />
      </header>
      <div className="grid lg:grid-cols-2 gap-5">
        <CreateLinkForm />
        <LinksList />
      </div>
    </div>
  );
}
