"use client";

import { useState } from "react";
import { Header } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Play, Save, Plus, Trash2, Clock, Tag, Wand2, Code2, Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Variable {
  name: string;
  type: "string" | "number" | "boolean";
  defaultValue: string;
}

const SAVED_TEMPLATES = [
  { id: "1", name: "Revenue Summary", tags: ["finance", "kpi"], template: "Summarize revenue for {{period}} by {{dimension}}.", variables: 2 },
  { id: "2", name: "Customer Churn Analysis", tags: ["retention"], template: "Identify customers at churn risk based on {{signals}}.", variables: 1 },
  { id: "3", name: "Top N Products", tags: ["sales", "product"], template: "Show top {{n}} products by {{metric}} for {{period}}.", variables: 3 },
];

const EXAMPLE_TEMPLATE = `You are analysing data for {{company_name}}.

Find all transactions from {{start_date}} to {{end_date}} where:
- Amount exceeds {{min_amount}}
- Region is {{region}}

Group by {{group_by}} and show the top {{limit}} results.
Sort by total descending.`;

export default function PromptBuilderPage() {
  const [template, setTemplate] = useState(EXAMPLE_TEMPLATE);
  const [promptName, setPromptName] = useState("New Prompt");
  const [tags, setTags] = useState<string[]>(["analytics"]);
  const [variables, setVariables] = useState<Variable[]>([
    { name: "company_name", type: "string", defaultValue: "Acme Corp" },
    { name: "start_date", type: "string", defaultValue: "2024-01-01" },
    { name: "end_date", type: "string", defaultValue: "2024-12-31" },
    { name: "min_amount", type: "number", defaultValue: "1000" },
    { name: "region", type: "string", defaultValue: "Caribbean" },
    { name: "group_by", type: "string", defaultValue: "month" },
    { name: "limit", type: "number", defaultValue: "10" },
  ]);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const extractVarNames = (tmpl: string): string[] => {
    const matches = tmpl.match(/\{\{(\w+)\}\}/g) ?? [];
    return [...new Set(matches.map((m) => m.slice(2, -2)))];
  };

  const getPreview = () => {
    let preview = template;
    variables.forEach((v) => {
      preview = preview.replace(new RegExp(`\\{\\{${v.name}\\}\\}`, "g"), v.defaultValue || `[${v.name}]`);
    });
    return preview;
  };

  const addVariable = () => {
    setVariables([...variables, { name: "new_variable", type: "string", defaultValue: "" }]);
  };

  const removeVariable = (i: number) => {
    setVariables(variables.filter((_, idx) => idx !== i));
  };

  const updateVariable = (i: number, field: keyof Variable, value: string) => {
    setVariables(variables.map((v, idx) => idx === i ? { ...v, [field]: value } : v));
  };

  const runTest = async () => {
    setRunning(true);
    setTestOutput(null);
    await new Promise((r) => setTimeout(r, 1500));
    setTestOutput(
      `✓ Test completed in 1.2s\n\nGenerated prompt:\n\n${getPreview()}\n\nConfidence: 88%\nTokens: 312\nEstimated cost: $0.0004`
    );
    setRunning(false);
  };

  const detectedVars = extractVarNames(template);

  return (
    <div className="flex flex-col h-full">
      <Header
        title="AI Prompt Builder"
        description="Design, test, and version your AI query prompts"
      />
      <div className="flex-1 overflow-hidden flex gap-0">
        {/* Template Library Sidebar */}
        <div className="w-64 border-r border-border flex flex-col bg-muted/30 flex-shrink-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Templates</h3>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
            <Input placeholder="Search templates..." className="h-7 text-xs" />
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {SAVED_TEMPLATES.map((t) => (
              <button
                key={t.id}
                className="w-full text-left p-3 rounded-lg hover:bg-background border border-transparent hover:border-border transition-all"
                onClick={() => setTemplate(t.template)}
              >
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {t.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-caribbean-100 text-caribbean-700 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{t.variables} variables</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background">
            <Input
              value={promptName}
              onChange={(e) => setPromptName(e.target.value)}
              className="w-48 h-8 text-sm font-medium"
              aria-label="Prompt name"
            />
            <div className="flex gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs gap-1">
                  <Tag className="w-2.5 h-2.5" /> {tag}
                </Badge>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-2">
                <Clock className="w-3.5 h-3.5" />
                History
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-2" onClick={runTest} disabled={running}>
                <Play className="w-3.5 h-3.5" />
                {running ? "Running..." : "Test"}
              </Button>
              <Button size="sm" className="h-8 gap-2 bg-caribbean-500 hover:bg-caribbean-600">
                <Save className="w-3.5 h-3.5" />
                Save
              </Button>
            </div>
          </div>

          {/* Split Pane */}
          <div className="flex-1 overflow-hidden flex">
            {/* Editor Pane */}
            <div className="flex-1 flex flex-col border-r border-border overflow-hidden">
              <Tabs defaultValue="editor" className="flex flex-col h-full">
                <div className="px-4 pt-3 border-b border-border">
                  <TabsList className="h-7">
                    <TabsTrigger value="editor" className="text-xs gap-1.5">
                      <Code2 className="w-3 h-3" /> Template
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="text-xs gap-1.5">
                      <Eye className="w-3 h-3" /> Preview
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="editor" className="flex-1 p-0 m-0 overflow-hidden">
                  <div className="h-full relative">
                    <textarea
                      value={template}
                      onChange={(e) => setTemplate(e.target.value)}
                      className="absolute inset-0 w-full h-full p-4 font-mono text-sm text-foreground bg-transparent resize-none focus:outline-none"
                      spellCheck={false}
                      aria-label="Prompt template editor"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="preview" className="flex-1 p-4 m-0 overflow-y-auto">
                  <pre className="text-sm text-foreground font-mono whitespace-pre-wrap leading-relaxed">
                    {getPreview()}
                  </pre>
                </TabsContent>
              </Tabs>
            </div>

            {/* Variables + Output Pane */}
            <div className="w-72 flex flex-col overflow-hidden flex-shrink-0">
              <div className="flex-1 overflow-y-auto">
                {/* Variables */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Variables
                    </h3>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={addVariable}>
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {variables.map((v, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-xs font-mono px-1.5 py-0.5 rounded",
                            detectedVars.includes(v.name)
                              ? "bg-caribbean-100 text-caribbean-700"
                              : "bg-muted text-muted-foreground"
                          )}>
                            {`{{${v.name}}}`}
                          </span>
                          <button
                            onClick={() => removeVariable(i)}
                            className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                            aria-label={`Remove variable ${v.name}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <Input
                          value={v.defaultValue}
                          onChange={(e) => updateVariable(i, "defaultValue", e.target.value)}
                          placeholder="Default value"
                          className="h-7 text-xs"
                          aria-label={`Value for ${v.name}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Test Output */}
                {testOutput && (
                  <div className="p-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      Test Result
                    </h3>
                    <div className="rounded-lg bg-muted p-3">
                      <pre className="text-xs text-foreground whitespace-pre-wrap font-mono">
                        {testOutput}
                      </pre>
                    </div>
                  </div>
                )}
                {running && (
                  <div className="p-4">
                    <div className="rounded-lg bg-muted p-4 flex items-center gap-3">
                      <Wand2 className="w-4 h-4 text-caribbean-500 animate-pulse" />
                      <span className="text-xs text-muted-foreground">Running test...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
