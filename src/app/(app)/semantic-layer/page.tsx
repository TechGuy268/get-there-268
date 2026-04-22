"use client";

import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Plus, Save, Upload, Eye, Code2, Database,
  Layers, TrendingUp, Columns, GitBranch, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metric, Dimension, Join } from "@/types";

const SAMPLE_TABLES = [
  { name: "orders", columns: ["id", "customer_id", "total_amount", "status", "created_at", "region"] },
  { name: "customers", columns: ["id", "name", "email", "company", "tier", "created_at"] },
  { name: "products", columns: ["id", "name", "category", "price", "cost", "sku"] },
  { name: "line_items", columns: ["id", "order_id", "product_id", "quantity", "unit_price"] },
];

const INITIAL_METRICS: Metric[] = [
  { id: "1", name: "total_revenue", label: "Total Revenue", sql: "SUM(orders.total_amount)", format: "currency", description: "Sum of all order amounts" },
  { id: "2", name: "order_count", label: "Order Count", sql: "COUNT(orders.id)", format: "number", description: "Total number of orders" },
  { id: "3", name: "avg_order_value", label: "Avg Order Value", sql: "AVG(orders.total_amount)", format: "currency", description: "Average value per order" },
];

const INITIAL_DIMENSIONS: Dimension[] = [
  { id: "1", name: "region", label: "Region", table: "orders", column: "region", type: "string" },
  { id: "2", name: "customer_tier", label: "Customer Tier", table: "customers", column: "tier", type: "string" },
  { id: "3", name: "order_date", label: "Order Date", table: "orders", column: "created_at", type: "date" },
];

const INITIAL_JOINS: Join[] = [
  { id: "1", leftTable: "orders", rightTable: "customers", leftKey: "customer_id", rightKey: "id", type: "LEFT" },
  { id: "2", leftTable: "line_items", rightTable: "orders", leftKey: "order_id", rightKey: "id", type: "LEFT" },
  { id: "3", leftTable: "line_items", rightTable: "products", leftKey: "product_id", rightKey: "id", type: "LEFT" },
];

function generateYAML(metrics: Metric[], dimensions: Dimension[], joins: Join[]): string {
  return `# GET THERE 268 Semantic Layer
# Generated ${new Date().toISOString()}

version: "1.0"

joins:
${joins.map(j => `  - left: ${j.leftTable}
    right: ${j.rightTable}
    on: "${j.leftTable}.${j.leftKey} = ${j.rightTable}.${j.rightKey}"
    type: ${j.type}`).join("\n")}

metrics:
${metrics.map(m => `  - name: ${m.name}
    label: "${m.label}"
    sql: "${m.sql}"
    format: ${m.format}
    description: "${m.description ?? ""}"`).join("\n")}

dimensions:
${dimensions.map(d => `  - name: ${d.name}
    label: "${d.label}"
    table: ${d.table}
    column: ${d.column}
    type: ${d.type}`).join("\n")}`;
}

