import { isNumber } from "./utils";

interface MultiplyValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (isNumber(args[2]) && isNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

type Operation =
  | "Underweight (unhealthy weight)"
  | "Normal (healthy weight)"
  | "Overweight (unhealthy weight)"
  | "Something went wrong";

const calculateBmi = (a: number, b: number): Operation => {
  if (a !== 0) {
    a = a / 100;
    const result: number = b / (a * a);

    if (result < 18.5) {
      return "Underweight (unhealthy weight)";
    } else if (result >= 18.5 && result <= 24.9) {
      return "Normal (healthy weight)";
    } else {
      return "Overweight (unhealthy weight)";
    }
  } else {
    throw new Error("Can't divide by 0!");
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
