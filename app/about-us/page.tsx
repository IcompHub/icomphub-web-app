import { GithubIcon, Linkedin } from "lucide-react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import raquel from "../../public/dev_profile/raquel.jpeg";
import keren from "../../public/dev_profile/keren.jpeg";
import nelson from "../../public/dev_profile/nelson.png";
import sarah from "../../public/dev_profile/sarah.png";
import luis from "../../public/dev_profile/luis.png";

interface DevInfo {
  name: string;
  image: StaticImageData;
  linkedin: string;
  github: string;
  cargo: string;
}

const devs = [
  {
    name: "Keren Guimarães",
    image: keren,
    linkedin: "https://www.linkedin.com/in/kerenguim/",
    github: "https://github.com/kerenguim",
    cargo: "Scrum Master & PO",
  },
  {
    name: "Luis Santos",
    image: luis,
    linkedin: "https://www.linkedin.com/in/luis-santos-438636196/",
    github: "https://github.com/database-luis",
    cargo: "Testador & QA",
  },
  {
    name: "Nelson Carvalho",
    image: nelson,
    linkedin: "https://www.linkedin.com/in/nelson-neto-181201204/",
    github: "https://github.com/nelsul",
    cargo: "Desenvolvedor Backend",
  },
  {
    name: "Raquel de Sá",
    image: raquel,
    linkedin: "https://www.linkedin.com/in/raquel-de-sa-silva/",
    github: "https://github.com/raqueldesa",
    cargo: "Desenvolvedora Frontend",
  },
  {
    name: "Sarah Júlia",
    image: sarah,
    linkedin: "https://www.linkedin.com/in/sarahjulia1909/",
    github: "https://github.com/sarahjl1909",
    cargo: "Desenvolvedora Backend",
  },
];

export default function AboutUs() {
  return (
    <main className="p-6">
      <div className=" max-w-5xl mx-auto ">
        <h1 className="text-3xl font-bold mb-2">Quem somos?</h1>
        <p className="text-[#94a3b8] mb-8 text-xl">
          Somos alunos finalistas do curso de{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
            {" "}
            Engenharia de Software
          </span>
          . Fizemos esse sistema para compor nossa disciplina de estágio
          obrigatório.
        </p>
        <div className="lg:gap-8 md:gap-6 lg:flex md:grid lg:flex-wrap lg:justify-center md:grid-cols-2">
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
    <div className="gap-1 max-w-md flex flex-col items-center justify-center rounded-lg p-8 mb-4 lg:w-2xs bg-[#080d17] border border-[#19212f] transition-transform hover:scale-[1.01] gap">
      <Image
        src={image}
        width={150}
        alt="Picture of the author"
        className="rounded-full"
      />
      <p className="w-fit text-lg font-semibold">{name}</p>
      <p className="w-fit text-sm">{cargo}</p>
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
