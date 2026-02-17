import { Result } from "../types/result";

type Project = {
  id: string;
  name: string;
  status: string;
  priority: string;
};

type WorkItem = {
  id: string;
  projectId: string;
  type: string;
  status: string;
  assignee: string;
};

type FilterCriteria = {
  status?: string;
  priority?: string;
  type?: string;
  assignee?: string;
};

type GroupingKey = "status" | "priority" | "type" | "assignee";

/**
 * Filters and groups projects and work items based on the provided criteria.
 * @param projects List of projects to filter and group.
 * @param workItems List of work items to filter and group.
 * @param filterCriteria Criteria to filter projects and work items.
 * @param groupingKey Key to group the filtered results.
 * @returns A Result object containing grouped data or an error message.
 */
export function filterAndGroup(
  projects: Project[],
  workItems: WorkItem[],
  filterCriteria: FilterCriteria,
  groupingKey: GroupingKey
): Result<Record<string, (Project | WorkItem)[]>> {
  try {
    // Filter projects
    const filteredProjects = projects.filter((project) => {
      return (
        (!filterCriteria.status || project.status === filterCriteria.status) &&
        (!filterCriteria.priority || project.priority === filterCriteria.priority)
      );
    });

    // Filter work items
    const filteredWorkItems = workItems.filter((workItem) => {
      return (
        (!filterCriteria.status || workItem.status === filterCriteria.status) &&
        (!filterCriteria.type || workItem.type === filterCriteria.type) &&
        (!filterCriteria.assignee || workItem.assignee === filterCriteria.assignee)
      );
    });

    // Group projects and work items
    const groupedData: Record<string, (Project | WorkItem)[]> = {};

    [...filteredProjects, ...filteredWorkItems].forEach((item) => {
      const key = (item as any)[groupingKey];
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(item);
    });

    return { success: true, data: groupedData };
  } catch (error) {
    return { success: false, error: "An error occurred while filtering and grouping data." };
  }
}
