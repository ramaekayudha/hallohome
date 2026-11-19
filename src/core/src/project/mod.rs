//! Project file: `.hallohome` schema, serialization, migration.

/// Canonical module name.
pub const MODULE_NAME: &str = "project";

/// Canonical project file extension (without dot).
pub const FILE_EXTENSION: &str = "hallohome";

/// Current schema version of the `.hallohome` file format.
pub const SCHEMA_VERSION: u32 = 1;

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
}
