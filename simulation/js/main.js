let globalSelectedSentence = []; // Stores the selected sentence with POS tags
let globalPOSOptions = []; // Stores the POS options for the selected language

// English examples and their corresponding correct answers
const englishExamples = [
  {
    sentence: "The child liked the chocolate.",
    answers: [
      "The/Determiner",
      "child/Noun",
      "liked/Verb",
      "the/Determiner",
      "chocolate/Noun",
    ],
  },
  {
    sentence: "She was stopped by the bravest knight.",
    answers: [
      "She/Pronoun",
      "was/Verb",
      "stopped/Verb",
      "by/Preposition",
      "the/Determiner",
      "bravest/Adjective",
      "knight/Noun",
    ],
  },
  {
    sentence: "Mary baked a cake for his birthday.",
    answers: [
      "Mary/Noun",
      "baked/Verb",
      "a/Determiner",
      "cake/Noun",
      "for/Preposition",
      "his/Determiner",
      "birthday/Noun",
    ],
  },
  {
    sentence: "She decorated the cake carefully.",
    answers: [
      "She/Pronoun",
      "decorated/Verb",
      "the/Determiner",
      "cake/Noun",
      "carefully/Adverb",
    ],
  },
  {
    sentence: "Mary wore a dress with polka dots.",
    answers: [
      "Mary/Noun",
      "wore/Verb",
      "a/Determiner",
      "dress/Noun",
      "with/Preposition",
      "polka/Noun",
      "dots/Noun",
    ],
  },
];

// Hindi examples and their corresponding correct answers
const hindiExamples = [
  {
    sentence: "लड़का स्कूल गया।",
    answers: ["लड़का/संज्ञा", "स्कूल/संज्ञा", "गया/क्रिया"],
  },
  {
    sentence: "बिल्ली चटाई पर बैठी।",
    answers: ["बिल्ली/संज्ञा", "चटाई/संज्ञा", "पर/संबंध", "बैठी/क्रिया"],
  },
  {
    sentence: "राम ने किताब पढ़ी।",
    answers: ["राम/संज्ञा", "ने/संबंध", "किताब/संज्ञा", "पढ़ी/क्रिया"],
  },
  {
    sentence: "गाय घास खा रही है।",
    answers: [
      "गाय/संज्ञा",
      "घास/संज्ञा",
      "खा/क्रिया",
      "रही/क्रिया",
      "है/क्रिया",
    ],
  },
  {
    sentence: "पक्षी आसमान में उड़ रहा है।",
    answers: [
      "पक्षी/संज्ञा",
      "आसमान/संज्ञा",
      "में/संबंध",
      "उड़/क्रिया",
      "रहा/क्रिया",
      "है/क्रिया",
    ],
  },
];

// POS options for English and Hindi
const englishPOSOptions = [
  "Determiner",
  "Noun",
  "Verb",
  "Adjective",
  "Adverb",
  "Preposition",
  "Pronoun",
];
const hindiPOSOptions = ["संज्ञा", "क्रिया", "विशेषण", "संबंध"];

function selectLang() {
  const langDropdown = document.getElementById("lang_opt");
  const selectedIndex = langDropdown.selectedIndex;
  const langId = langDropdown.options[selectedIndex].value;

  if (langId === "0") {
    alert("Please select a language.");
    return;
  }

  const language = parseInt(langId); // Convert the selected value to an integer
  loadSentenceSelection(language); // Call the function to load sentence options
}

// Load sentence options dynamically based on the selected language
function loadSentenceSelection(language) {
  const sentenceContainer = document.getElementById("sen_opt");
  sentenceContainer.innerHTML = ""; // Clear any previous content

  const examples = language === 1 ? englishExamples : hindiExamples;

  // Populate the sentence dropdown based on the selected language
  sentenceContainer.innerHTML = `
    <h3>${language === 1 ? "Select a Sentence" : "एक वाक्य चुनें"}</h3>
    <select id="sentenceDropdown">
      <option value="0" selected>---${
        language === 1 ? "Select Sentence" : "एक वाक्य चुनें"
      }---</option>
      ${examples
        .map(
          (example, index) =>
            `<option value="${index + 1}">${example.sentence}</option>`
        )
        .join("")}
    </select>
    <button onclick="loadSimulationInterface(${language})">Load Simulation</button>
  `;
}

