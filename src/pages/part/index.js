import DataTable from "@/components/DataTable";
import { useEffect, useState } from "react";

const getParts = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/part");
        return await res.json();
    } catch (e) {
        console.log("Error loading parts: ", e);
        return null;
    }
};

export default function Part() {
    const [parts, setParts] = useState();

    useEffect(() => {
        const fetchParts = async () => {
            const partsData = await getParts();

            if (partsData) {
                setParts(partsData);
            }
        };

        fetchParts();
    }, []);

    const columnTableName = ["Part Code", "Part Name"];
    const columnModelName = ["part_code", "part_name"];

    return (
        <div className="container mx-auto mt-8 max-w-4xl">
            <div className="flex justify-end">
                <div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">+</button>
                </div>
            </div>
            <DataTable actionButton={true} columnTable={columnTableName} columnModel={columnModelName} data={parts} />
        </div>
    );
}