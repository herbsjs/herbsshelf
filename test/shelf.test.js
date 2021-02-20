const assert = require("assert")
const { usecase, Ok, step } = require('buchu')
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



  })
})

