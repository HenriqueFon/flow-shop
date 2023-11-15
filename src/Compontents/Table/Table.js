
import './Table.css';


export function Table( {data} ) {

    return (
        <>
            <table className = "table">
                <thead>
                    <tr>
                        <th>Dependencies</th>
                        <th>Installation Time</th>
                        <th>Package</th>
                        <th>Package Size</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data, index) => (
                        <tr key={index}>
                            <td>{data.Dependencies}</td>
                            <td>{data.Installation_Time}</td>
                            <td>{data.Package}</td>
                            <td>{data.Package_Size}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};


export default Table;