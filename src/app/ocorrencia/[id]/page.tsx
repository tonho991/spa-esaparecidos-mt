"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as api from "@/lib/api/abitus";
import { PersonType } from "@/lib/types/person";
import Loading from "@/components/views/ProgressBar";
import PersonImage from "@/components/PersonImage";

import { ButtonIcon, LinkButtonIcon } from "@/components/views/Buttons";

const OcoNotFound = () => (
  <div className="w-full flex flex-col items-center justify-center h-screen p-2">
    <p className="text-2xl font-semibold text-blue-800">
      Ocorrência Não Encontrada.
    </p>
    <p className="text-md text-center text-neutral-500">
      A ocorrência informada não foi encontrada em nossos registros.
    </p>
  </div>
);

const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getStatusText = (sexo: string, localizado: boolean) =>
  localizado
    ? `LOCALIZAD${sexo === "MASCULINO" ? "O" : "A"}`
    : `DESAPARECID${sexo === "MASCULINO" ? "O" : "A"}`;

export default function PessoaPage() {
  const [person, setPerson] = useState<PersonType | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const router = useRouter();

  const ocoId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (!ocoId) {
      router.push("/404");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await api.fetchPersonDatails(Number(ocoId));
        setPerson(response);
      } catch (e) {
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ocoId, router]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  if (!person || !person.ultimaOcorrencia || person.status === 404)
    return <OcoNotFound />;

  const { ultimaOcorrencia } = person;
  const isDesapear = !ultimaOcorrencia.dataLocalizacao;
  const poster = ultimaOcorrencia.listaCartaz?.[0];

  const dtDesaparecimento = new Date(ultimaOcorrencia.dtDesaparecimento);
  const formattedDate = dtDesaparecimento.toLocaleDateString();
  const formattedTime = dtDesaparecimento.toLocaleTimeString();

  const shareContent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Pessoa Desaparecida",
          text: `Você conhece ${person.nome}, de ${person.idade} anos? Esta pessoa está desaparecida. Ajude-nos a encontrá-la compartilhando esta informação! Saiba mais em: ${window.location.href}`,
        });
      } catch (e) {
        console.error("Erro ao compartilhar:", e);
      }
    } else {
      alert("Seu navegador não suporta a função de compartilhamento.");
    }
  };

  const posterDownload = () => {
    if (poster?.urlCartaz) {
      const link = document.createElement("a");
      link.href = poster.urlCartaz;
      link.download = `${person.nome}-cartaz.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="lg:h-screen">
      <div className="lg:flex p-2">
        <div>
          <PersonImage
            src={person.urlFoto}
            alt={person.nome}
            className={`h-96 w-80 object-cover m-2 shadow-xl border-2 ${
              isDesapear ? "border-red-700" : "border-green-700"
            }`}
          />
        </div>
        <div className="lg:ml-4">
          <div>
            <h1 className="text-2xl font-semibold">{person.nome}</h1>
            <p className="text-xl text-neutral-700">
              {person.idade} anos - {capitalizeFirstLetter(person.sexo)}
            </p>
            <hr className="mb-3 mt-1 border-neutral-400" />
          </div>
          <ul>
            <li className="mb-1">
              <p className="text-xl font-semibold">Status:</p>
              <div
                className={`rounded-md px-3 p-1 w-fit ${
                  isDesapear ? "bg-red-700" : "bg-green-700"
                }`}
              >
                <p className="text-xs font-semibold text-white text-center">
                  {getStatusText(person.sexo, !isDesapear)}
                </p>
              </div>
            </li>

            <li className="mb-1">
              <p className="text-xl font-semibold">Data de desaparecimento:</p>
              <p className="text-md text-neutral-700">
                {formattedDate} às {formattedTime}
              </p>
            </li>

            {ultimaOcorrencia.dataLocalizacao && (
              <li className="mb-1">
                <p className="text-xl font-semibold">Localizado no dia:</p>
                <p className="text-md text-neutral-700">
                  {formattedDate} às {formattedTime}
                </p>
              </li>
            )}

            <li className="mb-1">
              <p className="text-xl font-semibold">Local de desaparecimento:</p>
              <p className="text-md text-neutral-700">
                {ultimaOcorrencia.localDesaparecimentoConcat}
              </p>
            </li>

            {ultimaOcorrencia.ocorrenciaEntrevDesapDTO
              .vestimentasDesaparecido && (
              <li className="mb-1">
                <p className="text-xl font-semibold">Vestimentas:</p>
                <p className="text-md text-neutral-700">
                  {
                    ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                      .vestimentasDesaparecido
                  }
                </p>
              </li>
            )}

            {ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao && (
              <li className="mb-1">
                <p className="text-xl font-semibold">Informações:</p>
                <p className="text-md text-neutral-700">
                  {ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="p-2">
        <hr className="lg:hidden mt-2 mb-2 border-neutral-400" />
        <div className="">
          <p className="text-xl font-semibold mb-1">Ajude a compartilhar:</p>
          <div className="lg:flex">
            <ButtonIcon
              className="m-1"
              icon="link"
              text="Compartilhar caso"
              onClick={shareContent}
            />
            {poster && (
              <ButtonIcon
                className="m-1"
                icon="newsmode"
                text="Baixar cartaz"
                onClick={posterDownload}
              />
            )}
          </div>
        </div>

        <div>
          <p className="text-xl font-semibold mb-1">Reconhece essa pessoa?</p>
          <LinkButtonIcon
            icon="info"
            text="Informar à Polícia Judiciária"
            href={`/ocorrencia/${ocoId}/registrar-novas-informacoes`}
          />
        </div>
      </div>
    </div>
  );
}
