import { useEffect, useState } from "react";
import ClientComponent from "../components/ClientComponent";
import type { Client } from "../components/FormComponent";

const Home = () => {
    const [clients, setClients] = useState<Client[]>([]);
    console.log(import.meta.env.VITE_API_URL);
    useEffect(() => {
        const getClients = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}`);

            const data = await res.json();

            setClients(data);
        };
        getClients();
    }, []);

    const handleDelete = async (id: string) => {
        const userConfirm = confirm("¿Quiere eliminar a este cliente?");
        if (userConfirm) {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/${id}`,
                    {
                        method: "DELETE",
                    }
                );

                const data: Client[] = await res.json();
                setClients(data);
                console.log("eliminado", data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3">Administra tus clientes</p>

            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Contacto</th>
                        <th className="p-2">Empresa</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <ClientComponent
                            key={client.id}
                            client={client}
                            handleDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Home;
