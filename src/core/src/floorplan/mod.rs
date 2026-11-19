//! Floor plan model: walls, rooms, layers, snapping.

use crate::geometry::{Line, Point2};
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

/// A wall element in the floor plan.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Wall {
    pub id: String,
    pub line: Line,
}

impl Wall {
    pub fn new(id: impl Into<String>, start: Point2, end: Point2) -> Self {
        Self {
            id: id.into(),
            line: Line::new(start, end),
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

    #[test]
    fn wall_constructs() {
        let w = Wall::new("w1", Point2::new(0.0, 0.0), Point2::new(100.0, 0.0));
        assert_eq!(w.id, "w1");
        assert_eq!(w.line.length(), 100.0);
    }
}
