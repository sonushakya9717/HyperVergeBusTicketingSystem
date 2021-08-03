const isAdmin = require('../middlewares/isAdmin')


describe("Test suite for isAdmin midleware",()=>{

    it('when user is admin, shoud call next function',async()=>{
        
        let req = {
            user:{isAdmin:true}
        }

        let res;
        const next = jest.fn()
    
        await isAdmin(req,res,next)
        expect(next).toHaveBeenCalled()
    })


    it('when user is not a admin, shoud call next function with error',async()=>{
        
        let req = {
            user:{isAdmin:false}
        }

        let res;
        const next = jest.fn()
    
        await isAdmin(req,res,next)
        expect(next.mock.calls[0][0]).toEqual({status:401,msg:'No token, authorization failed'})
    })

});