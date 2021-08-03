const request = require('supertest');
const app = require('../server')
const { login } = require('../controllers/login')


const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res
    

}

const loginTests = () => describe("Test suite login,js file",()=>{
    console.log("1")
    it("It should test the working of signup api",async()=>{
        const res = await request(app)
        .post('/api/users/login')
        .send({
            email: "kartik19@navgurukul.org",
            password: "1212121212"
        });
            expect(res.statusCode).toBe(200);

    })


    it('it should test login function with status code 200',async()=>{
        let req = {
            body:{
                email:"sonu19@navgurukul.org",
                password:"111111111",
            }
        }
        const res = mockResponse()
    
        await login(req,res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalled()
    })


    it('test, if the user is not exits with code 400',async()=>{
        let req = {
            body:{
                email:"hello@navgurukul.org",
                password:"111111111",
            }
        }
        const res = mockResponse()
    
        await login(req,res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalled()
    })
})

module.exports = { loginTests }