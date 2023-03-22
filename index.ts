import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { isNumber } from "./utils";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get(`/bmi`, (req, res) => {
  try {
    if (
      isNumber(req.query.weight) &&
      isNumber(req.query.height) &&
      Number(req.query.weight) !== 0 &&
      Number(req.query.height) !== 0
    ) {
      const personInfo = calculateBmi(
        Number(req.query.height),
        Number(req.query.weight)
      );

      res.send({
        weight: personInfo.weight,
        height: personInfo.height,
        bmi: personInfo.bmi,
      });
    } else {
      throw new Error("Provided values were not  numbers!");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.send({ error: error.message });
    }
  }
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = req.body;
    let values: number[] = [0, 0];
    values = [...values, Number(target)];
    const exerciseArray = daily_exercises as Array<Number>;

    exerciseArray.map((v: number) => {
      if (isNaN(v)) {
        res.send({ error: "malformatted parameters" });
      }
      values = [...values, v];
    });

    const stringArray: string[] = values as unknown as Array<string>;

    const result = calculateExercises(stringArray);

    res.send({ result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.send({ error: "parameters missing" });
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
