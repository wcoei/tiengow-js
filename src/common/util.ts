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

export function pickRandomNumbers(from: number, to: number, count: number): number [] {
  var result = [];
  while(result.length < count){
    var r = from + Math.floor(Math.random() * to);
    if(result.indexOf(r) === -1) result.push(r);
}
  return result.sort((num1, num2) => num1 - num2);
}
