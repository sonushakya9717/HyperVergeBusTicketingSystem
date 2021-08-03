const { demo } = require('../controllers/demo')

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res
    

}


describe("Test this demo file ",()=>{

    it('hello world',async()=>{
        console.log(2)
            let req = {
                body:{
                    message:"hello world"
                }
            }

            const res = mockResponse()

            await demo(req,res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ msg: 'Jay shree Ram' });

        })
})