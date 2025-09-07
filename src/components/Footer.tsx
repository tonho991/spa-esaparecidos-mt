import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-gradient-to-r from-[#3A589B] to-[#365391] p-2">
      <div className={`flex items-center  sm:justify-start cursor-pointer`}>
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

      <div>
        <hr className="border-white ml-2 mr-2 mt-2 mb-2" />
        <p className="text-white text-[12px] text-center lg:text-md">
          Polícia Judiciária Civil do Estado de Mato Grosso - Copyright ©{" "}
          {new Date().getFullYear()} - Todos os Direitos Reservados
        </p>
      </div>
    </div>
  );
}
