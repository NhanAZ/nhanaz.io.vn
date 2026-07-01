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
- Không viết hoa toàn bộ chữ trong giao diện, trừ acronym kỹ thuật bắt buộc như HTML, CSS, API, AI, JSON, ZIP, TAR, AES.
- Không dùng dấu `/` làm ký hiệu phân tách nếu có thể thay bằng ` - ` hoặc dấu chấm.
- Không dùng dấu `;` trong văn bản hiển thị theo kiểu văn phòng. Nếu không phải cú pháp bắt buộc, đổi sang dấu phẩy, dấu chấm hoặc tách câu tự nhiên hơn.
- Không dùng bullet tròn trong nội dung. Danh sách trên web phải dùng dấu `-` hoặc cấu trúc custom tương đương.
- Animation chỉ nên nhẹ, tinh tế và phục vụ cảm giác đọc. Ưu tiên opacity, transform nhỏ, easing mượt và thời lượng ngắn. Không dùng hiệu ứng lố, nhấp nháy, parallax nặng, blur lớn hoặc animation chạy liên tục nếu không thật sự cần.
- Mọi animation phải tôn trọng `prefers-reduced-motion`. Tránh animate các thuộc tính gây layout như width, height, top, left.

## Phong cách viết

- Tiếng Việt dùng “mình”, không dùng “tui” hoặc “tôi” trong nội dung web.
- Giọng viết nên thẳng, đời, có chút khô hài khi hợp ngữ cảnh. Tránh văn phong công ty, văn phong tuyển dụng và văn mẫu A.I.
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
- GEO nên làm cho trang dễ được trích dẫn bằng nguồn rõ, entity map, `llms-full.txt`, link canonical và nội dung có ngữ cảnh. Tránh mọi mẹo thao túng câu trả lời AI.

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

## Thành tích

- Trang `achievements/index.html` cần giữ đủ các thành tích đã được chuẩn hóa từ file Excel nguồn.
- Không ám ảnh con số trong lời viết. Nếu nhắc số lượng, nhắc vì nó giúp người đọc hiểu độ đầy đủ của dữ liệu.
- Các vai trò cần viết rõ, ví dụ Văn phòng Đoàn Thanh niên và Hội Sinh viên, Chủ nhiệm Đội truyền thông Đoàn trường.

## Quy trình kiểm tra trước khi bàn giao

- Chạy `node --check assets/js/site.js` sau khi sửa JavaScript.
- Nếu sửa script build tiếng Anh, chạy `node --check scripts/build-english.mjs`.
- Chạy `rg -n "tui|NhanAZ.io.vn"` khi thay đổi nội dung tiếng Việt hoặc domain.
- Chạy `git diff --check` để bắt lỗi whitespace.
- Mở local bằng static server nếu thay đổi layout, filter, search, code block, TOC bài viết hoặc embed.
- Khi sửa TOC hoặc layout bài viết, test ít nhất một bài dài trong `posts/`: mục lục phải hiện, bấm mục lục phải đổi URL hash, heading phải hiện đầy đủ sau khi nhảy, bấm heading phải đổi URL hash, mở URL có hash phải cuộn tới đúng đề mục.
- Không commit hoặc push nếu người dùng chưa yêu cầu trong lượt hiện tại.
