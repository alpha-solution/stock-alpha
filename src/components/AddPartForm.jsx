import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getCurrentDate = () => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
};

export const checkExistPart = async (partCode) => {
    if (!partCode) {
        throw new Error("partCode is undefined");
    }

    const res = await fetch(`http://localhost:3000/api/exist-part/${partCode}`);

    if (res.ok) {
        return await res.json();
    } else {
        toast.error("Error 404");
        throw new Error("Something went wrong with checking existed part");
    }
};

export const addPartToStock = async (partCode, partName) => {
    if (!partCode || !partName) {
        throw new Error("partCode and partName are undefined");
    }

    const result = await fetch(`http://localhost:3000/api/stock/${partCode}/${partName}/0/${getCurrentDate()}`, {
        method: "POST"
    });

    if (result.ok) {
        return true;
    } else {
        return false;
    }
};

const AddPartForm = () => {
    const [partCode, setPartCode] = useState("");
    const [partName, setPartName] = useState("");

    const handlePartCodeChange = (e) => {
        setPartCode(e.target.value);
    };

    const handlePartNameChange = (e) => {
        setPartName(e.target.value);
    };

    const handleAddPart = async () => {
        const existPart = await checkExistPart(partCode);
        console.log(existPart);

        if (existPart) {
            toast.warn("Already existed in database");
        } else {

            const result = await fetch(`http://localhost:3000/api/part/${partCode}/${partName}`, {
                method: "POST"
            });

            if (result.ok) {

                const isAddToStock = await addPartToStock(partCode, partName);

                if (isAddToStock) {
                    toast.success("Part added successfully");
                } else {

                    const result = await fetch(`http://localhost:3000/api/part/${partCode}`, {
                        method: "DELETE"
                    });

                    if (result.ok) {
                        toast.error("Failed adding new part");
                    } else {
                        toast.error("Error 404");
                        throw new Error("Something went wrong with removing part");
                    }

                }

            } else {
                toast.error("Failed adding new part");
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