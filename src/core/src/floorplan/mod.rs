//! Floor plan model: walls, rooms, layers, snapping.

/// Canonical module name.
pub const MODULE_NAME: &str = "floorplan";

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn module_name_ok() {
        assert_eq!(MODULE_NAME, "floorplan");
    }
}