export default function SemanticLayerPage() {
  const [metrics, setMetrics] = useState<Metric[]>(INITIAL_METRICS);
  const [dimensions, setDimensions] = useState<Dimension[]>(INITIAL_DIMENSIONS);
  const [joins, setJoins] = useState<Join[]>(INITIAL_JOINS);
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [activeTab, setActiveTab] = useState("metrics");

  const addMetric = () => {
    setMetrics([...metrics, {
      id: crypto.randomUUID(),
      name: "new_metric",
      label: "New Metric",
      sql: "COUNT(*)",
      format: "number",
      description: "",
    }]);
  };

  const updateMetric = (id: string, field: keyof Metric, value: string) => {
    setMetrics(metrics.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const addDimension = () => {
    setDimensions([...dimensions, {
      id: crypto.randomUUID(),
      name: "new_dimension",
      label: "New Dimension",
      table: "orders",
      column: "id",
      type: "string",
    }]);
  };

  const publish = () => setStatus("PUBLISHED");

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Semantic Layer Editor"
        description="Define metrics, dimensions, and relationships for your data model"
      />
      <div className="flex-1 overflow-hidden flex">
        {/* Table Browser */}
        <div className="w-56 border-r border-border flex flex-col bg-muted/30 flex-shrink-0">
          <div className="p-4 border-b border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Tables
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {SAMPLE_TABLES.map((table) => (
              <div key={table.name} className="rounded-lg border border-transparent hover:border-border hover:bg-background transition-all">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground">
                  <Database className="w-3.5 h-3.5 text-caribbean-500" />
                  {table.name}
                </button>
                <div className="px-3 pb-2 space-y-0.5">
                  {table.columns.map((col) => (
                    <p key={col} className="text-[11px] text-muted-foreground pl-5 font-mono truncate">
                      {col}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={cn(
                  "gap-1.5",
                  status === "PUBLISHED"
                    ? "border-reef-400 text-reef-700 bg-reef-50"
                    : "border-orange-400 text-orange-700 bg-orange-50"
                )}
              >
                {status === "PUBLISHED" ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                )}
                {status === "DRAFT" ? "Draft" : "Published"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {metrics.length} metrics · {dimensions.length} dimensions · {joins.length} joins
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-2">
                <Code2 className="w-3.5 h-3.5" />
                Export YAML
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-2">
                <Save className="w-3.5 h-3.5" />
                Save Draft
              </Button>
              <Button
                size="sm"
                className="h-8 gap-2 bg-reef-600 hover:bg-reef-700"
                onClick={publish}
                disabled={status === "PUBLISHED"}
              >
                <Upload className="w-3.5 h-3.5" />
                Publish
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 pt-3 border-b border-border">
              <TabsList>
                <TabsTrigger value="metrics" className="gap-1.5 text-xs">
                  <TrendingUp className="w-3 h-3" /> Metrics ({metrics.length})
                </TabsTrigger>
                <TabsTrigger value="dimensions" className="gap-1.5 text-xs">
                  <Columns className="w-3 h-3" /> Dimensions ({dimensions.length})
                </TabsTrigger>
                <TabsTrigger value="joins" className="gap-1.5 text-xs">
                  <GitBranch className="w-3 h-3" /> Joins ({joins.length})
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-1.5 text-xs">
                  <Eye className="w-3 h-3" /> YAML Preview
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Metrics Tab */}
            <TabsContent value="metrics" className="flex-1 overflow-y-auto p-4 m-0 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Define calculated business metrics from your tables.</p>
                <Button size="sm" variant="outline" className="gap-2 h-8" onClick={addMetric}>
                  <Plus className="w-3.5 h-3.5" /> Add Metric
                </Button>
              </div>
              <div className="grid gap-3">
                {metrics.map((metric) => (
                  <Card key={metric.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-xs">Name (internal)</Label>
                          <Input
                            value={metric.name}
                            onChange={(e) => updateMetric(metric.id, "name", e.target.value)}
                            className="h-8 text-sm font-mono"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Label (display)</Label>
                          <Input
                            value={metric.label}
                            onChange={(e) => updateMetric(metric.id, "label", e.target.value)}
                            className="h-8 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5 col-span-2">
                          <Label className="text-xs">SQL Expression</Label>
                          <Input
                            value={metric.sql}
                            onChange={(e) => updateMetric(metric.id, "sql", e.target.value)}
                            className="h-8 text-sm font-mono bg-ocean-950/5"
                            placeholder="SUM(orders.total_amount)"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Format</Label>
                          <Select
                            value={metric.format}
                            onValueChange={(v) => updateMetric(metric.id, "format", v)}
                          >
                            <SelectTrigger className="h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="number">Number</SelectItem>
                              <SelectItem value="currency">Currency</SelectItem>
                              <SelectItem value="percent">Percent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Description</Label>
                          <Input
                            value={metric.description ?? ""}
                            onChange={(e) => updateMetric(metric.id, "description", e.target.value)}
                            className="h-8 text-sm"
                            placeholder="What does this measure?"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Dimensions Tab */}
            <TabsContent value="dimensions" className="flex-1 overflow-y-auto p-4 m-0 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Define groupable dimensions for slicing metrics.</p>
                <Button size="sm" variant="outline" className="gap-2 h-8" onClick={addDimension}>
                  <Plus className="w-3.5 h-3.5" /> Add Dimension
                </Button>
              </div>
              <div className="grid gap-3">
                {dimensions.map((dim) => (
                  <Card key={dim.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-xs">Name</Label>
                          <Input value={dim.name} className="h-8 text-sm font-mono" readOnly />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Label</Label>
                          <Input value={dim.label} className="h-8 text-sm" readOnly />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Table</Label>
                          <Input value={dim.table} className="h-8 text-sm font-mono" readOnly />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs">Column</Label>
                          <Input value={dim.column} className="h-8 text-sm font-mono" readOnly />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Joins Tab */}
            <TabsContent value="joins" className="flex-1 overflow-y-auto p-4 m-0 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Define how tables relate to each other.</p>
                <Button size="sm" variant="outline" className="gap-2 h-8">
                  <Plus className="w-3.5 h-3.5" /> Add Join
                </Button>
              </div>
              <div className="grid gap-3">
                {joins.map((join) => (
                  <Card key={join.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="px-3 py-1.5 rounded-lg bg-caribbean-50 border border-caribbean-200 text-sm font-mono font-medium text-caribbean-800">
                            {join.leftTable}.{join.leftKey}
                          </div>
                          <Badge variant="outline" className="text-xs">{join.type} JOIN</Badge>
                          <div className="px-3 py-1.5 rounded-lg bg-reef-50 border border-reef-200 text-sm font-mono font-medium text-reef-800">
                            {join.rightTable}.{join.rightKey}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* YAML Preview */}
            <TabsContent value="preview" className="flex-1 overflow-y-auto p-4 m-0">
              <div className="rounded-xl bg-ocean-950 border border-ocean-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-ocean-800">
                  <span className="text-xs text-ocean-400 font-mono">semantic-layer.yaml</span>
                  <button className="text-xs text-ocean-400 hover:text-white transition-colors">
                    Copy
                  </button>
                </div>
                <pre className="p-4 text-xs text-ocean-200 font-mono overflow-x-auto leading-relaxed">
                  <code>{generateYAML(metrics, dimensions, joins)}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
