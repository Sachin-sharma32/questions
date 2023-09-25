class AppError extends Error{
  constructor(message, statusCode){
    console.log("app error")
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.operational = true;
  }
}

module.exports = AppError;