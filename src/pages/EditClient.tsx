import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Client } from "../components/FormComponent";
import FormComponent from "../components/FormComponent";

const EditClient = () => {
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
            } catch (error) {
                console.log(error);
            }
            setLoading(!loading);
        };
        getClient();
    }, []);
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">
                Editar Cliente
            </h1>
            <p className="mt-3">
                Utiliza este formulario para editar los datos del cliente
            </p>
            {client?.name ? (
                <FormComponent client={client} loading={loading}>
                    Editar cliente
                </FormComponent>
            ) : (
                <p>Cliente ID No valido</p>
            )}
        </>
    );
};

export default EditClient;
