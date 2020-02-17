```html
<!DOCTYPE html>
<html>
  <head>
    <title>Foo Bar Baz Qux</title>
  </head>
  <body>
    <form id="foo-bar">
      <input type="text" name="foo.bar" />
    </form>
    <form id="foo-bar-baz-qux">
      <input type="text" name="foo.bar" />
      <input type="text" name="foo.baz.qux" />
      <input type="text" name="qux" />
    </form>
    <script>
      var fooBarBazQux = readFromObject('foo-bar-baz-qux');
      /** 
        {
          foo: {
            bar: '',
            baz: {
              qux: '',
            },
          },
          qux: '',
        }
       **/

       var fooBar = readFromObject('foo-bar');
       /**
          {
            foo: {
              bar: '',
            },
          }
        **/
    </script>
  </body>
</html>
```

```javascript
function readFromObject(id) {
  var el = document.getElementById(id);
  if (!el) return {};

  var res = {};
  for (var i = 0; i < el.childElementCount; i++) {
    updateRes(res, el.children[i].name);
  }
  console.log(res);
};

function updateRes(obj, name) {
  if (!name.includes('.')) {
    obj[name] = '';
    return obj;
  }
  var dotIndex = name.indexOf('.');
  var firstKey = name.slice(0, dotIndex);
  var restStr = name.slice(dotIndex + 1);

  if (!obj[firstKey]) {
    obj[firstKey] = {};
  }

  Object.assign(obj[firstKey], updateRes(obj[firstKey], restStr));
  return obj;
}
```
