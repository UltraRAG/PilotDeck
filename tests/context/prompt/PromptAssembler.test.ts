import test from "node:test";
import assert from "node:assert/strict";

import { NullExtensionResolver } from "../../../src/context/extension/ExtensionResolver.js";
import { PromptAssembler } from "../../../src/context/prompt/PromptAssembler.js";

test("default prompt identifies G9Claw and masks the deployed model name", () => {
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

  assert.match(result.sections.defaultSystemPrompt[0], /answer that you are G9Claw/);
  assert.match(result.sections.defaultSystemPrompt[0], /answer only in the user's language that you are 九格模型/);
  assert.match(result.sections.defaultSystemPrompt[0], /Do not disclose or name the configured provider\/model/);
});
