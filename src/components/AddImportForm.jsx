import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkExistPart } from "./AddPartForm";

const AddImportForm = () => {
    const [partCode, setPartCode] = useState("");
    const [partName, setPartName] = useState("");
    const [partAmt, setPartAmt] = useState(1);

    const { data: session } = useSession();
    console.log(session);

    const userName = session.user.name.first_name;

    const handlePartCodeChange = (e) => {
        setPartCode(e.target.value);
    };

    const handlePartNameChange = (e) => {
        setPartName(e.target.value);
    };

    const handlePartAmtChange = (e) => {
        setPartAmt(e.target.value);
    };

    const getCurrentDate = () => {
        const options = { day: "numeric", month: "numeric", year: "numeric" };
        return new Date().toLocaleDateString(undefined, options);
    };

    const getCurrentTime = () => {
        const options = { hour12: false };
        return new Date().toLocaleTimeString("th-TH", options);
    };

    const handleAddPart = async () => {
        const existPart = await checkExistPart(partCode);
        console.log(existPart);

        if (existPart) {
            return true;
        } else {

            try {
                const result = await fetch(`http://localhost:3000/api/part/${partCode}/${partName}`);

                if (result.ok) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                console.log("Error: ", e);
            }

        }
    };

    const handleAddImport = async () => {
        const currentDate = getCurrentDate();
        const currentTime = getCurrentTime();

        const isPartAdded = await handleAddPart();

        if (isPartAdded) {

            try {
                const result = await fetch(`http://localhost:3000/api/impt/${currentDate}/${currentTime}/${partCode}/${partName}/${partAmt}/${userName}`);

                if (result.ok) {
                    toast.success("Import added successfully");
                } else {
                    toast.error("Failed adding new import");
                }
            } catch (e) {
                console.log("Error: ", e);
            }

        } else {
            toast.error("Failed adding new part automatically");
            toast.warn("Please try adding part manually first");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="container mx-auto p-4 text-center" style={{ maxWidth: "400px" }}>
                <h1 className="text-2xl font-bold mb-4">Add Import</h1>

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
                        onClick={handleAddImport}
                    >
                        Add Import
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddImportForm;