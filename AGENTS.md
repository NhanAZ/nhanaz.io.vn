# AGENTS.md

Tài liệu này là ghi chú vận hành cho agent khi sửa project `nhanaz.io.vn`. Mục tiêu là giữ web giống một góc cá nhân của NhanAZ, không biến nó thành landing page bóng bẩy hoặc văn mẫu A.I.

## Tinh thần chung

- Đây là website cá nhân, blog, kho dự án và portfolio sống của Nguyễn Thành Nhân - NhanAZ.
- Project đang chủ động dùng HTML, CSS và JavaScript thuần để dễ kiểm soát từng chi tiết.
- Không thêm framework, bundler hoặc thư viện ngoài nếu việc đó chỉ để giải quyết một thay đổi nhỏ.
- Giao diện ưu tiên cảm giác gọn, thẳng, có đường kẻ rõ, nhiều khoảng thở nhưng không để trống vô cớ.
- Mọi thay đổi nên phục vụ việc đọc, tìm kiếm, lưu trữ và kể chuyện cá nhân.

## Phong cách giao diện

- Font chính là Space Grotesk trong `assets/fonts/`.
- Màu chủ đạo là trắng, đen, xám dịu và các mảng nền nhẹ. Không dùng gradient hoặc màu rực nếu không có lý do rõ.
- Layout dựa trên `.shell`, `.site-header`, `.page-heading`, `.split-section`, `.article-header`, `.article-layout`, `.prose`.
- Đường kẻ mảnh là một phần của nhận diện. Khi thêm block mới, ưu tiên border rõ ràng thay vì shadow nặng.
- Tránh font quá to hoặc quá nhỏ. Tiêu đề có thể lớn vừa đủ, nội dung đọc nên giữ trong khoảng dễ đọc.
- Tránh để dòng cuối chỉ còn 1-2 chữ. Dùng `text-wrap: balance` cho tiêu đề và `text-wrap: pretty` cho nội dung, không dùng căn đều hai bên làm giãn khoảng trắng.
- Không viết hoa toàn bộ chữ trong giao diện, trừ acronym kỹ thuật bắt buộc như HTML, CSS, API, AI, JSON, ZIP, TAR, AES.
- Không dùng dấu `/` làm ký hiệu phân tách nếu có thể thay bằng ` - ` hoặc dấu chấm.
- Không dùng dấu `;` trong văn bản hiển thị theo kiểu văn phòng. Nếu không phải cú pháp bắt buộc, đổi sang dấu phẩy, dấu chấm hoặc tách câu tự nhiên hơn.
- Không dùng bullet tròn trong nội dung. Danh sách trên web phải dùng dấu `-` hoặc cấu trúc custom tương đương.
- Animation chỉ nên nhẹ, tinh tế và phục vụ cảm giác đọc. Ưu tiên opacity, transform nhỏ, easing mượt và thời lượng ngắn. Không dùng hiệu ứng lố, nhấp nháy, parallax nặng, blur lớn hoặc animation chạy liên tục nếu không thật sự cần.
- Mọi animation phải tôn trọng `prefers-reduced-motion`. Tránh animate các thuộc tính gây layout như width, height, top, left.

## Phong cách viết

