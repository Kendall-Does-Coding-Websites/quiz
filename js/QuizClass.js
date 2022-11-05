export class Quiz {
  constructor(dataQA = []) {
    this.dataQA = dataQA;
    // initial game values
    this.score = 0;
    this.answer = 0;
    this.QUESTION_VALUE = 100;
    this.barPercetage = 0;
    this.canClick = true;
    this.arrLen = dataQA.length;
    // runs here becasue we want to load the first round of questions
    this._renderNewQuestion();
  }

  // if there's questions left, return the last one
  _newQuestion() {
    if (this.getQuestionsLen === 0) this._endGame();
    return this.dataQA.pop();
  }

  // todo: takes care of managing teh percentage green bar on top
  // _renderPercentage() {this.arrLen}

  // get's a new question from newQuestion & renders it to the page
  _renderNewQuestion() {
    const currentQA = this._newQuestion();
    if (!currentQA) {
      this._endGame();
      return;
    }

    const pArray = document.querySelectorAll(".choice-text");
    // update the value of the corrent answer "data-number"
    this.answer = currentQA["answer"];

    //? render question && render all options
    document.getElementById("question").textContent = currentQA["question"];

    pArray.forEach((p, i) => {
      p.textContent = currentQA[`choice${i + 1}`];
    });
  }

  // sends the user to the highscore.html and asks if they want to save their score
  _endGame() {
    console.log("GAME ENDED");
    window.localStorage.setItem("mostRecentScore", this.score);
    window.location.assign("/pages/end.html");
  }

  checkAnswer(selected = 0, correct = 0) {
    const p = document.querySelector(`[data-number="${selected}"]`);

    if (!this.canClick) {
      console.log("WAIT THERE BOI");
      return;
    }

    if (selected === correct) {
      p.parentElement.classList.add("correct");
      this.score += this.QUESTION_VALUE;
      console.log("NOICE: ", this.score);
    } else {
      p.parentElement.classList.add("incorrect");
      this.score -= this.QUESTION_VALUE;
      console.log("BAKA GA!: ", this.score);
    }

    // render updated score
    document.getElementById("score").textContent = this.score;

    // delay stuff
    this.canClick = false;

    setTimeout(() => {
      this._renderNewQuestion();
      this.canClick = true;
      p.parentElement.classList.remove("incorrect");
      p.parentElement.classList.remove("correct");
    }, 600);
  }
}
