import fs from "fs";
import path from "path";
export function deleteFile(filePath, fileName) {
  const fullPath = path.join(filePath, fileName);

  fs.stat(fullPath, (err, stats) => {
    console.log(fullPath);
    if (err) {
      if (err.code === "ENOENT") {
        console.log("File does not exist");
      } else {
        console.error("Error checking file existence:", err);
      }
      return;
    }

    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return;
      }

      console.log("File deleted successfully");
    });
  });
}
