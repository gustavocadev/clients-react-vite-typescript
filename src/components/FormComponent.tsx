import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Alert from "./Alert"
import { useNavigate } from "react-router-dom"
import Spinner from "./Spinner"
import { Document as Client } from "../types/ClientsResponse"
import { ReactNode } from "react"

type Props = {
  client: Client
  children?: string | ReactNode
  loading?: boolean
}

const FormComponent = ({ client, children, loading }: Props) => {
  const navigate = useNavigate()

  const newClientSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "El nombre es muy corto")
      .required("El nombre del cliente es obligatorio"),
    company: Yup.string().required("El nombre de la empresa es necesario"),
    email: Yup.string()
      .required("El email es obligatorio")
      .email("El correo debe ser una email valido"),
    telephone: Yup.number()
      .integer("el número no es valido")
      .positive("Deben ser números positivos")
      .typeError("Número no valido"),
  })

  const handleSubmit = async (values: Client) => {
    try {
      let res
      if (client?.name) {
        // Editing Register :D
        res = await fetch(`${import.meta.env.VITE_API_URL}/${client._id}`, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
      } else {
        // I create a new Register
        res = await fetch(`${import.meta.env.VITE_API_URL}`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
      }

      const data: Client = await res.json()
      console.log(data)
      navigate("/clients")
    } catch (error) {
      console.log(error)
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <section className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {children}
      </h1>
      <Formik
        initialValues={{
          name: client?.name,
          company: client?.company,
          email: client?.email,
          telephone: client?.telephone,
          notes: client?.notes,
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values as Client)

          resetForm()
        }}
        validationSchema={newClientSchema}
      >
        {({ errors }) => {
          return (
            <Form className="mt-10">
              <label htmlFor="name" className="block mb-4">
                <span className="text-gray-800">Name</span>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-2 block w-full p-3 bg-gray-50 border border-black rounded"
                  placeholder="Nombre"
                />
                {errors.name && <Alert>{errors.name}</Alert>}
              </label>

              <label htmlFor="company" className="block mb-4">
                <span className="text-gray-800">Empresa del cliente</span>
                <Field
                  type="text"
                  id="company"
                  name="company"
                  className="mt-2 block w-full p-3 bg-gray-50 border border-black rounded"
                  placeholder="Empresa del cliente"
                />
                {errors.company && <Alert>{errors.company}</Alert>}
              </label>

              <label htmlFor="email" className="block mb-4">
                <span className="text-gray-800">E-mail</span>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-2 block w-full p-3 bg-gray-50 border border-black rounded"
                  placeholder="Email"
                />
                {errors.email && <Alert>{errors.email}</Alert>}
              </label>

              <label htmlFor="telephone" className="block mb-4">
                <span className="text-gray-800">Telephone</span>
                <Field
                  type="number"
                  id="telephone"
                  name="telephone"
                  className="mt-2 block w-full p-3 bg-gray-50 border border-black rounded"
                  placeholder="Your Telephone"
                />
                {errors.telephone && <Alert>{errors.telephone}</Alert>}
              </label>

              <label htmlFor="notes" className="block mb-4">
                <span className="text-gray-800">Notas: </span>
                <Field
                  as="textarea"
                  type="text"
                  id="notes"
                  name="notes"
                  className="mt-2 block w-full p-3 bg-gray-50 border border-black rounded h-40"
                  placeholder="Notas del cliente"
                />
                {errors.notes && <Alert>{errors.notes}</Alert>}
              </label>
              <button
                type="submit"
                className="mt-5 w-full bg-blue-800 rounded p-3 text-white uppercase font-bold text-lg"
              >
                {children}
              </button>
            </Form>
          )
        }}
      </Formik>
    </section>
  )
}

FormComponent.defaultProps = {
  client: {
    name: "",
    company: "",
    email: "",
    telephone: "",
    notes: "",
  },
  loading: false,
}
export default FormComponent
