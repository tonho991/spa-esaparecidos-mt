import { PersonFilter, PersonGender, PersonStatus } from "@/lib/types/person";
import { Dispatch, SetStateAction, useState } from "react";

export default function FiltersWidget({
  filters,
  setFilters,
  setCurrentPage,
}: {
  filters: PersonFilter;
  setFilters: Dispatch<SetStateAction<PersonFilter>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) {
  const [fromAge, setFromAge] = useState<number | null>(
    filters.faixaIdadeInicial ?? null
  );
  const [toAge, setToAge] = useState<number | null>(
    filters.faixaIdadeFinal ?? null
  );
  const [gender, setGender] = useState<PersonGender>("TODOS");
  const [status, setStatus] = useState<PersonStatus>("TODOS");

  const applyFilters = () => {
    setFilters({
      faixaIdadeInicial: fromAge ?? undefined,
      faixaIdadeFinal: toAge ?? undefined,
      sexo: gender === "TODOS" ? undefined : gender,
      status: status === "TODOS" ? undefined : status,
      porPagina: 10,
    });

    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFromAge(0)
    setToAge(0)
    setGender("TODOS")
    setStatus("TODOS")
    setFilters({});
    setCurrentPage(1)
  }

  return (
    <div className="bg-[#f2f3f5] w-full p-4 rounded-md">
      <div className="grid grid-cols-1 items-end lg:grid-cols-[repeat(auto-fit,minmax(220px,0fr))] gap-8">
        {/* Faixa Etária */}
        <div className="w-60">
          <p className="text-lg font-semibold mb-2">Faixa etária</p>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-sm mb-1">De</label>
              <input
                type="number"
                className="bg-neutral-200 border-b-2 w-full rounded-sm p-2 focus:outline-none"
                placeholder="15 anos"
                value={fromAge ?? ""}
                onChange={(e) =>
                  setFromAge(e.target.value ? parseInt(e.target.value) : null)
                }
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-sm mb-1">Até</label>
              <input
                type="number"
                className="bg-neutral-200 border-b-2 w-full rounded-sm p-2 focus:outline-none"
                placeholder="30 anos"
                value={toAge ?? ""}
                onChange={(e) =>
                  setToAge(e.target.value ? parseInt(e.target.value) : null)
                }
              />
            </div>
          </div>
        </div>

        {/* Sexo */}
        <div className="w-60">
          <p className="text-lg font-semibold mb-2">Sexo</p>
          <select
            className="bg-neutral-200 border-b-2 w-full rounded-sm p-2 focus:outline-none"
            value={gender}
            onChange={(e) =>
              setGender(e.target.value as PersonGender)
            }
          >
            <option value="TODOS">TODOS</option>
            <option value="FEMININO">FEMININO</option>
            <option value="MASCULINO">MASCULINO</option>
          </select>
        </div>

        {/* Status */}
        <div className="w-60">
          <p className="text-lg font-semibold mb-2">Status</p>
          <select
            className="bg-neutral-200 border-b-2 w-full rounded-sm p-2 focus:outline-none"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as PersonStatus
              )
            }
          >
            <option value="TODOS">TODOS</option>
            <option value="DESAPARECIDO">DESAPARECIDO</option>
            <option value="LOCALIZADO">LOCALIZADO</option>
          </select>
        </div>
      </div>

      <div className="flex">
        <button
          className="text-center w-40 cursor-pointer bg-[#3A589B] hover:bg-[#4567b3] p-1 mt-4 m-1 text-white rounded-md shadow-xl"
          onClick={applyFilters}
        >
          Aplicar
        </button>

        <button
          className="text-center w-40 cursor-pointer bg-[#36528f] hover:bg-[#4567b3] p-1 mt-4 m-1 text-white rounded-md shadow-xl"
          onClick={clearFilters}
        >
          Limpar filtros
        </button>
      </div>
    </div>
  );
}
