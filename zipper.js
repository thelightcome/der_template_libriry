const zipper = require("zip-local");
const path = require("path");

zipper.zip("./dist", function (error, zipped) {
  if (!error) {
    zipped.compress();
    zipped.memory();
    const p = path.parse(__dirname);
    zipped.save("./" + p.name + ".zip", function (error) {
      if (!error) {
        console.log("saved successfully !");
      }
    });
  }
});