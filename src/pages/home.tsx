import { useCallback, useEffect, useState } from "react";
import { deleteInspection, getAllInspections, getInspectionsCount, insertInspection } from "../lib/db";
import { Inspection } from "../lib/entities";
import InspectionTable from "../components/InspectionTable";
import ConfirmDialog from "../components/ConfirmDialog"; // 引入确认组件

const Home = () => {
    const [inspectionCount, setInspectionCount] = useState("");
    const [inspections, setInspections] = useState<Inspection[]>([]);
    const [category, setCategory] = useState("");
    const [unitName, setUnitName] = useState("");
    const [itemName, setItemName] = useState("");
    const [location, setLocation] = useState("");
    const [at, setAt] = useState(new Date());
    const [description, setDescription] = useState("");
    const [remarks, setRemarks] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false); // 控制表单显示状态
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false); // 控制确认对话框显示状态
    const [deleteId, setDeleteId] = useState<number | null>(null); // 存储要删除的记录ID



    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case "Category":
                setCategory(value);
                break;
            case "UnitName":
                setUnitName(value);
                break;
            case "ItemName":
                setItemName(value);
                break;
            case "Location":
                setLocation(value);
                break;
            case "Description":
                setDescription(value);
                break;
            case "Remarks":
                setRemarks(value);
                break;
        }
    }, []);

    const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAt(new Date(e.target.value));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newInspection: Partial<Inspection> = {
                Category: category,
                UnitName: unitName,
                ItemName: itemName,
                Location: location,
                At: at,
                Description: description,
                Remarks: remarks,
                IsArchived: false,
            };
            await insertInspection(newInspection);
            setCategory("");
            setUnitName("");
            setItemName("");
            setLocation("");
            setAt(new Date());
            setDescription("");
            setRemarks("");
            let allInspections = await getAllInspections();
            allInspections = allInspections.sort((a, b) => b.At.getTime() - a.At.getTime());
            setInspections(allInspections); // 更新 inspections 状态
            setInspectionCount((await getInspectionsCount()).toString());
            setIsFormVisible(false); // 提交成功后隐藏表单
        } catch (error) {
            console.error("Failed to insert inspection:", error);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const count = await getInspectionsCount();
                setInspectionCount(count.toString());

                let allInspections = await getAllInspections();
                allInspections = allInspections.sort((a, b) => b.At.getTime() - a.At.getTime());
                setInspections(allInspections);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        })()
    }, [])

    const handleDelete = (id: number) => {
        setDeleteId(id);
        setIsConfirmDialogVisible(true);
    };

    const confirmDelete = async () => {
        if (deleteId !== null) {
            try {
                await deleteInspection(deleteId);
                let allInspections = await getAllInspections();
                allInspections = allInspections.sort((a, b) => b.At.getTime() - a.At.getTime());
                setInspections(allInspections); // 更新 inspections 状态
                setInspectionCount((await getInspectionsCount()).toString());
            } catch (error) {
                console.error("Failed to delete inspection:", error);
            } finally {
                setIsConfirmDialogVisible(false);
                setDeleteId(null);
            }
        }
    };

    const cancelDelete = () => {
        setIsConfirmDialogVisible(false);
        setDeleteId(null);
    };

    return (
        <div className="p-4">
            <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
                开源工具，跟踪管理各项整改任务。
                当前数据库中有整改记录数据 <span className="font-bold text-blue-600">{inspectionCount}</span> 条；
            </div>

            <button
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                {isFormVisible ? "取消添加" : "添加检查记录"}
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white rounded-lg shadow">
                    <h2 className="text-lg font-bold mb-4">添加新的整改记录</h2>
                    <div className="flex flex-wrap -mx-2 mb-4">
                        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                            <label className="block text-gray-700">分类</label>
                            <input
                                type="text"
                                name="Category"
                                value={category}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                            <label className="block text-gray-700">单位名称</label>
                            <input
                                type="text"
                                name="UnitName"
                                value={unitName}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                            <label className="block text-gray-700">项目名称</label>
                            <input
                                type="text"
                                name="ItemName"
                                value={itemName}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-2 mb-4">
                        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                            <label className="block text-gray-700">位置</label>
                            <input
                                type="text"
                                name="Location"
                                value={location}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                            <label className="block text-gray-700">日期</label>
                            <input
                                type="date"
                                name="At"
                                value={at.toISOString().split('T')[0]}
                                onChange={handleDateChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
                            <label className="block text-gray-700">备注</label>

                            <input
                                type="text"
                                name="Remarks"
                                value={remarks}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-2 mb-4">
                        <div className="w-full px-2">

                            <label className="block text-gray-700">描述</label>
                            <textarea
                                name="Description"
                                value={description}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />

                        </div>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">提交</button>
                </form>
            )}
            <InspectionTable Inspections={inspections} onDelete={handleDelete}></InspectionTable>
            {isConfirmDialogVisible && (
                <ConfirmDialog
                    message="确定要删除这条记录吗？"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
}


export default Home;
