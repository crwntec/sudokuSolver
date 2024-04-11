import { useState } from "react";
import "./App.css";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  let original = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];
  let [grid, setGrid] = useState([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]);

  const solveAsync = async () => {
    let updatedGrid = [...grid];

    function isValid(grid, row, col, num) {
      for (let x = 0; x <= 8; x++) if (grid[row][x] === num) return false;
      for (let x = 0; x <= 8; x++) if (grid[x][col] === num) return false;
      const startRow = row - (row % 3);
      const startCol = col - (col % 3);
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
          if (grid[i + startRow][j + startCol] === num) return false;
      return true;
    }

    async function solveSudoku(grid, row = 0, col = 0) {
      if (row == 8 && col == 9) return true;
      if (col == 9) {
        row++;
        col = 0;
      }
      if (grid[row][col] > 0) return solveSudoku(grid, row, col + 1);
      for (let num = 1; num <= 9; num++) {
        if (isValid(grid, row, col, num)) {
          grid[row][col] = num;
          setGrid([...grid]);
          await sleep(5);
          if (await solveSudoku(grid, row, col + 1)) return true;
        }
        grid[row][col] = 0;
      }
      return false;
    }

    try {
      if (await solveSudoku(updatedGrid)) {
        setGrid(updatedGrid);
      } else {
        alert("No solution");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const solve = () => {
    let updatedGrid = [...grid];

    function isValid(grid, row, col, num) {
      for (let x = 0; x <= 8; x++) if (grid[row][x] == num) return false;

      for (let x = 0; x <= 8; x++) if (grid[x][col] == num) return false;

      let startRow = row - (row % 3),
        startCol = col - (col % 3);

      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
          if (grid[i + startRow][j + startCol] == num) return false;

      return true;
    }

    function solveSudoku(grid, row = 0, col = 0) {
      if (row == 9 - 1 && col == 9) return true;

      if (col == 9) {
        row++;
        col = 0;
      }

      if (grid[row][col] > 0) return solveSudoku(grid, row, col + 1);

      for (let num = 1; num <= 9; num++) {
        if (isValid(grid, row, col, num)) {
          grid[row][col] = num;

          if (solveSudoku(grid, row, col + 1)) return true;
        }

        grid[row][col] = 0;
      }
      return false;
    }

    if (solveSudoku(updatedGrid)) {
      setGrid(updatedGrid);
    } else {
      console.log("No solution exists");
    }
  };

  return (
    <div className="App">
      <div className="sudoku">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={
                "cell" +
                ((j + 1) % 3 == 0 && j !== 8 ? " border-right" : "") +
                ((i + 1) % 3 == 0 && i !== 8 ? " border-bottom" : "")
              }
            >
              {cell == 0 ? "" : cell}
            </div>
          ))
        )}
      </div>
      <div className="btnRow">
        <button className="solveBtn" onClick={solve}>
          Solve
        </button>
        <button className="solveBtn" onClick={solveAsync}>
          Solve Async
        </button>
        <button className="resetBtn" onClick={() => setGrid(original)}>
          {" "}
          Reset{" "}
        </button>
      </div>
    </div>
  );
}

export default App;
