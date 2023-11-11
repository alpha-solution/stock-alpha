import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPartForm = () => {
    const [partCode, setPartCode] = useState("");
    const [partName, setPartName] = useState("");

    const handlePartCodeChange = (e) => {
        setPartCode(e.target.value);
    };

    const handlePartNameChange = (e) => {
        setPartName(e.target.value);
    };

    const checkExistPart = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/exist-part/${partCode}`);
            return await res.json();
        } catch (e) {
            console.log("Error: ", e);
            return;
        }
    };

    const handleAddPart = async () => {
        const existPart = await checkExistPart();
        console.log(existPart);

        if (existPart) {
            toast.warn("Already existed in database");
        } else {

            try {
                const result = await fetch(`http://localhost:3000/api/part/${partCode}/${partName}`);

                if (result.ok) {
                    toast.success("Part added successfully");
                } else {
                    toast.error("Failed adding new part");
                }
            } catch (e) {
                console.log("Error: ", e);
            }

        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="container mx-auto p-4 text-center" style={{ maxWidth: "400px" }}>
                <h1 className="text-2xl font-bold mb-4">Add Part</h1>

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

                <div className="text-left">
                    <button
                        className="bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600"
                        onClick={handleAddPart}
                    >
                        Add Part
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddPartForm;