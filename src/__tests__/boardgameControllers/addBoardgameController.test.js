const User = require("../../database/models/User");
const addBoardgame = require("../../server/controllers/boardgameController/addBoardgameController");

describe("Given a all-boardgames/add/id/id endpoint", () => {
  describe("When it receives a PATCH bad request", () => {
    test("Then it should invoke next", async () => {
      const req = {
        params: {
          gameId: null,
          idUser: null,
        },
      };

      const res = null;

      const next = jest.fn();

      const mockUser = {
        // las cosas del user
        save: () => {},
      };
      User.findById = jest.fn().mockResolvedValue(mockUser);

      await addBoardgame(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
