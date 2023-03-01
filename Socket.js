class Socket {
  static socket = io("https://colourfinder.onrender.com");
  //static socket = io("localhost:3030");
  static get() {
    return Socket.socket;
  }
}
