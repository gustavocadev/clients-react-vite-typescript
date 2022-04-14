import { ReactNode } from "react"

type Props = {
  children: string | ReactNode
}
const Alert = ({ children }: Props) => {
  return (
    <span className="bg-rose-600  text-white rounded p-2 block text-center font-semibold text-lg">
      {children}
    </span>
  )
}

export default Alert
