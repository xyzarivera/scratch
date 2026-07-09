const evaluate = (input: string) => {
  // regex parse
  // stop case
  // evaluate

  const regex = /((\+|\-|\*|\/) (\d|\(.*\)) (\d|\(.*\)))/d;

  const expressionArg = regex.exec(input);

  if (expressionArg === null) {
    throw Error("invalid s-expression");
  }

  // console.log(expressionArg);

  const [_a, _b, operator, operandStr1, operandStr2] = expressionArg;

  // @ts-ignore // any
  const operand1 = Number.isNaN(parseInt(operandStr1, 10))
    ? evaluate(operandStr1)
    : parseInt(operandStr1, 10);

  const operand2 = Number.isNaN(parseInt(operandStr2, 10))
    ? evaluate(operandStr2)
    : parseInt(operandStr2, 10);

  const opeatorMap = {
    "+": (operand1: number, operand2: number) => operand1 + operand2,
    "-": (operand1: number, operand2: number) => operand1 - operand2,
    "*": (operand1: number, operand2: number) => operand1 * operand2,
    "/": (operand1: number, operand2: number) => operand1 / operand2,
  };

  // @ts-ignore // any
  const operateFn = opeatorMap[operator];

  return operateFn(operand1, operand2);
};

console.assert(6 === evaluate("(+ 2 4)"));
console.assert(2 === evaluate("(- 4 2)"));
console.assert(-2 === evaluate("(- 2 4)"));
console.assert(8 === evaluate("(* 2 4)"));
console.assert(0.5 === evaluate("(/ 2 4)"));
console.assert(2 === evaluate("(/ 4 2)"));

// nesting

console.assert(10 === evaluate("(+ (+ 2 4) 4)"));
console.assert(8 === evaluate("(+ 2 (+ 2 4))"));
console.assert(12 === evaluate("(+ (+ 2 4) (+ 2 4))"));
console.assert(3 === evaluate("(/ (+ 2 4) 2"));
console.assert(-3 === evaluate("(/ (* 2 (+ 2 4))) (- 4 8)"));
