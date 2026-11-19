//! 3D rendering engine (wgpu): PBR materials, cameras, lighting.

/// Canonical module name.
pub const MODULE_NAME: &str = "render3d";

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn module_name_ok() {
        assert_eq!(MODULE_NAME, "render3d");
    }
}
