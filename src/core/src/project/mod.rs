//! Project file: `.hallohome` schema, serialization, migration.

use crate::floorplan::{Grid, Wall};
use serde::{Deserialize, Serialize};

/// Canonical module name.
pub const MODULE_NAME: &str = "project";

/// Canonical project file extension (without dot).
pub const FILE_EXTENSION: &str = "hallohome";

/// Current schema version of the `.hallohome` file format.
pub const SCHEMA_VERSION: u32 = 1;

/// Workspace state sent to the UI.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WorkspaceState {
    pub project_name: String,
    pub grid: Grid,
    pub walls: Vec<Wall>,
}

impl Default for WorkspaceState {
    fn default() -> Self {
        Self {
            project_name: "Untitled Project".to_string(),
            grid: Grid::default(),
            walls: Vec::new(),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn module_name_ok() {
        assert_eq!(MODULE_NAME, "project");
    }

    #[test]
    fn file_extension_ok() {
        assert_eq!(FILE_EXTENSION, "hallohome");
    }

    #[test]
    fn schema_version_positive() {
        const { assert!(SCHEMA_VERSION >= 1) };
    }

    #[test]
    fn default_workspace_ok() {
        let ws = WorkspaceState::default();
        assert_eq!(ws.project_name, "Untitled Project");
        assert!(ws.walls.is_empty());
    }
}
