"use client";

import { useRef } from "react";
import { CloseIcon, PlayIcon } from "@/components/landing/icons";
import { cn } from "@/lib/cn";

type VideoPlayerProps = {
  sources: ReadonlyArray<{ src: string; type: string }>;
  poster?: string;
  /** Accessible name of the play button, e.g. "Play Karen's story". */
  label: string;
  className?: string;
};

/** A play button over a poster that opens the video in a modal dialog. */
export function VideoPlayer({ sources, poster, label, className }: VideoPlayerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
    videoRef.current?.play().catch(() => undefined);
  };
  const close = () => {
    videoRef.current?.pause();
    dialogRef.current?.close();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={label}
        className={cn(
          "absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-base/85 text-ink shadow-lift backdrop-blur-sm transition-transform hover:scale-105 motion-reduce:transition-none",
          className,
        )}
      >
        <PlayIcon className="ml-0.5 h-7 w-7" />
      </button>
      <dialog
        ref={dialogRef}
        onClose={() => videoRef.current?.pause()}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto w-[min(56rem,94vw)] max-w-none rounded-tile bg-ink p-0 shadow-lift backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative">
          <video ref={videoRef} controls playsInline preload="metadata" poster={poster} className="block aspect-video w-full rounded-tile">
            {sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
          <button
            type="button"
            onClick={close}
            aria-label="Close video"
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-base/90 text-ink hover:bg-base"
          >
            <CloseIcon />
          </button>
        </div>
      </dialog>
    </>
  );
}
