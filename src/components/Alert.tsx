import React from "react";

const Alert = ({ children }: { children: string }) => {
    return (
        <span className="bg-rose-600  text-white rounded p-2 block text-center font-semibold text-lg">
            {children}
        </span>
    );
};

export default Alert;
