import DataTable from "@/components/DataTable";
import ImportManager from "@/utils/import";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Import() {
    const [imports, setImports] = useState();

    useEffect(() => {
        const fetchImports = async () => {
            const importsData = await ImportManager.getAll();

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
                </div>
            </div>
            <DataTable actionButton={true} columnTable={columnTableName} columnModel={columnModelName} data={imports} topic="import" />
        </div>
    );
}