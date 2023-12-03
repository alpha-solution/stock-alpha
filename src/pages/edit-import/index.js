import ImportForm from "@/components/ImportForm";
import { useRouter } from "next/router";

export default function EditImport() {
    const router = useRouter();
    const data = JSON.parse(router.query.data);

    return <ImportForm title="Edit Import" data={data} />;
}