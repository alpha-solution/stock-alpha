import DataTable from "@/components/DataTable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const getImports = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/impt");
        return await res.json();
    } catch (e) {
        console.log("Error loading imports: ", e);
        return null;
    }
};

export default function Import() {
    const [imports, setImports] = useState();

    useEffect(() => {
        const fetchImports = async () => {
            const importsData = await getImports();

            if (importsData) {
                setImports(importsData);
            }
        };

        fetchImports();
    }, []);

    const columnTableName = ["Import Date", "Import Time", "Part Code", "Part Name", "Amount", "Employee"];
    const columnModelName = ["import_date", "import_time", "part_code", "part_name", "amount", "employee"];

    const router = useRouter();

    const handleAddClicked = () => {
        router.push("add-import");
    };

    return (
        <div className="container mx-auto mt-8 max-w-4xl">
            <div className="flex justify-end">
                <div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleAddClicked}>+</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2">Filter</button>
                </div>
            </div>
            <DataTable actionButton={true} columnTable={columnTableName} columnModel={columnModelName} data={imports} />
        </div>
    );
}