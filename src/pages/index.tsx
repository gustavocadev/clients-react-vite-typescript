import { Link } from "react-router-dom";

const index = () => {
    return (
        <div className="h-screen">
            <Link
                to="/clients"
                className="font-black text-4xl  place-items-center grid   bg-sky-300 h-full block"
            >
                Link to Clients
            </Link>
        </div>
    );
};

export default index;
