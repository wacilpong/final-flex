## final-flex

A library for managing grid layout with flex, not `display:grid`
<br>

### Motivation

물론 그리드 형태의 레이아웃은 css의 `grid` 속성을 쓰면 쉽게 맞출 수 있기는 하다. 하지만 IE11에서 `-ms-` prefix를 지정해야 하고, 일부 기능만 사용할 수 있을 뿐이다. 그래서 비교적 브라우저마다 동작방식이 다르지 않은 `flex`로 그리드 레이아웃을 완벽하게 만들 수 없을까 고민하게 됐다. 이에 따라 구현해야할 것은 다음과 같았다.
<br>

1. 요소가 한 row에 동적으로 들어올 수 있다.
2. 요소 간 간격이 일정하다.
3. 마지막 row는 간격을 유지하면서 왼쪽 정렬이 된다.
<br><br>

스택 오버플로우를 찾다보면 [::after로 auto flex box를 채우는 방식](https://stackoverflow.com/questions/18744164/flex-box-align-last-row-to-grid)이 가장 대표적이다. 하지만 이는 3번 규칙을 어기게 된다. 물론 요소의 크기와 간격까지 하드코딩처럼 지정해주면 가능하나, 이는 좋은 방식이 아니라고 생각했다. 어차피 브라우저 호환성 때문에 flex로 grid를 구현하는 것이기 때문에 브라우저의 flex속성이 자동으로 계산해주는 값에 맡기는 게 낫지 않을까 싶었다.
<br><br>

### Concept

그러면 flex속성에 계산을 맡기면서도, 어떻게 위의 3가지 규칙을 모두 지킬 수 있을까? 나는 우선 가장 바깥의 container에는 요소들을 해당 크기 안에서 일정한 간격을 유지하며 양끝 정렬을 맞춰주는 속성인 `space-between`를 사용했다. 그러면 1번과 2번은 자동으로 해결할 수 있다. row에 몇 개의 요소가 들어오든, 요소 간 간격은 일정하게 유지된다.
<br><br>

하지만 3번이 문제다. 만약 12개의 데이터가 있고, 한 row 당 5개씩 온다고 하면 마지막에는 2개의 데이터가 오게 되고, `space-between`속성은 이를 5개가 들어오던 row처럼 계산해서 보여주지 않는다. 이렇게 마지막 row가 원하지 않는 방식으로 보여질 것이다.
<br><br>

https://codepen.io/wacilpong/pen/NWPjrmK
![example of flex without left aligning to last row](https://screenshot.codepen.io/3931303.oNgWzvy.small.65586e39-20b5-41d7-88a5-17c3915f3380.png)

생각해보면 한 row당 채워지는 요소 개수보다 작은 값이 항상 마지막에만 올 것이다. 예를 들면 5개씩 온다고 하면 마지막 row에는 1,2,3,4가 올 수 있다. 그리고 마지막 row에 올 개수는 미리 알 수 있는데, 총 개수가 12개이고 한 row당 개수는 5개이면 마지막 row에는 `12 % 5`인 2가 올 것이다. 그러면 이 마지막 row에는 `5 - 2`인 3개 요소만 채워지면 flex의 기본속성인 `space-between`을 그대로 사용하여 모든 규칙을 지킬 수 있다.
<br><br>

이에 따라 다음과 같은 공식을 세웠다.
<br><br>

```
total = 18,
elements per row = 5
elements in last row = 18 % 5 = 3
needed elements in last row = 5 - (18 % 5) = 2  => this is the key!
```
<br><br>

결국 마지막 row에 숨겨진 가짜 데이터를 만들어주면 기본적인 flex 속성으로 그리드 레이아웃을 만들어낼 수 있다.
<br><br>

## Usage
```
npm i --save-dev flex-final
```
<br>

1. vanilla js
```
import { createHiddenBox } from "final-flex";

const hiddenBox = createHiddenBox(12, 5);

hiddenBox.forEach(() => {
  const newItem = document.createElement("div");

  newItem.className = "item hidden";  
  container.appendChild(newItem);
});
```
<br>

2. jsx syntax such as React
```
import { createHiddenBox } from "final-flex";

const hiddenBox = createHiddenBox(12, 5);

return (
    ...
    {hiddenBox.map(() => <div className={cx("item", "hidden")} />)}
)
```

## Example
https://codepen.io/wacilpong/pen/abzWmNq
<br>

### ing...
