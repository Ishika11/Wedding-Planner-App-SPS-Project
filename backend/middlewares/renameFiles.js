const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

module.exports = (req, res, next) => {
  req.files = req.files.map((file) => {
    const newName = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    return { ...file, originalname: newName + "-" + Date.now() + "." + ext };
  });
  next();
};
