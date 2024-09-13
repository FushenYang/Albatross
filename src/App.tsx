import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import Database from "tauri-plugin-sql-api";
import { utils,read } from 'xlsx';
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
    <div className="container">
      <h1>当前数据库中有数据{data}条。</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
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
      <hr></hr>

      <button onClick={()=>{
        (async () => {
          const filters = [
            // {name: "Excel Binary Workbook", extensions: ["xlsb"]},
            {name: "Excel Workbook", extensions: ["xlsx"]},
            {name: "Excel 97-2004 Workbook", extensions: ["xls"]},
          ];
          const selected  = await open({
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
            const data:string[][] = utils.sheet_to_json(sheet, { header: 1 }); // 以行的形式获取所有数据
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
  );
}

export default App;
