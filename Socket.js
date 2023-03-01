class Socket {
  static socket = io("localhost:3030");
  static get() {
    return Socket.socket;
  }
}
