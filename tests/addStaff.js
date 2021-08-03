const request = require('supertest');
const app = require('../server');
const { addStaff } = require('../controllers/staffs')


const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res
}

const addStaffTests = () => describe("Test suite staff.js file, adding staffs",()=>{

    it("It should test the working of addStaff api",async()=>{
        const res = await request(app)
        .post('/api/admins/admin/addStaff')
        .send({
            "phone":1234567892,
            "name":"siddik",
            "address":"New Delhi, Delhi",
            "isDriver":false
        })
        .set('x-auth-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBlNjlkMjEwYWM3YjUzZDQwYWRjODJlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYyNTcyNjgzOSwiZXhwIjoxNjY1NzI2ODM5fQ.9YRTzK_bv4HDUogT4AuCl0AagBqOhXmqNQL7uvPLKbw');
        expect(res.status).toBe(200);
    });


    it("It should add the staff with status 200",async()=>{
        let req = {
            body:{
                phone:3234567895,
                name:"Raj",
                address:"Pink City, Jaypur",
                isDriver:true
            },
            user:{id:'60e29e6e4372bf3e1f81d187'}
        }
        const res = mockResponse()
        await addStaff(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled()
    });

    it("It should retrun status 400, as staff already exists",async()=>{
        let req = {
            body:{
                phone:3234567895,
                name:"siddik",
                address:"Pink City, Jaypur",
                isDriver:true
            },
            user:{id:'60e29e6e4372bf3e1f81d187'}
        }
        const res = mockResponse()
        await addStaff(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalled()
    });

    it("It should retrun status 404, as there is no agency exists",async()=>{
        let req = {
            body:{
                
            },
            user:{id:'60e29e6e4372bf3e1f81d188'}
        }
        const res = mockResponse()
        await addStaff(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalled()
    });


    it("It should be called with status 400 as there is no body passed in reqest",async()=>{
        const res = mockResponse()
        const req={"express-validator#contexts": [{message:"Name is required"}]}

        await addStaff(req,res)

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status).toHaveBeenCalled()
    });

    it("It should return server error with status 500",async()=>{
        const res = mockResponse()
        const req={body:{
            },
        user:{id:''}}

        await addStaff(req,res)

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalled();
    });
})

module.exports = { addStaffTests }