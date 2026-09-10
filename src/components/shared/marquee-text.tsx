import type { CSSProperties } from 'react';

import { cn } from '@/utils/cn';

const fontSizeClasses = {
    'text-2xl': 'text-xl sm:text-2xl',
    'text-3xl': 'text-2xl sm:text-3xl',
    'text-4xl': 'text-3xl sm:text-4xl',
    'text-5xl': 'text-3xl sm:text-5xl',
    'text-6xl': 'text-4xl sm:text-6xl',
    'text-7xl': 'text-4xl sm:text-7xl',
    'text-8xl': 'text-5xl sm:text-7xl lg:text-8xl',
} as const;

/** Dòng chữ chạy trang trí; tôn trọng `prefers-reduced-motion`. */
export type MarqueeTextProps = {
    /** Nội dung lặp lại trong marquee, đồng thời là text cho screen reader. */
    title: string;
    /** Thời gian một vòng chạy tính bằng giây. Mặc định `18`. */
    speed?: number;
    /** Cỡ chữ responsive dựng sẵn. Mặc định `text-4xl`. */
    fontSize?: keyof typeof fontSizeClasses;
    /** Class cho outer wrapper. */
    className?: string;
};

type MarqueeStyle = CSSProperties & {
    '--marquee-duration': string;
};

const repetitions = [0, 1, 2, 3] as const;

export function MarqueeText({
    title,
    speed = 18,
    fontSize = 'text-4xl',
    className,
}: MarqueeTextProps) {
    const marqueeStyle: MarqueeStyle = {
        '--marquee-duration': `${speed}s`,
    };

    return (
        <div
            className={cn(
                'w-full overflow-hidden text-zinc-200',
                'my-10',
                className,
            )}
        >
            <style>{`
                @keyframes marquee-scroll {
                    from {
                        transform: translate3d(0, 0, 0);
                    }
                    to {
                        transform: translate3d(-50%, 0, 0);
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    .marquee-track {
                        animation: none !important;
                        transform: none !important;
                    }
                }
            `}</style>
            <span className="sr-only">{title}</span>

            <div
                className="marquee-track flex w-max will-change-transform motion-safe:animate-[marquee-scroll_var(--marquee-duration)_linear_infinite]"
                style={marqueeStyle}
                aria-hidden="true"
            >
                {[0, 1].map((group) => (
                    <div className="flex shrink-0 items-center" key={group}>
                        {repetitions.map((item) => (
                            <span
                                className={cn(
                                    'shrink-0 whitespace-nowrap px-7 font-bold leading-none tracking-tight sm:px-14',
                                    fontSizeClasses[fontSize],
                                )}
                                key={item}
                            >
                                {title}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