- Tiếng Việt dùng “mình”, không dùng “tui” hoặc “tôi” trong nội dung web.
- Không gọi chủ website bằng tên ngắn một âm tiết. Dùng “Thành Nhân”, “Nguyễn Thành Nhân”, “NhanAZ” hoặc “mình” tùy ngữ cảnh.
- Giọng viết nên thẳng, đời, có chút khô hài khi hợp ngữ cảnh. Tránh văn phong công ty, văn phong tuyển dụng và văn mẫu A.I.
- Hạn chế dùng dấu `:` trong văn bản hiển thị và nội dung bài viết. Trừ cú pháp bắt buộc như URL, thời gian, JSON-LD, HTML attributes, code hoặc khi dấu này thật sự cần cho nghĩa. Nếu đang dùng dấu này để dẫn giải, ưu tiên dấu chấm, dấu phẩy, dấu gạch ngang hoặc viết thành câu tự nhiên hơn.
- Tránh kiểu câu đóng nhãn cứng như `Nhãn: nội dung`. Nếu cần giải thích, viết thành câu tự nhiên.
- Không dùng chữ viết tắt nếu người ngoài khó hiểu. Ví dụ phải viết rõ Đoàn Thanh niên, Hội Sinh viên, Ban Chấp hành.
- Không khoe theo kiểu tự nâng mình lên. Nếu nói thành tích, nói bằng dữ kiện, ngữ cảnh và lý do nó đáng được giữ lại.
- Với bài kỹ thuật, được phép đi sâu, nhưng phải giải thích vì sao chi tiết đó quan trọng.
- Khi nói về bảo mật hoặc dịch ngược, giữ ranh giới rõ giữa phân tích kỹ thuật và hướng dẫn lạm dụng.

## Cấu trúc nội dung

- Trang chủ ở `index.html`.
- Bài viết tiếng Việt ở `posts/<slug>/index.html`.
- Blog index ở `blog/index.html`.
- Dự án ở `projects/index.html`.
- Vibe-code ở `vibe-code/index.html` và từng project ở `vibe-code/<slug>/index.html`.
- Góc GitHub ở `github/index.html`, dùng để mô tả các tổ chức GitHub liên quan đến NhanAZ.
- Dấu mốc và thành tích ở `achievements/index.html`.
- Giới thiệu ở `about/index.html`.
- Bản tiếng Anh nằm trong thư mục `en/` và nên được cập nhật song song khi nội dung chính có bản dịch.
- Khi thêm trang mới, cập nhật sitemap, `llms.txt`, search index trong `assets/js/site.js`, các link liên quan trên index nếu cần.
- Nguồn máy đọc gồm `llms.txt`, `llms-full.txt` và `entity.json`. Khi đổi danh tính, trang chính, AEO hoặc GEO thì kiểm tra ba file này cùng nhau.

## Mục lục bài viết và liên kết đề mục

- Tất cả bài viết con trong `posts/<slug>/index.html` và `en/posts/<slug>/index.html` dùng layout `.article-layout`, `.article-rail` và `.prose`.
- Mục lục bên trái của bài viết được sinh tự động bằng `initArticleToc()` trong `assets/js/site.js`, lấy từ các heading `h2` và `h3` bên trong `.prose`.
- Không hardcode mục lục thủ công vào từng bài nếu không có lý do thật sự đặc biệt. Khi thêm bài mới, chỉ cần viết heading rõ ràng bằng `h2` và `h3` trong `.prose`.
- JavaScript tự tạo `id` sạch cho heading, tự tránh trùng, tự gắn link trong mục lục và tự cập nhật URL hash khi người đọc bấm vào mục lục hoặc bấm trực tiếp lên heading.
- Người dùng phải copy được URL có hash và gửi cho người khác để mở thẳng tới đúng đề mục. Không phá hành vi này khi sửa bài viết, sửa `.article-rail`, `.prose`, scroll hoặc animation.
- Khi nhảy tới heading từ TOC hoặc từ URL hash, heading phải hiện đầy đủ, không bị che bởi `.site-header` sticky và không bắt đầu từ đoạn văn bên dưới tiêu đề.
- CSS của mục lục nằm trong `assets/css/site.css` với `.article-toc`. Desktop để mục lục sticky trong rail bên trái, mobile đưa mục lục lên phía trên nội dung bài.
- Focus style của heading/permalink phải vuông góc, không bo tròn, không dùng outline mặc định lệch hoặc thừa viền.
- Khi đổi CSS hoặc JS liên quan bài viết, nhớ tăng query version của `site.css` hoặc `site.js` trong các file HTML để tránh cache cũ.

## SEO và dữ liệu máy đọc

