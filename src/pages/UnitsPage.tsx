import { useState, useEffect } from 'react';
import { getAllUnits, getAllUnitAliases } from '../lib/db';
import { Unit, UnitAlias } from '../lib/entities';

const UnitsPage = () => {
    const [activeTab, setActiveTab] = useState('units');
    const [units, setUnits] = useState<Unit[]>([]);
    const [unitAliases, setUnitAliases] = useState<UnitAlias[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const unitsData = await getAllUnits();
            setUnits(unitsData);
            const unitAliasesData = await getAllUnitAliases();
            setUnitAliases(unitAliasesData);
        };
        fetchData();
    }, []);

    return (
        <div className="p-4">
            <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
                <div className="flex space-x-4">
                    <button
                        className={`px-4 py-2 ${activeTab === 'units' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded`}
                        onClick={() => setActiveTab('units')}
                    >
                        部门
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'unitAliases' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded`}
                        onClick={() => setActiveTab('unitAliases')}
                    >
                        部门别称
                    </button>
                </div>
            </div>

            {activeTab === 'units' && (
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">部门代码</th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">全称</th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">简称</th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">分类</th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">办公地点</th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">电话</th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">联系人</th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">备注</th>
                            </tr>
                        </thead>
                        <tbody>
                            {units.map((unit) => (
                                <tr key={unit.id} className="border-b last:border-0 hover:bg-gray-100">
                                    <td className="py-2 px-4 text-sm text-gray-700">{unit.UnitCode}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{unit.FullUnitName}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{unit.ShortUnitName}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{unit.Category}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{unit.Location}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{unit.Telephone}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{unit.ContactPerson}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{unit.Remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'unitAliases' && (
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">部门代号</th>
                                <th className="py-2 px-4 bg-gray-200 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">部门别称</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unitAliases.map((alias) => (
                                <tr key={alias.id} className="border-b last:border-0 hover:bg-gray-100">
                                    <td className="py-2 px-4 text-sm text-gray-700">{alias.UnitCode}</td>
                                    <td className="py-2 px-4 text-sm text-gray-700">{alias.AliasName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UnitsPage;