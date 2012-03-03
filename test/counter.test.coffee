MiniSlot = require('../libs/mini-slot')

should   = require('should')
jsdom    = require('jsdom').jsdom
fs       = require('fs')
doc      = jsdom fs.readFileSync(__dirname + '/fixture.html', 'utf-8')
_        = GLOBAL._ = require('underscore')


describe "MiniSlot", ->

  beforeEach ->
    @target = doc.getElementById('target-01')
    @miniSlot = new MiniSlot(@target)

  it "should append template", ->
    
    @miniSlot.el.should.equal(@target)
    @miniSlot.getDigits(@target.getAttribute('data-target')).should.include(2, 0)
    @miniSlot.createDOMString().should.include '<div class="digit-sequence">0<br/>1<br/>2</div>', '<div class="digit-sequence">0</div>'



  it "should create style", ->
    should.exist(@miniSlot.el.ownerDocument.getElementById('mini-slot-style'))
