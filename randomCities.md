# Random Cities

Given a map of cities to inhabitants in millions  {"london": 10, "NYC": 5, "SF": 12} return a random city such that probability of each city returned is proportional to the inhabitants staying in it

1. prepare 2 arrays from this map {"london": 10, "NYC": 5, "idaho": 12} = ["london", "NYC", "SF"], and [10, 5, 12].
2. prepare a new array from this array: [10,5,12] =&gt; [10, 15, 27]
3. generate random number between 1 to 27. if number is 1-10 return first city, 11-15 return 2nd city, 16 to 27 return 3rd city.

```javascript
function random(cities) {
    let size = 0;
    let range = [];
    
    Object.values(cities).forEach((p, idx) => {
        size += p;
        range[idx] = size;
    });
    
    const rand = Math.floor(Math.random() * (size) + 1);

    const cityIdx = range.indexOf(range.find(x => x > rand));

    return Object.keys(cities)[cityIdx];
}
```