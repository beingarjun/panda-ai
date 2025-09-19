export class Graph<T extends string> {
  private edges = new Map<T, Set<T>>();
  addNode(n: T) { if (!this.edges.has(n)) this.edges.set(n, new Set()); }
  addUndirected(a: T, b: T) {
    this.addNode(a); this.addNode(b);
    this.edges.get(a)!.add(b);
    this.edges.get(b)!.add(a);
  }
  degree(n: T) { return this.edges.get(n)?.size ?? 0; }
  nodes(): T[] { return Array.from(this.edges.keys()); }
  neighbors(n: T): T[] { return Array.from(this.edges.get(n) ?? []); }
}
