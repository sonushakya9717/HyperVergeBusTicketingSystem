const request = require('supertest');
const app = require('../server');

const { getAgency, createAgency,deleteAgency } = require('../controllers/admins');



const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res
}

const adminjsTests = () => describe("Test suite admin.js file",()=>{
    console.log(4)

    describe("Test suite for createAgency",()=>{
        it("It should test the working of create agency api",async()=>{
            const res = await request(app)
            .post('/api/admins/admin/addAgency')
            .send({
                "phone":8433421517,
                "agencyName":"Himalaya travels",
                "headOfficeLocation":"Delhi"
                })
            .set('x-auth-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBlNjlkMjEwYWM3YjUzZDQwYWRjODJlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYyNTcyNjgzOSwiZXhwIjoxNjY1NzI2ODM5fQ.9YRTzK_bv4HDUogT4AuCl0AagBqOhXmqNQL7uvPLKbw');
            expect(res.status).toBe(200);
        });

        it("It should create angency with status 200",async()=>{
            const res = mockResponse()
            const req={body:{
                "phone":9999999999,
                "agencyName":"Laxmi travels",
                "headOfficeLocation":"Delhi"
                },
            user:{id:'60e29e6e4372bf3e1f81d187'}}

            await createAgency(req,res)

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it("It should update the agency with status 200",async()=>{
            const res = mockResponse()
            const req={body:{
                "phone":1111111111,
                "agencyName":"Laxmi holidays travels",
                "headOfficeLocation":"Delhi"
                },
            user:{id:'60e29e6e4372bf3e1f81d187'}}

            await createAgency(req,res)

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
        });


        it("It should return server error with status 500",async()=>{
            const res = mockResponse()
            const req={body:{
                "phone":9999999999,
                "agencyName":"",
                "headOfficeLocation":""
                },
            user:{id:''}}

            await createAgency(req,res)

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalled();
        });

        it("It should be called with status 400 as there is no body passed in reqest",async()=>{
            const res = mockResponse()
            const req={"express-validator#contexts": [{message:"Name is required"}]}

            await createAgency(req,res)

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status).toHaveBeenCalled()
        });
    })


    describe("Test suite for getAgency",()=>{
        it("It should test the working of get agency api",async()=>{
            const res = await request(app)
            .get('/api/admins/admin/agency')
            .set('x-auth-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBlNjlkMjEwYWM3YjUzZDQwYWRjODJlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYyNTcyNjgzOSwiZXhwIjoxNjY1NzI2ODM5fQ.9YRTzK_bv4HDUogT4AuCl0AagBqOhXmqNQL7uvPLKbw');
            expect(res.status).toBe(200);
        })

        it("It should get the agency and return status 200",async()=>{
            const res = mockResponse()
            const req={
            user:{id:'60e29e6e4372bf3e1f81d187'}}

            await getAgency(req,res)

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
        });

        it("Find the agency which doen't exists and return status 400",async()=>{
            const res = mockResponse()
            const req={
            user:{id:'60e29e6e4372bf3e1f81d188'}}

            await getAgency(req,res)

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled();
        });

        it("It should return server error with status 500",async()=>{
            const res = mockResponse()
            const req={
            user:{id:''}}

            await getAgency(req,res)

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalled();
        });


    })
});



const deleteAgencyTests = () =>describe("Test suite for deleteAgency",()=>{
        it("It should delete Agency and respond with 200 status",async()=>{
            const res = await request(app)
            .delete('/api/admins/admin/agency')
            .set('x-auth-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBlNjlkMjEwYWM3YjUzZDQwYWRjODJlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYyNTcyNjgzOSwiZXhwIjoxNjY1NzI2ODM5fQ.9YRTzK_bv4HDUogT4AuCl0AagBqOhXmqNQL7uvPLKbw');
            expect(res.status).toBe(200);
        });


        it("delete the agency which doen't exists and return status 400",async()=>{
            const res = mockResponse()
            const req={
            user:{id:'60e29e6e4372bf3e1f81d188'}}

            await deleteAgency(req,res)

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled();
        });


        it("It should return server error with status 500",async()=>{
            const res = mockResponse()
            const req={user:{id:''}}

            await deleteAgency(req,res)

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalled();
        });

    })


module.exports = { adminjsTests,deleteAgencyTests }
