const auth = require('../middlewares/auth')

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res
    

}

describe("Test suite for auth midleware",()=>{

    it('when token not found, shoud call with status 400',async()=>{
        
        let req = {}
        req.header = (input)=>{if(input==='x-auth-token') return ""}

        const res = mockResponse()
    
        await auth(req,res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalled()
    })

    it('when token is invalid, shoud call with status 401',async()=>{
        
        let req = {}
        req.header = (input)=>{if(input==='x-auth-token') return "BBBBBBBBBBBBBBBBBBB"}

        const res = mockResponse()
    
        await auth(req,res)
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalled()
    })


    it('when token is valid, shoud call with status 200',async()=>{
        const next = jest.fn()
        let req = {}
        req.header = (input)=>{if(input==='x-auth-token') return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBlNjlkMjEwYWM3YjUzZDQwYWRjODJlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTYyNTcyNjgzOSwiZXhwIjoxNjY1NzI2ODM5fQ.9YRTzK_bv4HDUogT4AuCl0AagBqOhXmqNQL7uvPLKbw"}
        req.user = (input)=>{ return req }

        const res = mockResponse()
    
        await auth(req,res,next)
        expect(next).toHaveBeenCalled()
    })

});