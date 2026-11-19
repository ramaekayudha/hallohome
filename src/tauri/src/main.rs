//! HalloHome desktop app entry — Tauri v2 bridge.

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use hallohome_core::project::WorkspaceState;

#[tauri::command]
fn core_version() -> &'static str {
    hallohome_core::version()
}

#[tauri::command]
fn get_workspace_state() -> WorkspaceState {
    WorkspaceState::default()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![core_version, get_workspace_state])
        .run(tauri::generate_context!())
        .expect("error while running HalloHome");
}
