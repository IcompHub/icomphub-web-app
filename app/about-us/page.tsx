import { Logo } from "@/components/general/logo";
import { GithubIcon, Linkedin } from "lucide-react";
import Link from "next/link";

interface DevInfo {
  name: string;
  image: string;
  linkedin: string;
  github: string;
  cargo: string;
}

const devs = [
  {
    name: "Raquel de Sá",
    image: "",
    linkedin: "https://www.linkedin.com/in/raquel-de-sa-silva/",
    github: "https://github.com/raqueldesa",
    cargo: "Desenvolvedora Frontend",
  },
  {
    name: "Raquel de Sá",
    image: "",
    linkedin: "https://www.linkedin.com/in/raquel-de-sa-silva/",
    github: "https://github.com/raqueldesa",
    cargo: "Desenvolvedora Frontend",
  },
  {
    name: "Raquel de Sá",
    image: "",
    linkedin: "https://www.linkedin.com/in/raquel-de-sa-silva/",
    github: "https://github.com/raqueldesa",
    cargo: "Desenvolvedora Frontend",
  },
  {
    name: "Raquel de Sá",
    image: "",
    linkedin: "https://www.linkedin.com/in/raquel-de-sa-silva/",
    github: "https://github.com/raqueldesa",
    cargo: "Desenvolvedora Frontend",
  },
];

export default function AboutUs() {
  return (
    <main className="p-6">
      <div className=" max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold mb-2">Quem somos?</h1>
        <p className="text-[#94a3b8] mb-8">
          Somos alunos finalistas do curo de{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
            {" "}
            Engenharia de Software
          </span>
          . Fizemos esse sistema para compor nossa disciplica de estágio
          obrigatório.
        </p>
        <div className="lg:gap-8 md:gap-6 lg:grid md:grid lg:grid-cols-3 md:grid-cols-2">
          {devs.map((dev, i) => (
            <DevCard
              key={i}
              cargo={dev.cargo}
              image={dev.image}
              github={dev.github}
              linkedin={dev.linkedin}
              name={dev.name}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
function DevCard({ cargo, image, github, linkedin, name }: DevInfo) {
  return (
    <div className="max-w-md flex flex-col items-center justify-center bg-[#204586] rounded-lg p-8">
      <Logo w={120} h={100} />
      <p className="w-fit">{name}</p>
      <p className="w-fit">{cargo}</p>
      <p>{image}</p>
      <div className="flex w-fit">
        <Link href={github} target="_blank">
          <GithubIcon className="transition-colors cursor-pointer rounded border border-transparent hover:bg-white hover:border-[#1a222f] hover:text-[#1a222f] m-1" />
        </Link>
        <Link href={linkedin} target="_blank">
          <Linkedin className="transition-colors cursor-pointer rounded border border-transparent hover:bg-white hover:border-[#1a222f] hover:text-[#1a222f] m-1" />
        </Link>
      </div>
    </div>
  );
}
