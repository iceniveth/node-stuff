import express from "express";
import multer from "multer";
import { customAlphabet } from "nanoid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const nanoid = customAlphabet("1234567890", 8);
    const uniqueSuffix = nanoid();
    cb(null, file.fieldname + "." + uniqueSuffix);
  },
});

// const upload = multer({ storage });
const upload = multer({ dest: "uploads" });

const uploadsRouter = express.Router();

uploadsRouter.post("/uploads", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({
      error: "No file uploaded",
    });
  }

  console.log(req.file);

  // The uploaded file is available as req.file
  res.status(200).send();
});

export default uploadsRouter;
