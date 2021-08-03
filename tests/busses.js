const request = require("supertest");
const app = require("../server");
const Bus = require("../models/Buses");
const Agency = require("../models/Agency");
const Staffs = require("../models/Staffs");
const { addBus, searchBuses, getBus } = require("../controllers/Buses");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = {
  body: {
    busName: "Volvo",
    vehicleNo: "DL 2C 0986",
    seats: 12,
    driver: 3234567895,
    helper: 1234567892,
    policy:
      "Change your travel date for free up to 8 hours before the departure",
    images: ["www.google.com"],
    fare: 500,
    schedule: [0, 1, 2, 3, 4, 5],
    from: {
      city: "New Delhi",
      state: "Delhi",
    },
    to: {
      city: "Dharamshala",
      state: "Himachal Pradesh",
    },
    arrivalTime: "11 PM",
    departureTime: "5 AM",
  },
  user: { id: "60e29e6e4372bf3e1f81d187" },
};

const bussesTests = () =>
  describe("Test suite Buses.js file", () => {
    describe("Test suite for create a new bus or update the bus", () => {
      const mockRequest = {
        body: {
          id: "60e29e6e4372bf3e1f81d181",
          busName: "Volvo",
          vehicleNo: "DL 2C 0986",
          seats: 12,
          driver: 3234567895,
          helper: 1234567892,
          policy:
            "Change your travel date for free up to 8 hours before the departure",
          images: ["www.google.com"],
          fare: 500,
          schedule: [0, 1, 2, 3, 4, 5],
          from: {
            city: "New Delhi",
            state: "Delhi",
          },
          to: {
            city: "Dharamshala",
            state: "Himachal Pradesh",
          },
          arrivalTime: "11 PM",
          departureTime: "5 AM",
        },
        user: { id: "60e29e6e4372bf3e1f81d187" },
      };

      it("It should test the working of add bus api", async () => {
        const res = await request(app)
          .post("/api/admins/admin/addBus")
          .send({
            ...mockRequest.body,
          })
          .set(
            "x-auth-token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBlNjlkMjEwYWM3YjUzZDQwYWRjODJlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYyNTcyNjgzOSwiZXhwIjoxNjY1NzI2ODM5fQ.9YRTzK_bv4HDUogT4AuCl0AagBqOhXmqNQL7uvPLKbw"
          );
        expect(res.status).toBe(200);
      });

      it("It should update the existing bus, called with 200 status", async () => {
        const res = mockResponse();

        let req = { ...mockRequest };

        await addBus(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.status).toHaveBeenCalled();
      });

      it("It should be called with status 400 as there is no body passed in reqest", async () => {
        const res = mockResponse();
        const req = {
          "express-validator#contexts": [{ message: "Name is required" }],
        };

        await addBus(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status).toHaveBeenCalled();
      });

      it("It should retrun status 400, as there is no agency exists", async () => {
        let req = {
          body: {},
          user: { id: "60e29e6e4372bf3e1f81d188" },
        };
        const res = mockResponse();
        await addBus(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });

      it("It should retrun status 400, as there is no such staff exists", async () => {
        let req = {
          ...mockRequest,
        };
        req.body.driver = 1234567896;
        const res = mockResponse();
        await addBus(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });

      it("It should retrun status 400, as there is no such driver exists", async () => {
        let req = {
          ...mockRequest,
        };

        req.body.driver = 1234567892;
        const res = mockResponse();
        await addBus(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });

      it("It should retrun status 400, as there is no such helper exists", async () => {
        let req = {
          ...mockRequest,
        };

        req.body.driver = 3234567895;
        req.body.helper = 3234567895;
        const res = mockResponse();
        await addBus(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });
      it("It should return server error with status 500", async () => {
        const res = mockResponse();

        let req = { ...mockRequest };
        req.user.id = "";

        await addBus(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.status).toHaveBeenCalled();
      });
    });

    describe("Test suite for search buses with some specific fields", () => {
      const mockRequest = {
        body: {
          source: {
            city: "New Delhi",
            state: "Delhi",
          },
          destination: {
            city: "Dharamshala",
            state: "Himachal Pradesh",
          },
          date: 5,
        },
      };

      it("It should test the working of search buses api", async () => {
        const res = await request(app)
          .post("/api/buses")
          .send({
            ...mockRequest.body,
          })
          .set(
            "x-auth-token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBlNjlkMjEwYWM3YjUzZDQwYWRjODJlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYyNTcyNjgzOSwiZXhwIjoxNjY1NzI2ODM5fQ.9YRTzK_bv4HDUogT4AuCl0AagBqOhXmqNQL7uvPLKbw"
          );
        expect(res.status).toBe(200);
      });

      it("It should search the buses with status 200", async () => {
        const res = mockResponse();
        const req = { ...mockRequest };
        await searchBuses(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });

      it("It should return status 400, as no buses found on particular location", async () => {
        const res = mockResponse();
        const req = { ...mockRequest };
        req.body.source = {
          city: "Pink City",
          state: "Rajasthan",
        };
        await searchBuses(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });

      it("It should return status 400, as no buses found for particular date", async () => {
        const res = mockResponse();
        const req = { ...mockRequest };
        req.body.date = 7;
        await searchBuses(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });

      it("It should be called with status 400 as there is no body passed in reqest", async () => {
        const res = mockResponse();
        const req = {
          "express-validator#contexts": [{ message: "Name is required" }],
        };
        await searchBuses(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });
    });

    describe("Test suite for search bus by busId", () => {
      it("It should test the working of api of search bus by busId", async () => {
        const res = await request(app)
          .get("/api/buses/60e29e6e4372bf3e1f81d181")
          .set(
            "x-auth-token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBlNjlkMjEwYWM3YjUzZDQwYWRjODJlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYyNTcyNjgzOSwiZXhwIjoxNjY1NzI2ODM5fQ.9YRTzK_bv4HDUogT4AuCl0AagBqOhXmqNQL7uvPLKbw"
          );
        expect(res.status).toBe(200);
      });

      it("It should test the working of getBus functions, status should be 200", async () => {
        const res = mockResponse();
        const req = { params: { busId: "60e29e6e4372bf3e1f81d181" } };
        await getBus(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
      });

      it("Status should be 400, as there is no bus on this busId", async () => {
        const res = mockResponse();
        const req = { params: { busId: "60e29e6e4372bf3e1f81d182" } };
        await getBus(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });


      it("Status should be 500, as busId is invalid", async () => {
        const res = mockResponse();
        const req = { params: { busId: "60e29e6" } };
        await getBus(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalled();
      });
    });
  });

module.exports = { bussesTests };