// Load the simulation interface for the selected sentence
function loadSimulationInterface(language) {
  const sentenceDropdown = document.getElementById("sentenceDropdown");
  const selectedSentenceIndex = parseInt(sentenceDropdown.value); // Convert value to an integer

  if (selectedSentenceIndex === 0) {
    alert("Select a sentence");
    return;
  }

  const simulationContainer = document.getElementById("sen_opt");
  simulationContainer.innerHTML = ""; // Clear previous content

  const examples = language === 1 ? englishExamples : hindiExamples;
  const selectedExample = examples[selectedSentenceIndex - 1]; // Adjust index to match array

  // Set the global POS options and selected sentence
  globalPOSOptions = language === 1 ? englishPOSOptions : hindiPOSOptions;
  globalSelectedSentence = selectedExample.answers;

  let tableHTML = `
        <h3>${
          language === 1 ? "Select POS Tags" : "शब्दों के लिए सही POS टैग चुनें"
        }</h3>
        <table border="1" style="text-align:center;">
          <tr>
            <th>${language === 1 ? "Word" : "शब्द"}</th>
            <th>${language === 1 ? "POS Tag" : "POS टैग"}</th>
            <th>${language === 1 ? "Feedback" : "प्रतिक्रिया"}</th>
            <th>${language === 1 ? "Correct Answer" : "सही उत्तर"}</th>
          </tr>
      `;

  globalSelectedSentence.forEach((word, index) => {
    const [lexicon, correctTag] = word.split("/");
    tableHTML += `
          <tr>
            <td>${lexicon}</td>
            <td>
              <select id="token${index}">
                <option value="">---Select---</option>
                ${globalPOSOptions
                  .map(
                    (option) => `<option value="${option}">${option}</option>`
                  )
                  .join("")}
              </select>
            </td>
            <td id="correction${index}"></td>
            <td id="correct${index}"></td>
          </tr>
        `;
  });

  tableHTML += `
        </table>
        <button onclick="checkAnswer()">Submit</button>
        <div id="see_soln"></div>
      `;

  simulationContainer.innerHTML = tableHTML;
}

// Check the user's answers
function checkAnswer() {
  let isCorrect = true;

  globalSelectedSentence.forEach((word, index) => {
    const [_, correctTag] = word.split("/");
    const userAnswer = document.getElementById(`token${index}`).value;

    if (userAnswer === correctTag) {
      document.getElementById(
        `correction${index}`
      ).innerHTML = `<img src="./images/right.png" alt="Correct" style="height:25px;width:25px;">`;
    } else {
      isCorrect = false;
      document.getElementById(
        `correction${index}`
      ).innerHTML = `<img src="./images/wrong.png" alt="Wrong" style="height:25px;width:25px;">`;
    }
  });

  if (!isCorrect) {
    document.getElementById("see_soln").innerHTML = `
        <button onclick="correctTable()">Get Answer</button>
      `;
  } else {
    document.getElementById("see_soln").innerHTML = `
        <p style="color: green; text-align: center; font-size: 18px;">All answers are correct!</p>
      `;
  }
}

// Show the correct answers
function correctTable() {
  globalSelectedSentence.forEach((word, index) => {
    const [_, correctTag] = word.split("/");
    document.getElementById(`correct${index}`).innerHTML = correctTag;
  });

  document.getElementById("see_soln").innerHTML = `
      <button onclick="clearTable()">Hide Answer</button>
    `;
}

// Clear the correct answers
function clearTable() {
  globalSelectedSentence.forEach((_, index) => {
    document.getElementById(`correct${index}`).innerHTML = "";
  });

  document.getElementById("see_soln").innerHTML = `
      <button onclick="correctTable()">Get Answer</button>
    `;
}
