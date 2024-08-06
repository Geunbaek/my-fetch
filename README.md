# fetch-io

- fetch api 를 조금 더 쉽게 사용하기 위해 래핑한 라이브러리로 HTTP 기본 메서드인 `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS` 의 기능을 포함하고 있습니다.

## 설치

```bash
npm i fetch-io
```

## method

- get(url, options?)
- post(url, options?)
- put(url, options?)
- patch(url, options?)
- delete(url, options?)
- head(url, options?)
- options(url, options?)

```TypeScript
// GET Method
import fetchIo from "fetch-io";

function getProductById() {
  return fetchIo.get(`${BASE_PATH}/product/1`, {
    params: {
      category: "food"
    }
  });
}
```
