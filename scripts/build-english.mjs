import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const pages = [
  { source: "index.html", route: "/" },
  { source: "blog/index.html", route: "/blog/" },
  { source: "projects/index.html", route: "/projects/" },
  { source: "vibe-code/index.html", route: "/vibe-code/" },
  { source: "vibe-code/glyph/index.html", route: "/vibe-code/glyph/" },
  { source: "achievements/index.html", route: "/achievements/" },
  { source: "about/index.html", route: "/about/" },
  { source: "posts/chao-internet/index.html", route: "/posts/chao-internet/" },
  { source: "404.html", route: "/404.html", noAlternates: true },
];

const translations = {
  // Shared interface
  "Bỏ qua điều hướng": "Skip to content",
  "NhanAZ - Trang chủ": "NhanAZ - Home",
  "Điều hướng chính": "Main navigation",
  "Bài viết": "Writing",
  "Dự án": "Projects",
  "Dấu mốc": "Milestones",
  "Giới thiệu": "About",
  "Tìm kiếm toàn trang": "Site-wide search",
  "Tìm kiếm": "Search",
  "Tìm bài viết, dự án, vibe-code...": "Search writing, projects, vibe-code...",
  "Set in Space Grotesk": "Set in Space Grotesk",
  "Lên đầu trang ↑": "Back to top ↑",
  "Về trang chủ →": "Back home →",
  "Trang này không tồn tại. Hoặc từng tồn tại rồi đi đâu mất.": "This page does not exist. Or it used to, then wandered off somewhere.",

  // Home metadata and content
  "Website cá nhân của Nguyễn Thành Nhân, còn dùng tên NhanAZ. Nơi lưu bài viết, dự án, Vibe-code, thành tích, open source và những ghi chép về code, Minecraft, PocketMine-MP.": "The personal website of Nguyễn Thành Nhân, also known as NhanAZ. A home for writing, projects, vibe-code, achievements, open source work, and notes on code, Minecraft, and PocketMine-MP.",
  "Website cá nhân của Nguyễn Thành Nhân, còn dùng tên NhanAZ. Code, dự án, Vibe-code, thành tích, open source và những ghi chép đáng giữ lại.": "The personal website of Nguyễn Thành Nhân, also known as NhanAZ. Code, projects, vibe-code, achievements, open source work, and notes worth keeping.",
  "Website cá nhân của Nguyễn Thành Nhân, còn dùng tên NhanAZ. Có bài viết, dự án, Vibe-code và ghi chép cá nhân.": "The personal website of Nguyễn Thành Nhân, also known as NhanAZ, with writing, projects, vibe-code, and personal notes.",
  "Nguyễn Thành Nhân, NhanAZ, NhânAZ, Ghast_Noob, GhastxNoob, thanhnhanaz, nhanhuongloi, nhan0ngu, nhanaz.io.vn, itsnhanaz, PocketMine-MP Việt Nam, Minecraft, open source, Công nghệ thông tin, Vibe-code, AI-assisted coding": "Nguyễn Thành Nhân, NhanAZ, NhânAZ, Ghast_Noob, GhastxNoob, thanhnhanaz, nhanhuongloi, nhan0ngu, nhanaz.io.vn, itsnhanaz, PocketMine-MP Vietnam, Minecraft, open source, Information Technology, Vibe-code, AI-assisted coding",
  "Nguyễn Thành Nhân - NhanAZ - Personal Archive": "Nguyễn Thành Nhân - NhanAZ - Personal Archive",
  "Ghi chép cá nhân - 2026-∞": "Personal notes - 2026-∞",
  "Nhân viết,": "Nhân writes,",
  "làm và lưu lại.": "builds and keeps things.",
  "Một góc nhỏ trên internet cho code, kiến thức, dự án và những ngày bình thường.": "A small corner of the internet for code, knowledge, projects, and ordinary days.",
  "Đôi lời": "A quick hello",
  "Chào, mình là Nguyễn Thành Nhân, còn dùng tên NhanAZ. Đây là góc nhỏ để gom kiến thức, nhật ký, thành tích và những thứ mình đã làm.": "Hi, I’m Nguyễn Thành Nhân, also known as NhanAZ. This is where I gather what I learn, personal notes, milestones, and the things I make.",
  "Nơi ở": "Based in",
  "Việt Nam": "Vietnam",
  "Tập trung": "Focused on",
  "Học, làm, chia sẻ": "Learning, making, sharing",
  "Trạng thái": "Status",
  "đang online": "online",
  "Đọc thêm về mình": "More about me",
  "Chủ đề của trang": "Topics on this site",
  "Giới thiệu ngắn": "Short introduction",
  "Nhật ký": "Journal",
  "Kiến thức": "Knowledge",
  "Đời thường": "Everyday life",
  "01 - Ghi chép": "01 - Notes",
  "Ghi chép gần đây": "Recent notes",
  "Chào internet, mình dựng lại căn nhà này": "Hello internet, I rebuilt this little home",
  "Ghi chú": "Note",
  "Bài tiếp theo đang được viết": "The next post is being written",
  "Xem toàn bộ bài viết": "See all writing",
  "02 - Dự án": "02 - Projects",
  "Dự án đã chọn": "Selected projects",
  "Thiết kế &amp; phát triển web": "Web design &amp; development",
  "Đồ án tốt nghiệp Thiết kế đồ họa": "Graphic Design graduation project",
  "Thử nghiệm cá nhân": "Personal experiments",
  "Đang tổng hợp": "Still gathering",
  "Sắp có": "Coming soon",
  "Xem hồ sơ dự án": "See all projects",
  "03 - Vibe-code": "03 - Vibe-code",
  "Project dựng bằng nhịp thử nhanh": "Projects built at the speed of trying",
  "Một góc riêng cho những project được kéo ra từ ý tưởng, AI, vài lượt sửa tay và một chút cảm giác “để thử coi sao”. Mỗi bài là một câu chuyện ngắn, kể vì sao làm, phần nào AI giúp, phần nào mình tự quyết và thứ gì đáng giữ lại sau khi xong.": "A corner for projects pulled together from an idea, AI, a few manual passes, and the feeling of ‘let’s see if this works’. Each post is a short story about why I made it, where AI helped, what I decided myself, and what remained worth keeping.",
  "Minecraft Bedrock custom emoji tool": "Minecraft Bedrock custom emoji tool",
  "Mở mục Vibe-code": "Open Vibe-code",
  "04 - Dấu mốc": "04 - Milestones",
  "2,5 năm cao đẳng": "2.5 years at college",
  "Giỏi": "Good",
  "tốt nghiệp ngành Công nghệ thông tin": "Information Technology graduate",
  "5 Tốt": "Five-Good Student",
  "hai năm liền cấp Trường": "college-level recognition, two years running",
  "Đoàn trường": "College Youth Union",
  "Ủy viên Ban Thường vụ nhiệm kỳ 2025-2027": "Standing Committee Member, 2025-2027 term",
  "Từ cộng tác viên Văn phòng Đoàn Thanh niên và Hội Sinh viên đến Ủy viên Ban Thường vụ Đoàn trường. Từ Sinh viên 5 Tốt hai năm liền đến tốt nghiệp ngành Công nghệ thông tin loại Giỏi.": "From a collaborator in the Youth Union and Students’ Association Office to a member of the College Youth Union Standing Committee. From earning the Five-Good Student title twice to graduating in Information Technology with a Good classification.",
  "Xem thành tích": "See the full record",
  "05 - Nguyên tắc": "05 - A principle",
  "“Học được gì,": "“Whatever I learn,",
  "viết lại cái đó.": "I write it down.",
  "Không cố tỏ ra biết hết. Chỉ cố hiểu thêm một chút, làm ra một thứ, rồi để lại ghi chú đủ rõ cho người đến sau - kể cả người đó là mình của vài tháng tới.": "I do not try to look like I know everything. I try to understand a little more, make something, and leave notes clear enough for whoever comes next - even if that person is me a few months later.",
  "Có gì hay thì nói nha.": "Found something interesting? Tell me.",

  // Blog index
  "Bài viết của Nguyễn Thành Nhân, NhanAZ, về code, việc học, dự án cá nhân và đời thường.": "Writing by Nguyễn Thành Nhân, NhanAZ, about code, learning, personal projects, and everyday life.",
  "Bài viết của Nguyễn Thành Nhân - NhanAZ": "Writing by Nguyễn Thành Nhân - NhanAZ",
  "Code, việc học, dự án cá nhân và vài suy nghĩ đáng giữ lại.": "Code, learning, personal projects, and a few thoughts worth keeping.",
  "Bài viết - Nguyễn Thành Nhân - NhanAZ": "Writing - Nguyễn Thành Nhân - NhanAZ",
  "Kiến thức đã kiểm chứng, nhật ký chưa tô màu và vài suy nghĩ còn đang lớn.": "Checked knowledge, unpolished journal entries, and a few thoughts still taking shape.",
  "Tất cả - mới nhất trước": "All - newest first",
  "01 bài": "01 post",
  "3 phút": "3 min",
  "Kho lưu trữ còn rộng. Mình sẽ lấp đầy nó từ từ, bằng những thứ đáng giữ lại.": "There is plenty of room in this archive. I will fill it slowly, with things worth keeping.",
  "Viết để nhớ.": "Write it down to remember.",
  "Danh sách bài viết": "List of posts",

  // Projects
  "Dự án của Nguyễn Thành Nhân, NhanAZ, gồm website nhanaz.io.vn, Connect Brandbook và các thử nghiệm cá nhân.": "Projects by Nguyễn Thành Nhân, NhanAZ, including nhanaz.io.vn, Connect Brandbook, and personal experiments.",
  "Dự án của Nguyễn Thành Nhân - NhanAZ": "Projects by Nguyễn Thành Nhân - NhanAZ",
  "Website cá nhân, Connect Brandbook và những thử nghiệm đủ tự tin để kể lại.": "A personal website, Connect Brandbook, and experiments I am ready to talk about.",
  "Dự án - Nguyễn Thành Nhân - NhanAZ": "Projects - Nguyễn Thành Nhân - NhanAZ",
  "Những thứ mình đã làm, đang làm và đủ tự tin để kể lại cả quá trình.": "Things I have made, things I am making, and the process behind them.",
  "Căn nhà số của mình. Một blog, một hồ sơ cá nhân và một chỗ để các dự án không biến mất trong những thư mục mang tên": "My home on the internet. A blog, a personal profile, and a place where projects do not disappear into folders named",
  "Vai trò": "Role",
  "Thiết kế &amp; phát triển": "Design &amp; development",
  "Đang hoạt động": "Live",
  "Định hướng": "Direction",
  "Nhanh, rõ, không thừa": "Fast, clear, no clutter",
  "Mình học Công nghệ thông tin, nhưng đồ án tốt nghiệp lại rẽ sang Thiết kế đồ họa. Đây là brandbook Connect, được 9.5 điểm. Hồi đó thầy (Cố vấn Học tập) có hỏi mình “Có chọn nhầm chuyên ngành không?” Mình nhớ câu đó tới giờ, một phần vì vui, một phần vì đúng là mình cũng hay lạc qua mấy thứ liên quan tới hình ảnh và cách kể chuyện.": "I studied Information Technology, but my graduation project took a turn into Graphic Design. This is the Connect brandbook, graded 9.5 out of 10. Back then, my academic adviser asked, ‘Did you choose the wrong major?’ I still remember it - partly because it was funny, and partly because I do keep wandering into visual work and storytelling.",
  "Đang tải brandbook...": "Loading the brandbook...",
  "Mở Connect Brandbook trên Canva ↗": "Open Connect Brandbook on Canva ↗",
  "Connect Brandbook trên Canva": "Connect Brandbook on Canva",
  "Loại": "Type",
  "Đồ án tốt nghiệp": "Graduation project",
  "Mảng": "Field",
  "Thiết kế đồ họa": "Graphic Design",
  "Điểm": "Grade",
  "Cách xem": "Viewing",
  "Xem trực tiếp trên trang.": "View it directly on this page.",
  "003 . Sắp có": "003 . Coming soon",
  "Những công cụ nhỏ, ý tưởng hơi kỳ và các lần thử công nghệ mới sẽ sống ở đây - kể cả khi kết quả chưa hoàn hảo.": "Small tools, slightly odd ideas, and experiments with new technology will live here - even when the result is not perfect.",
  "Đang xây": "In progress",
  "Cá nhân": "Personal",
  "Làm rồi hẵng nói.": "Make it first, talk later.",
  "Xem GitHub ↗": "View GitHub ↗",

  // Vibe-code index
  "Vibe-code của Nguyễn Thành Nhân, NhanAZ. Những câu chuyện ngắn về project được dựng nhanh với AI, code, thử nghiệm và các quyết định còn giữ lại sau khi làm xong.": "Vibe-code by Nguyễn Thành Nhân, NhanAZ. Short stories about projects built quickly with AI, code, experiments, and the decisions that survived the process.",
  "Nguyễn Thành Nhân, NhanAZ, Vibe-code, vibe coding, AI project, AI-assisted coding, project cá nhân, open source, GitHub": "Nguyễn Thành Nhân, NhanAZ, Vibe-code, vibe coding, AI project, AI-assisted coding, personal project, open source, GitHub",
  "Vibe-code của Nguyễn Thành Nhân - NhanAZ": "Vibe-code by Nguyễn Thành Nhân - NhanAZ",
  "Những câu chuyện ngắn về project được dựng nhanh với AI, code và vài lượt sửa tay.": "Short stories about projects built quickly with AI, code, and a few manual passes.",
  "Mấy project được dựng bằng nhịp thử nhanh với AI, code, cảm giác và những lần sửa tay cho tới khi nó thành thứ dùng được.": "Projects built through quick experiments with AI, code, instinct, and manual fixes until they become something useful.",
  "Cách kể": "How I tell it",
  "Mỗi project là một câu chuyện ngắn": "Each project gets a short story",
  "Mình không muốn mục này chỉ là nơi khoe “có dùng AI”. Phần đáng kể hơn là project bắt đầu từ đâu, AI đã đẩy nhanh đoạn nào, mình phải sửa gì, chỗ nào fail, và cuối cùng còn giữ lại được gì.": "I do not want this section to exist just to say, ‘AI was used here’. The better story is where a project began, what AI sped up, what I had to fix, where it failed, and what was still worth keeping at the end.",
  "Vibe-code ở đây là kiểu làm nhanh nhưng không làm ẩu. Có thể bắt đầu bằng một prompt, một repo rỗng hoặc một ý tưởng hơi buồn cười, nhưng bài đăng sau cùng vẫn phải kể được vì sao nó tồn tại.": "Vibe-code here means moving quickly without being careless. It may start with a prompt, an empty repository, or a slightly silly idea, but the finished post should still explain why the project exists.",
  "Câu chuyện project": "Project stories",
  "glyph, một tool sinh ra vì sợ một trang wiki biến mất": "glyph, a tool born from the fear that a wiki might disappear",
  "Một công cụ nhỏ cho Minecraft Bedrock custom emoji, bắt đầu từ nhu cầu cá nhân rồi được Bedrock Wiki giới thiệu lại cho cộng đồng quốc tế.": "A small tool for Minecraft Bedrock custom emoji, built for a personal need and later recommended by Bedrock Wiki to its international community.",
  "Được nhắc ở": "Featured by",
  "Mấy project tiếp theo sẽ lên dần ở đây. Mỗi bài một chuyện nhỏ, không cần tỏ ra hoành tráng, miễn là có thứ đáng kể lại.": "More projects will show up here over time. One small story per post; it does not need to sound grand as long as there is something worth telling.",
  "Thử nhanh, ghi lại kỹ.": "Try quickly, document carefully.",

  // glyph article metadata and content
  "Câu chuyện về glyph, project vibe-code của NhanAZ cho Minecraft Bedrock custom emoji, từ nhu cầu cá nhân đến khi được Bedrock Wiki giới thiệu.": "The story of glyph, NhanAZ’s vibe-code project for Minecraft Bedrock custom emoji, from a personal need to a recommendation by Bedrock Wiki.",
  "glyph, một tool sinh ra vì sợ một trang wiki biến mất": "glyph, a tool born from the fear that a wiki might disappear",
  "Từ một nhu cầu cá nhân trong Minecraft Bedrock đến khi được Bedrock Wiki giới thiệu cho cộng đồng quốc tế.": "From a personal Minecraft Bedrock need to a recommendation by Bedrock Wiki for its international community.",
  "glyph, một tool sinh ra vì sợ một trang wiki biến mất - Vibe-code - NhanAZ": "glyph, a tool born from the fear that a wiki might disappear - Vibe-code - NhanAZ",
  "5 phút đọc": "5 min read",
  "glyph, một tool sinh ra vì sợ một trang wiki biến mất.": "glyph, a tool born from the fear that a wiki might disappear.",
  "Có vài project bắt đầu bằng một nỗi lo rất nhỏ. Với glyph, nỗi lo đó là nếu một ngày trang hướng dẫn quen thuộc không còn chạy nữa thì mình vẫn có một công cụ để dùng.": "Some projects begin with a very small worry. With glyph, it was the thought that if a familiar guide stopped working one day, I would still have a tool of my own to use.",
  "← Vibe-code": "← Vibe-code",
  "là một trong những project vibe-code thành công nhất của mình, ít nhất là trong phần cộng đồng Minecraft Bedrock mà mình chạm tới. Nó không bắt đầu như một sản phẩm lớn. Nó bắt đầu từ một nhu cầu cá nhân rất cụ thể.": "is one of my most successful vibe-code projects, at least within the part of the Minecraft Bedrock community I have reached. It did not begin as a big product. It began with one very specific personal need.",
  "Hồi đó mình hay xem bài Custom Emojis của Bedrock Wiki. Bài đó hướng dẫn cách dùng glyph atlas để làm emoji riêng trong Minecraft Bedrock. Mình sợ một ngày wiki hoặc công cụ chuyển đổi trong đó không còn hoạt động nữa, nên làm một bản riêng để tự dùng cho chắc. Nghĩ đơn giản vậy thôi, rồi vibe ra một tool.": "I used to keep the Bedrock Wiki Custom Emojis guide close at hand. It explains how glyph atlases can be used to add custom emoji to Minecraft Bedrock. I worried that the wiki or its converter might stop working someday, so I made my own version to be safe. That was the whole idea, and then I vibed a tool into existence.",
  "Vấn đề của custom emoji trong Bedrock": "The custom emoji problem in Bedrock",
  "Trong Minecraft Bedrock, custom emoji thường đi qua những file kiểu": "In Minecraft Bedrock, custom emoji usually live in files such as",
  "hoặc các vùng code point riêng. Mỗi file là một lưới glyph, mỗi ô trong lưới gắn với một ký tự. Khi muốn đưa emoji vào game, người làm resource pack phải biết emoji đó nằm ở ô nào và copy đúng ký tự tương ứng.": "or in private code point ranges. Each file is a glyph grid, and each cell maps to a character. To put an emoji in the game, a resource-pack creator needs to know which cell it occupies and copy the matching character.",
  "Nghe thì không quá khó, nhưng lúc làm thật rất dễ lạc. Nhầm prefix, nhầm hàng, nhầm cột hoặc nhầm ký tự là vào game không hiện đúng thứ mình muốn. Với người làm server, pack hoặc addon, một công cụ nhỏ để nhìn atlas, đổi qua lại giữa mã hex và ký tự, rồi copy nhanh là đủ tiết kiệm khá nhiều thời gian.": "It does not sound too difficult, but it is easy to get lost while doing it. One wrong prefix, row, column, or character and the game displays the wrong thing. For people building servers, packs, or add-ons, a small tool that can inspect an atlas, convert between hex and characters, and copy them quickly saves a surprising amount of time.",
  "glyph làm gì": "What glyph does",
  "Repo mô tả glyph là một bộ công cụ tĩnh, chạy ở phía trình duyệt để tạo và chỉnh glyph atlas 16x16 cho Minecraft. Nó không có backend, nên mọi thứ diễn ra ngay trong browser của người dùng.": "The repository describes glyph as a static, client-side toolkit for creating and editing 16x16 Minecraft glyph atlases. There is no backend; everything happens in the user’s browser.",
  "Tạo lưới 256 ký tự từ prefix hex như": "Generate a 256-character grid from a hex prefix such as",
  "Mở template, atlas trống hoặc atlas ví dụ.": "Open a template, an empty atlas, or an example atlas.",
  "Tải lên file": "Upload a",
  "để xem từng ô, xóa, thay thế, copy hoặc tải riêng một cell.": "file to inspect each cell, clear it, replace it, copy it, or download it separately.",
  "Chuyển đổi qua lại giữa code point dạng hex và ký tự thật.": "Convert between hexadecimal code points and actual characters.",
  "Xuất atlas, hàng ký tự, reference text, font JSON và metadata JSON.": "Export the atlas, character rows, reference text, font JSON, and metadata JSON.",
  "Thay glyph bằng texture Minecraft có sẵn trong tool.": "Replace a glyph with a Minecraft texture bundled in the tool.",
  "Điểm mình thích ở project này là nó không cố làm quá nhiều thứ ngoài nhu cầu. Nó đứng đúng chỗ của nó, là một tool nhỏ cho một vấn đề nhỏ, nhưng vấn đề đó lại xuất hiện khá thường xuyên với người làm custom emoji.": "What I like about this project is that it does not try to grow beyond the need. It stays in its lane - a small tool for a small problem, one that happens surprisingly often when people work with custom emoji.",
  "Từ tool cá nhân đến Bedrock Wiki": "From a personal tool to Bedrock Wiki",
  "Khúc vui nhất là sau này mấy dev của Bedrock Wiki biết tới glyph và đưa nó vào bài Custom Emojis. Trong phần hướng dẫn lấy ký tự để dùng emoji trong game, wiki gợi ý thêm Glyph Web Tool của @NhanAZ bên cạnh một website tra unicode khác.": "The best part came later, when Bedrock Wiki’s developers found glyph and added it to the Custom Emojis guide. In the section about getting characters for in-game emoji, the wiki recommends the Glyph Web Tool by @NhanAZ alongside another Unicode lookup site.",
  "Vậy là tool vốn được làm vì sợ wiki biến mất lại quay ngược về wiki, trở thành một trong những link được đề xuất cho người đọc. Từ đó glyph không còn chỉ là đồ mình tự giữ cho mình nữa. Người làm Minecraft Bedrock ở cộng đồng quốc tế có thể gặp nó rất tự nhiên khi đang đọc tài liệu.": "So the tool I made because I feared the wiki might disappear ended up back on that very wiki as a recommended link. From then on, glyph was no longer something I kept just for myself. Minecraft Bedrock creators around the world could come across it naturally while reading the documentation.",
  "Một đường vòng qua PocketMine-MP": "A detour through PocketMine-MP",
  "Ngoài Bedrock Wiki, glyph còn được cộng đồng PocketMine-MP trên Discord đưa vào danh sách link hữu ích. Cái này không giống một lần ra mắt hoành tráng. Nó giống kiểu một tool đủ hữu dụng nên được nhặt lên, đặt vào đúng chỗ, rồi người cần thì tự tìm thấy.": "Beyond Bedrock Wiki, glyph was also added to a useful-links list maintained by the PocketMine-MP community on Discord. It was not a grand launch. It was more like a tool proving useful enough to be picked up, placed where it belonged, and found by whoever needed it.",
  "Mình thích kiểu được biết đến như vậy hơn. Không cần quảng cáo ồn ào. Một công cụ nhỏ nằm trong danh sách hữu ích của đúng cộng đồng cần nó là đã đủ vui rồi.": "I prefer being found that way. No loud promotion. A small tool sitting in the useful-links list of the community that actually needs it is already a lovely outcome.",
  "Vì sao nó là vibe-code đúng nghĩa": "Why it is vibe-code in the truest sense",
  "glyph là một project rất đúng tinh thần vibe-code của mình. Có nhu cầu thật, scope đủ nhỏ để bắt đầu ngay, làm nhanh để tự dùng trước, rồi sửa dần theo cách mình muốn cho tới khi nó đủ ổn cho người khác dùng cùng.": "glyph fits my idea of vibe-code almost perfectly. There was a real need, the scope was small enough to start immediately, and I built it quickly for myself before shaping it little by little until it was solid enough for other people to use.",
  "Khi có nhiều người biết tới hơn, tool cũng phải chạy theo nhu cầu thật. Những phần như export, metadata, font JSON, texture picker hoặc script lấy texture từ Mojang bedrock-samples đều là cách để tool bớt là một bản thử nghiệm và giống một thứ có thể giữ lâu hơn.": "As more people found it, the tool had to follow real needs. Export options, metadata, font JSON, a texture picker, and the script that pulls textures from Mojang’s bedrock-samples all helped it grow beyond an experiment into something worth maintaining.",
  "Link để xem": "Links",
  "Source code trên GitHub": "Source code on GitHub",
  "Bản chạy trực tiếp trên GitHub Pages": "Live version on GitHub Pages",
  "Trang Custom Emojis của Bedrock Wiki": "Bedrock Wiki’s Custom Emojis guide",
  "Còn nhiều project để kể.": "There are more projects to talk about.",
  "Vibe-code khác →": "More Vibe-code →",

  // Achievements metadata and overview
  "Thành tích học tập, hoạt động Đoàn Thanh niên, Hội Sinh viên và tình nguyện của Nguyễn Thành Nhân tại Trường Cao đẳng bán công Công nghệ và Quản trị Doanh nghiệp.": "Academic achievements, Youth Union and Students’ Association work, and volunteer activities by Nguyễn Thành Nhân at the College of Technology and Industrial Management.",
  "Dấu mốc của Nguyễn Thành Nhân - NhanAZ": "Milestones of Nguyễn Thành Nhân - NhanAZ",
  "Thành tích học tập, hoạt động Đoàn Thanh niên, Hội Sinh viên và tình nguyện của Nguyễn Thành Nhân.": "Academic achievements, Youth Union and Students’ Association work, and volunteer activities by Nguyễn Thành Nhân.",
  "Thành tích học tập, hoạt động Đoàn Thanh niên, Hội Sinh viên và tình nguyện.": "Academic achievements, Youth Union and Students’ Association work, and volunteer activities.",
  "Dấu mốc - Nguyễn Thành Nhân - NhanAZ": "Milestones - Nguyễn Thành Nhân - NhanAZ",
  "Thành tích, vai trò và những lần được ghi nhận trong thời gian học ngành Công nghệ thông tin tại Trường Cao đẳng bán công Công nghệ và Quản trị Doanh nghiệp.": "Achievements, responsibilities, and recognition earned while studying Information Technology at the College of Technology and Industrial Management.",
  "Tổng quan thành tích": "Achievement overview",
  "Tốt nghiệp ngành Công nghệ thông tin": "Information Technology graduate",
  "2 năm": "2 years",
  "Sinh viên 5 Tốt cấp Trường": "College-level Five-Good Student",
  "Cấp Thành phố": "City level",
  "Bằng khen Xuân tình nguyện 2025": "Spring Volunteer Campaign 2025 Certificate of Merit",
  "Nhìn lại": "Looking back",
  "Từ học tập đến hoạt động": "From the classroom to community work",
  "Mình bắt đầu từ những việc nhỏ ở Văn phòng Đoàn Thanh niên và Hội Sinh viên của trường, sau đó làm truyền thông, tham gia tình nguyện, vào Ban Chấp hành Đoàn trường rồi đến Ban Thường vụ Đoàn trường.": "I started with small tasks in the college’s Youth Union and Students’ Association Office. From there I moved into communications, volunteer work, the Youth Union Executive Committee, and eventually its Standing Committee.",
  "Song song với hoạt động, mình vẫn giữ phần học tập và rèn luyện đủ chắc. Mình đạt Sinh viên 5 Tốt cấp Trường hai năm liền, có kết quả học tập Giỏi và Xuất sắc qua các năm, rồi tốt nghiệp ngành Công nghệ thông tin loại Giỏi.": "Alongside that work, I kept my academic results and conduct on track. I earned the college-level Five-Good Student title two years in a row, achieved Good and Excellent academic results across the program, and graduated in Information Technology with a Good classification.",
  "Mốc nổi bật": "Highlights",
  "Các dấu mốc chính": "Key milestones",
  "Cộng tác viên Văn phòng Đoàn Thanh niên và Hội Sinh viên": "Collaborator, Youth Union and Students’ Association Office",
  "Vai trò đầu tiên. Nhỏ thôi, nhưng là chỗ mình bắt đầu học cách làm việc trong một tập thể.": "My first role. It was a small one, but it was where I began learning how to work as part of a team.",
  "Cán bộ Văn phòng Đoàn Thanh niên và Hội Sinh viên": "Staff Member, Youth Union and Students’ Association Office",
  "Sau giai đoạn cộng tác viên, mình được công nhận ở vai trò cán bộ Văn phòng, bắt đầu gắn với việc tổ chức và vận hành nhiều hơn.": "After my time as a collaborator, I became an Office staff member and took on more of the organizing and day-to-day work.",
  "Văn phòng": "Office",
  "Học tập Giỏi, rèn luyện Xuất sắc": "Good academic performance, Excellent conduct",
  "Năm đầu không chỉ đi hoạt động. Mình vẫn giữ được kết quả học tập và rèn luyện đàng hoàng.": "The first year was not only about activities. I also maintained solid academic and conduct results.",
  "Học tập": "Academic",
  "Ủy viên Ban Chấp hành Đoàn trường": "College Youth Union Executive Committee Member",
  "Từ người phụ một phần việc thành người có tên trong Ban Chấp hành, bắt đầu phải nghĩ xa hơn phần của mình.": "I moved from helping with individual tasks to joining the Executive Committee, where I had to think beyond my own piece of the work.",
  "Chủ nhiệm Đội truyền thông Đoàn trường": "Lead, College Youth Union Media Team",
  "Mốc chuyển rõ sang phần truyền thông, nơi mình phụ trách cách hoạt động của Đoàn trường được kể lại và xuất hiện trước mọi người.": "This marked a clear move into communications, where I took responsibility for how the Youth Union’s work was documented and presented.",
  "Truyền thông": "Media",
  "Một danh hiệu khó giữ nếu chỉ mạnh một phía. Mình xem đây là mốc cân bằng giữa học, rèn luyện và tham gia.": "It is hard to earn this title by being strong in only one area. To me, it marks a balance between study, conduct, and participation.",
  "Bằng khen cấp Thành phố trong Chiến dịch Xuân tình nguyện": "City-level Certificate of Merit in the Spring Volunteer Campaign",
  "Một trong những ghi nhận lớn nhất của mình ở mảng tình nguyện, sau Chiến dịch Xuân tình nguyện lần thứ 17 năm 2025.": "One of my most significant recognitions in volunteer work, following the 17th Spring Volunteer Campaign in 2025.",
  "Quay lại đúng nơi bắt đầu, nhưng lần này ở một vai trò nặng hơn và phải tự chủ hơn.": "I returned to where I started, this time with more responsibility and much more independence.",
  "Sinh viên 5 Tốt hai năm liền": "Five-Good Student, two years running",
  "Không phải một lần may mắn. Mình giữ được danh hiệu này qua hai năm học liên tiếp.": "It was not a one-off. I maintained the title across two consecutive academic years.",
  "Ủy viên Ban Thường vụ Đoàn trường": "College Youth Union Standing Committee Member",
  "Mốc trách nhiệm cao hơn trong nhiệm kỳ 2025-2027, sau thời gian làm ở Ban Chấp hành Đoàn trường.": "A step into greater responsibility for the 2025-2027 term, after serving on the Youth Union Executive Committee.",
  "Ban Thường vụ": "Standing Committee",
  "Tốt nghiệp ngành Công nghệ thông tin loại Giỏi": "Graduated in Information Technology with a Good classification",
  "Kết thúc phần học chính quy tại Trường Cao đẳng bán công Công nghệ và Quản trị Doanh nghiệp, kèm danh hiệu kỹ sư thực hành.": "Completed the formal program at the College of Technology and Industrial Management and received the title of Practice Engineer.",
  "Tốt nghiệp": "Graduation",
  "Khép khóa với học tập Giỏi, rèn luyện Xuất sắc": "Finished the program with Good academics and Excellent conduct",
  "Mốc cuối khóa ghi nhận kết quả học tập Giỏi và rèn luyện Xuất sắc cho cả giai đoạn 2023-2026.": "The final recognition for Good academic performance and Excellent conduct across the 2023-2026 program.",
  "Khóa học": "Program",
  "Danh sách thành tích": "Achievement list",
  "Những lần được ghi nhận": "Full record",
  "Tìm và lọc thành tích": "Search and filter achievements",
  "Nhập tên hoạt động, danh hiệu, đơn vị...": "Search by activity, recognition, or organization...",
  "Nhóm": "Category",
  "Tất cả nhóm": "All categories",
  "Công tác Đoàn Thanh niên và Hội Sinh viên": "Youth Union and Students’ Association work",
  "Học tập &amp; rèn luyện": "Academics &amp; conduct",
  "Kỹ năng &amp; hội nhập": "Skills &amp; engagement",
  "Tình nguyện &amp; cộng đồng": "Volunteering &amp; community",
  "Năm": "Year",
  "Tất cả năm": "All years",
  "Sắp xếp": "Sort",
  "Theo danh sách gốc": "Original order",
  "Mới nhất trước": "Newest first",
  "Cũ nhất trước": "Oldest first",
  "Đang hiển thị đầy đủ.": "Showing all entries.",
  "Đặt lại": "Reset",
  "Không thấy mục nào khớp. Thử đổi từ khóa hoặc bỏ bớt bộ lọc.": "No matching entries. Try another keyword or clear a filter.",

  // Achievement records
  "Hoàn thành tốt nhiệm vụ tình nguyện viên Trung thu yêu thương 2023": "Successfully completed volunteer duties for Trung thu yêu thương 2023",
  "Thư ký Ban Chỉ huy Chiến dịch Xuân tình nguyện 2024": "Secretary to the Command Board, Spring Volunteer Campaign 2024",
  "Thành viên Ban Tổ chức Tháng Thanh niên 2024": "Organizing Committee Member, Youth Month 2024",
  "Hoàn thành xuất sắc nhiệm vụ Chiến dịch Xuân tình nguyện lần thứ 8 năm 2024": "Outstanding completion of duties in the 8th Spring Volunteer Campaign 2024",
  "Thành tích xuất sắc trong Tháng Thanh niên 2024": "Outstanding achievements during Youth Month 2024",
  "Phụ trách Đội hình Truyền thông chương trình Trung thu yêu thương 2024": "Media Team Lead for Trung thu yêu thương 2024",
  "Sinh viên học tập Giỏi, rèn luyện Xuất sắc năm học 2023 - 2024": "Good academic performance and Excellent conduct, 2023 - 2024 academic year",
  "Ủy viên Ban Chấp hành Đoàn trường nhiệm kỳ 2023 - 2025": "College Youth Union Executive Committee Member, 2023 - 2025 term",
  "Chủ nhiệm Đội truyền thông": "Youth Union Media Team Lead",
  "Cán bộ Đoàn giỏi năm 2024": "Outstanding Youth Union Officer 2024",
  "Trưởng Ban Truyền thông chương trình Trung thu yêu thương 2024": "Head of Media for Trung thu yêu thương 2024",
  "Chỉ huy Phó Chiến dịch Xuân tình nguyện 2025": "Deputy Commander, Spring Volunteer Campaign 2025",
  "Sinh viên 5 Tốt cấp Trường năm học 2023 - 2024": "College-level Five-Good Student, 2023 - 2024 academic year",
  "Giấy khen Sinh viên 5 Tốt cấp Trường năm học 2023 - 2024": "College Certificate of Merit for Five-Good Student, 2023 - 2024 academic year",
  "Thành tích xuất sắc trong công tác Đoàn và phong trào thanh niên năm học 2023 - 2024": "Outstanding achievements in Youth Union work and youth activities, 2023 - 2024 academic year",
  "Hoàn thành xuất sắc nhiệm vụ tại Chiến dịch Xuân tình nguyện xã Thạnh Phú Đông 2025": "Outstanding completion of duties in the Thạnh Phú Đông Commune Spring Volunteer Campaign 2025",
  "Bằng khen cấp Thành phố trong Chiến dịch Xuân tình nguyện lần thứ 17 năm 2025": "City-level Certificate of Merit in the 17th Spring Volunteer Campaign 2025",
  "Thanh niên khỏe năm học 2024 - 2025": "Healthy Youth recognition, 2024 - 2025 academic year",
  "Hoàn thành xuất sắc nhiệm vụ Chiến dịch Xuân tình nguyện 2025": "Outstanding completion of duties in the Spring Volunteer Campaign 2025",
  "Giấy khen của trường về Chiến dịch Xuân tình nguyện 2025": "College Certificate of Merit for the Spring Volunteer Campaign 2025",
  "Thành tích xuất sắc trong Chiến dịch Xuân tình nguyện 2025": "Outstanding achievements in the Spring Volunteer Campaign 2025",
  "Chánh Văn phòng Đoàn Thanh niên và Hội Sinh viên": "Chief of the Youth Union and Students’ Association Office",
  "Hoàn thành khóa Tập huấn Kỹ năng AI dành cho cán bộ Đoàn Thanh niên và Hội Sinh viên": "Completed AI Skills Training for Youth Union and Students’ Association officers",
  "Hoàn thành xuất sắc nhiệm vụ trong Tháng Thanh niên 2025": "Outstanding completion of duties during Youth Month 2025",
  "Cán bộ Đoàn tiêu biểu năm học 2024 - 2025": "Exemplary Youth Union Officer, 2024 - 2025 academic year",
  "Thanh niên tiên tiến làm theo lời Bác năm học 2024 - 2025": "Outstanding Youth Following President Ho Chi Minh’s Example, 2024 - 2025 academic year",
  "Đồng hành hoạt động gây quỹ Chiến dịch 30k cùng Mùa hè xanh 2025": "Supported the 30k cùng Mùa hè xanh 2025 fundraising campaign",
  "Đóng góp gây quỹ Trung thu yêu thương - Ánh trăng nụ cười 2025": "Contributed to the Trung thu yêu thương - Ánh trăng nụ cười 2025 fundraiser",
  "Sinh viên học tập Xuất sắc, rèn luyện Xuất sắc năm học 2024 - 2025": "Excellent academic performance and Excellent conduct, 2024 - 2025 academic year",
  "Thành viên Ban Tổ chức Trung thu yêu thương 2025 tại phường Long An": "Organizing Committee Member for Trung thu yêu thương 2025 in Long An Ward",
  "Sinh viên 5 Tốt cấp Trường năm học 2024 - 2025": "College-level Five-Good Student, 2024 - 2025 academic year",
  "Sinh viên 5 Tốt cấp Trường hai năm liền": "College-level Five-Good Student, two years running",
  "Giấy khen Sinh viên 5 Tốt cấp Trường năm học 2024 - 2025": "College Certificate of Merit for Five-Good Student, 2024 - 2025 academic year",
  "Giấy khen Sinh viên 5 Tốt cấp Trường hai năm liền": "College Certificate of Merit for Five-Good Student, two years running",
  "Hoàn thành cấp độ Sơ cấp về Hành vi tài chính": "Completed the Basic Level in Financial Behavior",
  "Hoàn thành cấp độ Sơ cấp về Kiến thức tài chính": "Completed the Basic Level in Financial Knowledge",
  "Hoàn thành cấp độ Sơ cấp về Thái độ tài chính": "Completed the Basic Level in Financial Attitude",
  "Tham gia ủng hộ chiến dịch Góp Tết Biên Cương - Xuân Tình nguyện 2026": "Contributed to the Góp Tết Biên Cương - Spring Volunteer 2026 campaign",
  "Đóng góp kinh phí thực hiện Chiến dịch Xuân Tình nguyện lần thứ 18 năm 2026": "Financial contribution to the 18th Spring Volunteer Campaign 2026",
  "Hoàn thành hoạt động hội nhập 5 Tốt Challenges": "Completed the Five-Good Challenges engagement activity",
  "Ủy viên Ban Thường vụ Đoàn trường nhiệm kỳ 2025 - 2027": "College Youth Union Standing Committee Member, 2025 - 2027 term",
  "Thành tích xuất sắc trong công tác Đoàn và phong trào thanh niên năm học 2024 - 2025": "Outstanding achievements in Youth Union work and youth activities, 2024 - 2025 academic year",
  "Bằng tốt nghiệp Cao đẳng ngành Công nghệ thông tin loại Giỏi": "College Diploma in Information Technology, Good classification",
  "Sinh viên học tập Giỏi, rèn luyện Xuất sắc khóa học 2023 - 2026": "Good academic performance and Excellent conduct for the 2023 - 2026 program",
  "Đoàn trường Cao đẳng bán công Công nghệ và Quản trị Doanh nghiệp": "CTIM College Youth Union",
  "Trường Cao đẳng bán công Công nghệ và Quản trị Doanh nghiệp": "College of Technology and Industrial Management (CTIM)",
  "Ban Thường vụ Đoàn trường Cao đẳng bán công Công nghệ và Quản trị Doanh nghiệp": "Standing Committee of the CTIM College Youth Union",
  "Đoàn Ban Quản lý Các Khu chế xuất và Công nghiệp Thành phố Hồ Chí Minh": "Youth Union of the Ho Chi Minh City Export Processing and Industrial Zones Authority",
  "Đoàn Thanh niên Cộng sản Hồ Chí Minh xã Thạnh Phú Đông, tỉnh Bến Tre": "Ho Chi Minh Communist Youth Union of Thạnh Phú Đông Commune, Bến Tre Province",
  "Hội Sinh viên Việt Nam Thành phố Hồ Chí Minh": "Vietnamese Students’ Association of Ho Chi Minh City",
  "Trung ương Đoàn Thanh niên Cộng sản Hồ Chí Minh": "Central Committee of the Ho Chi Minh Communist Youth Union",
  "Câu lạc bộ Vòng Tay Lớn Thành phố Hồ Chí Minh": "Vòng Tay Lớn Club, Ho Chi Minh City",
  "Đoàn Thanh niên Cộng sản Hồ Chí Minh phường Long An, tỉnh Tây Ninh": "Ho Chi Minh Communist Youth Union of Long An Ward, Tây Ninh Province",
  "Trung ương Hội Sinh viên Việt Nam": "Central Committee of the Vietnamese Students’ Association",
  "Còn nhiều thứ để làm.": "There is still plenty to make.",
  "Xem dự án →": "See projects →",

  // About
  "Đôi nét về Nguyễn Thành Nhân, NhanAZ, open source, Minecraft và lý do website này tồn tại.": "A little about Nguyễn Thành Nhân, NhanAZ, open source, Minecraft, and why this website exists.",
  "Nguyễn Thành Nhân, NhanAZ, NhânAZ, Ghast_Noob, GhastxNoob, thanhnhanaz, nhanhuongloi, nhan0ngu, Minecraft, PocketMine-MP, open source": "Nguyễn Thành Nhân, NhanAZ, NhânAZ, Ghast_Noob, GhastxNoob, thanhnhanaz, nhanhuongloi, nhan0ngu, Minecraft, PocketMine-MP, open source",
  "Đôi nét về Nguyễn Thành Nhân, NhanAZ, open source, Minecraft, PocketMine-MP và cách liên hệ.": "A little about Nguyễn Thành Nhân, NhanAZ, open source, Minecraft, PocketMine-MP, and how to get in touch.",
  "Open source, Minecraft, PocketMine-MP và vài nét về Nhân.": "Open source, Minecraft, PocketMine-MP, and a little about Nhân.",
  "Nguyễn Thành Nhân - NhanAZ - Giới thiệu": "Nguyễn Thành Nhân - NhanAZ - About",
  "Về mình": "About me",
  "Một vài điều đủ riêng để người ghé qua hiểu mình đến từ đâu, thích gì và vì sao mình cứ thích chia sẻ mấy thứ mình học được.": "A few personal details for anyone curious about where I come from, what I enjoy, and why I keep sharing the things I learn.",
  "Stewart Brand là người đứng sau Whole Earth Catalog, một ấn phẩm phản văn hóa ở Mỹ cuối thập niên 1960 với tinh thần đưa công cụ, sách và ý tưởng đến tay người muốn tự học, tự làm. Ông cũng gắn với The WELL, Long Now Foundation và giai đoạn đầu của văn hóa máy tính cá nhân.": "Stewart Brand created the Whole Earth Catalog, a counterculture publication in the late 1960s that put tools, books, and ideas into the hands of people who wanted to learn and make things themselves. He was also involved with The WELL, the Long Now Foundation, and the early culture of personal computing.",
  "Câu này được Brand nói ở Hackers Conference đầu tiên vào mùa thu 1984, một cuộc gặp của cộng đồng hacker thời đầu quanh phần mềm, máy tính cá nhân và đạo đức chia sẻ. Bản ghi sau đó xuất hiện trên Whole Earth Review tháng 5.1985, tạp chí kế thừa tinh thần của Whole Earth Catalog. Ý đầy đủ không phải chỉ là “mọi thứ nên miễn phí”. Brand đặt nó giữa hai phía. Thông tin có giá trị nên người tạo ra nó muốn được trả công. Nhưng khi công nghệ làm việc sao chép, truyền đi và biến đổi thông tin ngày càng rẻ, thông tin cũng tự nhiên muốn được lan rộng hơn.": "Brand said this at the first Hackers Conference in the autumn of 1984, a gathering of the early hacker community around software, personal computers, and the ethics of sharing. A transcript later appeared in the May 1985 issue of Whole Earth Review, the magazine that carried on the spirit of the Whole Earth Catalog. The full idea was not simply that everything should cost nothing. Brand placed information between two forces. Valuable information makes its creators want to be paid, while technology keeps making information cheaper to copy, transmit, and transform, so it also has a natural pull toward wider circulation.",
  "Mình thích nửa sau của câu này vì mình tin kiến thức nên được chia sẻ thay vì bị khóa lại sau những lớp mã hóa, xáo trộn, bằng sáng chế hay hàng rào bản quyền. Một xã hội tiến bộ, với mình, là nơi nhiều thứ hữu ích được mở ra miễn phí, tự do hơn và ít bị kiểm duyệt hơn. Mình biết thế giới khó màu hồng như vậy, nhưng đó vẫn là lý tưởng mình muốn đi theo. Hàng trăm repo trên GitHub của mình là cách mình để lại bằng chứng nhỏ cho điều đó.": "I am drawn to the second half because I believe knowledge should be shared instead of being locked behind obfuscation, encryption, patents, or copyright barriers. To me, a more progressive society is one where useful things are open, free to access, and less constrained by censorship. I know the world is rarely that ideal, but it remains something I want to work toward. The hundreds of repositories on my GitHub are my small, practical evidence of that belief.",
  "Chào, mình là Nhân.": "Hi, I’m Nhân.",
  "Mình sinh ngày 02.08.2005, ở Bà Rịa - Vũng Tàu, nay thuộc Thành phố Hồ Chí Minh. Mình thích hiểu cách mọi thứ hoạt động, biến ý tưởng thành thứ có thể dùng được và ghi lại những gì mình học trên đường đi.": "I was born on 02.08.2005 and live in Bà Rịa - Vũng Tàu, now part of Ho Chi Minh City. I like understanding how things work, turning ideas into something useful, and writing down what I learn along the way.",
  "Minecraft là một phần khá lớn trong cách mình bắt đầu đụng vào kỹ thuật. Từ khoảng năm 2015, mình bắt đầu xem, tải và chơi Minecraft Pocket Edition. Sau đó là server, plugin, PocketMine-MP, mở port, backup dữ liệu, sửa lỗi console và những đêm loay hoay với config. Nhiều thứ mình có bây giờ bén duyên từ thế giới khối vuông đó.": "Minecraft played a large part in how I first found my way into technology. Around 2015, I started watching, downloading, and playing Minecraft Pocket Edition. Then came servers, plugins, PocketMine-MP, port forwarding, backups, console errors, and late nights wrestling with config files. Much of what I know today can be traced back to that blocky world.",
  "Năm 2019, mình lập group PocketMine-MP Việt Nam. Group không quá lớn, hơn 350 thành viên, nhưng vẫn được duy trì đến giờ như một góc nhỏ cho những người còn quan tâm đến PocketMine, Minecraft Bedrock server và ký ức một thời tự dựng server để chơi cùng nhau.": "In 2019, I started the PocketMine-MP Vietnam group. It is not huge - a little over 350 members - but it is still around as a small corner for people interested in PocketMine, Minecraft Bedrock servers, and the memory of building a server just to play together.",
  "Ngày sinh": "Born",
  "Ở đâu": "Location",
  "Bà Rịa - Vũng Tàu, nay thuộc Thành phố Hồ Chí Minh.": "Bà Rịa - Vũng Tàu, now part of Ho Chi Minh City.",
  "Hàng trăm repo mở trên": "Hundreds of public repositories on",
  "Chơi từ 2015, quan tâm đặc biệt đến PocketMine-MP, server Bedrock và cộng đồng Minecraft Việt Nam.": "Playing since 2015, with a particular interest in PocketMine-MP, Bedrock servers, and the Vietnamese Minecraft community.",
  "Cộng đồng": "Community",
  "Người lập group PocketMine-MP Việt Nam từ 2019, hiện hơn 350 thành viên và vẫn duy trì.": "Founder of the PocketMine-MP Vietnam group in 2019; it now has over 350 members and is still active.",
  "Game": "Games",
  "Minecraft &amp; Liên Quân.": "Minecraft &amp; Arena of Valor.",
  "Một mẩu nhỏ để khỏi hiểu lầm": "One small note",
  "Những thông tin ở đây là phần mình chủ động công khai. Nếu bạn từng thấy chúng ở GitHub, trong cộng đồng Minecraft hoặc đâu đó trên internet thì cũng bình thường thôi. Mình gom lại ở đây để mọi thứ có ngữ cảnh hơn, không phải để biến đời tư thành trò truy tìm kho báu. :]": "Everything here is information I chose to make public. If you have seen some of it on GitHub, in the Minecraft community, or elsewhere online, that is perfectly normal. I gathered it here so it has a little more context, not to turn my private life into a treasure hunt. :]",
  "Chưa hết chuyện.": "There is more to the story.",
  "Đọc blog →": "Read the blog →",

  // First post
  "Vì sao NhanAZ được dựng lại, và mình định để gì ở đây.": "Why I rebuilt NhanAZ and what I plan to keep here.",
  "Chào internet, mình dựng lại căn nhà này - Nguyễn Thành Nhân - NhanAZ": "Hello internet, I rebuilt this little home - Nguyễn Thành Nhân - NhanAZ",
  "Ghi chú - 001": "Note - 001",
  "3 phút đọc": "3 min read",
  "Chào internet, mình dựng lại căn nhà này.": "Hello internet, I rebuilt this little home.",
  "Vì bookmark thì dễ quên, thư mục thì dễ mất, còn điều đã viết thành lời thường ở lại lâu hơn.": "Bookmarks are easy to forget, folders are easy to lose, but words tend to stay around longer.",
  "← Tất cả bài viết": "← All writing",
  "Chào. Đây là bài đầu tiên của phiên bản mới.": "Hello. This is the first post of the new version.",
  "Mình muốn có một nơi thuộc về mình trên internet. Không phải một profile chỉ có vài dòng giới thiệu, cũng không phải một bản hồ sơ bị đóng băng thành file pdf. Mình muốn một nơi có thể lớn lên cùng những thứ mình học và làm.": "I wanted a place on the internet that felt like mine. Not a profile with a few introductory lines, and not a portfolio frozen into a PDF. I wanted somewhere that could grow alongside the things I learn and make.",
  "Ở đây sẽ có gì?": "What will be here?",
  "Có ghi chú kỹ thuật sau những lần vật lộn với code. Có đồ án đại học được kể lại tử tế hơn một chiếc link repository. Có thành tích, dự án cá nhân và cả những ngày bình thường nhưng đáng nhớ.": "There will be technical notes from the times I wrestle with code. College projects told more carefully than a bare repository link. Achievements, personal projects, and ordinary days that were still worth remembering.",
  "Mỗi bài không cần phải là một “chân lý”. Nó chỉ cần trung thực về điều mình biết ở thời điểm viết, có nguồn khi cần và đủ rõ để một người khác áp dụng được.": "A post does not need to be ‘the truth’. It only needs to be honest about what I knew when I wrote it, cite sources when needed, and be clear enough for someone else to use.",
  "Trang này là kho lưu trữ, nhưng cũng là một lời hứa. Học được gì thì cố viết lại cái đó.": "This site is an archive, but it is also a promise. Whenever I learn something, I will try to write it down.",
  "Tại sao lại tối giản?": "Why so minimal?",
  "Vì nội dung nên là thứ lên tiếng trước. Màu trắng, màu đen, Space Grotesk, đường kẻ thẳng và không có góc bo. Không phải vì website thiếu đồ trang trí; nó chỉ đã bỏ đi những gì không cần thiết.": "Because the content should speak first. White, black, Space Grotesk, straight lines, and no rounded corners. The website is not missing decoration; it has simply let go of what it does not need.",
  "Vậy thôi. Căn nhà đã có khung. Giờ tới phần sống trong đó.": "That is it. The house has a frame. Now it is time to live in it.",
  "Đọc xong rồi nè.": "That is the end of this one.",
  "Bài viết khác →": "More writing →",
};

