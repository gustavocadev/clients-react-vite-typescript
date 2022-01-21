 const getClient = async (id: number) => {
            try {
                const res = await fetch(`http://localhost:4000/clients/${id}`);
                const data = await res.json();

                return data
            } catch (error) {
                console.log(error);
            }
        };
export default getClient