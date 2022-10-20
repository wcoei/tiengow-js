#!/usr/bin/env node
import TerminalRunner from "./runner/terminal";

const runner = new TerminalRunner();

(async () => {
    await runner.run();
})();

