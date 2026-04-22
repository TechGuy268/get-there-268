export type UserRole = "ADMIN" | "ANALYST";

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  companyId: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  createdAt: string;
}

export type DataSourceType =
  | "POSTGRESQL"
  | "MYSQL"
  | "BIGQUERY"
  | "SNOWFLAKE"
  | "CSV"
  | "API";

export interface DataSource {
  id: string;
  name: string;
  type: DataSourceType;
  companyId: string;
  schemaMetadata?: SchemaMetadata;
  instructions?: string;
  createdAt: string;
}

export interface SchemaMetadata {
  tables: TableSchema[];
  lastUpdated: string;
}

export interface TableSchema {
  name: string;
  columns: ColumnSchema[];
  rowCount?: number;
}

export interface ColumnSchema {
  name: string;
  type: string;
  nullable: boolean;
  isPrimaryKey?: boolean;
}

export type ChartType = "bar" | "line" | "area" | "pie" | "table" | "number";

export interface ChartData {
  type: ChartType;
  data: Record<string, unknown>[];
  xKey?: string;
  yKeys?: string[];
  title?: string;
}

export interface QueryResult {
  id: string;
  queryText: string;
  generatedSql: string | null;
  confidence: number | null;
  chartType: ChartType | null;
  chartData: ChartData | null;
  nlAnswer: string | null;
  rowCount: number;
  executionTimeMs: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  queryResult?: QueryResult;
  isStreaming?: boolean;
  timestamp: Date;
}

export interface Prompt {
  id: string;
  name: string;
  template: string;
  variables: PromptVariable[];
  tags: string[];
  companyId: string;
  versions: PromptVersion[];
  createdAt: string;
  updatedAt: string;
}

export interface PromptVariable {
  name: string;
  type: "string" | "number" | "boolean";
  defaultValue?: string;
  description?: string;
}

export interface PromptVersion {
  id: string;
  promptId: string;
  template: string;
  notes?: string;
  createdAt: string;
}

export interface SemanticLayer {
  id: string;
  companyId: string;
  dataSourceId: string;
  metrics: Metric[];
  dimensions: Dimension[];
  joins: Join[];
  status: "DRAFT" | "PUBLISHED";
  updatedAt: string;
}

export interface Metric {
  id: string;
  name: string;
  label: string;
  sql: string;
  format: "number" | "currency" | "percent";
  description?: string;
}

export interface Dimension {
  id: string;
  name: string;
  label: string;
  table: string;
  column: string;
  type: "string" | "number" | "date" | "boolean";
}

export interface Join {
  id: string;
  leftTable: string;
  rightTable: string;
  leftKey: string;
  rightKey: string;
  type: "INNER" | "LEFT" | "RIGHT";
}

export interface KPIMetric {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  trend?: number[];
  format?: "number" | "currency" | "percent";
  icon?: string;
}
