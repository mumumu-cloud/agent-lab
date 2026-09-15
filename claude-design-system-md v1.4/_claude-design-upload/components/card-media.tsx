import * as React from "react";

import { Card, type CardProps } from "./card";

export interface CardMediaProps extends Omit<CardProps, "title" | "subtitle"> {
  title?: string;
  mediaType?: string;
  duration?: string;
  thumbnail?: string;
}

const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  ({ title, mediaType, duration, thumbnail, ...props }, ref) => {
    return (
      <Card ref={ref} title={title || "Media"} subtitle={mediaType} {...props}>
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="h-[120px] w-full rounded-[6px] object-cover" />
        ) : (
          <div className="flex h-[80px] w-full items-center justify-center rounded-[6px] bg-01 text-[11px] text-02-row">
            {mediaType || "Media"}
          </div>
        )}
        {duration && <div className="mt-[6px] text-[11px] text-02-row">{duration}</div>}
      </Card>
    );
  },
);
CardMedia.displayName = "CardMedia";

export { CardMedia };
