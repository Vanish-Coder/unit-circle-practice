// All 16 unit circle values
const unitCircleValues = [
  { degrees: 0, radians: "0", sin: "0", cos: "1", tan: "0" },
  { degrees: 30, radians: "π/6", sin: "1/2", cos: "√3/2", tan: "1/√3" },
  { degrees: 45, radians: "π/4", sin: "√2/2", cos: "√2/2", tan: "1" },
  { degrees: 60, radians: "π/3", sin: "√3/2", cos: "1/2", tan: "√3" },
  { degrees: 90, radians: "π/2", sin: "1", cos: "0", tan: "und." },
  { degrees: 120, radians: "2π/3", sin: "√3/2", cos: "-1/2", tan: "-√3" },
  { degrees: 135, radians: "3π/4", sin: "√2/2", cos: "-√2/2", tan: "-1" },
  { degrees: 150, radians: "5π/6", sin: "1/2", cos: "-√3/2", tan: "-1/√3" },
  { degrees: 180, radians: "π", sin: "0", cos: "-1", tan: "0" },
  { degrees: 210, radians: "7π/6", sin: "-1/2", cos: "-√3/2", tan: "1/√3" },
  { degrees: 225, radians: "5π/4", sin: "-√2/2", cos: "-√2/2", tan: "1" },
  { degrees: 240, radians: "4π/3", sin: "-√3/2", cos: "-1/2", tan: "√3" },
  { degrees: 270, radians: "3π/2", sin: "-1", cos: "0", tan: "und." },
  { degrees: 300, radians: "5π/3", sin: "-√3/2", cos: "1/2", tan: "-√3" },
  { degrees: 315, radians: "7π/4", sin: "-√2/2", cos: "√2/2", tan: "-1" },
  { degrees: 330, radians: "11π/6", sin: "-1/2", cos: "√3/2", tan: "-1/√3" }
];

// Shuffle array
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate problems - give only radian or degree, must solve for everything else
function generateProblems() {
  const shuffled = shuffle(unitCircleValues);
  
  return shuffled.map(row => {
    const givenType = Math.random() > 0.5 ? "radians" : "degrees";
    
    return {
      degrees: row.degrees,
      radians: row.radians,
      sin: row.sin,
      cos: row.cos,
      tan: row.tan,
      givenType: givenType,
      userAnswers: {
        radians: "",
        degrees: "",
        sin: "",
        cos: "",
        tan: ""
      }
    };
  });
}

// Check if user answer is correct
function checkAnswer(problem, column, userAnswer) {
  const correctAnswer = problem[column];
  
  // Normalize for comparison - remove spaces and degree symbols
  const normalized = userAnswer.trim().replace(/\s/g, "").replace("°", "");
  const normalizedAnswer = correctAnswer.toString().replace(/\s/g, "").replace("°", "");
  
  console.log(`Checking ${column}: "${normalized}" vs "${normalizedAnswer}"`);
  
  if (normalized === normalizedAnswer) {
    return true;
  }
  
  // Check for alternative forms (e.g., "√3" vs "√(3)")
  const alternatives = getAlternativeForms(normalizedAnswer);
  return alternatives.includes(normalized);
}

// Generate alternative valid forms of an answer
function getAlternativeForms(answer) {
  const forms = [answer];
  
  // For forms like "1/√3", also accept "√3/3" (rationalized)
  if (answer === "1/√3") {
    forms.push("√3/3");
  }
  if (answer === "√3/3") {
    forms.push("1/√3");
  }
  
  // For "und." also accept "undefined" and "und"
  if (answer === "und.") {
    forms.push("undefined");
    forms.push("und");
  }
  
  // For negative fractions
  if (answer === "-1/√3") {
    forms.push("-√3/3");
  }
  if (answer === "-√3/3") {
    forms.push("-1/√3");
  }
  
  return forms;
}
