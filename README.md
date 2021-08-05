# React 기반 ImageSlide-Component

React와 TypeScript, 확장성과 재사용성을 고려하여 styled-component를 사용하여 제작되었습니다. 원활한 TypeScript사용을 위해 @types/webpack-env을 추가 설치하시기 바랍니다.

## 사용방법

1. src 폴더 내에 images폴더를 생성하여 image 파일을 저장
  (지원하는 파일형식: png|jpe?g|svg|gif|bmp|webp)

2. Images.ts 파일의 OuterImagesArray 배열 내에 img 파일 주소를 string으로 입력
  (기본 img 목록: https://picsum.photos/id/1001/1080/720, https://picsum.photos/id/1002/1080/720)

3. 컴포넌트 import하여 사용

### ImageSlider에 적용 가능한 속성 목록
#### styled-component에 해당하는 속성 목록
  *하단 속성 전체는 생략 가능합니다*
  *속성변수명: 속성타입; || "입력형태와 미입력시 적용되는 기본속성"*
  
  **ImageFrame 속성**
  sliderHeight?: string; || "height:50vw"
  // 컴포넌트 높이 지정

  **indicatorWrapper 속성**
  indicatorWrapperColor?: string; || "black"
  // 인디케이터 색상 지정

  indicatorWrapperWidth?: string; || "width: 100vw"
  // 인디케이터 너비 지정

  indicatorWrapperHeight?: string; || "height: 10vw"
  // 인디케이터 높이 지정
  
  indicatorWrapperPosition?: string; || "top:0" 
  // 인디케이터 위치 지정, 상하단 설정 가능, 0대신 수치 입력하면 해당 수치만큼 떨어진 곳에 생성

  opacity?: string; || "opacity: 0.4"
  // 인디케이터 투명도 지정 0~1

  **LiteralImage 속성**
  objectFit?: string; || "object-fit: cover"
  // 이미지 채우기/자르기 설정 fill, contain, cover, scale-down, none

#### 그 외의 목록
  **img 변경 시간**
  slideTime?: number; || 5
  // 이미지 변경 시간, s 단위

#### 관련 질의사항
clastneo@gmail.com

#### 개발시의 dependencies
"dependencies": {
  "@testing-library/jest-dom": "^5.13.0",
  "@testing-library/react": "^11.2.7",
  "@testing-library/user-event": "^12.8.3",
  "@types/jest": "^26.0.23",
  "@types/node": "^12.20.15",
  "@types/react": "^17.0.11",
  "@types/react-dom": "^17.0.7",
  "@types/webpack-env": "^1.16.0",
  "@types/styled-components": "^5.1.10",
  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "react-scripts": "^4.0.3",
  "styled-components": "^5.1.10",
  "typescript": "^4.3.2",
  "web-vitals": "^1.1.2"
},
