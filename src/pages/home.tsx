import { useEffect, useState } from "react";
import { getAllInspections, getInspectionsCount } from "../lib/db";
import { Inspection } from "../lib/entities";
import InspectionTable from "../components/InspectionTable";

const Home = () => {
    const [inspectionCount, setInspectionCount] = useState("");
    const [inspections, setInspections] = useState<Inspection[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const count = await getInspectionsCount();
                setInspectionCount(count.toString());

                const allInspections = await getAllInspections();
                setInspections(allInspections);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        })()
    }, [])



    return (
        <div className="p-4">
            <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
                开源工具，跟踪管理各项整改任务。
                当前数据库中有整改记录数据 <span className="font-bold text-blue-600">{inspectionCount}</span> 条；
            </div>

            <InspectionTable Inspections={inspections}></InspectionTable>
        </div>
    );
}


export default Home;
