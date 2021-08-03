const { addLocation } = require('../controllers/addLocation');
const request = require('supertest');
const app = require('../server');


const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res
}


const addLocationTests = () => describe("Test suite addlocation.js file",()=>{
    console.log(3)
    it("It should test the working of addLocation api",async()=>{
        const res = await request(app)
        .post('/api/admins/admin/location')
        .send({
            "city":"New Delhi",
            "state":"Delhi"
        })
        .set('x-auth-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBlNjlkMjEwYWM3YjUzZDQwYWRjODJlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYyNTcyNjgzOSwiZXhwIjoxNjY1NzI2ODM5fQ.9YRTzK_bv4HDUogT4AuCl0AagBqOhXmqNQL7uvPLKbw');
        expect(res.status).toBe(200);
    })

    it("It should add the loction with status 200",async()=>{
        let req = {
            body:{
                city:"Dharamshala",
                state:"Himachal Pradesh"
            }
        }
        const res = mockResponse()
        await addLocation(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled()
    })


    it("It should not add the loction as it is already exists, with status 400",async()=>{
        let req = {
            body:{
                city:"Dharamshala",
                state:"Himachal Pradesh"
            }
        }
        const res = mockResponse()
        await addLocation(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json.mock.calls[0][0]).toEqual({ errors: "Location Already Exists" })
    })
})

module.exports = {addLocationTests}