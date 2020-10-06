export function ask(query: string): Promise<string> {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    readline.question(query, (answer: string) => {
      readline.close();
      resolve(answer);
    })
  );
}

export function sleep(ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
