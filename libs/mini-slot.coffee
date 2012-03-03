class MiniSlot
  
  _br       = "<br/>"
  
  _default  =
    duration : 300
    dataVar  : "shift"
    easing   : "cubic-bezier(0.860, 0.000, 0.070, 1.000)"

  constructor: (@el, @duration = 500)->
    # Store `document` as it might be running on test
    @doc          = @el.ownerDocument
    @fontSize     = window?.getComputedStyle(@el, '').getPropertyValue("font-size") or '16px'
    @appendStyle()
    

  # ### getDigits
  # Returns an array of digits
  # Ex
  #   20 -> [2, 0]
  
  getDigits: ( val )->
    ( parseInt( val.charAt(i),10 ) for i in [0...val.length] )

  
  # ### createDOMString
  # Retunrs array of DOM string of digit sequence.
  #
  # `data-shift` attribute will be used for offset value used on `setTargetValue`
  
  createDOMString: ->
  
    targetVal     = @el.getAttribute('data-target')
    targetDigits  = @getDigits(targetVal)

    _str          = []
    

    for digit in targetDigits
      _str.push """
          <div class="digit-sequence" data-shift="#{100 * digit / ( digit + 1 )}">
            #{[0..digit].join(_br)}
          </div>"""
          .replace(/\n|\s{2,}/gi, '')
    _str
 
  
  # ### appendSequence
  # Appends the DOM string of sequence.

  appendSequence: ->
    @el.innerHTML = @createDOMString().join('\n')

  
  # ### setTargetValue
  # It will offset the sequence to display targeted value.
  # and it will be fired for each digit  with `delay` interval
  
  setTargetValue: (delay = 100)->
    sequences = @el.querySelectorAll('.digit-sequence')
    for sequence, i in sequences.reverse()
      
      ((sequence, delay)->
        setTimeout ->
          shiftVal = sequence.getAttribute('data-shift')
          sequence.style.webkitTransform = "translate3d(0, -#{shiftVal}%, 0)"
          sequence.style.mozTransform = "translate(0, -#{shiftVal}%)"
        , delay
      )(sequence, i * delay)
    return


  # ### unsetTargetValue
  # Opposite of `setTargetValue`, it reverts to 0
 
  unsetTargetValue: ->
    sequences = @el.querySelectorAll('.digit-sequence')
    for sequence in sequences
      shiftVal = sequence.getAttribute('data-shift')
      sequence.style.webkitTransform = "translate3d(0, 0%, 0)"
      sequence.style.mozTransform = "translate(0, 0%)"
    return
    
  
  # ### appendStyle
  # It will append basic stylesheet to head,
  # in addition to setting specific style attributes to `@el`
  
  appendStyle: ->

    @el.style.height   = @fontSize
    @el.style.overflow = 'hidden'
    @el.style.display  = "inline-block"

    return if document.getElementById('mini-slot-style')?
    css = @doc.createElement('style')
    css.id = 'mini-slot-style'
    styles = """
      .digit-sequence{
        display: inline-block;
        overflow: hidden;
        float: left;
        -webkit-transition: -webkit-transform #{@duration}ms;
        -moz-transition: #{@duration}ms;
        transition: #{@duration}ms;
      }
    """

    if css.styleSheet
      css.styleSheet.cssText = styles
    else
      css.appendChild(@doc.createTextNode(styles))

    @doc.getElementsByTagName("head")[0].appendChild(css)

# If this is on node
if exports?
  exports = module.exports = MiniSlot

# If this is for require.js
else if typeof require is "function" and define?.amd?
  define -> MiniSlot

# Normal browser
else
  window.MiniSlot = MiniSlot
