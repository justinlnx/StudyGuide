# Remove vowel

```javascript
function removeVowels(str) {
  let arr = [];
  let vowels = 'aeiouAEIOU';
  for (let i = 0; i < str.length; i ++) {
    if (!vowels.includes(str.charAt(i))) {
      arr.push(str.charAt(i));
    }
  }

  return arr.join('');
}
```

```java
StringBuffer sb = new StringBuffer();
String v = "aeiouAEIOU";
for(int i = 0; i < string.length(); i++){
  if(v.indexOf(string.charAt(i)) > -1) continue;
  sb.append(string.charAt(i));
}
return sb.toStirng();
```