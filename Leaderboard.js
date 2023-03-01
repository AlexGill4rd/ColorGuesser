class Leaderboard {
  static leaderboard = document.createElement("div");
  static playersListElem = document.createElement("div");

  static highscore = 0;
  static username = "";

  static startTime;
  static endTime;

  constructor(game) {
    this.game = game;
    this.#init();
  }
  async #init() {
    if (!Leaderboard.leaderboard.classList.contains("leaderboard"))
      Leaderboard.leaderboard.classList.add("leaderboard");
    Leaderboard.leaderboard.appendChild(this.#getLoginForm());

    Leaderboard.update();

    document.body.appendChild(Leaderboard.leaderboard);
  }
  static getPlayerElement(player) {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("leaderboard-player");

    const playerName = document.createElement("h2");
    playerName.classList.add("leaderboard-player-name");
    playerName.innerHTML = player.username;
    playerName.id = player.username;

    const duration = document.createElement("h2");
    duration.classList.add("leaderboard-player-duration");
    duration.innerHTML = Leaderboard.msToTime(player.duration);

    const playerScore = document.createElement("p");
    playerScore.classList.add("leaderboard-player-score");
    playerScore.innerHTML = player.highscore;
    playerScore.id = player.username + "-score";

    playerDiv.appendChild(playerName);
    playerDiv.appendChild(duration);
    playerDiv.appendChild(playerScore);

    return playerDiv;
  }
  #getLoginForm() {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("leaderboard-login");

    let playerInput = document.createElement("input");
    playerInput.placeholder = "Jouw naam...";
    playerInput.type = "text";
    playerInput.id = "playername";

    const playerSubmit = document.createElement("input");
    playerSubmit.type = "button";
    playerSubmit.value = "Set";
    playerSubmit.addEventListener("click", () => {
      if (!this.hasSet) {
        this.hasSet = true;
        this.onUsernameSet(playerInput, playerSubmit, this.game);
      }
    });

    playerDiv.appendChild(playerInput);
    playerDiv.appendChild(playerSubmit);
    return playerDiv;
  }
  onUsernameSet(playerInput, playerSubmit, game) {
    if (playerInput.value.length > 15) {
      const popup = new Popup(
        "error",
        "Long name",
        "Doe ni raar en pak een kortere naam"
      );
      popup.show();
      return;
    }
    Leaderboard.username = playerInput.value;
    this.getHighscore(Leaderboard.username, function (highscore) {
      const loggedLabel = document.createElement("p");
      loggedLabel.innerHTML = "Ingelogd als: " + playerInput.value;
      loggedLabel.classList.add("leaderboard-label");

      playerInput.parentNode.insertBefore(loggedLabel, playerInput);

      playerInput.style.display = "none";
      playerSubmit.style.display = "none";

      Leaderboard.highscore = highscore;

      game.load();
    });
  }
  async getHighscore(username, callback) {
    Socket.get().emit("user:get", username, function (response) {
      callback(response.highscore);
    });
  }

  static update() {
    Socket.get().emit("leaderboard:get", function (players) {
      const playerListElement = document.createElement("div");
      playerListElement.classList.add("leaderboard-playerlist");

      for (const player of players) {
        const element = Leaderboard.getPlayerElement(player);
        playerListElement.appendChild(element);
      }
      Leaderboard.playersListElem.innerHTML = "";

      Leaderboard.playersListElem = playerListElement;
      Leaderboard.leaderboard.appendChild(playerListElement);
    });
  }
  show() {
    Leaderboard.leaderboard.style.display = "block";

    Socket.get().on("leaderboard:update", function () {
      console.log("updated");
      Leaderboard.update();
    });
  }
  hide() {
    Leaderboard.leaderboard.style.display = "none";
  }
  static msToTime(s) {
    let date = new Date(s);
    date.setHours(date.getHours() - 1);
    return date.format("HH:mm:ss");
  }
}
