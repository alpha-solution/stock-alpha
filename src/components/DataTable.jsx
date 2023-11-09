import { useState } from "react";

const DataTable = ({ actionButton, data, column }) => {
    const [isAction, setIsAction] = useState(actionButton);
    // const [data, setData] = useState(data);
    const [columnName, setColumnName] = useState(column);

    return (
        <div className="container mx-auto mt-4 max-w-4xl">
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        {columnName.map((colName) => (
                            <th className="py-2 bg-gray-100 border-b text-left sm:pr-3 md:pr-0">{colName}</th>
                        ))}
                        {isAction && (
                            <th className="py-2 bg-gray-100 border-b text-left sm:pr-3 md:pr-0">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b">
                        <td className="py-2">Lorem ipsum dolor</td>
                        {isAction && (
                            <td className="py-2" style={{ width: "130px" }}>
                                <button className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;