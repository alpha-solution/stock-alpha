import { useRouter } from "next/router";

const ActionButton = ({ data, topic }) => {

    let pathEdit = "";
    const router = useRouter();

    if (topic === "import") {
        pathEdit = "edit-import";
    }

    const handleEditClicked = () => {
        router.push({
            pathname: pathEdit,
            query: { data: JSON.stringify(data) }
        });
    };

    return (
        <td className="py-2" style={{ width: "130px" }}>
            <button className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={handleEditClicked}>Edit</button>
            <button className="my-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
        </td>
    );
};

export default ActionButton;