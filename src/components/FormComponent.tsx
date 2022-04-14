import Alert from "./Alert"
import { useNavigate } from "react-router-dom"
import Spinner from "./Spinner"
import { Document as Client } from "../types/ClientsResponse"
import { ReactNode } from "react"
import { useForm } from "react-hook-form"

type FormData = {
  name: string
  company: string
  email: string
  telephone: number
  notes?: string
}

type Props = {
  client?: Client
  children?: string | ReactNode
  loading?: boolean
}

const FormComponent = ({ client, children, loading }: Props) => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState } = useForm<FormData>({
    defaultValues: client,
  })
  const { errors } = formState

  const handleDataForm = async (formData: FormData) => {
    try {
      let res
      if (client?.name) {
        // Editing Register :D
        res = await fetch(`${import.meta.env.VITE_API_URL}/${client._id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        })
      } else {
        // I create a new Register
        res = await fetch(`${import.meta.env.VITE_API_URL}`, {
          method: "POST",
          body: JSON.stringify(formData),
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

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
          <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
            {children}
          </h1>

          <form className="mt-10" onSubmit={handleSubmit(handleDataForm)}>
            <label htmlFor="name" className="block mb-4">
              <span className="text-gray-800">Name*</span>
              <input
                type="text"
                id="name"
                className="mt-2 block w-full p-3 bg-gray-50 border border-black rounded"
                placeholder="Nombre"
                {...register("name", {
                  required: {
                    value: true,
                    message: "El nombre del cliente es obligatorio",
                  },
                  min: {
                    value: 2,
                    message: "El nombre es muy corto",
                  },
                })}
              />
              {errors.name && <Alert>{errors.name.message}</Alert>}
            </label>

            <label htmlFor="company" className="block mb-4">
              <span className="text-gray-800">Empresa del cliente*</span>
              <input
                type="text"
                id="company"
                {...register("company", {
                  required: {
                    value: true,
                    message: "El nombre del cliente es obligatorio",
                  },
                })}
                className="mt-2 block w-full p-3 bg-gray-50 border border-black rounded"
                placeholder="Empresa del cliente"
              />
              {errors.company && <Alert>{errors.company.message}</Alert>}
            </label>

            <label htmlFor="email" className="block mb-4">
              <span className="text-gray-800">E-mail*</span>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El email es obligatorio",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "El email no es valido",
                  },
                })}
                className="mt-2 block w-full p-3 bg-gray-50 border border-black rounded"
                placeholder="Email"
              />
              {errors.email && <Alert>{errors.email.message}</Alert>}
            </label>

            <label htmlFor="telephone" className="block mb-4">
              <span className="text-gray-800">Telephone*</span>
              <input
                type="number"
                id="telephone"
                {...register("telephone", {
                  required: {
                    value: true,
                    message: "El email es obligatorio",
                  },
                })}
                className="mt-2 block w-full p-3 bg-gray-50 border border-black rounded"
                placeholder="Your Telephone"
              />
              {errors.telephone && <Alert>{errors.telephone.message}</Alert>}
            </label>

            <label htmlFor="notes" className="block mb-4">
              <span className="text-gray-800">Notas: </span>
              <textarea
                id="notes"
                {...register("notes", {})}
                className="mt-2 block w-full p-3 bg-gray-50 border border-black rounded h-40"
                placeholder="Notas del cliente"
              />
              {errors.notes && <Alert>{errors.notes.message}</Alert>}
            </label>
            <button
              type="submit"
              className="mt-5 w-full bg-blue-800 rounded p-3 text-white uppercase font-bold text-lg"
            >
              {children}
            </button>
          </form>
        </section>
      )}
    </>
  )
}
export default FormComponent
