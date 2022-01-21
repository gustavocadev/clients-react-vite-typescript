import type { Client } from "./FormComponent";
import { Link, useNavigate } from "react-router-dom";

interface ClientComponentProps {
    client: Client;
    handleDelete: (id: string) => void;
}

const ClientComponent = ({ client, handleDelete }: ClientComponentProps) => {
    const navigate = useNavigate();

    const { name, email, notes, company, telephone, id } = client;
    return (
        <tr className="border hover:bg-gray-50">
            <td className="p-4">{name}</td>
            <td className="p-4">
                <p>
                    <span className="text-gray-800 uppercase font-bold">
                        Email:{" "}
                    </span>
                    {email}
                </p>
                <p>
                    <span className="text-gray-800 uppercase font-bold">
                        Telefono:{" "}
                    </span>
                    {telephone}
                </p>
            </td>
            <td className="p-4">{company}</td>
            <td className="p-4">
                <Link
                    to={`/clients/${id}`}
                    className="bg-orange-500 hover:bg-orange-600 block w-full rounded text-white px-4 py-2 font-bold mb-3 text-center"
                >
                    Ver
                </Link>
                <Link
                    to={`/clients/edit/${id}`}
                    className="bg-blue-600 hover:bg-blue-700 block w-full rounded text-white px-4 py-2 font-bold mb-3 text-center"
                >
                    Editar
                </Link>
                <button
                    type="button"
                    className="bg-rose-600 hover:bg-rose-700 block w-full rounded text-white px-4 py-2 font-bold "
                    onClick={() => handleDelete(id as string)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default ClientComponent;
