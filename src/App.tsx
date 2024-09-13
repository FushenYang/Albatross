import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Database from "tauri-plugin-sql-api";
import { utils, read } from 'xlsx';
import { open } from '@tauri-apps/api/dialog';
import { readBinaryFile } from '@tauri-apps/api/fs';


import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  const [data, setData] = useState("");
  useEffect(() => {
    (async () => {
      const db = await Database.load("sqlite:Albatross.db");
      const res: { count: number; }[] = await db.select(`SELECT count(*) as count FROM Config`);
      setData(res[0].count.toString());
    })()
  }, [])

  return (
    <div className="flex justify-start items-start h-screen">

      <div className="w-1/6 bg-gray-200 p-3">
        <div className="flex h-screen flex-col justify-between border-e bg-white">
          <div className="px-4 py-6">
            <ul className="mt-6 space-y-1">
              <li>
                <a
                  href="#"
                  className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  General
                </a>
              </li>

              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary
                    className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="text-sm font-medium"> Teams </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Banned Users
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Calendar
                      </a>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <a
                  href="#"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Billing
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Invoices
                </a>
              </li>

              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary
                    className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="text-sm font-medium"> Account </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Details
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Security
                      </a>
                    </li>

                    <li>
                      <form action="#">
                        <button
                          type="submit"
                          className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                        >
                          Logout
                        </button>
                      </form>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
            <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
              <div>
                <p className="text-xs">
                  <strong className="block font-medium">https://oldyang.site</strong>

                  <span> 信天翁信息管理系统 </span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="flex-grow bg-gray-100 p-4">
        <h2 className="text-lg font-bold">主内容区域</h2>
        <h1>当前数据库中有数据{data}条。</h1>


        <form
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>

        <p>{greetMsg}</p>

        <button onClick={() => {
          (async () => {
            const filters = [
              // {name: "Excel Binary Workbook", extensions: ["xlsb"]},
              { name: "Excel Workbook", extensions: ["xlsx"] },
              { name: "Excel 97-2004 Workbook", extensions: ["xls"] },
            ];
            const selected = await open({
              title: "请选择需要导入的excel文件",
              multiple: false,
              directory: false,
              filters
            });

            if (typeof selected === 'string') {
              // 这里您可以安全地使用 `selected`
              const d = await readBinaryFile(selected);
              const wb = read(d);
              //TODO 把读取到的数据插入到数据库，数据表格的结构为id,name,value
              // 读取工作表数据并转换为 JSON
              const sheetNames = wb.SheetNames;
              const sheet = wb.Sheets[sheetNames[0]]; // 获取第一个工作表
              const data: string[][] = utils.sheet_to_json(sheet, { header: 1 }); // 以行的形式获取所有数据
              const db = await Database.load("sqlite:Albatross.db");
              for (let i = 1; i < data.length; i++) {
                const row = data[i];
                // 确保 row 有足够的字段
                if (row.length >= 3) {
                  const id = row[0];
                  const name = row[1];
                  const value = row[2];
                  // 插入数据库
                  await db.execute('INSERT INTO Config (id, name, value) VALUES (?, ?, ?)', [id, name, value]);
                } else {
                  console.warn('数据行过少，略过不完整数据行:', row);
                }
              }
            } else {
              // 处理情况，比如 selected 为 null 或 string[]
              console.error('未选择文件或选择了多个文件');
            }
          })()
        }} type="submit">upload excel</button>

      </div>




    </div>
  );
}

export default App;
