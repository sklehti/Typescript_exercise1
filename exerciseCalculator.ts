import { isNumber } from "./utils";

interface ResultValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface MultiplyCalculatorValues {
  value1: string[];
}

const parseCalculatorArguments = (args: string[]): MultiplyCalculatorValues => {
  if (args.length < 3) throw new Error("Not enough arguments");

  return {
    value1: args,
  };
};

type discription = "Working more" | "Good work" | "Excellent work!";

const calculateExercises = (array: string[]): ResultValues => {
  let newArray: number[] = [];
  let workingDays = 0;

  for (let i = 3; i < array.length; i++) {
    if (isNumber(array[i])) {
      newArray = [...newArray, Number(array[i])];
      if (Number(array[i]) > 0) {
        workingDays += 1;
      }
    } else {
      throw new Error("Provided values were not numbers!");
    }
  }

  let hours: number = newArray.reduce((sum, a) => sum + a, 0);
  let text: string = "";
  let averageValue: number = 0;
  let ratingValue: number = 0;
  let succesValue: boolean = false;

  averageValue = hours / newArray.length;
  averageValue = Math.round(averageValue);

  switch (true) {
    case averageValue < Number(array[2]):
      ratingValue = 1;
      succesValue = false;
      text = "Working more";
      break;
    case averageValue === Number(array[2]):
      ratingValue = 2;
      succesValue = false;
      text = "Good work";
      break;
    case averageValue > Number(array[2]):
      ratingValue = 3;
      succesValue = true;
      text = "Excellent work!";
      break;
    default:
      throw Error("Something went wrong!");
  }

  return {
    periodLength: newArray.length,
    trainingDays: workingDays,
    success: succesValue,
    rating: ratingValue,
    ratingDescription: text,
    target: Number(array[2]),
    average: hours / newArray.length,
  };
};

try {
  const { value1 } = parseCalculatorArguments(process.argv);
  console.log(calculateExercises(value1));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += "Error:" + error.message;
  }
  console.log(errorMessage);
}
