## To run locally

- `npm i`
- e.g. `npm run calculateExercises 2 1 0 2 4.5 0 3 1 0`
- e.g `npm run calculateBmi 180 91`
- e.g. `ts-node index.ts` -> open: http://localhost:3002/bmi?height=180&weight=72 (you can change the values)
- e.g. `ts-node index.ts` -> open Postman and create post request to the url: http://localhost:3002/exercises
  with json object:
  {
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
  }
