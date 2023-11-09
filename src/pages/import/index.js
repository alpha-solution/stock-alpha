import DataTable from "@/components/DataTable";

export default function Import() {
    const columnName = ["Import Date", "Part Code", "Part Name", "Amount", "Employee"];
    return <DataTable actionButton={false} column={columnName} />;
}