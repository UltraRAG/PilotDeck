import test from "node:test";
import assert from "node:assert/strict";

import { createBuiltinRegistry } from "../../../src/tool/registry/createBuiltinRegistry.js";

test("default builtin registry does not expose network tools", () => {
  const registry = createBuiltinRegistry();
  const names = registry.toCanonicalSchemas().map((tool) => tool.name);

  assert.equal(registry.has("web_search"), false);
  assert.equal(registry.has("WebSearch"), false);
  assert.equal(registry.has("web_fetch"), false);
  assert.equal(registry.has("WebFetch"), false);
  assert.equal(names.includes("web_search"), false);
  assert.equal(names.includes("web_fetch"), false);
});

test("network tools remain explicit opt-ins for specialized builds", () => {
  const registry = createBuiltinRegistry({
    webSearch: {},
    webFetch: {},
  });

  assert.equal(registry.has("web_search"), true);
  assert.equal(registry.has("WebSearch"), true);
  assert.equal(registry.has("web_fetch"), true);
  assert.equal(registry.has("WebFetch"), true);
});
