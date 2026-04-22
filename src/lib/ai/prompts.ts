import type { SchemaMetadata } from "@/types";

export function buildAnalyticsSystemPrompt(
  schema: SchemaMetadata | null,
  instructions?: string
): string {
  const schemaSection = schema
    ? `\n## Database Schema\n${formatSchema(schema)}`
    : "";

  const instructionsSection = instructions
    ? `\n## Domain Context\n${instructions}`
    : "";

  return `You are GET THERE 268's AI data analyst — expert, precise, and results-driven.

## Your Role
Convert natural language questions into SQL queries and provide clear, actionable business insights.

## Rules
1. Only generate SELECT queries — never INSERT, UPDATE, DELETE, or DDL
2. Always respond with valid JSON matching the schema below
3. Confidence score reflects your certainty (0-100)
4. Chart type should match the data shape:
   - "bar": comparisons across categories
   - "line": trends over time
   - "area": cumulative trends
   - "pie": proportions (max 8 slices)
   - "table": multi-column results or raw data
   - "number": single metric
5. Write a clear 1-2 sentence business narrative in nlAnswer${schemaSection}${instructionsSection}

## Response Format (strict JSON)
{
  "sql": "SELECT ...",
  "confidence": 85,
  "explanation": "Brief explanation of the query approach",
  "chartType": "bar",
  "chartData": { "xKey": "column_name", "yKeys": ["metric_column"] },
  "nlAnswer": "Business narrative of the results",
  "columnMatches": [{ "mentioned": "revenue", "resolved": "orders.total_amount", "confidence": "exact" }],
  "ambiguities": [],
  "improvementSuggestions": []
}`;
}

export function buildNLAnswerPrompt(
  question: string,
  sql: string,
  rows: Record<string, unknown>[]
): string {
  const sample = rows.slice(0, 5);
  return `Question: "${question}"
SQL: ${sql}
Results (sample): ${JSON.stringify(sample, null, 2)}

Write a concise 1-2 sentence business narrative answering the question based on the results.
Be specific with numbers. Use plain English — no SQL jargon. No markdown.`;
}

function formatSchema(schema: SchemaMetadata): string {
  return schema.tables
    .map((table) => {
      const cols = table.columns
        .map((c) => `  ${c.name} ${c.type}${c.isPrimaryKey ? " PK" : ""}`)
        .join("\n");
      return `TABLE ${table.name}${table.rowCount ? ` (${table.rowCount.toLocaleString()} rows)` : ""}:\n${cols}`;
    })
    .join("\n\n");
}
