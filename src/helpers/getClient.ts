import { ClientsResponse } from "../types/ClientsResponse"

const getClient = async (id: number) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const data: ClientsResponse = await res.json()

    return data
  } catch (error) {
    console.log(error)
  }
}
export default getClient
