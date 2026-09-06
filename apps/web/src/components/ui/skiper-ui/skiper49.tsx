"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, ZoomIn } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

export interface GallerySlideItem {
  id: string;
  title: string;
  caption: string;
  story: string;
  date: string;
  aspect?: string;
  tag: string;
  gradient: string;
  icon: string;
  src?: string;
  alt?: string;
}

const Skiper49 = () => {
  const images = [
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-transparent">
      <Carousel_003 images={images} showPagination loop />
    </div>
  );
};

export { Skiper49 };

const Carousel_003 = ({
  images,
  items,
  onItemClick,
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = false,
  spaceBetween = 30,
}: {
  images?: { src: string; alt: string }[];
  items?: GallerySlideItem[];
  onItemClick?: (item: GallerySlideItem) => void;
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const css = `
  .Carousal_003 {
    width: 100%;
    height: 430px;
    padding-top: 10px !important;
    padding-bottom: 55px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 290px;
    height: 350px;
    border-radius: 1.25rem;
    overflow: hidden;
  }

  .Carousal_003 .swiper-pagination-bullet {
    background-color: var(--accent-gold, #D4AF7A) !important;
    opacity: 0.45;
    transition: all 0.3s ease;
  }

  .Carousal_003 .swiper-pagination-bullet-active {
    opacity: 1 !important;
    width: 24px !important;
    border-radius: 9999px !important;
    background-color: var(--accent-gold, #D4AF7A) !important;
  }

  .Carousal_003 .swiper-button-next,
  .Carousal_003 .swiper-button-prev {
    color: white !important;
    width: 42px !important;
    height: 42px !important;
    background: rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 9999px;
    backdrop-filter: blur(8px);
    transition: all 0.25s ease;
  }

  .Carousal_003 .swiper-button-next:hover,
  .Carousal_003 .swiper-button-prev:hover {
    background: rgba(0, 0, 0, 0.75);
    border-color: var(--accent-gold, #D4AF7A);
    transform: scale(1.08);
  }
`;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.2,
      }}
      className={cn("relative w-full max-w-5xl px-4 sm:px-6 mx-auto", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 2500,
                  disableOnInteraction: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 35,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {items
            ? items.map((item, index) => (
                <SwiperSlide
                  key={item.id || index}
                  className="rounded-2xl overflow-hidden cursor-pointer group shadow-2xl border border-white/10 hover:border-[var(--accent-gold)] transition-all duration-300"
                  onClick={() => onItemClick?.(item)}
                >
                  <div
                    className={`h-full w-full bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-between relative select-none`}
                  >
                    {/* Top row: Tag & Date */}
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-black/40 border border-white/15 text-[var(--accent-gold)] backdrop-blur-sm">
                        {item.tag}
                      </span>
                      <span className="text-[10px] font-mono text-white/80 bg-black/30 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                        {item.date}
                      </span>
                    </div>

                    {/* Center Icon */}
                    <div className="flex-1 flex items-center justify-center my-3">
                      <span className="text-6xl filter drop-shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                    </div>

                    {/* Bottom Metadata Panel */}
                    <div className="z-10 bg-black/55 backdrop-blur-md -mx-6 -mb-6 p-4 border-t border-white/15">
                      <h4 className="font-serif text-base font-medium text-white truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-white/80 line-clamp-1 mt-0.5 font-sans">
                        {item.caption}
                      </p>
                    </div>

                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-black/70 border border-[var(--accent-gold)] flex items-center justify-center text-[var(--accent-gold)] shadow-xl transform group-hover:scale-100 scale-75 transition-transform duration-300">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : images?.map((image, index) => (
                <SwiperSlide key={index} className="rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="h-full w-full object-cover"
                    src={image.src}
                    alt={image.alt}
                  />
                </SwiperSlide>
              ))}

          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden flex items-center justify-center">
                <ChevronRightIcon className="h-5 w-5" />
              </div>
              <div className="swiper-button-prev after:hidden flex items-center justify-center">
                <ChevronLeftIcon className="h-5 w-5" />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export { Carousel_003 };

/**
 * Skiper 49 Carousel_003 — React + Swiper Coverflow
 * Adapted for Samritha portfolio visual archive.
 */
