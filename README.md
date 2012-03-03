### Usage

Only works with `monospace` typeface currently.

Basic HTML.

```html

    <span id="target-01" data-target="20"></span>.
```

Create `MiniSlot` instance.

```coffeescript

    miniSlot = new MiniSlot(document.getElementById('#target-01'))

    # Set target value
    miniSlot.setTargetValue()

    # Unset target value
    miniSlot.unsetTargetValue()
```

### Slightly Annotated Source
[Here](http://mnmly.github.com/mini-slot.js/docs/mini-slot.html).

