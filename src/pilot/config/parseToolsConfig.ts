import { isRecord } from "../../model/config/schema.js";
import type { PilotConfigDiagnostic, PilotToolsConfig } from "./types.js";

/**
 * Offline builds do not expose network-backed built-in tools. Keep accepting a
 * `tools` object so older configs continue to load, but ignore its contents.
 */
export function parseToolsConfig(
  rawTools: unknown,
  diagnostics: PilotConfigDiagnostic[],
): PilotToolsConfig | undefined {
  if (rawTools === undefined) {
    return undefined;
  }
  if (!isRecord(rawTools)) {
    diagnostics.push({
      code: "TOOLS_CONFIG_INVALID",
      severity: "fatal",
      message: "tools config must be an object.",
      path: "tools",
      recoverable: false,
    });
    return undefined;
  }

  for (const key of Object.keys(rawTools)) {
    diagnostics.push({
      code: "TOOLS_CONFIG_IGNORED",
      severity: "warning",
      message: `tools.${key} is ignored because built-in network tools are disabled.`,
      path: `tools.${key}`,
      recoverable: true,
    });
  }

  return undefined;
}
