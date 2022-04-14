import { Link } from "react-router-dom"
import { Document as Client } from "../types/ClientsResponse"

type Props = {
  client: Client
  handleDelete: (id: string) => void
}

const ClientComponent = ({ client, handleDelete }: Props) => {
  const { name, email, notes, company, telephone, _id } = client
  return (
    <tr className="border hover:bg-gray-50">
      <td className="p-4">{name}</td>
      <td className="p-4">
        <p>
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        <p>
          <span className="text-gray-800 uppercase font-bold">Telefono: </span>
          {telephone}
        </p>
      </td>
      <td className="p-4">{company}</td>
      <td className="p-4">
        <Link
          to={`/clients/${_id}`}
          className="bg-orange-500 hover:bg-orange-600 block w-full rounded text-white px-4 py-2 font-bold mb-3 text-center"
        >
          Ver
        </Link>
        <Link
          to={`/clients/edit/${_id}`}
          className="bg-blue-600 hover:bg-blue-700 block w-full rounded text-white px-4 py-2 font-bold mb-3 text-center"
        >
          Editar
        </Link>
        <button
          type="button"
          className="bg-rose-600 hover:bg-rose-700 block w-full rounded text-white px-4 py-2 font-bold "
          onClick={() => handleDelete(_id as string)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default ClientComponent
