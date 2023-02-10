import React, { useState, useEffect } from 'react';

const CharacteristicForm = ({ characteristic, value, allChars, charChosen, handleCharChosen }) => {
  const [meaning, setMeaning] = useState([]);

  useEffect(() => {
    if (characteristic === "Size") {
      setMeaning(["A size too small", "1/2 a size too small", "PERFECT!", "1/2 a size too big", "A size too wide"])
    } else if (characteristic === "Width") {
      setMeaning(["Too narrow", "Slightly narrow", "PERFECT!", "Slightly wide", "Too wide"])
    } else if (characteristic === "Comfort") {
      setMeaning(["Uncomfortable", "Slightly uncomfortable", "Ok", "Comfortable", "PERFECT!"])
    } else if (characteristic === "Quality") {
      setMeaning(["Poor", "Below Average", "What I expected", "Pretty great", "PERFECT!"])
    } else if (characteristic === "Length") {
      setMeaning(["Runs short", "Runs slightly short", "PERFECT!", "Runs slightly long", "Runs long"])
    } else if (characteristic === "Fit") {
      setMeaning(["Runs tight", "Runs slightly tight", "PERFECT!", "Runs slightly loose", "Runs loose"])
    }
  }, [])
  const test = [1, 2, 3, 4, 5]

  return (
    <div>
      <br />
      <label>{characteristic}</label><br />
      <div className="charquestion-container">
        <label className="radio-choice">
          {test.map((index) => {
            return (
              <div>
                <input required type="radio" name={characteristic} value={index}
                onChange={handleCharChosen}
                />
                <span>{index + ` - ${meaning[index - 1]}`}</span>
              </div>
            )
          })}
        </label>
      </div>
    </div>
  )
}

export default CharacteristicForm;