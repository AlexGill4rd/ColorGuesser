let contextMenuOpen = false;
let game = new Game();

document.body.addEventListener("contextmenu", (e) => {
  if (!contextMenuOpen) {
    const xCoordinate = e.pageX;
    const yCoordinate = e.pageY;
    const contextMenu = document.createElement("div");
    contextMenu.classList.add("context-menu");
    contextMenu.style.left = xCoordinate + "px";
    contextMenu.style.top = yCoordinate + "px";

    const logout = document.createElement("button");
    logout.innerHTML = "Log out";
    logout.addEventListener("click", () => {
      //logout
    });
    contextMenu.appendChild(logout);

    document.body.appendChild(contextMenu);
    contextMenuOpen = true;
  } else closeContectMenu();
  e.preventDefault();
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
