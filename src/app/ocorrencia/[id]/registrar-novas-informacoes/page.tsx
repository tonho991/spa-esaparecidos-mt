"use client";

import { PersonType } from "@/lib/types/person";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import * as api from "@/lib/api/abitus";
import Loading from "@/components/views/ProgressBar";
import { Input, InputIcon } from "@/components/views/Inputs";
import { ButtonIcon } from "@/components/views/Buttons";
import Icon from "@/components/views/Icon";
import { toast } from "react-toastify";

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

export default function RegisterNewInfoPage() {
  const [person, setPerson] = useState<PersonType | null>(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<string | null>();

  const [files, setFiles] = useState<File[]>([]);

  const params = useParams();
  const router = useRouter();

  const MAX_FILES = 3;
  const MAX_SIZE_MB = 3;

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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!loading && !person) {
    return <OcoNotFound />;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    const validFiles = newFiles.filter(
      (file) => file.size <= MAX_SIZE_MB * 1024 * 1024
    );

    let updatedFiles = [...files, ...validFiles];

    if (updatedFiles.length > MAX_FILES) {
      updatedFiles = updatedFiles.slice(0, MAX_FILES);
    }
    setFiles(updatedFiles);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileName = (fname: string) => {
    if (fname.length > 5) {
      const name = fname.substring(0, 5);
      const ext = fname.substring(fname.lastIndexOf(".") - 4, fname.length);
      return `${name}...${ext}`;
    }
    return fname;
  };

  const handleSubmmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    const form = e.currentTarget as HTMLFormElement;

    const infos = (form.elements.namedItem("informacao") as HTMLInputElement)
      .value;
    const desc = (form.elements.namedItem("descricao") as HTMLInputElement)
      .value;
    const date = (form.elements.namedItem("data") as HTMLInputElement).value;

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    const url = new URL(api.API_ENDPOINTS.postDesapearInfo);
    url.searchParams.append("informacao", infos);
    url.searchParams.append("descricao", desc);
    url.searchParams.append("data", date);
    url.searchParams.append("ocoId", ocoId as string);

    const response = await fetch(url.toString(), {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    setLoading(false);

    if (!response.ok) {
      toast.error(`Falha ao enviar!\n\n Causa:${json.detail}`);
      return;
    }

    toast.success("Enviado com sucesso!");
  };

  return (
    <div className="flex flex-col items-center justify-center lg:h-screen">
      <div className="bg-[#F8F9FA] lg:w-4/12 shadow-2xl rounded-md m-2">
        <div className="w-full bg-[#3A589B] rounded-tl-md rounded-tr-md p-2 text-white">
          <h1 className="text-2xl font-semibold">
            Registrar Novas Informações
          </h1>
        </div>
        <div className="p-2">
          <p>
            <strong>Nome</strong>: {person?.nome}
          </p>
          <p>
            <strong>Idade</strong>: {person?.idade + " anos"}
          </p>
          <p>
            <strong>Sexo</strong>: {person?.sexo}
          </p>

          <form onSubmit={handleSubmmit}>
            <label className="font-semibold">Detalhes da Pessoa</label>
            <Input
              type="textarea"
              className="mb-2"
              name="informacao"
              placeholder="Informação"
              required
            />
            <label className="font-semibold">Descrição do Anexo</label>
            <Input
              type="textarea"
              className="mb-2"
              name="descricao"
              placeholder="Descrição"
              required
            />
            <label className="font-semibold">
              Data e hora da visualização da Pessoa
            </label>
            <Input className="mb-2" type="date" name="data" required />
            <label className="font-semibold">Anexar arquivos</label>
            <InputIcon
              className="mb-2"
              icon="attach_file"
              type="file"
              name="arquivos"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />

            <ul className="mt-2 mb-2 grid grid-cols-1 lg:grid-cols-2 gap-1">
              {files.map((file, i) => (
                <li key={i}>
                  <div className="bg-[#3A589B] w-70 rounded-md p-1 mt-1 shadow-md text-white flex justify-around hover:opacity-90">
                    <Icon name="draft" />
                    <p className="ml-1">
                      {formatFileName(file.name)} (
                      {(file.size / 1024 / 1024).toFixed(1)} MB)
                    </p>
                    <Icon
                      className="cursor-pointer"
                      name="close"
                      onIconClick={() => removeFile(i)}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <ButtonIcon className="w-full" icon="send" text="Enviar" />
          </form>
        </div>
      </div>
    </div>
  );
}
