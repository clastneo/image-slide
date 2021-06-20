import React, { useEffect, useState } from "react";
import styled from "styled-components";
import OuterImagesArray from "./Images";

// ImageSlide에 반영할 StyledComponent 설정
// https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container
const Container = styled.div`
  width: 100vw;
`;

//
const ImageFrame = styled.div<{ sliderHeight?: string }>`
  position: relative;
  ${(props) => props.sliderHeight || "height:50vw"};
`;
const IndicatorWrapper = styled.div<{
  indicatorWrapperColor?: string;
  indicatorWrapperWidth?: string;
  indicatorWrapperHeight?: string;
  indicatorWrapperPosition?: string;
  opacity?: string;
}>`
  position: absolute;
  background-color: ${(props) => props.indicatorWrapperColor || "black"};
  ${(props) => props.indicatorWrapperWidth || "width: 100vw"};
  ${(props) => props.indicatorWrapperHeight || "height: 10vw"};
  ${(props) => props.opacity || "opacity: 0.4"};
  display: flex;
  ${(props) => props.indicatorWrapperPosition || "top:0"};
  justify-content: space-between;
  align-items: center;
`;
const IndicatorData = styled.div`
  justify: center;
  color: white;
`;

const IndicatorButtonLeft = styled.div`
  width: 0px;
  height: 0px;
  border-top: 2vw solid transparent;
  border-right: 3vw solid black;
  border-bottom: 2vw solid transparent;
  cursor: pointer;
`;
const IndicatorButtonRight = styled.div`
  width: 0px;
  height: 0px;
  border-top: 2vw solid transparent;
  border-left: 3vw solid black;
  border-bottom: 2vw solid transparent;
  cursor: pointer;
`;

// object-fit: ["fill", "contain", "cover", "scale-down", "none"]
const LiteralImage = styled.img<{ objectFit?: string }>`
  ${(props) => props.objectFit || "object-fit: cover"};
  width: 100%;
  height: 100%;
`;

function importAll(req: any) {
  return req.keys().map(req);
}

function imageSelector() {
  let files = importAll(
    require.context(`../images/`, false, /\.(png|jpe?g|svg|gif|bmp|webp)$/)
  );

  if (files.length === 0) {
    files = OuterImagesArray;
    return files;
  }
  let temp = [];

  for (let value of files) {
    temp.push(value.default);
  }

  files = temp;

  return files;
}

// ImageSlide에 들어갈 Props 타입 지정
type ImageSliderProps = {
  // ImageFrame 속성
  sliderHeight?: string;

  // indicatorWrapper 속성
  indicatorWrapperColor?: string;
  indicatorWrapperWidth?: string;
  indicatorWrapperHeight?: string;
  indicatorWrapperPosition?: string;
  opacity?: string;

  // LiteralImage 속성
  objectFit?: string;

  // img 변경 시간
  slideTime: number;
};

// 참조) https://velog.io/@velopert/create-typescript-react-component
// 고민) imageIndex에 해당하는 이미지와 전후로 2장씩을 미리 렌더링해둘 수 있으면 반응이 빠른 것처럼 느껴지지 않을까?
const ImageSlider = ({
  // ImageFrame 속성
  sliderHeight,

  // indicatorWrapper 속성
  indicatorWrapperColor,
  indicatorWrapperWidth,
  indicatorWrapperHeight,
  indicatorWrapperPosition,
  opacity,

  // LiteralImage 속성
  objectFit,

  // img 변경 시간
  slideTime,
}: ImageSliderProps) => {
  // useState<number>(0)를 이용하여 imageIndex의 초기값을 0으로 설정.
  const [imageIndex, setImageIndex] = useState<number>(0);
  // 특정 범위 내에 커서가 들어있는지 체크하기 위해 mouseOn 설정
  const [mouseOn, setMouseOn] = useState<boolean>(false);

  // 특정 폴더 내의 이미지 파일을 배열에 담아 import
  // https://webpack.js.org/guides/dependency-management/

  const images = imageSelector();
  const imageAmount = images.length;

  function previousImage() {
    if (imageIndex === 0) {
      setImageIndex(imageAmount - 1);
    } else {
      setImageIndex(imageIndex - 1);
    }
  }

  function nextImage() {
    if (imageIndex + 1 === imageAmount) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      nextImage();
    }, slideTime * 1000);
    if (mouseOn === true) {
      clearTimeout(timeout);
      // console.log(mouseOn);
    }
    return () => {
      clearInterval(timeout);
      // console.log("component unmount");
    };
  }, [imageIndex, imageAmount, mouseOn, slideTime]);

  return (
    <Container>
      <ImageFrame
        sliderHeight={sliderHeight}
        onMouseEnter={() => {
          setMouseOn(true);
          // console.log("mouseOn");
        }}
        onMouseLeave={() => {
          setMouseOn(false);
          // console.log("mouseOut");
        }}
      >
        {mouseOn && (
          <IndicatorWrapper
            indicatorWrapperWidth={indicatorWrapperWidth}
            indicatorWrapperHeight={indicatorWrapperHeight}
            indicatorWrapperPosition={indicatorWrapperPosition}
            indicatorWrapperColor={indicatorWrapperColor}
            opacity={opacity}
          >
            <IndicatorButtonLeft onClick={previousImage} />
            <IndicatorData>
              [{imageIndex + 1}/{images.length}]
            </IndicatorData>
            <IndicatorButtonRight onClick={nextImage} />
          </IndicatorWrapper>
        )}
        <LiteralImage
          objectFit={objectFit}
          src={images[imageIndex]}
          // onClick={() => {
          //   console.log(`${imageIndex + 1} / ${images.length}`);
          //   console.log();
          // }}
        />
      </ImageFrame>
    </Container>
  );
};

ImageSlider.defaultProps = {
  slideTime: 5,
};

export default ImageSlider;
