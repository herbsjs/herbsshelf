const assert = require("assert")
const { usecase, Ok, step } = require('@herbsjs/buchu')
const renderShelfHTML = require('../src/shelf')

describe("Generate usecase self-documentation", () => {

  describe('the simplest use case', () => {

    var usecases = []
    const givenTheSimplestUseCase = () => {
      const uc = usecase('A use case', {
        'A step': step(() => { return Ok() }),
        'A second step': step({
          'step 1': step(() => { return Ok() }),
          'step 2': step(() => { return Ok() }),
        })
      })
      return uc
    }

    it('should generate some doc', () => {
      //given
      usecases.push({ usecase: givenTheSimplestUseCase(), tags: { group: 'SimplestestUseCase' } },)
      var shelf = renderShelfHTML(usecases)
      //then
      assert.ok(shelf)
    })

    it('should validate if documentation generated is a valid HTML document', () => {
      //given
      var shelf = renderShelfHTML(usecases)
      //then
      assert.strictEqual(/<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(shelf), true)

    })

    before(function () {
      env = process.env
      process.env = { HERBS_SHELF_RENDER : "false" }
    })
  
    it('should validate if unauthorized message is generated when env.HERBS_SHELF_RENDER is false', () => {
      //given

      var shelf = renderShelfHTML(usecases)
      //then
      assert.strictEqual(/unauthorized : true/g.test(shelf), true)

    })

    after(function () {
      process.env = env
    })
  
  })

  describe('the simplest use case with complex request and response', () => {

    var usecases = []
    const givenTheSimplestUseCaseWithRequestResponse = () => {
      const uc = usecase('A use case', {
        request: {
          param1: String,
          param2: Number
        },
        response: {
          output1: String
        },
        'A step': step((ctx) => {
          ctx.ret.response3 = ctx.req.param2 + 1
          return Ok()
        })
      })
      return uc
    }

    it('should generate some doc', () => {
      //given
      usecases.push({ usecase: givenTheSimplestUseCaseWithRequestResponse(), tags: { group: 'SimplestestUseCaseWithRequestResponse' } },)
      var shelf = renderShelfHTML(usecases)
      //then
      assert.ok(shelf)
    })

    it('should validate if documentation generated is a valid HTML document', () => {
      //given
      var shelf = renderShelfHTML(usecases)
      //then
      assert.strictEqual(/<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(shelf), true)

    })



  })

  describe('the simplest use case with request and response without name declaration', () => {

    var usecases = []
    const givenTheSimplestUseCaseWithRequestResponse = () => {
      const uc = usecase('A use case', {
        request: String,
        response: String
        ,
        'A step': step((ctx) => {
          ctx.ret.response3 = ctx.req.param2 + 1
          return Ok()
        })
      })
      return uc
    }

    it('should generate some doc', () => {
      //given
      usecases.push({ usecase: givenTheSimplestUseCaseWithRequestResponse(), tags: { group: 'SimplestestUseCaseWithRequestResponse' } },)
      var shelf = renderShelfHTML(usecases)
      //then
      assert.ok(shelf)
    })

    it('should validate if documentation generated is a valid HTML document', () => {
      //given
      var shelf = renderShelfHTML(usecases)
      //then
      assert.strictEqual(/<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(shelf), true)

    })

  })
})

