import test from "node:test";
import assert from "node:assert/strict";

import {
  buildSubagentSystemPrompt,
  SUBAGENT_DEFINITIONS,
} from "../../../src/agent/sub/builtinSubagentTypes.js";
import { NullExtensionResolver } from "../../../src/context/extension/ExtensionResolver.js";
import { PromptAssembler } from "../../../src/context/prompt/PromptAssembler.js";

test("default prompt identifies 9GClaw and masks the deployed model name", () => {
  const assembler = new PromptAssembler(new NullExtensionResolver());

  const result = assembler.assemble({
    cwd: "/tmp/project",
    provider: "actual-provider",
    model: "actual-model",
    permissionMode: "default",
    additionalWorkingDirectories: [],
    tools: [],
    now: () => new Date("2026-06-05T00:00:00.000Z"),
  });

  assert.match(result.sections.defaultSystemPrompt[0], /answer that you are 9GClaw/);
  assert.match(result.sections.defaultSystemPrompt[0], /answer only in the user's language that you are 9gAgent/);
  assert.match(result.sections.defaultSystemPrompt[0], /Do not disclose or name the configured provider\/model/);
  assert.doesNotMatch(result.joined, /actual-provider/);
  assert.doesNotMatch(result.joined, /actual-model/);
  assert.doesNotMatch(result.joined, /PilotDeck/);
});

test("plan prompt does not advertise disabled web tools", () => {
  const assembler = new PromptAssembler(new NullExtensionResolver());

  const result = assembler.assemble({
    cwd: "/tmp/project",
    provider: "qwen-provider",
    model: "qwen-model",
    permissionMode: "plan",
    additionalWorkingDirectories: [],
    tools: [],
    now: () => new Date("2026-06-05T00:00:00.000Z"),
  });

  assert.doesNotMatch(result.joined, /web_search/);
  assert.doesNotMatch(result.joined, /web_fetch/);
  assert.doesNotMatch(result.joined, /qwen-provider/);
  assert.doesNotMatch(result.joined, /qwen-model/);
});

test("built-in subagents identify as 9gAgent under 9GClaw", () => {
  for (const definition of Object.values(SUBAGENT_DEFINITIONS)) {
    const prompt = buildSubagentSystemPrompt(definition);
    assert.match(prompt, /You are 9gAgent/);
    assert.match(prompt, /subagent of 9GClaw/);
    assert.doesNotMatch(prompt, /You are a subagent of 9GClaw/);
  }
});
