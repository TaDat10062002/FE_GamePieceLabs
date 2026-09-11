import type { AboutPageContent } from "@/features/about/types/about-content";

export const aboutPageContent: AboutPageContent = {
  hero: {
    eyebrow: "Câu chuyện của chúng tôi, ván chơi của bạn",
    title: "The Heart and Craft of Game Piece Labs",
    subtitle:
      "Chúng tôi kết hợp nghệ thuật thủ công tinh xảo, công nghệ cắt laser chính xác và vật liệu gỗ tuyển chọn để biến mỗi buổi chơi game thành một kỷ niệm đáng nhớ.",
    heroImageSrc: "/images/about/about-hero.jpg",
    heroImageAlt:
      "Bàn làm việc xưởng chế tác phụ kiện gỗ và organizer board game GamePieceLabs",
  },
  story: {
    eyebrow: "Our Story",
    title: "Sinh ra từ những buổi chơi cần gọn gàng hơn",
    lead: "Game Piece Labs bắt đầu từ một cảm giác rất quen thuộc với người chơi board game: mở hộp ra là thấy thẻ bài, token, mini và phụ kiện nằm lẫn vào nhau.",
    paragraphs: [
      "Chúng tôi muốn mỗi ván chơi bắt đầu nhanh hơn, setup ít mệt hơn và bàn chơi nhìn chỉn chu hơn. Từ nhu cầu đó, những khay gỗ, insert và phụ kiện đầu tiên được thiết kế để từng chi tiết có đúng vị trí của nó.",
      "Mỗi sản phẩm đều được nhìn từ trải nghiệm thật trên bàn chơi: dễ lấy, dễ cất, vừa hộp game và đủ đẹp để trở thành một phần của buổi chơi.",
    ],
    quote: {
      text: "Một chiếc organizer tốt không chỉ để cất đồ, nó giúp người chơi quay lại với phần vui nhất của board game nhanh hơn.",
      author: "Game Piece Labs",
      role: "Crafted for board gamers",
    },
  },
  craftsmanship: {
    eyebrow: "Kỹ nghệ chế tác",
    title: "Precision in play: the power of laser-cutting",
    description:
      "Laser-cutting is an ideal technology for creating game organizers due to its precision. This method allows for extremely accurate cuts as well as the creation of complex designs that can include intricate details or customized features. Using quality birch plywood gave us a sturdy and still flexible material to complement this technology, making sorting and storing much easier.",
    showcaseVideo: {
      type: "youtube",
      src: "https://www.youtube.com/embed/HjsGUuQsQOY?si=ZcxnS0Ln7VPw4BqD",
      title: "How many people does it take to produce a Frosthaven Organizer?",
    },
    showcaseImageSrc: "/images/about/laser-craftsmanship.jpg",
    showcaseImageAlt:
      "Máy cắt laser đang khắc chi tiết bảng điều khiển người chơi bằng gỗ",
    showcaseCaption:
      "Quy trình khắc laser CO2 chính xác trên gỗ bạch dương cao cấp tại xưởng Game Piece Labs",
    features: [
      {
        title: "Khắc laser vi mô chính xác",
        description:
          "Từng ký hiệu, ô chỉ số máu (HP tracker), rãnh thẻ bài và ngăn xúc xắc đều được định vị chuẩn xác với sai số dưới 0.1mm.",
        badge: "Độ chính xác 0.1mm",
      },
      {
        title: "Gỗ Bạch Dương & Óc Chó tự nhiên",
        description:
          "Vật liệu gỗ ép bạch dương Baltic nhiều lớp có độ bền uốn vượt trội, chống cong vênh và lưu hương thơm gỗ tự nhiên dịu nhẹ.",
        badge: "100% Gỗ tuyển chọn",
      },
      {
        title: "Lắp ráp không cần keo dán",
        description:
          "Hệ thống khớp mộng (Snap-fit & Tenon joints) thông minh cho phép người chơi tháo lắp dễ dàng, chắc chắn mà không cần keo dính.",
        badge: "Thiết kế mộng khớp",
      },
      {
        title: "Tối ưu hóa không gian hộp game",
        description:
          "Vừa vặn hoàn hảo trong hộp gốc của từng tựa game, hỗ trợ cả thẻ bài đã bọc sleeve và nắp hộp đóng kín phẳng 100%.",
        badge: "Khớp 100% hộp gốc",
      },
    ],
  },
  values: {
    eyebrow: "Product DNA",
    title: "Product DNA",
    description:
      "As we shared our work, we quickly got positive feedback from players and started refining our production. With solid craftsmanship and a serious passion for gaming, Game Piece Labs continues to develop organizers that make every game night smoother.",
    values: [
      {
        title: "Superior design",
        description:
          "Every tray and insert is shaped around comfort, clean table presence, and fast access during play.",
        imageSrc: "/images/about/valuesBox1.jpg",
      },
      {
        title: "Premium materials",
        description:
          "We choose durable wood surfaces that feel sturdy in hand and age naturally beside your games.",
        imageSrc: "/images/about/valuesBox2.jpg",
      },
      {
        title: "Sophisticated technology",
        description:
          "Laser-cut precision keeps each slot, divider, and detail aligned with the needs of a specific game.",
        imageSrc: "/images/about/valuesBox3.jpg",
      },
    ],
  },
  stats: {
    title: "Những con số khẳng định chất lượng",
    items: [
      {
        value: "50,000+",
        label: "Người chơi tin dùng",
        description: "Trên khắp các câu lạc bộ & gia đình",
      },
      {
        value: "150+",
        label: "Mẫu Inserts độc quyền",
        description: "Dành cho các tựa game nổi tiếng thế giới",
      },
      {
        value: "100%",
        label: "Kiểm định thủ công",
        description: "Mỗi sản phẩm đều qua khâu ráp thử",
      },
      {
        value: "4.9 / 5",
        label: "Điểm đánh giá trung bình",
        description: "Từ cộng đồng game thủ & reviewer",
      },
    ],
  },
  cta: {
    title: "Sẵn sàng nâng tầm bàn cờ của bạn?",
    description:
      "Khám phá ngay bộ sưu tập phụ kiện, inserts và bảng điều khiển người chơi được chế tác riêng cho tựa game yêu thích của bạn.",
    primaryAction: {
      label: "Khám phá sản phẩm",
      href: "/products",
    },
    secondaryAction: {
      label: "Liên hệ tư vấn",
      href: "/contact",
    },
  },
};


