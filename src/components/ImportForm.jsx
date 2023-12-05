import ImportManager from "@/utils/import";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImportForm = ({ title = "Add Import", data = "" }) => {
    const [partCode, setPartCode] = useState(data ? data.part_code : "");
    const [partName, setPartName] = useState(data ? data.part_name : "");
    const [partAmt, setPartAmt] = useState(data ? data.amount : 1);

    const { data: session } = useSession();
    console.log(session);

    const userName = session.user.name.first_name;

    const filterButton = async () => {
        if (title === "Add Import") {
            await ImportManager.add(partCode, partName, partAmt, userName);
        }
    };

    const handlePartCodeChange = (e) => {
        setPartCode(e.target.value);
    };

    const handlePartNameChange = (e) => {
        setPartName(e.target.value);
    };

    const handlePartAmtChange = (e) => {
        setPartAmt(e.target.value);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="container mx-auto p-4 text-center" style={{ maxWidth: "400px" }}>
                <h1 className="text-2xl font-bold mb-4">{title}</h1>

                <div className="mb-4">
                    <label className="block text-gray-600 text-left font-semibold">Part Code</label>
                    <input
                        type="text"
                        className="border p-2 w-full"
                        value={partCode}
                        onChange={handlePartCodeChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 text-left font-semibold">Part Name</label>
                    <input
                        type="text"
                        className="border p-2 w-full"
                        value={partName}
                        onChange={handlePartNameChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 text-left font-semibold">Amount</label>
                    <input
                        type="number"
                        className="border p-2 w-full"
                        value={partAmt}
                        onChange={handlePartAmtChange}
                    />
                </div>

                <div className="text-left">
                    <button
                        className="bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600"
                        onClick={filterButton}
                    >
                        {title}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ImportForm;