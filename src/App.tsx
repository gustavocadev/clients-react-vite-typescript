import { Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./routes/Home"
import NewClient from "./routes/NewClient"
import EditClient from "./routes/EditClient"
import SeeClient from "./routes/SeeClient"
import Index from "./routes/index"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/clients/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="new" element={<NewClient />} />
        <Route path="edit/:id" element={<EditClient />} />
        <Route path=":id" element={<SeeClient />} />
      </Route>
    </Routes>
  )
}

export default App
