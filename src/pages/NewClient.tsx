import FormComponent from "../components/FormComponent";
const NewClient = () => {
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">New client</h1>
            <p className="mt-3">
                Llena los siguientes campos para registrar un cliente
            </p>
            <FormComponent>Agregar Cliente</FormComponent>
        </>
    );
};

export default NewClient;
