import React from "react";
import { Box, Text, useStdout } from "ink";
import { pilotDeckDarkBlueTheme } from "./theme.js";

const ANSI_SHADOW_LOGO = [
  " ██████╗  █████╗  ██████╗██╗      █████╗ ██╗    ██╗",
  "██╔════╝ ██╔══██╗██╔════╝██║     ██╔══██╗██║    ██║",
  "██║  ███╗╚██████║██║     ██║     ███████║██║ █╗ ██║",
  "██║   ██║ ╚═══██║██║     ██║     ██╔══██║██║███╗██║",
  "╚██████╔╝ █████╔╝╚██████╗███████╗██║  ██║╚███╔███╔╝",
  " ╚═════╝  ╚════╝  ╚═════╝╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ ",
];

const ANSI_SHADOW_VISIBLE_COLS = 56;
// border (2) + paddingX (4) + marginX (2) on the WelcomeCard wrapper.
const ANSI_SHADOW_MIN_TERMINAL_COLS = ANSI_SHADOW_VISIBLE_COLS + 8;

const STANDARD_LOGO = [
  "  ____  ___   ____ _               ",
  " / ___|/ _ \\ / ___| | __ ___      ",
  "| |  _| (_) | |   | |/ _` \\ \\ /\\ / /",
  "| |_| |\\__, | |___| | (_| |\\ V  V / ",
  " \\____|  /_/ \\____|_|\\__,_| \\_/\\_/  ",
];

export function PilotDeckLogo({ tagline }: { tagline?: string } = {}): React.ReactNode {
  const { stdout } = useStdout();
  const cols = stdout?.columns ?? 80;
  const useShadow = cols >= ANSI_SHADOW_MIN_TERMINAL_COLS;

  return (
    <Box flexDirection="column">
      {useShadow
        ? ANSI_SHADOW_LOGO.map((line, index) => {
            return (
              <Text key={index} color={pilotDeckDarkBlueTheme.brandAccent} bold>
                {line}
              </Text>
            );
          })
        : STANDARD_LOGO.map((line, index) => (
            <Text key={index} color={pilotDeckDarkBlueTheme.brandAccent} bold>
              {line}
            </Text>
          ))}
      {tagline ? (
        <Box marginTop={1}>
          <Text color={pilotDeckDarkBlueTheme.brandAccent} bold>
            {"↗  "}
          </Text>
          <Text color={pilotDeckDarkBlueTheme.subtle}>{tagline}</Text>
        </Box>
      ) : null}
    </Box>
  );
}

export function CondensedLogo(): React.ReactNode {
  return (
    <Text>
      <Text color={pilotDeckDarkBlueTheme.brand} bold>
        G9
      </Text>
      <Text color={pilotDeckDarkBlueTheme.brandAccent} bold>
        Claw
      </Text>
      <Text color={pilotDeckDarkBlueTheme.brandAccent}> ↗</Text>
    </Text>
  );
}
