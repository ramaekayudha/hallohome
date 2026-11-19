//! Asset management: glTF/GLB loading, catalog, thumbnails.

/// Canonical module name.
pub const MODULE_NAME: &str = "assets";

/// Canonical glTF extension.
pub const PRIMARY_MODEL_EXTENSION: &str = "gltf";
pub const PRIMARY_MODEL_EXTENSION_BINARY: &str = "glb";

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn module_name_ok() {
        assert_eq!(MODULE_NAME, "assets");
    }

    #[test]
    fn model_extensions_ok() {
        assert_eq!(PRIMARY_MODEL_EXTENSION, "gltf");
        assert_eq!(PRIMARY_MODEL_EXTENSION_BINARY, "glb");
    }
}
