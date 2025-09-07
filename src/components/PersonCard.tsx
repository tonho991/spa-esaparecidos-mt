import { PersonType } from "@/lib/types/person";
import PersonImage from "./PersonImage";
import Link from "next/link";
import { LinkButton } from "./views/Buttons";

export default function PersonCard({ person }: { person: PersonType }) {
  return (
    <div className="h-[450px] flex flex-col justify-between bg-[#F8F9FA] p-3 rounded-xl shadow-md hover:shadow-xl">
      <div className="flex justify-center items-center ">
        <div className="relative w-full max-w-[140px]">
          <PersonImage
            src={person.urlFoto}
            alt={person.nome}
            className="w-full max-w-[140px] h-[180px]"
          />

          <div
            className={`absolute top-1 right-0 rounded-tl-md rounded-bl-md px-2  ${
              person.ultimaOcorrencia.dataLocalizacao
                ? "bg-green-700"
                : "bg-red-700"
            }`}
          >
            <p className="text-xs font-semibold text-white text-center">
              {person.ultimaOcorrencia.dataLocalizacao
                ? `LOCALIZAD${person.sexo === "MASCULINO" ? "O" : "A"} `
                : `DESAPARECID${person.sexo === "MASCULINO" ? "O" : "A"} `}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-1">
        <span className=" text-md text-center line-clamp-1">{person.nome}</span>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <ul>
          <li className="mb-1">
            <p className="text-sm font-semibold">Idade:</p>
            <p className="text-sm text-neutral-700">{person.idade} anos</p>
          </li>
          <li className="mb-1">
            <p className="text-sm font-semibold">Desaparecimento:</p>
            <p className="text-sm text-neutral-700">
              {new Date(
                person.ultimaOcorrencia.dtDesaparecimento
              ).toLocaleDateString()}
            </p>
          </li>
          <li>
            <p className="text-sm font-semibold">Local:</p>
            <p className="text-sm text-neutral-700">
              {person.ultimaOcorrencia.localDesaparecimentoConcat}
            </p>
          </li>
        </ul>
      </div>
      <LinkButton text="Detalhes" href={`/ocorrencia/${person.id}`} />
    </div>
  );
}
