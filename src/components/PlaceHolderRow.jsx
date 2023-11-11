const PlaceHolderRow = ({ columnModel, actionButton }) => {
    return (
        <tr>
            {columnModel.map((colName, colIndex) => (
                <td key={colIndex} className="py-2">
                    N/A
                </td>
            ))}
            {actionButton && <td className="py-2">N/A</td>}
        </tr>
    );
};

export default PlaceHolderRow;