const replacementEntries = Object.entries(translations).sort((a, b) => b[0].length - a[0].length);

const absoluteEnglishUrl = (value) => {
  const base = "https://nhanaz.io.vn";
  if (!value.startsWith(base)) return value;

  const suffix = value.slice(base.length) || "/";
  if (suffix.startsWith("/assets/") || suffix === "/#person" || suffix.startsWith("/en/")) {
    return value;
  }

  return `${base}/en${suffix.startsWith("/") ? suffix : `/${suffix}`}`;
};

const localEnglishUrl = (value) => {
  if (
    !value.startsWith("/") ||
    value.startsWith("/assets/") ||
    value.startsWith("/en/") ||
    value === "/en"
  ) {
    return value;
  }

  return `/en${value}`;
};

const alternates = (route) => {
  const viUrl = `https://nhanaz.io.vn${route}`;
  const enUrl = `https://nhanaz.io.vn/en${route}`;
  return [
    `  <link rel="alternate" hreflang="vi" href="${viUrl}">`,
    `  <link rel="alternate" hreflang="en" href="${enUrl}">`,
    `  <link rel="alternate" hreflang="x-default" href="${viUrl}">`,
  ].join("\n");
};

const removeAlternates = (html) => html.replace(/^\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+">\r?\n/gm, "");

const injectAlternates = (html, route) => {
  const cleaned = removeAlternates(html);
  return cleaned.replace(/(\s*<link rel="canonical" href="[^"]+">)/, `$1\n${alternates(route)}`);
};

const translateHtml = (sourceHtml, route) => {
  let html = removeAlternates(sourceHtml);

  for (const [source, target] of replacementEntries) {
    html = html.split(source).join(target);
  }

  html = html
    .replace('<html lang="vi">', '<html lang="en">')
    .replace('"inLanguage": "vi"', '"inLanguage": "en"')
    .replace(/(href|action)="([^"]+)"/g, (match, attribute, value) => `${attribute}="${localEnglishUrl(value)}"`)
    .replace(/https:\/\/nhanaz\.io\.vn[^"\s<]*/g, absoluteEnglishUrl);

  return injectAlternates(html, route);
};

for (const page of pages) {
  const sourcePath = path.join(root, page.source);
  let sourceHtml = fs.readFileSync(sourcePath, "utf8");

  if (!page.noAlternates) {
    sourceHtml = injectAlternates(sourceHtml, page.route);
    fs.writeFileSync(sourcePath, sourceHtml, "utf8");
  }

  const outputRelative = page.route === "/"
    ? "en/index.html"
    : `en${page.route.endsWith(".html") ? page.route : `${page.route}index.html`}`;
  const outputPath = path.join(root, outputRelative);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, translateHtml(sourceHtml, page.route), "utf8");
}

console.log(`Built ${pages.length} English pages.`);
