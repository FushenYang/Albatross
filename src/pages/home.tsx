import { useEffect, useState } from "react";
import { getAllInspections, getInspectionsCount } from "../lib/db";
import { Inspection } from "../lib/entities";

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

    return (<>
        <div>
            开源工具,跟踪管理各项整改任务。
            当前数据库中有整改记录数据{inspectionCount}条；
        </div>
        <div>
            {inspections.map((inspection) => (
                <div key={inspection.id}>
                    <h3>项目:{inspection.ItemName}</h3>
                    <p>分类: {inspection.Category}</p>
                    <p>单位名称: {inspection.UnitName}</p>
                    <p>位置: {inspection.Location}</p>
                    <p>描述: {inspection.Description}</p>
                    <p>备注: {inspection.Remarks}</p>
                    <p>是否归档: {inspection.IsArchived ? "是" : "否"}</p>
                    <p>时间: {inspection.At.toLocaleString()}</p>
                </div>
            ))}
        </div>
    </>)
}


export default Home;
