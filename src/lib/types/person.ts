export type PersonGender = "MASCULINO" | "FEMININO" | "TODOS"
export type PersonStatus =  "DESAPARECIDO" | "LOCALIZADO" | "TODOS";


export type PersonType = {
  id: number,
  nome: string,
  idade: number,
  sexo: PersonGender,
  vivo: boolean,
  urlFoto: string,
  ultimaOcorrencia: {
    dtDesaparecimento: string,
    dataLocalizacao: string,
    encontradoVivo: true,
    localDesaparecimentoConcat: string,
    ocorrenciaEntrevDesapDTO: {
      informacao: string,
      vestimentasDesaparecido: string
    },
    listaCartaz: [
      {
        urlCartaz: string,
        tipoCartaz: string
      }
    ],
    ocoId: string
  },
  status?: number | null;
  detail?: string | null
}


export type PersonFilter = {
  nome?: string | null;
  faixaIdadeInicial?: number | null;
  faixaIdadeFinal?: number | null;
  sexo?: PersonGender;
  status?: PersonStatus;
  pagina?: number | null;
  porPagina?: number | null;
};

                                                                                                        
export type FilterTypeResponse = {
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  } | null;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  } | null;
  empty: boolean;
  content: PersonType[];
};