"use client";
// src/components/ImageComparison/ImageComparison.tsx
import * as Slider from "react-compare-slider/components";
import { useReactCompareSlider } from "react-compare-slider/hooks";

/** So sánh trước/sau bằng slider kéo ngang; chỉ dùng khi hai ảnh cùng chủ thể/góc chụp. */
export type ImageComparisonProps = {
  /** Ảnh ở phía trái/trước khi kéo handle. */
  imageOne: string;
  /** Ảnh ở phía phải/sau khi kéo handle. */
  imageTwo: string;
};

export const ImageComparison = ({
  imageOne,
  imageTwo,
}: ImageComparisonProps) => {
  const sliderProps = useReactCompareSlider({
    portrait: false,
    transition: "0.15s ease-out",
  });

  return (
    <div className="mx-auto overflow-hidden rounded-xl w-[calc(100%-5px)] sm:w-[calc(100%-3rem)] sm:max-w-[620px] lg:max-w-[940px] xl:w-[calc(70%-50px)] xl:max-w-[1080px]">
      <Slider.Provider {...sliderProps}>
        <Slider.Root>
          <Slider.Item item="itemOne">
            <Slider.Image src={imageOne} alt="Image one" />
          </Slider.Item>
          <Slider.Item item="itemTwo">
            <Slider.Image src={imageTwo} alt="Image two" />
          </Slider.Item>
          <Slider.HandleRoot
            aria-label="Kéo hoặc dùng phím mũi tên để so sánh hai hình ảnh"
            className="group/handle focus-visible:outline-none"
          >
            <div
              aria-hidden="true"
              className="pointer-events-auto flex h-full w-11 cursor-ew-resize flex-col items-center"
            >
              <span className="w-0.5 min-h-0 flex-1 bg-white shadow-[0_0_3px_rgba(0,0,0,0.45)]" />
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.28)] ring-1 ring-black/10 transition-shadow duration-200 group-hover/handle:shadow-[0_3px_12px_rgba(0,0,0,0.34)] group-focus-visible/handle:ring-4 group-focus-visible/handle:ring-black/35 motion-reduce:transition-none">
                <span className="flex items-center gap-0.5">
                  <span className="h-3 w-0.5 rounded-full bg-neutral-800" />
                  <span className="h-3 w-0.5 rounded-full bg-neutral-800" />
                  <span className="h-3 w-0.5 rounded-full bg-neutral-800" />
                </span>
              </span>
              <span className="w-0.5 min-h-0 flex-1 bg-white shadow-[0_0_3px_rgba(0,0,0,0.45)]" />
            </div>
          </Slider.HandleRoot>
        </Slider.Root>
      </Slider.Provider>
    </div>
  );
};
