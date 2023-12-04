import PartForm from "@/components/PartForm";
import { useRouter } from "next/router";

export default function EditPart() {
    const router = useRouter();
    const data = JSON.parse(router.query.data);

    return <PartForm title="Edit Part" data={data} />;
}