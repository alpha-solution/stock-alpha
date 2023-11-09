import DataTable from "@/components/DataTable";

export default function Import() {
    const columnName = ["Import Date", "Part Code", "Part Name", "Amount", "Employee"];
    return (
        <div className="container mx-auto mt-8 max-w-4xl">
            <div className="flex justify-end">
                <div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Import</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2">Filter</button>
                </div>
            </div>
            <DataTable actionButton={false} column={columnName} />
        </div>
    );
}