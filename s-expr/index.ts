import assert from "assert";

const evaluate = (input: string) => {
  // regex parse
  // stop case
  // evaluate

  const regex = /(\+|\-|\*|\/) (\d) (\d)/g;

  const expressionArg = regex.exec(input);

  if (expressionArg === null) {
    throw Error("invalid s-expression");
  }

  const [_, operator, operandStr1, operandStr2] = expressionArg;
  const operand1 = parseInt(operandStr1, 10);
  const operand2 = parseInt(operandStr2, 10);

  const opeatorMap = {
    "+": (operand1: number, operand2: number) => operand1 + operand2,
    "-": (operand1: number, operand2: number) => operand1 - operand2,
    "*": (operand1: number, operand2: number) => operand1 * operand2,
    "/": (operand1: number, operand2: number) => operand1 / operand2,
  };

  // @ts-ignore // any
  const yasFn = opeatorMap[operator];
  const yas = yasFn(operand1, operand2);

  return yas;
  // return expressionArg;
};

console.assert(6 === evaluate("(+ 2 4)"));
console.assert(2 === evaluate("(- 4 2)"));
console.assert(-2 === evaluate("(- 2 4)"));
console.assert(8 === evaluate("(* 2 4)"));
console.assert(0.5 === evaluate("(/ 2 4)"));
console.assert(2 === evaluate("(/ 4 2)"));
