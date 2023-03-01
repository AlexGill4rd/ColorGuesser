class Socket {
  static socket = io("https://colourfinder.onrender.com");
  static get() {
    return Socket.socket;
  }
}
