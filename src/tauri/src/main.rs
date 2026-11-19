//! HalloHome desktop app entry — Tauri v2 bridge.
//!
//! The bridge is a thin shell: it owns the window and forwards commands
//! to `hallohome-core`. No business logic belongs here.

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

/// Returns the core engine version to the UI.
#[tauri::command]
fn core_version() -> &'static str {
    hallohome_core::version()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![core_version])
        .run(tauri::generate_context!())
        .expect("error while running HalloHome");
}
