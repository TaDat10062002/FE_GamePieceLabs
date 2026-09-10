/** Khung video 16:9 cho local media hoặc YouTube embed. */
export type VideoFrameProps = {
    /** `local` dùng thẻ video native; `youtube` render iframe nhúng. */
    type: 'local' | 'youtube';
    /** URL source video hoặc YouTube embed URL, không phải watch URL. */
    src: string;
    /** Tiêu đề accessibility cho player/iframe. Mặc định `Video`. */
    title?: string;
};

export function VideoFrame({
    type,
    src,
    title = 'Video',
}: VideoFrameProps) {
    if (type === 'local') {
        return (
            <div className="aspect-video w-full overflow-hidden bg-black">
                <video
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    title={title}
                >
                    <source src={src} />
                    Trình duyệt của bạn không hỗ trợ video.
                </video>
            </div>
        );
    }

    return (
        <div className="aspect-video w-full overflow-hidden bg-black">
            <iframe
                src={src}
                title={title}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    );
}
