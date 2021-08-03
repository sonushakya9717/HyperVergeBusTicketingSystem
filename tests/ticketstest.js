const request = require("supertest");
const app = require("../server");
const { bookTickets } = require("../controllers/tickets");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const ticketsTests = () =>
  describe("Test suite for tickets.js file", () => {

    mockRequest = {
        body: {
          seats_no: ["1A", "3A"],
          passengers: [
            {
              name: "sonu",
              gender: "male",
              age: 17,
            },
            {
              name: "kartik",
              gender: "male",
              age: 22,
            },
          ],
          journeyDate: "1/7/2021",
          email: "sonu19@gmail.com",
          contactNo: 8433421817,
        },
        params: { busId: "60e29e6e4372bf3e1f81d181" },
        user: { id: "60e29e6e4372bf3e1f81d187" },
      };

      
    describe("Test suite for book tickets", () => {
      it("It should test the working of book tickets api", async () => {
        const res = await request(app)
          .post("/api/buses/60e29e6e4372bf3e1f81d181/tickets")
          .send({
            ...mockRequest.body,
          })
          .set(
            "x-auth-token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBlNjlkMjEwYWM3YjUzZDQwYWRjODJlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYyNTcyNjgzOSwiZXhwIjoxNjY1NzI2ODM5fQ.9YRTzK_bv4HDUogT4AuCl0AagBqOhXmqNQL7uvPLKbw"
          );
        expect(res.status).toBe(200);
      });

      it("It should not book the tickets, status should be 400", async () => {
        const res = mockResponse();

        let req = {
          ...mockRequest,
        };

        await bookTickets(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status).toHaveBeenCalled();
      });

      it("It should return status 400, as there is no such seats in the bus", async () => {
        const res = mockResponse();

        let req = {
          ...mockRequest,
        };

        req.body.seats_no = ["1A", "A"];

        await bookTickets(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status).toHaveBeenCalled();
      });

      it("It should return status 400, as there is no such bus found", async () => {
        const res = mockResponse();

        let req = {
          ...mockRequest,
        };

        req.params = { busId: "60e29e6e4372bf3e1f81d188" };
        req.body.seats_no = ["1A", "2A"];

        await bookTickets(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status).toHaveBeenCalled();
      });

      it("It should be called with status 400 as there is no body passed in reqest", async () => {
        const res = mockResponse();
        const req = {
          "express-validator#contexts": [{ message: "seats is required" }],
        };
        await bookTickets(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });

      it("It should return status 500, No bus id found", async () => {
        const res = mockResponse();

        let req = {
          ...mockRequest
        };
        req.params.busId = ""
        await bookTickets(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.status).toHaveBeenCalled();
      });
    });
  });

module.exports = { ticketsTests };
