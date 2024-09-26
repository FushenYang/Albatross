import { Inspection } from "../lib/entities";



const InspectionTable = ({ Inspections }: { Inspections: Inspection[] }) => {
    return (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">项目</th>
                        <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">分类</th>
                        <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">单位名称</th>
                        <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">位置</th>
                        <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">描述</th>
                        <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">备注</th>
                        <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">时间</th>
                    </tr>
                </thead>
                <tbody>
                    {Inspections.map((inspection) => (
                        <tr key={inspection.id} className="border-b last:border-0 hover:bg-gray-100">
                            <td className="py-2 px-4 text-sm text-gray-600">{inspection.ItemName}</td>
                            <td className="py-2 px-4 text-sm text-gray-600">{inspection.Category}</td>
                            <td className="py-2 px-4 text-sm text-gray-600">{inspection.UnitName}</td>
                            <td className="py-2 px-4 text-sm text-gray-600">{inspection.Location}</td>
                            <td className="py-2 px-4 text-sm text-gray-600">{inspection.Description}</td>
                            <td className="py-2 px-4 text-sm text-gray-600">{inspection.Remarks}</td>
                            <td className="py-2 px-4 text-sm text-gray-600">{inspection.At.toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default InspectionTable;