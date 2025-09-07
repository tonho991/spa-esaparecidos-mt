import axios from "axios";
import { FilterTypeResponse, PersonFilter, PersonType } from "../types/person";
import { PersonStatisticsResponse } from "../types/responses";

const API_VERSION = "v1";
const API_BASE_URL = `https://abitus-api.geia.vip/${API_VERSION}`;

export const API_ENDPOINTS = {
  getPeoplesStatistcs: `${API_BASE_URL}/pessoas/aberto/estatistico`,
  getPeoples: (filters: PersonFilter) => {
    if (!filters) {
      filters = {
        status: "DESAPARECIDO",
      };
    }
    const url = new URL(`${API_BASE_URL}/pessoas/aberto/filtro`);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    return url.toString();
  },
  getPersonDetail: (id: number) => `${API_BASE_URL}/pessoas/${id}`,
  postDesapearInfo: `${API_BASE_URL}/ocorrencias/informacoes-desaparecido`
};

export async function getPeoples(
  params: PersonFilter
): Promise<FilterTypeResponse | null> {
  try {
    const url = API_ENDPOINTS.getPeoples(params);
    const { data } = await axios.get<FilterTypeResponse>(url);
    return data;
  } catch {
    return null;
  }
}

export async function fetchPersonDatails(
  id: number
): Promise<PersonType | null> {
  try {
    const url = API_ENDPOINTS.getPersonDetail(id);
    const { data } = await axios.get<PersonType>(url);

    return data;
  } catch (e) {

    return <PersonType>{
      status: 500,
      detail: e
    };
  }
}

export async function fetchPersonStatistics(): Promise<PersonStatisticsResponse | null> {
  try {
    const url = API_ENDPOINTS.getPeoplesStatistcs;
    const { data } = await axios.get<PersonStatisticsResponse>(url);

    return data;
  } catch (e){
    return null;
  }
}
