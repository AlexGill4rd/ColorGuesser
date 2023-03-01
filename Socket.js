class Socket {
  static socket = io("https://colourfinder.onrender.com:10000");
  static get() {
    return Socket.socket;
  }
}
