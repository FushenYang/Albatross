import { useEffect, useState } from "react";
import Database from "tauri-plugin-sql-api";
import { utils, read } from 'xlsx';
import { open } from '@tauri-apps/api/dialog';
import { readBinaryFile } from '@tauri-apps/api/fs';
import { Member } from "../lib/entities";
import { getAllMembers, deleteMembers } from "../lib/db";

import ConfirmDialog from "../components/ConfirmDialog";



function MembersData() {
    const [data, setData] = useState<Member[]>([]);
    const [importStatus, setImportStatus] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDelete = () => {
        setIsDialogOpen(true);
    };

    const confirmDelete = async () => {
        await DeleteMemberData();
        const res = await getAllMembers();
        setData(res);
        setIsDialogOpen(false);
    };

    const cancelDelete = () => {
        setIsDialogOpen(false);
    };

    const expectedHeaders = [
        "Name", "StaffID", "JoinAt", "BirthDay", "Gender", "IDCard", "Education", "Party", "Phone", "Job", "Grade", "UnitCode", "UnitName", "Title", "ResidencyAddress", "PoliceStation", "Notes"
    ];

    const importExcelData = async () => {
        try {
            const selectedFile = await open({
                filters: [{ name: "Excel Files", extensions: ["xlsx"] }],
            });


            if (selectedFile) {
                const fileData = await readBinaryFile(selectedFile as string);
                const workbook = read(fileData);
                const sheetName = "Members";
                if (!workbook.SheetNames.includes(sheetName)) {
                    setImportStatus("错误：导入表格必须包函 'Members'表格");
                    return;
                }

                const worksheet = workbook.Sheets[sheetName];
                const headers: string[] = utils.sheet_to_json(worksheet, { header: 1 })[0] as string[];

                if (!expectedHeaders.every(header => headers.includes(header))) {
                    setImportStatus("错误：表头不匹配。表头必须包含 " + expectedHeaders.join(", "));
                    return;
                }

                const jsonData: Member[] = utils.sheet_to_json(worksheet).map((row: any, index: number) => ({
                    id: index + 1, // 假设 ID 是从 1 开始的递增数字
                    Name: row.Name,
                    StaffID: row.StaffID,
                    JoinAt: row.JoinAt,
                    BirthDay: row.BirthDay,
                    Gender: row.Gender,
                    IDCard: row.IDCard,
                    Education: row.Education,
                    Party: row.Party,
                    Phone: row.Phone,
                    Job: row.Job,
                    Grade: row.Grade,
                    UnitCode: row.UnitCode,
                    UnitName: row.UnitName,
                    Title: row.Title,
                    ResidencyAddress: row.ResidencyAddress,
                    PoliceStation: row.PoliceStation,
                    Notes: row.Notes,
                }));
                const db = await Database.load("sqlite:Albatross.db");
                for (const member of jsonData) {
                    await db.execute(
                        `INSERT INTO Members (Name, StaffID, JoinAt, BirthDay, Gender, IDCard, Education, Party, Phone, Job, Grade, UnitCode, UnitName, Title, ResidencyAddress, PoliceStation, Notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [member.Name, member.StaffID, member.JoinAt, member.BirthDay, member.Gender, member.IDCard, member.Education, member.Party, member.Phone, member.Job, member.Grade, member.UnitCode, member.UnitName, member.Title, member.ResidencyAddress, member.PoliceStation, member.Notes]
                    );
                }
                const res = await getAllMembers();
                setData(res);
                setImportStatus("数据导入成功！");
            }
        } catch (error) {
            console.error("导入数据时出错:", error);
            setImportStatus("数据导入失败！");
        }
    };

    useEffect(() => {
        (async () => {
            const res = await getAllMembers();
            setData(res);
        })();
    }, []);

    const DeleteMemberData = async (): Promise<void> => {
        try {
            await deleteMembers(); // 清空表格
            setData([]); // 清空前端数据
            setImportStatus("所有会员数据已删除！");
        } catch (error) {
            console.error("删除数据时出错:", error);
            setImportStatus("删除数据失败！");
        }
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">导入Members表中数据</h1>
            <button
                onClick={importExcelData}
                className="mb-4 mr-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                导入人员数据
            </button>

            <button
                onClick={handleDelete}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                清除人员数据
            </button>
            {importStatus && <p>{importStatus}</p>}
            <div>
                <h2 className="text-xl font-semibold mb-2">人员信息</h2>
                当前数据库中有数据{data.length}条。
            </div>

            {
                isDialogOpen && <ConfirmDialog
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                    message="确定要删除所有成员数据吗？"
                />
            }
        </div>
    );
}

export default MembersData;