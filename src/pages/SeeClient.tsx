import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Client } from "../components/FormComponent";
import Spinner from "../components/Spinner";

const SeeClient = () => {
    const [client, setClient] = useState<Client>();
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const getClient = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/${id}`
                );
                const { document: data } = await res.json();

                setClient(data);
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(!loading);
        };
        getClient();
    }, []);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : JSON.stringify(client) === undefined ? (
                <p>No hay resultados</p>
            ) : (
                <section>
                    <h1 className="font-black text-4xl text-blue-900">
                        Ver Cliente: {client?.name}
                    </h1>
                    <p className="mt-3">Información del cliente</p>

                    <p className="text-3xl text-gray-700 mt-10">
                        <span className="text-gray-800 uppercase font-bold">
                            Cliente:
                        </span>{" "}
                        {client?.name}
                    </p>

                    <p className="text-3xl text-gray-700 mt-4">
                        <span className="text-gray-800 uppercase font-bold">
                            Email:
                        </span>{" "}
                        {client?.email}
                    </p>

                    {client?.telephone && (
                        <p className="text-3xl text-gray-700 mt-4">
                            <span className="text-gray-800 uppercase font-bold">
                                Telefono:
                            </span>{" "}
                            {client?.telephone}
                        </p>
                    )}

                    <p className="text-3xl text-gray-700 mt-4">
                        <span className="text-gray-800 uppercase font-bold">
                            Company:
                        </span>{" "}
                        {client?.company}
                    </p>

                    {client?.notes && (
                        <p className="text-3xl text-gray-700 mt-4">
                            <span className="text-gray-800 uppercase font-bold">
                                Notas:
                            </span>{" "}
                            {client?.notes}
                        </p>
                    )}
                </section>
            )}
        </>
    );
};

export default SeeClient;
