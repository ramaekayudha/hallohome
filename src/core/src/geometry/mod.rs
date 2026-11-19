//! Geometry primitives and transforms.

use serde::{Deserialize, Serialize};

/// A 2D point in scene units.
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub struct Point2 {
    pub x: f32,
    pub y: f32,
}

impl Point2 {
    pub const fn new(x: f32, y: f32) -> Self {
        Self { x, y }
    }
}

/// A 3D point in scene units.
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub struct Point3 {
    pub x: f32,
    pub y: f32,
    pub z: f32,
}

impl Point3 {
    pub const fn new(x: f32, y: f32, z: f32) -> Self {
        Self { x, y, z }
    }
}

/// A 2D line segment in scene units.
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub struct Line {
    pub start: Point2,
    pub end: Point2,
}

impl Line {
    pub const fn new(start: Point2, end: Point2) -> Self {
        Self { start, end }
    }

    /// Calculates the length of the line segment.
    pub fn length(&self) -> f32 {
        let dx = self.end.x - self.start.x;
        let dy = self.end.y - self.start.y;
        (dx * dx + dy * dy).sqrt()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn point2_constructs() {
        let p = Point2::new(1.0, 2.0);
        assert_eq!((p.x, p.y), (1.0, 2.0));
    }

    #[test]
    fn point3_constructs() {
        let p = Point3::new(1.0, 2.0, 3.0);
        assert_eq!((p.x, p.y, p.z), (1.0, 2.0, 3.0));
    }

    #[test]
    fn line_length_ok() {
        let l = Line::new(Point2::new(0.0, 0.0), Point2::new(3.0, 4.0));
        assert_eq!(l.length(), 5.0);
    }
}
