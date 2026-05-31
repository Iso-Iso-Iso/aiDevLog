"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { showToast } from "@/utils/showToast";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";
import { Typography } from "@/components/ui/Typography/Typography";
import { Loader } from "@/components/ui/Loader/Loader";
import { NoData } from "@/components/ui/NoData/NoData";
import { Icon } from "@/components/ui/Icon/Icon";

// A mock function to simulate fetching system status using TanStack Query
const fetchSystemStatus = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    status: "healthy",
    uptime: "2 days, 4 hours",
    aiAgent: "Antigravity v3.5 Flash",
    database: "connected",
    activeTasks: 12,
  };
};

export default function Home() {
  // TanStack Query usage demo
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["systemStatus"],
    queryFn: fetchSystemStatus,
  });

  const handleToastTest = (type, text) => {
    // Pure fabrication utility call with exactly { type, text } object
    showToast({ type, text });
  };

  const iconsList = [
    { name: "home", label: "Home" },
    { name: "person", label: "Person" },
    { name: "info", label: "Info" },
    { name: "addCircle", label: "Add Circle" },
    { name: "delete", label: "Delete" },
    { name: "queue", label: "Queue" },
    { name: "formatAlignCenter", label: "Align Center" },
  ];

  return (
    <main
      style={{
        padding: "var(--spacing-lg)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Header section using the Typography component */}
      <section
        style={{ marginBottom: "var(--spacing-lg)", textAlign: "center" }}
      >
        <Typography variant="title">AI Developer Log Dashboard</Typography>
        <Typography variant="paragraph">
          Playground showcasing custom modular UI components, TanStack Query
          Next SSR setup, and react-toastify wrappers.
        </Typography>
      </section>

      {/* Grid container for interactive cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "var(--spacing-lg)",
          marginTop: "var(--spacing-md)",
        }}
      >
        {/* Card 1: Toast Utility Testing */}
        <Card title="Toast Notification Tester">
          <Typography variant="paragraph">
            Interact with our pure fabrication <code>showToast</code> utility.
            It accepts exactly <code>&#123; type, text &#125;</code> and
            delegates to react-toastify.
          </Typography>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--spacing-sm)",
              marginTop: "var(--spacing-md)",
            }}
          >
            <Button
              onClick={() =>
                handleToastTest("success", "Operation completed successfully!")
              }
            >
              Success Toast
            </Button>
            <Button
              onClick={() =>
                handleToastTest("error", "An unexpected system error occurred.")
              }
            >
              Error Toast
            </Button>
            <Button
              onClick={() =>
                handleToastTest(
                  "info",
                  "System update scheduled for 02:00 UTC.",
                )
              }
            >
              Info Toast
            </Button>
            <Button
              onClick={() =>
                handleToastTest(
                  "warning",
                  "High CPU load detected on database node.",
                )
              }
            >
              Warning Toast
            </Button>
          </div>
        </Card>

        {/* Card 2: TanStack Query SSR/Client Demo */}
        <Card title="TanStack Query System Status">
          <Typography variant="paragraph">
            Fetches system status asynchronously. The query utilizes caching and
            client-side refetches seamlessly.
          </Typography>

          <div style={{ marginTop: "var(--spacing-md)", minHeight: "120px" }}>
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100px",
                }}
              >
                <Loader size="md" />
              </div>
            ) : isError ? (
              <div style={{ color: "red", padding: "var(--spacing-sm)" }}>
                Failed to fetch system logs.
              </div>
            ) : (
              <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <strong>System Health:</strong>
                  <span
                    style={{
                      color: "var(--secondary-color)",
                      fontWeight: "600",
                    }}
                  >
                    {data.status.toUpperCase()}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <strong>Uptime:</strong>
                  <span>{data.uptime}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <strong>AI Copilot Model:</strong>
                  <span>{data.aiAgent}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <strong>DB Connection:</strong>
                  <span style={{ textTransform: "capitalize" }}>
                    {data.database}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <strong>Active Daemon Tasks:</strong>
                  <span>{data.activeTasks} running</span>
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: "var(--spacing-sm)",
              marginTop: "var(--spacing-md)",
            }}
          >
            <Button onClick={() => refetch()}>
              {isFetching ? "Refetching..." : "Sync Live Data"}
            </Button>
          </div>
        </Card>

        {/* Card 3: Empty State Demo */}
        <Card title="No Data Stub Showcase">
          <Typography variant="paragraph">
            A reusable blank state stub component that can be placed inside cards to instruct the user when no content exists.
          </Typography>

          <div style={{ marginTop: "var(--spacing-md)" }}>
            <NoData
              title="No Live Logs Found"
              message="Run automated task workflows or system builders to populate metrics."
            />
          </div>
        </Card>

        {/* Card 4: Mapped Icons System */}
        <Card title="Mapped Icons System">
          <Typography variant="paragraph">
            Demonstrates mapped SVG Icons. Colors are fully customized in CSS and hover effects are implemented.
          </Typography>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
              gap: "var(--spacing-sm)",
              marginTop: "var(--spacing-md)",
              textAlign: "center",
            }}
          >
            {iconsList.map((ico) => (
              <div
                key={ico.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "var(--spacing-sm)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--border-radius)",
                  backgroundColor: "var(--background-color)",
                }}
              >
                <Icon
                  name={ico.name}
                  size={24}
                  className="showcase-icon"
                  onClick={() =>
                    handleToastTest("info", `Clicked ${ico.label} Icon!`)
                  }
                />
                <span
                  style={{
                    fontSize: "11px",
                    marginTop: "6px",
                    color: "var(--text-color-muted)",
                    display: "block",
                  }}
                >
                  {ico.label}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <style>{`
        .showcase-icon {
          color: var(--primary-color);
          cursor: pointer;
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .showcase-icon:hover {
          color: var(--primary-color-hover);
          transform: scale(1.2);
        }
      `}</style>
    </main>
  );
}


