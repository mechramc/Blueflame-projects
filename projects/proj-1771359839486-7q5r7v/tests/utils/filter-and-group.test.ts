import { filterAndGroup } from "../../src/utils/filter-and-group";

describe("filterAndGroup", () => {
  const projects = [
    { id: "1", name: "Project A", status: "active", priority: "high" },
    { id: "2", name: "Project B", status: "inactive", priority: "low" },
    { id: "3", name: "Project C", status: "active", priority: "medium" }
  ];

  const workItems = [
    { id: "1", projectId: "1", type: "task", status: "open", assignee: "Alice" },
    { id: "2", projectId: "1", type: "bug", status: "closed", assignee: "Bob" },
    { id: "3", projectId: "2", type: "task", status: "open", assignee: "Alice" }
  ];

  it("filters and groups projects and work items by status", () => {
    const result = filterAndGroup(projects, workItems, { status: "active" }, "status");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data["active"].length).toBe(4); // 2 projects + 2 work items
    }
  });

  it("filters and groups projects and work items by priority", () => {
    const result = filterAndGroup(projects, workItems, { priority: "high" }, "priority");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data["high"].length).toBe(1); // 1 project
    }
  });

  it("handles empty results gracefully", () => {
    const result = filterAndGroup(projects, workItems, { status: "nonexistent" }, "status");

    expect(result.success).toBe(true);
    if (result.success) {
      expect(Object.keys(result.data).length).toBe(0);
    }
  });

  it("returns an error for invalid grouping key", () => {
    const result = filterAndGroup(projects, workItems, {}, "invalidKey" as any);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe("An error occurred while filtering and grouping data.");
    }
  });
});
