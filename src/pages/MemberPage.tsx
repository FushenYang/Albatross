import React, { useState, useEffect } from "react";
import { Member } from "../lib/entities";

const MemberPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const result: React.SetStateAction<Member[]> = [];
    setMembers(result);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">人员管理</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">姓名</th>
              <th className="py-2 px-4 text-left">员工编号</th>
              <th className="py-2 px-4 text-left">加入时间</th>
              <th className="py-2 px-4 text-left">生日</th>
              <th className="py-2 px-4 text-left">性别</th>
              <th className="py-2 px-4 text-left">身份证</th>
              <th className="py-2 px-4 text-left">学历</th>
              <th className="py-2 px-4 text-left">党派</th>
              <th className="py-2 px-4 text-left">电话</th>
              <th className="py-2 px-4 text-left">职位</th>
              <th className="py-2 px-4 text-left">级别</th>
              <th className="py-2 px-4 text-left">单位代码</th>
              <th className="py-2 px-4 text-left">单位名称</th>
              <th className="py-2 px-4 text-left">职称</th>
              <th className="py-2 px-4 text-left">居住地址</th>
              <th className="py-2 px-4 text-left">派出所</th>
              <th className="py-2 px-4 text-left">备注</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{member.Name}</td>
                <td className="py-2 px-4">{member.StaffID}</td>
                <td className="py-2 px-4">{member.JoinAt}</td>
                <td className="py-2 px-4">{member.BirthDay}</td>
                <td className="py-2 px-4">{member.gender}</td>
                <td className="py-2 px-4">{member.IDCard}</td>
                <td className="py-2 px-4">{member.Education}</td>
                <td className="py-2 px-4">{member.Party}</td>
                <td className="py-2 px-4">{member.Phone}</td>
                <td className="py-2 px-4">{member.Job}</td>
                <td className="py-2 px-4">{member.Grade}</td>
                <td className="py-2 px-4">{member.UnitCode}</td>
                <td className="py-2 px-4">{member.UnitName}</td>
                <td className="py-2 px-4">{member.Title}</td>
                <td className="py-2 px-4">{member.ResidencyAddress}</td>
                <td className="py-2 px-4">{member.PoliceStation}</td>
                <td className="py-2 px-4">{member.Notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberPage;