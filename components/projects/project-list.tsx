"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGridIcon, ListIcon, SearchIcon, GlobeIcon, GitBranchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/deployments/status-badge";
import { ProjectCard } from "./project-card";

interface Project {
  id: string;
  name: string;
  framework?: string | null;
  updatedAt?: number;
  latestDeployments?: Array<{ readyState: string }>;
  domain?: string | null;
}

export function ProjectList({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "table">(() => {
    if (typeof window === "undefined") return "grid";
    const saved = localStorage.getItem("project-view");
    return saved === "table" ? "table" : "grid";
  });

  function setViewAndPersist(v: "grid" | "table") {
    setView(v);
    localStorage.setItem("project-view", v);
  }

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (projects.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        No projects found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center rounded-md border">
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="h-9 w-9 rounded-r-none"
            onClick={() => setViewAndPersist("grid")}
          >
            <LayoutGridIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "table" ? "secondary" : "ghost"}
            size="icon"
            className="h-9 w-9 rounded-l-none"
            onClick={() => setViewAndPersist("table")}
          >
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No projects match &ldquo;{search}&rdquo;.
        </p>
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              framework={project.framework}
              updatedAt={project.updatedAt}
              latestDeploymentStatus={project.latestDeployments?.[0]?.readyState}
              domain={project.domain}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((project) => (
                <TableRow key={project.id} className="cursor-pointer">
                  <TableCell>
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="font-medium hover:underline"
                    >
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {project.latestDeployments?.[0]?.readyState && (
                      <StatusBadge status={project.latestDeployments[0].readyState} />
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.framework && (
                      <span className="flex items-center gap-1">
                        <GitBranchIcon className="h-3.5 w-3.5" />
                        {project.framework}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.domain && (
                      <span className="flex items-center gap-1">
                        <GlobeIcon className="h-3.5 w-3.5" />
                        {project.domain}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.updatedAt &&
                      new Date(project.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
