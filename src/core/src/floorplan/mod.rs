//! Floor plan model: walls, rooms, layers, snapping.

use crate::geometry::Point2;
use serde::{Deserialize, Serialize};

/// Canonical module name.
pub const MODULE_NAME: &str = "floorplan";

/// Basic grid configuration.
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub struct Grid {
    pub spacing: f32,
    pub origin: Point2,
}

impl Default for Grid {
    fn default() -> Self {
        Self {
            spacing: 20.0,
            origin: Point2::new(0.0, 0.0),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn module_name_ok() {
        assert_eq!(MODULE_NAME, "floorplan");
    }

    #[test]
    fn grid_default_ok() {
        let g = Grid::default();
        assert_eq!(g.spacing, 20.0);
        assert_eq!(g.origin.x, 0.0);
    }
}
