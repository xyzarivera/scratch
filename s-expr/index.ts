const evaluate = (input: string) => {
  const regex =
    /^\((?<operator>\+|\-|\*|\/|\^|\%) (?<operandStr1>(?:\-)?\d+(?:\.\d+)?|\(.+\)) (?<operandStr2>(?:\-)?\d+(?:\.\d+)?|\(.+\))\)$/;

  const expressionArg = regex.exec(input);

  if (expressionArg === null) {
    throw Error("invalid s-expression");
  }

  const {
    operator = "",
    operandStr1 = "",
    operandStr2 = "",
  } = expressionArg.groups ?? {};

  // @ts-ignore // any
  const operand1 = Number.isNaN(Number(operandStr1))
    ? evaluate(operandStr1)
    : Number(operandStr1);

  // @ts-ignore // any
  const operand2 = Number.isNaN(Number(operandStr2))
    ? evaluate(operandStr2)
    : Number(operandStr2);

  const opeatorMap = {
    "+": (operand1: number, operand2: number) => operand1 + operand2,
    "-": (operand1: number, operand2: number) => operand1 - operand2,
    "*": (operand1: number, operand2: number) => operand1 * operand2,
    "/": (operand1: number, operand2: number) => operand1 / operand2,
    "^": (operand1: number, operand2: number) => operand1 ** operand2,
    "%": (operand1: number, operand2: number) => operand1 % operand2,
  };

  // @ts-ignore // any
  const operateFn = opeatorMap[operator];

  const ans: number = operateFn(operand1, operand2);
  // console.log({ ans, input, expressionArg });
  return ans;
};

console.assert(6 === evaluate("(+ 2 4)"));
console.assert(2 === evaluate("(- 4 2)"));
console.assert(-2 === evaluate("(- 2 4)"));
console.assert(8 === evaluate("(* 2 4)"));
console.assert(0.5 === evaluate("(/ 2 4)"));
console.assert(2 === evaluate("(/ 4 2)"));

// nesting

console.assert(10 === evaluate("(+ (+ 2 4) 4)"));
console.assert(9 === evaluate("(+ 3 (+ 2 4))"));
console.assert(12 === evaluate("(+ (+ 2 4) (+ 2 4))"));
console.assert(3 === evaluate("(/ (+ 2 4) 2)"));
console.assert(-3 === evaluate("(/ (* 2 (+ 2 4)) (- 4 8))"));

// welp
console.assert(3 === evaluate("(+ 1 2)"));
console.assert(1.5 === evaluate("(- 5 3.5)"));
console.assert(2 === evaluate("(/ (- 10 2) 4)"));
console.assert(9 === evaluate("(* (+ 1 2) 3)"));
console.assert(24 === evaluate("(+ (- 5 2) (* 3 7))"));
console.assert(415 === evaluate("(* (+ (^ 3 4) (% 11 3)) (/ (- 15 5) 2))"));
console.assert(-3 === evaluate("(+ -1 -2)"));
console.assert(1 === evaluate("(+ -1 2)"));
console.assert(-1 === evaluate("(+ 1 -2)"));
console.assert(2 === evaluate("(* -1 -2)"));
console.assert(-2 === evaluate("(* -1 2)"));
console.assert(-2 === evaluate("(* 1 -2)"));
console.assert(-17.5 === evaluate("(* 5 -3.5)"));
