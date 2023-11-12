const ActionButton = () => {
    return (
        <td className="py-2" style={{ width: "130px" }}>
            <button className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Edit</button>
            <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
        </td>
    );
};

export default ActionButton;