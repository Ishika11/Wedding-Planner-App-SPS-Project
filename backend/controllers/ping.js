exports.sendPing = (req, res) => {
  res.status(200).json({
      message: "Pong"
  });
}
