//! HalloHome core engine.
//!
//! UI-agnostic by contract. This crate MUST NOT import anything from
//! `src/ui` or `src/tauri`. Enforced by review and CI.

pub mod assets;
pub mod floorplan;
pub mod geometry;
pub mod project;
pub mod render3d;

/// Current core engine version, sourced from `Cargo.toml`.
pub fn version() -> &'static str {
    env!("CARGO_PKG_VERSION")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn version_is_not_empty() {
        assert!(!version().is_empty());
    }

    #[test]
    fn version_is_semver_like() {
        let v = version();
        let parts: Vec<&str> = v.split('.').collect();
        assert_eq!(parts.len(), 3, "version must have 3 segments: {v}");
        for p in parts {
            assert!(p.parse::<u32>().is_ok(), "non-numeric segment: {p}");
        }
    }
}
