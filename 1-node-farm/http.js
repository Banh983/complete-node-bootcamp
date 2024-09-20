const http = require("http"); // dùng để kết nối mạng
const url = require("url");
// Tạo server HTTP
// http.createServer((req, res) => {
//   res.end("Hello from the server!"); // gửi response (phản hồi) cho khách hàng
// });

// Lưu kết quả server HTTP vào biến
const server = http.createServer((req, res) => {
  //   console.log(req); // in ra request trong terminal
  console.log(req.url); // liệt kê các / của trang web. VD: http://127.0.0.1:8000/product sẽ hiện ra /product
  res.end("Hello from the server!"); // gửi response (phản hồi) cho khách hàng
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000"); // in ra thông tin khi server đang hoạt động
});

// Sau đó nhập 127.0.0.1:8000 vào google sẽ hiện ra dòng Hello from the server
