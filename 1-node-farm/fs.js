const hello = "Hello world";
console.log(hello);

const { error } = require("console");
// Blocking, synchronous way

// fs là module dùng để đọc và ghi dữ liệu
const fs = require("fs");

// đọc file đồng bộ readFileSync(đường dẫn vào file, kí tự được mã hóa)
const textIn = fs.readFileSync("./starter/txt/input.txt", "utf-8");
console.log(textIn); // in ra biến textIn
console.log("----------End of textIn----------");

// thêm chuỗi cho file đã đọc
const textOut = `This is what we knwo about the avocado: ${textIn}\nCreate on ${Date.now()}`;
console.log(textOut);
console.log("----------End of textOut----------");

// ghi nội dung vào 1 file (file đó có thể chưa được tạo)
// writeFileSync(đường dẫn vào file, nội dung cần thêm vào file đó)
fs.writeFileSync("./starter/txt/output.txt", textOut); // ghi nội dung của biến textOut vào flie output.txt
console.log("File written!");
console.log("----------End of synchronous way----------");

// Non-blocking, asynchronous way (hàm bất đồng bộ)

// readFile(đường dẫn file, mã hóa, tham số (lỗi, dữ liệu))
// tham số dữ liệu luôn đặt trước
// readFile là hàm bất đồng bộ nên nó sẽ thực hiện các câu lệnh trong hàm đó sau khi các tác vụ khác được thực hiện

// ví dụ 1 về hàm bất đồng bộ

fs.readFile("./starter/txt/start.txt", "utf-8", (err, data) => {
  console.log(data); // read-this
  console.log("----------END OF EXAMPLE 1----------");
});
console.log("Will read file!"); //dòng này  được thực hiện trước read-this vì readFile là hàm bất đồng bộ

// ----------END OF EXAMPLE 1----------

// ví dụ 2 về hàm bất đồng bộ
// data1 = read-this => ./starter/txt/$(data1).txt = ./starter/txt/read-this.txt
fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2); // read-this
    console.log("----------END OF EXAMPLE 2----------");
  });
});

console.log("Will read file!"); //dòng này sẽ được thực hiện trước read-this vì readFile là hàm bất đ��ng bộ
// ----------END OF EXAMPLE 2----------

// ví dụ 3 về hàm bất đồng bộ
fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
  if (err) {
    return console.log("ERROR! HERE");
  }
  fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./starter/txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile(
        "./starter/txt/final.txt", // file cần ghi
        `${data2}\n${data3}`, // dữ liệu cần ghi
        "utf-8", // mã hóa
        (error) => {
          console.log("Your file has been written ");
        }
      );
    });
  });
});
console.log("Will read file");

// ----------END OF EXAMPLE 3----------
