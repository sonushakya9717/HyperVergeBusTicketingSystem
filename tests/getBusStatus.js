const request = require("supertest");
const app = require("../server");
const { getBusStatus } = require("../controllers/Buses");
const Bus = require("../models/Buses");

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };


  const getBusStatusTests = () =>describe("Test suite get bus status by busId, Buses.js file", () => {

    it("It should test the working of api of get bus status by busId", async () => {
        const res = await request(app)
          .get("/api/buses/60e29e6e4372bf3e1f81d181/status")
          .set(
            "x-auth-token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBlNjlkMjEwYWM3YjUzZDQwYWRjODJlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYyNTcyNjgzOSwiZXhwIjoxNjY1NzI2ODM5fQ.9YRTzK_bv4HDUogT4AuCl0AagBqOhXmqNQL7uvPLKbw"
          );
        expect(res.status).toBe(200);
      });

      it("It should test the working of getBusStatus functions, 200 should be in response", async () => {
        const res = mockResponse();
        const req = { params: { busId: "60e29e6e4372bf3e1f81d181" } };
        await getBusStatus(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });

      it("Response should be 400, as there is no bus on this busId", async () => {
        const res = mockResponse();
        const req = { params: { busId: "60e29e6e4372bf3e1f81d182" } };
        await getBusStatus(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });


      it("Status should be 500, as busId is invalid", async () => {
        const res = mockResponse();
        const req = { params: { busId: "60e29e6" } };
        await getBusStatus(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalled();
      });
  });

  module.exports = { getBusStatusTests }