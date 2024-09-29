// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri_plugin_sql::{Migration, MigrationKind};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE Config (id INTEGER PRIMARY KEY, name TEXT,value TEXT);",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_inspections",
            sql: r#"
            CREATE TABLE "Inspections" (
                "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                "Category" TEXT(255),
                "UnitName" TEXT(255),
                "ItemName" TEXT(255),
                "Location" TEXT(255),
                "At" INTEGER,
                "Description" TEXT(255),
                "Remarks" TEXT(255),
                "IsArchived" INTEGER
            );
        "#,
            kind: MigrationKind::Up,
        } ,// 添加检查表格
        Migration {
            version: 3,
            description: "create_unit_aliases",
            sql: r#"
            CREATE TABLE "UnitAliases" (
                "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                "UnitCode" TEXT(255),
                "AliasName" TEXT(255)
            );
        "#,
            kind: MigrationKind::Up,
        }, // 添加单位别名表格
        Migration {
            version: 4,
            description: "create_units",
            sql: r#"
            CREATE TABLE "Units" (
                "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                "UnitCode" TEXT(255),
                "FullUnitName" TEXT(255),
                "ShortUnitName" TEXT(255),
                "Category" TEXT(255),
                "Location" TEXT(255),
                "Telephone" TEXT(255),
                "ContactPerson" TEXT(255),
                "Remarks" TEXT(255)
            );
        "#,
            kind: MigrationKind::Up,
        }, // 添加单位表格

        Migration {
            version: 5,
            description: "create_members",
            sql: r#"
            CREATE TABLE "Members" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "Name" TEXT(255),
            "StaffID" TEXT(10),
            "JoinAt" INTEGER,
            "BirthDay" TEXT,
            "Gender" TEXT,
            "IDCard" TEXT,
            "Education" TEXT,
            "Party" TEXT,
            "Phone" TEXT,
            "Job" TEXT,
            "Grade" TEXT,
            "UnitCode" TEXT,
            "UnitName" TEXT,
            "Title" TEXT,
            "ResidencyAddress" TEXT,
            "PoliceStation" TEXT,
            "Notes" TEXT
        )
        "#,
            kind: MigrationKind::Up,
        }, // 添加人员表
    ];
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default()
            .add_migrations("sqlite:Albatross.db", migrations)
            .build())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
