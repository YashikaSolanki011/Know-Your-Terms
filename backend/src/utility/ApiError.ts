class ApiError extends Error {
    statusCode: number;
    data: any;
    success: boolean;
    errors: string | string[] = "";

    constructor(statusCode: number, message = "Something went wrong", errors: string | string[] = "") {
      super(message);
      this.statusCode = statusCode;
      this.data=null;
      this.success = false;
      this.errors = errors;
    }
  
    toJSON() {
      return {
        statusCode: this.statusCode,
        success: this.success,
        data: this.data,
        message: this.message,
        errors: this.errors,
      };
    }
  }
  
  export { ApiError };
  