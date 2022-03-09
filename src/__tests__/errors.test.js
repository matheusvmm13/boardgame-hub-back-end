const { notFoundError, generalError } = require("../server/middlewares/errors");

describe("Given a not found error", () => {
  describe("When it receives a response", () => {
    test("Then it should call response status 404 and json method", () => {
      const mockResponse = () => {
        const res = {};

        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      const mockedResponse = mockResponse();
      notFoundError(null, mockedResponse);

      expect(mockedResponse.json).toHaveBeenCalled();
      expect(mockedResponse.status).toHaveBeenCalledWith(404);
    });
  });
});

describe("Given a general error", () => {
  describe("When it receives a response", () => {
    test("Then it shoul call response status 500 and json method", () => {
      const mockResponse = () => {
        const res = {};

        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      const err = {
        message: "General error",
        code: 500,
      };

      const errorMessage = "General error";
      const expectedError = { error: true, message: errorMessage };

      const mockedResponse = mockResponse();
      generalError(err, null, mockedResponse, null);

      expect(mockedResponse.json).toHaveBeenCalledWith(expectedError);
      expect(mockedResponse.status).toHaveBeenCalledWith(err.code);
    });
  });
});
