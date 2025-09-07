"use client";

import FiltersWidget from "@/components/Filters";
import Icon from "@/components/views/Icon";
import PersonCard from "@/components/PersonCard";
import Loading from "@/components/views/ProgressBar";
import * as api from "@/lib/api/abitus";
import {
  FilterTypeResponse,
  PersonFilter,
  PersonType,
} from "@/lib/types/person";
import { use, useEffect, useState } from "react";

export default function Home() {
  const [listPeoples, setListPeoples] = useState<PersonType[]>([]);
  const [responseContent, setResponseContent] =
    useState<FilterTypeResponse | null>(null);

  const [filters, setFilters] = useState<PersonFilter>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [showFilters, setShowFilters] = useState<boolean>(false);

  const fetchPersons = async () => {
    setIsLoading(true);
    const response = await api.getPeoples({
      pagina: currentPage,
      porPagina: 10,
      nome: searchName || undefined,
      ...filters,
    });
    setIsLoading(false);

    if (!response) return;
    setResponseContent(response);
    setListPeoples(response.content);
    setTotalPages(Math.max(response.totalPages - 1, 1));
  };

  useEffect(() => {
    fetchPersons();
  }, [filters, currentPage, searchName]);

  const nextPage = () => setCurrentPage((p) => (p < totalPages ? p + 1 : p));
  const forwardPage = () => setCurrentPage((p) => (p > 1 ? p - 1 : p));

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPersons();
  };

  const closeFilters = () => {
    setShowFilters(!showFilters);
    if (showFilters) setFilters({});
  };

  return (
    <div>
      <div className="w-full bg-[#F8F9FA] shadow-md mb-5 items-center">
        <div className="flex w-full p-2">
          <form className="w-full" onSubmit={onSearchSubmit}>
            <input
              type="search"
              placeholder="Procurar por nome..."
              className="w-full p-1 text-xl focus:outline-none"
              onChange={(e) => setSearchName(e.target.value)}
            />
          </form>
          <button
            className="flex items-center cursor-pointer bg-[#3A589B] p-1 mx-2 text-white rounded-md"
            onClick={() => {
              setCurrentPage(1);
              fetchPersons();
            }}
          >
            <Icon name="search" />
          </button>

          <button
            className="flex items-center text-sm cursor-pointer bg-[#3A589B] p-1 text-white rounded-md"
            onClick={closeFilters}
          >
            {showFilters ? (
              <Icon name="close" className="cursor-pointer" />
            ) : (
              <Icon name="filter_list" className="cursor-pointer" />
            )}

            <span>{showFilters ? "Fechar" : "Filtrar"}</span>
          </button>
        </div>
        {showFilters && (
          <FiltersWidget
            filters={filters}
            setFilters={setFilters}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>

      <div className="p-2 mb-4">
        <div className="flex items-center ml-2 w-full justify-between">
          <h1 className="font-semibold text-neutral-500 text-2xl lg:text-3xl">
            Registros{" "}
            <span className="text-xl text-neutral-400">
              ({responseContent?.numberOfElements ?? 0})
            </span>
          </h1>

          <div className="flex text-neutral-500 items-center justify-center me-2 space-x-2">
            <Icon
              name="arrow_back_ios"
              className={`cursor-pointer ${
                currentPage === 1 ? "opacity-30 pointer-events-none" : ""
              }`}
              onIconClick={forwardPage}
            />

            {totalPages > 3 && currentPage !== 1 && (
              <>
                <button
                  className=" p-1 rounded-md cursor-pointer underline"
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </button>
                <span>...</span>
              </>
            )}

            <span className="m-2">
              {currentPage}/{totalPages}
            </span>

            <span>...</span>
            <button
              className="p-1 rounded-md cursor-pointer underline"
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>

            <Icon
              name="arrow_forward_ios"
              className={`cursor-pointer ${
                currentPage === totalPages
                  ? "opacity-30 pointer-events-none"
                  : ""
              }`}
              onIconClick={nextPage}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="h-screen flex items-center justify-center">
            <Loading />
          </div>
        ) : listPeoples.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {listPeoples.map((person, i) => (
              <PersonCard person={person} key={i} />
            ))}
          </div>
        ) : (
          <div className="text-center w-full text-xl text-neutral-500 mt-3">
            <p>Nenhum resultado encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
