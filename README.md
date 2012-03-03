### Usage
Only works with `monospace` typeface currently.

```css
  [data-target]{
    font-family: monospace;
  }
```

```html
  <span id="target-01" data-target="20"></span>.
```

```coffeescript

  counter = new Counter(document.getElementById('#target-01'))

  # Set target value
  counter.setTargetValue()
  
  # Unset target value
  counter.unsetTargetValue()
```
