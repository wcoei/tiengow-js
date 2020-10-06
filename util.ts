const ask = (query: string) => {
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
};
export default ask;