- Mỗi trang quan trọng cần có title, description, canonical, Open Graph, Twitter meta và JSON-LD phù hợp.
- Domain chuẩn viết thường là `nhanaz.io.vn`.
- Các alias hữu ích cho SEO gồm NhanAZ, NhânAZ, Ghast_Noob, GhastxNoob, thanhnhanaz, nhanhuongloi, nhan0ngu.
- Nếu thêm bài tiếng Anh, dùng `hreflang` giữa bản Việt và bản Anh.
- `llms.txt` nên mô tả trang theo cách agent có thể hiểu nhanh Nguyễn Thành Nhân là ai, NhanAZ là gì và các nội dung chính nằm ở đâu.
- AEO nên dựa vào câu trả lời ngắn, nội dung thật trên trang, JSON-LD khớp với phần người đọc thấy và `llms.txt`. Không nhồi từ khóa hoặc viết giọng bot.
- Các câu trả lời ngắn trên trang chủ nằm trong `<details>` gần cuối trang để không chen ngang phần kể chuyện. Có thể thu gọn mặc định, nhưng nội dung khi mở phải khớp với `FAQPage` JSON-LD và bản tiếng Anh.
- GEO nên làm cho trang dễ được trích dẫn bằng nguồn rõ, entity map, `llms-full.txt`, link canonical và nội dung có ngữ cảnh. Tránh mọi mẹo thao túng câu trả lời AI.
- Link preview mặc định của site nằm ở `assets/images/web-preview.png`, kích thước 1200x630, dùng cho `og:image` và `twitter:image`.
- Structured data nên dùng bộ ảnh preview nhiều tỉ lệ cho Google, gồm `assets/images/web-preview-16x9.png` 1200x675, `assets/images/web-preview-4x3.png` 1200x900 và `assets/images/web-preview-1x1.png` 1200x1200 trong mảng JSON-LD `image` khi trang dùng ảnh preview mặc định.
- Nếu sau này có preview riêng cho một bài viết, đặt ảnh trong `assets/images/`, ưu tiên có đủ bản 1200x630 cho social preview và các bản 16:9, 4:3, 1:1 cho JSON-LD, rồi cập nhật đồng bộ `og:image`, `twitter:image`, `og:image:width`, `og:image:height`, `og:image:alt` và JSON-LD `image` của đúng trang đó. Không thay ảnh chân dung `portrait.png` trong `Person` schema nếu trang đang mô tả Nguyễn Thành Nhân.
- Favicon và search icon của web dùng `assets/favicon.svg`, `assets/favicon-48.png`, `assets/favicon-192.png`, `assets/apple-touch-icon.png` và `/favicon.ico`. Khi đổi logo hoặc mark nhận diện, cập nhật các file này cùng lúc để trình duyệt và Google không lấy nhầm cache cũ.

## JavaScript hiện có

- `assets/js/site.js` chứa tìm kiếm toàn site, đổi ngôn ngữ, filter thành tích, loader Canva và các enhancer nhẹ.
- Tìm kiếm toàn site lấy dữ liệu từ `SITE_SEARCH_INDEX_VI` và `SITE_SEARCH_INDEX_EN`.
- Filter thành tích dựa vào dữ liệu trong DOM của `.record-item`. Khi sửa markup phần này phải kiểm tra lại việc ẩn hiện thật sự.
- Code block trong bài viết được enhance bằng JavaScript để có nút sao chép và màu cú pháp nhẹ. Không cần bọc tay từng block nếu không có nhu cầu riêng.
- Mục lục bài viết và permalink heading được enhance bằng `initArticleToc()`. Nếu sửa logic này, phải kiểm tra bài dài có nhiều heading và bài ngắn có ít heading.

## CSS hiện có

- CSS chính nằm ở `assets/css/site.css`.
- Khi đổi CSS hoặc JS, nên tăng query version trong các file HTML để tránh cache cũ.
- Inline code và code block có màu riêng. Không đưa code block về trắng đen phẳng.
- Code block dùng nền theme Dracula `#282a36`, chữ sáng, keyword hồng, function cyan, string xanh lá, comment xanh xám.
- Biểu đồ kỹ thuật nên dùng SVG trong `assets/images/` khi cần tải xuống hoặc tái sử dụng.
- Mục lục bài viết dùng `.article-toc`, nằm trong `.article-rail`. Không làm rail quá chật, không thêm hiệu ứng nặng và không phá mobile layout.

