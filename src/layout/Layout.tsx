import { Link, Outlet, NavLink, useLocation } from "react-router-dom";

const Layout = () => {
    const { pathname } = useLocation();
    return (
        <main className="md:flex md:min-h-screen">
            <section className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white">
                    CRM Clientes
                </h2>
                <nav className="mt-10 text-white">
                    <Link
                        className={`${
                            pathname === "/clients" && "text-blue-300"
                        } text-2xl block mt-2 hover:text-blue-300`}
                        to="/clients"
                    >
                        Clientes
                    </Link>
                    <Link
                        className={`${
                            pathname === "/clients/new" && "text-blue-300"
                        } text-2xl block mt-2 hover:text-blue-300`}
                        to="/clients/new"
                    >
                        Nuevo Cliente
                    </Link>
                </nav>
            </section>
            <section className="md:w-3/4 p-10 md:h-screen md:overflow-scroll">
                <Outlet />
            </section>
        </main>
    );
};

export default Layout;
