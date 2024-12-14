import type { Boid, Vector2D } from "~/types/boid";

const CELL_SIZE = 50; // Should match or be close to perception radius

export class SpatialHash {
  private grid: Map<string, Boid[]>;

  constructor() {
    this.grid = new Map();
  }

  private hashPosition(position: Vector2D): string {
    const x = Math.floor(position.x / CELL_SIZE);
    const y = Math.floor(position.y / CELL_SIZE);
    return `${x},${y}`;
  }

  clear(): void {
    this.grid.clear();
  }

  insert(boid: Boid): void {
    const hash = this.hashPosition(boid.position);
    if (!this.grid.has(hash)) {
      this.grid.set(hash, []);
    }
    this.grid.get(hash)!.push(boid);
  }

  findNearby(position: Vector2D, radius: number): Boid[] {
    const neighbors: Boid[] = [];
    const cellRadius = Math.ceil(radius / CELL_SIZE);
    const centerCell = this.hashPosition(position);
    const [centerX, centerY] = centerCell.split(",").map(Number);

    for (let x = -cellRadius; x <= cellRadius; x++) {
      for (let y = -cellRadius; y <= cellRadius; y++) {
        const hash = `${centerX + x},${centerY + y}`;
        const cell = this.grid.get(hash);
        if (cell) {
          neighbors.push(...cell);
        }
      }
    }

    return neighbors;
  }
}