## Dark mode và màu giao diện

- Dark mode dùng các token màu ở đầu `assets/css/site.css`. Khi thêm block, bài viết hoặc tính năng mới, ưu tiên dùng `var(--ink)`, `var(--paper)`, `var(--soft)`, `var(--muted)`, `var(--line)` và các token semantic sẵn có thay vì viết màu sáng tối riêng trong từng selector.
- Không tạo một bộ CSS dark mode riêng cho từng bài viết. Nội dung mới dùng đúng layout và token chung thì phải tự hoạt động ở cả hai giao diện.
- Nếu thật sự cần màu mới, đặt một token có tên theo vai trò của màu trong `:root`, thêm giá trị tương ứng trong `html[data-theme="dark"]`, rồi dùng token đó ở component. Tránh đặt tên token theo màu cụ thể như `--white` hoặc `--black`.
- `assets/js/theme.js` phải được nạp trong `<head>` trước `site.css` để áp dụng lựa chọn đã lưu mà không chớp nền sáng khi tải trang. Trang HTML mới cần giữ thứ tự này và dùng cùng query version hiện hành.
- Nút chuyển giao diện dùng ô vuông đặc, đen ở light mode và trắng ở dark mode, được tạo tự động trong `.site-nav`. Không hardcode thêm nút ở từng trang.
- Theme lần đầu đi theo `prefers-color-scheme`, sau đó tôn trọng lựa chọn đã lưu. Animation chuyển theme chỉ nội suy token màu, phải tiếp tục tôn trọng `prefers-reduced-motion` và không animate layout.
- Với iframe hoặc widget ngoài như Giscus, đồng bộ theme bằng sự kiện `site:theme-change`. Hình ảnh và SVG có nền riêng có thể giữ nguyên nếu đó là một tài liệu hoặc biểu đồ độc lập, nhưng phải kiểm tra độ tương phản khi đặt trên nền tối.

## Thành tích

- Trang `achievements/index.html` cần giữ đủ các thành tích đã được chuẩn hóa từ file Excel nguồn.
- Không ám ảnh con số trong lời viết. Nếu nhắc số lượng, nhắc vì nó giúp người đọc hiểu độ đầy đủ của dữ liệu.
- Các vai trò cần viết rõ, ví dụ Văn phòng Đoàn Thanh niên và Hội Sinh viên, Chủ nhiệm Đội truyền thông Đoàn trường.

## Quy trình kiểm tra trước khi bàn giao

- Chạy `node --check assets/js/site.js` sau khi sửa JavaScript.
- Nếu sửa script build tiếng Anh, chạy `node --check scripts/build-english.mjs`.
- Chạy `rg -n "tui|NhanAZ.io.vn"` khi thay đổi nội dung tiếng Việt hoặc domain.
- Khi sửa cách gọi tên chủ website, rà lại để không còn tên ngắn một âm tiết đứng riêng trong nội dung, search index, `llms.txt`, `llms-full.txt` và `entity.json`.
- Khi sửa JSON-LD hoặc `entity.json`, parse JSON trước khi bàn giao.
- Chạy `git diff --check` để bắt lỗi whitespace.
- Khi sửa màu, component dùng nền, header, navigation, form, loader, code hoặc embed, kiểm tra cả light mode và dark mode ở desktop lẫn mobile. Bài viết văn bản thông thường không cần thêm CSS riêng cho dark mode.
- Mở local bằng static server nếu thay đổi layout, filter, search, code block, TOC bài viết hoặc embed.
- Khi sửa TOC hoặc layout bài viết, test ít nhất một bài dài trong `posts/`: mục lục phải hiện, bấm mục lục phải đổi URL hash, heading phải hiện đầy đủ sau khi nhảy, bấm heading phải đổi URL hash, mở URL có hash phải cuộn tới đúng đề mục.
- Không commit hoặc push nếu người dùng chưa yêu cầu trong lượt hiện tại.
