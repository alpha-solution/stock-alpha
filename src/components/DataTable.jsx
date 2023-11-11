import React from "react";
import PlaceHolderRow from "./PlaceHolderRow";
import ActionButton from "./ActionButton";

const DataTable = ({ actionButton, data, columnTable, columnModel }) => {

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto mt-4 max-w-4xl">
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        {columnTable.map((colName, colIndex) => (
                            <th key={colIndex} className="py-2 bg-gray-100 border-b text-left sm:pr-3 md:pr-0">
                                {colName}
                            </th>
                        ))}
                        {actionButton && (
                            <th className="py-2 bg-gray-100 border-b text-left sm:pr-3 md:pr-0">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((rowData, rowIndex) => (
                            <tr key={rowIndex} className="border-b">
                                {columnModel.map((colName, colIndex) => (
                                    <td key={colIndex} className="py-2">
                                        {rowData[colName]}
                                    </td>
                                ))}
                                {actionButton && <ActionButton />}
                            </tr>
                        ))
                    ) : (
                        <PlaceHolderRow columnModel={columnModel} actionButton={actionButton} />
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;