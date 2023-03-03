let contextMenuOpen = false;
let game = new Game();

document.body.addEventListener("contextmenu", (e) => {
  if (Leaderboard.username !== "") {
    if (!contextMenuOpen) {
      const xCoordinate = e.pageX;
      const yCoordinate = e.pageY;

      const contextMenu = document.createElement("div");
      contextMenu.classList.add("context-menu");
      contextMenu.style.left = xCoordinate + "px";
      contextMenu.style.top = yCoordinate + "px";

      const contextHeader = document.createElement("p");
      contextHeader.innerHTML = "Options";
      contextMenu.appendChild(contextHeader);

      //Restart button
      const restart = document.createElement("button");
      restart.innerHTML =
        '<i class="fa-solid fa-rotate-left"></i> Restart game';
      restart.addEventListener("click", () => {
        game.spel.Spelboard.restart();
      });
      contextMenu.appendChild(restart);

      //Change color button
      const changeColor = document.createElement("button");
      changeColor.innerHTML = '<i class="fa-solid fa-dice"></i> Verander Kleur';
      changeColor.addEventListener("click", () => {
        game.spel.Spelboard.changeColor();
      });
      contextMenu.appendChild(changeColor);

      const accountTab = document.createElement("p");
      accountTab.innerHTML = "Account";
      contextMenu.appendChild(accountTab);

      //Logout button
      const logout = document.createElement("button");
      logout.innerHTML =
        '<i class="fa-solid fa-right-from-bracket"></i> Log out';
      logout.addEventListener("click", () => {
        window.location.reload();
      });
      contextMenu.appendChild(logout);

      document.body.appendChild(contextMenu);
      contextMenuOpen = true;
    } else closeContectMenu();
  }
  // e.preventDefault();
});
document.addEventListener("click", (e) => {
  if (contextMenuOpen) closeContectMenu();
  e.preventDefault();
});
function closeContectMenu() {
  const previousMenu = document.querySelector(".context-menu");
  previousMenu.remove();
  contextMenuOpen = false;
}
