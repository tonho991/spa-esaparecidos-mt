"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import * as api from "@/lib/api/abitus";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default function Header() {
  const [personDesapear, setPersonDesapear] = useState<number | null>();
  const [personLocal, setPersonLocal] = useState<number | null>();

  const pathName = usePathname();
 
  const isHome = pathName === "/";

  const getStatistics = async () => {
    const response = await api.fetchPersonStatistics();

    if (!response) {
      return;
    }

    setPersonDesapear(response.quantPessoasDesaparecidas);
    setPersonLocal(response.quantPessoasEncontradas);
  };

  useEffect(() => {
    getStatistics();
  });

  const goHome = () => {
    window.location.href = "/"
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-[#3A589B] to-[#365391] p-2 grid grid-cols-1 sm:grid-cols-[15rem_auto_11rem] items-center ">
        <div className={`flex items-center ${isHome && "justify-center"} sm:justify-start cursor-pointer`} onClick={goHome}>
          <Image
            src="/static/images/BRASAO_PJCMT.png"
            width={40}
            height={40}
            alt="Brasão Policia Civil MT"
          />
          <div className="text-[12px] lg:text-sm text-white ml-2">
            <p>POLÍCIA JUDICIÁRIA CIVIL</p>
            <p>Estado de Mato Grosso</p>
          </div>
        </div>

        <div className=""></div>

        {isHome && (
          
          <div className="flex justify-center sm:justify-end gap-4">
            <div className="text-center">
              <p className="text-white font-semibold">{personDesapear}</p>
              <p className="text-[12px] text-neutral-300">Desaparecidos</p>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">{personLocal}</p>
              <p className="text-[12px] text-neutral-300">Localizados</p>
            </div>
          </div>
        )}
      </div>

      <div className="h-1 w-full bg-[#355394]" />
    </div>
  );
}
