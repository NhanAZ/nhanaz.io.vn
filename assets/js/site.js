document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const SITE_SEARCH_INDEX_VI = [
  {
    title: "Nguyễn Thành Nhân",
    type: "Giới thiệu",
    url: "/about/",
    excerpt: "Thông tin về Thành Nhân, NhanAZ, open source, Minecraft, PocketMine-MP, triết học, vật lý và cách liên hệ.",
    keywords: "NhanAZ NhânAZ Ghast_Noob GhastxNoob thanhnhanaz nhanhuongloi nhan0ngu nhanaz.io.vn itsnhanaz@gmail.com Discord Bà Rịa Vũng Tàu Thành phố Hồ Chí Minh sinh ngày 02.08.2005 triết học vật lý vũ trụ",
  },
  {
    title: "Mấy câu hỏi chưa có đáy",
    type: "Sở thích",
    url: "/about/#about-curiosity-title",
    excerpt: "Những câu hỏi Thành Nhân thích theo đến tận gốc, từ đạo đức và tự do ý chí đến thuyết tương đối, vật lý lượng tử, hố đen, không thời gian và sự sống ngoài Trái Đất.",
    keywords: "triết học đạo đức tự do ý chí thuyết tương đối hẹp thuyết tương đối rộng vật lý lượng tử hố đen không thời gian vận tốc ánh sáng trường lực vũ trụ khối ma trận thông tin UFO alien người ngoài hành tinh vô thần",
  },
  {
    title: "NhanAZ",
    type: "Trang chủ",
    url: "/",
    excerpt: "Góc nhỏ của Nguyễn Thành Nhân cho code, kiến thức, dự án, thành tích và ghi chép cá nhân.",
    keywords: "Nguyễn Thành Nhân NhanAZ NhânAZ Ghast_Noob GhastxNoob thanhnhanaz nhanhuongloi nhan0ngu personal archive open source GitHub",
  },
  {
    title: "Nguyễn Thành Nhân với NhanAZ là một người hả?",
    type: "Một mẩu nhỏ",
    url: "/#answers-title",
    excerpt: "Đúng rồi, là mình hết. Nguyễn Thành Nhân là tên đầy đủ, còn NhanAZ là cái tên mình dùng từ GitHub đến cộng đồng PocketMine-MP và Minecraft Bedrock.",
    keywords: "Nguyễn Thành Nhân là ai NhanAZ là ai NhânAZ thông tin cá nhân tiểu sử giới thiệu",
  },
  {
    title: "Web này rốt cuộc để làm gì?",
    type: "Một mẩu nhỏ",
    url: "/#answers-title",
    excerpt: "Nơi mình giữ bài viết, project, chuyện Vibe-code, vài dấu mốc và những thứ không muốn để trôi mất giữa bookmark, ổ cứng hay hàng đống repo.",
    keywords: "nhanaz.io.vn là gì web cá nhân blog project vibe-code GitHub thành tích",
  },
  {
    title: "Bài viết",
    type: "Kho lưu trữ",
    url: "/blog/",
    excerpt: "Các ghi chép của NhanAZ về code, việc học, triết học, vật lý và đời thường.",
    keywords: "blog nhật ký bài viết kiến thức triết học vật lý",
  },
  {
    title: "Minecraft Bedrock đang giết những thứ từng nuôi nó lớn",
    type: "Bài viết",
    url: "/posts/minecraft-bedrock-dang-giet-nhung-thu-tung-nuoi-no-lon/",
    date: "2026-07-10",
    excerpt: "Một bài chỉ trích cách Minecraft Bedrock đang thu hẹp thông tin kỹ thuật, khiến PocketMine-MP, NetherGames và server độc lập dần kiệt sức.",
    keywords: "Minecraft Bedrock PocketMine-MP PMMP NetherGames Mojang Microsoft BDS Bedrock Dedicated Server debug symbols Dragonfly Galaxite Lifeboat Information wants to be free server độc lập",
  },
  {
    title: "Một số lưu ý khi làm bài thu hoạch lớp bồi dưỡng nhận thức về Đảng",
    type: "Bài viết",
    url: "/posts/luu-y-bai-thu-hoach-lop-boi-duong-nhan-thuc-ve-dang/",
    date: "2026-07-05",
    excerpt: "Một vài lưu ý để bài thu hoạch lớp bồi dưỡng nhận thức về Đảng trả lời đúng đề, có lý luận chắc, liên hệ bản thân cụ thể và trình bày sạch.",
    keywords: "bài thu hoạch lớp bồi dưỡng nhận thức về Đảng bồi dưỡng nhận thức về Đảng động cơ vào Đảng đạo đức cách mạng tư tưởng Hồ Chí Minh liên hệ bản thân việc học",
  },
  {
    title: "Mấy câu hỏi hơi quá khổ cho một đời người",
    type: "Bài viết",
    url: "/posts/may-cau-hoi-hoi-qua-kho-cho-mot-doi-nguoi/",
    date: "2026-07-04",
    excerpt: "Một nơi gom những câu hỏi về đạo đức, ý nghĩa sự sống, thời gian, lượng tử, hố đen, vũ trụ khối, thần thánh và sự sống ngoài Trái Đất.",
    keywords: "triết học đạo đức ý nghĩa sự sống tự do ý chí thuyết tương đối vật lý lượng tử hố đen không thời gian vận tốc ánh sáng vũ trụ khối ma trận thông tin thần thánh đấng tối cao UFO alien người ngoài hành tinh",
  },
  {
    title: "Minecraft từ 2015, trước khi mình biết IP là gì",
    type: "Bài viết",
    url: "/posts/hanh-trinh-minecraft-tu-2015/",
    date: "2026-07-01",
    excerpt: "Hành trình từ xem YouTube, chơi Minecraft PE qua MCPE Master, server list, staff, command block đến PocketMine-MP và Công nghệ thông tin.",
    keywords: "Minecraft 2015 Minecraft PE MCPE Master Multiplayer Master Omlet Arcade FunCraft SurvivalCraft MineFRK FCA LOR PocketMine-MP PMMP server list command block Công nghệ thông tin",
  },
  {
    title: "Chào internet, mình dựng lại căn nhà này",
    type: "Bài viết",
    url: "/posts/chao-internet/",
    date: "2026-06-29",
    excerpt: "Bài viết mở đầu cho căn nhà số nhanaz.io.vn.",
    keywords: "internet blog cá nhân căn nhà số",
  },
  {
    title: "Zalo PC mã hóa bản backup để bảo vệ ai?",
    type: "Bài viết kỹ thuật",
    url: "/posts/dich-nguoc-zalo-pc-backup/",
    date: "2026-06-30",
    excerpt: "Mổ xẻ .zl.zip, uin trong bộ nhớ Zalo, AES-256-CBC, TAR và giới hạn thật sự của lớp mã hóa backup.",
    keywords: "NhanAZ Zalo PC backup Zalo dịch ngược reverse engineering bảo mật security AES-256-CBC ReadProcessMemory TAR digital forensics uin integrity",
  },
  {
    title: "PocketMine-MP là gì?",
    type: "Bài viết",
    url: "/posts/pocketmine-mp-la-gi/",
    date: "2026-06-30",
    excerpt: "PocketMine-MP là gì, lịch sử PMMP, kỹ thuật server Bedrock, plugin PHP, Poggit, dktapps và hiện trạng dự án.",
    keywords: "PocketMine-MP PMMP PocketMine Shoghi Cervantes shoghicp dktapps Dylan Minecraft Bedrock Minecraft Pocket Edition server plugin PHP Poggit DevTools ExamplePlugin virion NhanAZ NhanAZ-Plugins PMMPVN PocketMine-MP Việt Nam Công nghệ thông tin",
  },
  {
    title: "Dự án",
    type: "Kho dự án",
    url: "/projects/",
    excerpt: "Những thứ NhanAZ đã làm, đang làm và đủ tự tin để kể lại quá trình.",
    keywords: "project portfolio sản phẩm",
  },
  {
    title: "Vibe-code",
    type: "Kho project",
    url: "/vibe-code/",
    excerpt: "Những câu chuyện ngắn về project được dựng nhanh với AI, code, vài lượt sửa tay và các quyết định đáng giữ lại.",
    keywords: "vibe-code vibe coding AI project AI-assisted coding project cá nhân open source GitHub thử nghiệm",
  },
  {
    title: "GitHub và các tổ chức",
    type: "Open source",
    url: "/github/",
    excerpt: "Bản đồ nhỏ cho các org GitHub của NhanAZ, từ plugin PocketMine-MP đến dữ liệu, tool, archive, web tĩnh và các dự án đã drop.",
    keywords: "GitHub organizations NhanAZ-Plugins NhanAZ-Data NhanAZ-Tools NhanAZ-Drops NhanAZ-Web NhanAZ-Cores NhanAZ-Assets NhanAZ-Market pm-pl PMMPVN Pockgin ReinfyTeam thebigcrafter PocketMine-MP plugin archive Minecraft Bedrock",
  },
  {
    title: "NhanAZ-Plugins",
    type: "GitHub org",
    url: "/github/#nhanaz-plugins",
    excerpt: "Nơi NhanAZ lưu plugin PocketMine-MP tự viết, sửa tay, copy paste và các dấu vết Poggit cũ.",
    keywords: "NhanAZ-Plugins nhanaz-pm-pl Poggit PocketMine-MP plugin downloads",
  },
  {
    title: "pm-pl",
    type: "GitHub org",
    url: "/github/#pm-pl",
    excerpt: "Kho lưu plugin PocketMine-MP và Poggit, sinh ra vì sợ các tài nguyên cộng đồng biến mất quá dễ.",
    keywords: "pm-pl PocketMine-MP Plugins archive poggit plugin storage repositories",
  },
  {
    title: "NhanAZ-Data",
    type: "GitHub org",
    url: "/github/#nhanaz-data",
    excerpt: "Ngăn dành cho dataset, thu thập dữ liệu, thống kê và những con số đáng soi kỹ.",
    keywords: "NhanAZ-Data dataset data engineering statistics big data research prediction Vietlott Vietnamese dictionary THPT",
  },
  {
    title: "NhanAZ-Tools",
    type: "GitHub org",
    url: "/github/#nhanaz-tools",
    excerpt: "Các tool dịch ngược, giải mã, mã hóa và API không chính thức cần cân nhắc kỹ trước khi mở ra.",
    keywords: "NhanAZ-Tools reverse engineering decrypt encrypt unofficial API Zalo Mojang Microsoft",
  },
  {
    title: "NhanAZ-Drops",
    type: "GitHub org",
    url: "/github/#nhanaz-drops",
    excerpt: "Nơi giữ các dự án vibe-code đã dừng, bản nháp chạy được và những thử nghiệm không cần nuôi tiếp.",
    keywords: "NhanAZ-Drops dropped projects vibe-code AI experiments prototypes abandoned projects",
  },
  {
    title: "Gom cho đỡ bừa",
    type: "GitHub org",
    url: "/github/#nhanaz-gom-cho-do-bua",
    excerpt: "Ngăn gom NhanAZ-Cores, NhanAZ-Assets, NhanAZ-Market, Contributions, Forks, Edu và Misc để trang không thành phòng chứa đồ.",
    keywords: "NhanAZ-Cores NhanAZ-Assets NhanAZ-Market NhanAZ-Contributions NhanAZ-Forks NhanAZ-Edu NhanAZ-Misc Gom cho đỡ bừa lưu trữ riêng Minecraft Bedrock resources server packs fork study",
  },
  {
    title: "PMMPVN và Pockgin",
    type: "GitHub org",
    url: "/github/#pmmp-tools",
    excerpt: "Các org liên quan PocketMine-MP Việt Nam, archive cộng đồng và nhóm Pockgin đã drop.",
    keywords: "PMMPVN PocketMine-MP Việt Nam Pockgin pockgin-archive pockgin-mirror community archive",
  },
  {
    title: "Câu chuyện project vibe-code",
    type: "Vibe-code",
    url: "/vibe-code/",
    excerpt: "Khung kể chuyện cho mỗi project gồm ý tưởng ban đầu, phần AI hỗ trợ, phần tự sửa và điều còn giữ lại.",
    keywords: "câu chuyện project AI prompt demo repo lỗi vui quyết định sản phẩm",
  },
  {
    title: "glyph, một tool sinh ra vì sợ một trang wiki biến mất",
    type: "Vibe-code",
    url: "/vibe-code/glyph/",
    date: "2026-06-30",
    excerpt: "Câu chuyện về glyph, tool Minecraft Bedrock custom emoji của NhanAZ được Bedrock Wiki giới thiệu.",
    keywords: "NhanAZ glyph Minecraft Bedrock custom emoji glyph atlas Bedrock Wiki PocketMine-MP GitHub nhanaz.github.io/glyph",
  },
  {
    title: "nhanaz.io.vn",
    type: "Dự án",
    url: "/projects/#nhanaz",
    date: "2026",
    excerpt: "Website cá nhân được làm bằng HTML, CSS, JavaScript và triển khai qua GitHub Pages.",
    keywords: "website cá nhân github pages html css javascript",
  },
  {
    title: "Connect Brandbook",
    type: "Dự án",
    url: "/projects/#connect",
    date: "2026",
    excerpt: "Đồ án tốt nghiệp mảng Thiết kế đồ họa, đạt 9.5 điểm.",
    keywords: "brandbook connect thiết kế đồ họa đồ án tốt nghiệp canva",
  },
  {
    title: "Dấu mốc",
    type: "Thành tích",
    url: "/achievements/",
    excerpt: "Thành tích học tập, hoạt động Đoàn Thanh niên, Hội Sinh viên và tình nguyện.",
    keywords: "thành tích Nguyễn Thành Nhân Sinh viên 5 Tốt tốt nghiệp Công nghệ thông tin",
  },
  {
    title: "Công tác Đoàn Thanh niên và Hội Sinh viên",
    type: "Nhóm thành tích",
    url: "/achievements/#records-title",
    excerpt: "Các vai trò ở Văn phòng Đoàn Thanh niên và Hội Sinh viên, Ban Chấp hành, Ban Thường vụ và truyền thông Đoàn trường.",
    keywords: "Đoàn Thanh niên Hội Sinh viên Văn phòng Đoàn Ban Chấp hành Ban Thường vụ Chủ nhiệm Đội truyền thông",
  },
  {
    title: "Sinh viên 5 Tốt và học tập",
    type: "Nhóm thành tích",
    url: "/achievements/#records-title",
    excerpt: "Sinh viên 5 Tốt cấp Trường hai năm liền, học tập Giỏi, rèn luyện Xuất sắc và tốt nghiệp ngành Công nghệ thông tin loại Giỏi.",
    keywords: "Sinh viên 5 Tốt học tập Giỏi rèn luyện Xuất sắc tốt nghiệp Công nghệ thông tin",
  },
  {
    title: "Xuân tình nguyện",
    type: "Nhóm thành tích",
    url: "/achievements/#records-title",
    excerpt: "Các ghi nhận trong Chiến dịch Xuân tình nguyện, bao gồm bằng khen cấp Thành phố năm 2025.",
    keywords: "Xuân tình nguyện tình nguyện cộng đồng bằng khen cấp Thành phố",
  },
  {
    title: "Kỹ năng và hội nhập",
    type: "Nhóm thành tích",
    url: "/achievements/#records-title",
    excerpt: "Tập huấn kỹ năng AI, kiến thức tài chính cá nhân và hoạt động hội nhập sinh viên.",
    keywords: "AI tài chính cá nhân 5 Tốt Challenges kỹ năng hội nhập",
  },
  {
    title: "PocketMine-MP Việt Nam",
    type: "Cộng đồng",
    url: "/about/",
    excerpt: "Group PocketMine-MP Việt Nam do Thành Nhân lập từ năm 2019, hiện hơn 350 thành viên và vẫn duy trì.",
    keywords: "PocketMine-MP Việt Nam Minecraft Bedrock server plugin",
  },
  {
    title: "Minecraft",
    type: "Sở thích",
    url: "/about/",
    excerpt: "Minecraft là một phần lớn trong hành trình học server, plugin, cấu hình và cộng đồng của NhanAZ.",
    keywords: "Minecraft Pocket Edition Bedrock server PocketMine",
  },
  {
    title: "GitHub NhanAZ",
    type: "Open source",
    url: "https://github.com/NhanAZ",
    excerpt: "Các repo open source của NhanAZ trên GitHub.",
    keywords: "GitHub NhanAZ open source repository code",
  },
];

const SITE_SEARCH_INDEX_EN = [
  {
    title: "Nguyễn Thành Nhân",
    type: "About",
    url: "/en/about/",
    excerpt: "About Thành Nhân, NhanAZ, open source, Minecraft, PocketMine-MP, philosophy, physics, and how to get in touch.",
    keywords: "NhanAZ NhânAZ Ghast_Noob GhastxNoob thanhnhanaz nhanhuongloi nhan0ngu nhanaz.io.vn itsnhanaz@gmail.com Discord Ba Ria Vung Tau Ho Chi Minh City born 02.08.2005 philosophy physics universe",
  },
  {
    title: "Questions with no bottom",
    type: "Interest",
    url: "/en/about/#about-curiosity-title",
    excerpt: "Questions Thành Nhân likes to follow all the way down, from ethics and free will to relativity, quantum physics, black holes, spacetime, and extraterrestrial life.",
    keywords: "philosophy ethics free will special relativity general relativity quantum physics black holes spacetime speed of light fields block universe information matrix UFO alien extraterrestrial life atheist",
  },
  {
    title: "NhanAZ",
    type: "Home",
    url: "/en/",
    excerpt: "Nguyễn Thành Nhân’s corner for code, knowledge, projects, achievements, and personal notes.",
    keywords: "Nguyễn Thành Nhân NhanAZ NhânAZ Ghast_Noob GhastxNoob thanhnhanaz nhanhuongloi nhan0ngu personal archive open source GitHub",
  },
  {
    title: "So Nguyễn Thành Nhân and NhanAZ are the same person?",
    type: "A small aside",
    url: "/en/#answers-title",
    excerpt: "Yep, both are me. Nguyễn Thành Nhân is my full name, while NhanAZ is the name that follows me from GitHub into the PocketMine-MP and Minecraft Bedrock communities.",
    keywords: "who is Nguyễn Thành Nhân who is NhanAZ NhânAZ biography personal website",
  },
  {
    title: "What is this website actually for?",
    type: "A small aside",
    url: "/en/#answers-title",
    excerpt: "A place for writing, projects, Vibe-code stories, milestones, and things I do not want to lose between bookmarks, hard drives, and repositories.",
    keywords: "nhanaz.io.vn personal website blog projects vibe-code GitHub achievements",
  },
  {
    title: "Writing",
    type: "Archive",
    url: "/en/blog/",
    excerpt: "NhanAZ’s notes on code, learning, projects, philosophy, physics, and everyday life.",
    keywords: "blog journal writing knowledge notes philosophy physics",
  },
  {
    title: "Minecraft Bedrock is killing the things that helped it grow",
    type: "Writing",
    url: "/en/posts/minecraft-bedrock-is-killing-the-things-that-helped-it-grow/",
    date: "2026-07-10",
    excerpt: "A critical essay on how Minecraft Bedrock is closing off technical information, leaving PocketMine-MP, NetherGames, and independent servers exhausted.",
    keywords: "Minecraft Bedrock PocketMine-MP PMMP NetherGames Mojang Microsoft BDS Bedrock Dedicated Server debug symbols Dragonfly Galaxite Lifeboat Information wants to be free independent servers",
  },
  {
    title: "A few notes for a better Party-awareness course reflection paper",
    type: "Writing",
    url: "/en/posts/party-awareness-reflection-paper-notes/",
    date: "2026-07-05",
    excerpt: "Notes on writing a Party-awareness course reflection paper that answers the prompt, uses theory carefully, connects to real experience, and reads cleanly.",
    keywords: "Party-awareness course reflection paper Communist Party of Vietnam revolutionary ethics Ho Chi Minh thought personal reflection learning",
  },
  {
    title: "Questions slightly too large for one lifetime",
    type: "Writing",
    url: "/en/posts/questions-slightly-too-large-for-one-lifetime/",
    date: "2026-07-04",
    excerpt: "A place for questions about ethics, the meaning of life, time, quantum physics, black holes, the block universe, gods, and extraterrestrial life.",
    keywords: "philosophy ethics meaning of life free will relativity quantum physics black holes spacetime speed of light block universe information matrix god supreme being UFO alien extraterrestrial life",
  },
  {
    title: "Minecraft since 2015, before I knew what an IP was",
    type: "Writing",
    url: "/en/posts/hanh-trinh-minecraft-tu-2015/",
    date: "2026-07-01",
    excerpt: "From YouTube, Minecraft PE and MCPE Master to server lists, staff roles, command blocks, PocketMine-MP and Information Technology.",
    keywords: "Minecraft 2015 Minecraft PE MCPE Master Multiplayer Master Omlet Arcade FunCraft SurvivalCraft MineFRK FCA LOR PocketMine-MP PMMP server list command block Information Technology",
  },
  {
    title: "Hello internet, I rebuilt this little home",
    type: "Writing",
    url: "/en/posts/chao-internet/",
    date: "2026-06-29",
    excerpt: "The opening post for nhanaz.io.vn, my home on the internet.",
    keywords: "internet personal blog digital home",
  },
  {
    title: "Who does Zalo PC backup encryption protect?",
    type: "Technical writing",
    url: "/en/posts/dich-nguoc-zalo-pc-backup/",
    date: "2026-06-30",
    excerpt: "A technical look at .zl.zip, uin in Zalo process memory, AES-256-CBC, TAR, and the practical limits of backup encryption.",
    keywords: "NhanAZ Zalo PC Zalo backup reverse engineering application security AES-256-CBC ReadProcessMemory TAR digital forensics uin integrity",
  },
  {
    title: "What is PocketMine-MP?",
    type: "Writing",
    url: "/en/posts/pocketmine-mp-la-gi/",
    date: "2026-06-30",
    excerpt: "What PocketMine-MP is, with PMMP history, Bedrock server internals, PHP plugins, Poggit, dktapps and the project’s current state.",
    keywords: "PocketMine-MP PMMP PocketMine Shoghi Cervantes shoghicp dktapps Dylan Minecraft Bedrock Minecraft Pocket Edition server plugin PHP Poggit DevTools ExamplePlugin virion NhanAZ NhanAZ-Plugins PMMPVN PocketMine-MP Vietnam Information Technology",
  },
  {
    title: "Projects",
    type: "Project archive",
    url: "/en/projects/",
    excerpt: "Things NhanAZ has made, is making, and the process behind them.",
    keywords: "project portfolio product work",
  },
  {
    title: "Vibe-code",
    type: "Project archive",
    url: "/en/vibe-code/",
    excerpt: "Short stories about projects built quickly with AI, code, manual fixes, and decisions worth keeping.",
    keywords: "vibe-code vibe coding AI project AI-assisted coding personal project open source GitHub experiments",
  },
  {
    title: "GitHub organizations",
    type: "Open source",
    url: "/en/github/",
    excerpt: "A small map of NhanAZ’s GitHub organizations, from PocketMine-MP plugins to data, tools, archives, static web utilities, and dropped projects.",
    keywords: "GitHub organizations NhanAZ-Plugins NhanAZ-Data NhanAZ-Tools NhanAZ-Drops NhanAZ-Web NhanAZ-Cores NhanAZ-Assets NhanAZ-Market pm-pl PMMPVN Pockgin ReinfyTeam thebigcrafter PocketMine-MP plugin archive Minecraft Bedrock",
  },
  {
    title: "NhanAZ-Plugins",
    type: "GitHub org",
    url: "/en/github/#nhanaz-plugins",
    excerpt: "NhanAZ’s PocketMine-MP plugin shelf, including old Poggit traces.",
    keywords: "NhanAZ-Plugins nhanaz-pm-pl Poggit PocketMine-MP plugin downloads",
  },
  {
    title: "pm-pl",
    type: "GitHub org",
    url: "/en/github/#pm-pl",
    excerpt: "A PocketMine-MP plugin archive shaped by the fear that community resources can disappear too easily.",
    keywords: "pm-pl PocketMine-MP Plugins archive poggit plugin storage repositories",
  },
  {
    title: "NhanAZ-Data",
    type: "GitHub org",
    url: "/en/github/#nhanaz-data",
    excerpt: "A shelf for datasets, collection work, statistics, and measurable curiosity.",
    keywords: "NhanAZ-Data dataset data engineering statistics big data research prediction Vietlott Vietnamese dictionary THPT",
  },
  {
    title: "NhanAZ-Tools",
    type: "GitHub org",
    url: "/en/github/#nhanaz-tools",
    excerpt: "Reverse engineering, encryption, decryption, and unofficial API tools that require careful release decisions.",
    keywords: "NhanAZ-Tools reverse engineering decrypt encrypt unofficial API Zalo Mojang Microsoft",
  },
  {
    title: "NhanAZ-Drops",
    type: "GitHub org",
    url: "/en/github/#nhanaz-drops",
    excerpt: "Dropped vibe-code projects, runnable drafts, and experiments that no longer need to be maintained.",
    keywords: "NhanAZ-Drops dropped projects vibe-code AI experiments prototypes abandoned projects",
  },
  {
    title: "Kept out of the mess",
    type: "GitHub org",
    url: "/en/github/#nhanaz-gom-cho-do-bua",
    excerpt: "The grouped shelf for Cores, Assets, Market, Contributions, Forks, Edu, and Misc so the page does not become a storage room.",
    keywords: "NhanAZ-Cores NhanAZ-Assets NhanAZ-Market NhanAZ-Contributions NhanAZ-Forks NhanAZ-Edu NhanAZ-Misc private archives Minecraft Bedrock resources server packs fork study",
  },
  {
    title: "PMMPVN and Pockgin",
    type: "GitHub org",
    url: "/en/github/#pmmp-tools",
    excerpt: "Organizations around PocketMine-MP Vietnam, community archives, and the dropped Pockgin group.",
    keywords: "PMMPVN PocketMine-MP Vietnam Pockgin pockgin-archive pockgin-mirror community archive",
  },
  {
    title: "Vibe-code project stories",
    type: "Vibe-code",
    url: "/en/vibe-code/",
    excerpt: "Each story covers the starting idea, where AI helped, what needed fixing, and what remained worth keeping.",
    keywords: "project story AI prompt demo repository failure product decision",
  },
  {
    title: "glyph, a tool born from the fear that a wiki might disappear",
    type: "Vibe-code",
    url: "/en/vibe-code/glyph/",
    date: "2026-06-30",
    excerpt: "The story of glyph, NhanAZ’s Minecraft Bedrock custom emoji tool recommended by Bedrock Wiki.",
    keywords: "NhanAZ glyph Minecraft Bedrock custom emoji glyph atlas Bedrock Wiki PocketMine-MP GitHub nhanaz.github.io/glyph",
  },
  {
    title: "nhanaz.io.vn",
    type: "Project",
    url: "/en/projects/#nhanaz",
    date: "2026",
    excerpt: "A personal website built with HTML, CSS, and JavaScript, deployed through GitHub Pages.",
    keywords: "personal website github pages html css javascript",
  },
  {
    title: "Connect Brandbook",
    type: "Project",
    url: "/en/projects/#connect",
    date: "2026",
    excerpt: "A Graphic Design graduation project graded 9.5 out of 10.",
    keywords: "brandbook connect graphic design graduation project canva",
  },
  {
    title: "Milestones",
    type: "Achievements",
    url: "/en/achievements/",
    excerpt: "Academic achievements, Youth Union and Students’ Association work, and volunteer activities.",
    keywords: "achievements Nguyễn Thành Nhân Five-Good Student Information Technology graduate",
  },
  {
    title: "Youth Union and Students’ Association work",
    type: "Achievement category",
    url: "/en/achievements/#records-title",
    excerpt: "Roles in the Youth Union and Students’ Association Office, Executive Committee, Standing Committee, and media team.",
    keywords: "Youth Union Students Association Office Executive Committee Standing Committee media team lead",
  },
  {
    title: "Five-Good Student and academics",
    type: "Achievement category",
    url: "/en/achievements/#records-title",
    excerpt: "College-level Five-Good Student twice, strong academic and conduct results, and an Information Technology diploma.",
    keywords: "Five-Good Student academic performance excellent conduct Information Technology graduation",
  },
  {
    title: "Spring Volunteer Campaign",
    type: "Achievement category",
    url: "/en/achievements/#records-title",
    excerpt: "Recognition from Spring Volunteer Campaigns, including a city-level Certificate of Merit in 2025.",
    keywords: "Spring Volunteer Campaign volunteering community city-level certificate merit",
  },
  {
    title: "Skills and engagement",
    type: "Achievement category",
    url: "/en/achievements/#records-title",
    excerpt: "AI skills training, personal finance learning, and student engagement activities.",
    keywords: "AI personal finance Five-Good Challenges skills engagement",
  },
  {
    title: "PocketMine-MP Vietnam",
    type: "Community",
    url: "/en/about/",
    excerpt: "A PocketMine-MP Vietnam group founded by Thành Nhân in 2019, now with over 350 members and still active.",
    keywords: "PocketMine-MP Vietnam Minecraft Bedrock server plugin",
  },
  {
    title: "Minecraft",
    type: "Interest",
    url: "/en/about/",
    excerpt: "Minecraft played a large role in NhanAZ’s path through servers, plugins, configuration, and community work.",
    keywords: "Minecraft Pocket Edition Bedrock server PocketMine",
  },
  {
    title: "GitHub NhanAZ",
    type: "Open source",
    url: "https://github.com/NhanAZ",
    excerpt: "NhanAZ’s open source repositories on GitHub.",
    keywords: "GitHub NhanAZ open source repository code",
  },
];

const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
const SITE_SEARCH_INDEX = isEnglish ? SITE_SEARCH_INDEX_EN : SITE_SEARCH_INDEX_VI;

const initLanguageSwitch = () => {
  const navigation = document.querySelector(".site-nav");
  if (!navigation || navigation.querySelector(".language-switch")) {
    return;
  }

  const currentPath = window.location.pathname;
  const targetLanguage = isEnglish ? "vi" : "en";
  const alternate = document.querySelector(`link[rel="alternate"][hreflang="${targetLanguage}"]`);
  const alternateUrl = alternate ? new URL(alternate.getAttribute("href"), window.location.origin) : null;
  const targetPath = alternateUrl
    ? `${alternateUrl.pathname}${alternateUrl.search}${alternateUrl.hash}`
    : (isEnglish
    ? currentPath.replace(/^\/en(?=\/|$)/, "") || "/"
    : `/en${currentPath === "/" ? "/" : currentPath}`);
  const link = document.createElement("a");
  link.className = "language-switch";
  link.href = targetPath;
  link.hreflang = targetLanguage;
  link.lang = targetLanguage;
  link.textContent = isEnglish ? "VI" : "EN";
  link.setAttribute("aria-label", isEnglish ? "Read this page in Vietnamese" : "Đọc trang này bằng tiếng Anh");
  navigation.append(link);
};

const normalizeText = (value = "") =>
  value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .trim();

const createSlug = (value = "", fallback = "section") => {
  const slug = normalizeText(value)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || fallback;
};

const initSiteSearch = () => {
  const form = document.querySelector("[data-site-search-form]");
  const input = document.querySelector("[data-site-search]");
  const results = document.querySelector("[data-site-search-results]");

  if (!form || !input || !results) {
    return;
  }

  const indexedItems = SITE_SEARCH_INDEX.map((item) => ({
    ...item,
    search: normalizeText([item.title, item.type, item.excerpt, item.keywords, item.date].join(" ")),
  }));

  let currentMatches = [];

  const createText = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    element.textContent = text;
    return element;
  };

  const renderResults = () => {
    const tokens = normalizeText(input.value).split(/\s+/).filter(Boolean);
    results.replaceChildren();

    if (!tokens.length) {
      currentMatches = [];
      results.hidden = true;
      return;
    }

    currentMatches = indexedItems
      .filter((item) => tokens.every((token) => item.search.includes(token)))
      .slice(0, 8);

    results.hidden = false;

    if (!currentMatches.length) {
      const emptyMessage = isEnglish
        ? "No matching results. Try a shorter search."
        : "Chưa thấy kết quả phù hợp. Thử gõ ngắn hơn hoặc bỏ dấu.";
      const empty = createText("p", "site-search-empty", emptyMessage);
      results.append(empty);
      return;
    }

    currentMatches.forEach((item) => {
      const link = document.createElement("a");
      link.className = "site-search-result";
      link.href = item.url;

      const type = createText("span", "site-search-result-type", item.type);
      const content = document.createElement("span");
      content.append(createText("strong", "", item.title));
      content.append(createText("span", "", item.excerpt));

      link.append(type, content);
      results.append(link);
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (currentMatches[0]) {
      window.location.href = currentMatches[0].url;
    }
  });

  input.addEventListener("input", renderResults);

  const query = new URLSearchParams(window.location.search).get("q");
  if (query) {
    input.value = query;
    renderResults();
    input.focus();
  }
};

const initAchievementFilters = () => {
  const list = document.querySelector(".records-list");
  const searchInput = document.querySelector("[data-achievement-search]");
  const categorySelect = document.querySelector("[data-achievement-category]");
  const yearSelect = document.querySelector("[data-achievement-year]");
  const sortSelect = document.querySelector("[data-achievement-sort]");
  const countElement = document.querySelector("[data-achievement-count]");
  const emptyElement = document.querySelector("[data-achievement-empty]");
  const resetButton = document.querySelector("[data-achievement-reset]");

  if (!list || !searchInput || !categorySelect || !yearSelect || !sortSelect) {
    return;
  }

  const records = Array.from(list.querySelectorAll(".record-item")).map((item, index) => {
    const timeElement = item.querySelector("time");
    const titleElement = item.querySelector("h3");
    const issuerElement = item.querySelector("p");
    const numberElement = item.querySelector(".record-number");
    const categoryElement = item.children[item.children.length - 1];
    const date = timeElement?.getAttribute("datetime") || "";
    const category = categoryElement?.textContent?.trim() || "";
    const title = titleElement?.textContent?.trim() || "";
    const issuer = issuerElement?.textContent?.trim() || "";
    const displayDate = timeElement?.textContent?.trim() || "";
    const number = numberElement?.textContent?.trim().padStart(2, "0") || "";
    const year = date.slice(0, 4);
    const search = normalizeText([title, issuer, category, displayDate, year, number].join(" "));

    if (number && !item.id) {
      item.id = `achievement-${number}`;
    }

    return {
      category,
      date,
      index,
      item,
      search,
      time: Date.parse(date) || 0,
      year,
    };
  });

  const applyFilters = () => {
    const tokens = normalizeText(searchInput.value).split(/\s+/).filter(Boolean);
    const selectedCategory = categorySelect.value;
    const selectedYear = yearSelect.value;
    const sortMode = sortSelect.value;

    const sortedRecords = records.slice().sort((a, b) => {
      if (sortMode === "newest") {
        return b.time - a.time || a.index - b.index;
      }

      if (sortMode === "oldest") {
        return a.time - b.time || a.index - b.index;
      }

      return a.index - b.index;
    });

    let visibleCount = 0;

    sortedRecords.forEach((record) => {
      const matchesKeyword = !tokens.length || tokens.every((token) => record.search.includes(token));
      const matchesCategory = !selectedCategory || record.category === selectedCategory;
      const matchesYear = !selectedYear || record.year === selectedYear;
      const isVisible = matchesKeyword && matchesCategory && matchesYear;

      record.item.hidden = !isVisible;
      visibleCount += isVisible ? 1 : 0;
      list.append(record.item);
    });

    if (countElement) {
      countElement.textContent = isEnglish
        ? visibleCount === records.length
          ? "Viewing the full list."
          : `Viewing ${visibleCount} of ${records.length} entries.`
        : visibleCount === records.length
          ? "Đang xem toàn bộ danh sách."
          : `Đang xem ${visibleCount} trong ${records.length} thành tích.`;
    }

    if (emptyElement) {
      emptyElement.hidden = visibleCount > 0;
    }

    if (resetButton) {
      resetButton.disabled = !searchInput.value.trim() && !selectedCategory && !selectedYear && sortMode === "default";
    }
  };

  searchInput.addEventListener("input", applyFilters);
  categorySelect.addEventListener("change", applyFilters);
  yearSelect.addEventListener("change", applyFilters);
  sortSelect.addEventListener("change", applyFilters);

  resetButton?.addEventListener("click", () => {
    searchInput.value = "";
    categorySelect.value = "";
    yearSelect.value = "";
    sortSelect.value = "default";
    applyFilters();
    searchInput.focus();
  });

  applyFilters();

  if (location.hash.startsWith("#achievement-")) {
    requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ block: "start" });
    });
  }
};

const initCanvaEmbeds = () => {
  document.querySelectorAll("[data-canva-embed]").forEach((embed) => {
    const frame = embed.querySelector("[data-canva-frame]");
    if (!frame) {
      return;
    }

    frame.addEventListener("load", () => {
      embed.classList.add("is-loaded");
    }, { once: true });
  });
};

const escapeCodeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[character]));

const highlightCode = (value) => {
  const codeKeywords = new Set(["for", "in", "if", "else", "return", "while"]);
  const tokenPattern = /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\/\/[^\n]*|#[^\n]*|\b[A-Za-z_][A-Za-z0-9_]*(?=\()|\b[A-Z][A-Z0-9_-]{2,}\b|\b\d+(?:\.\d+)?\b|\b(?:for|in|if|else|return|while)\b|[=()+,\[\]:])/g;
  let result = "";
  let lastIndex = 0;

  value.replace(tokenPattern, (token, offset) => {
    result += escapeCodeHtml(value.slice(lastIndex, offset));

    const lowerToken = token.toLowerCase();
    let tokenClass = "property";

    if (/^["'`]/.test(token)) {
      tokenClass = "string";
    } else if (/^(?:\/\/|#)/.test(token)) {
      tokenClass = "comment";
    } else if (value[offset + token.length] === "(") {
      tokenClass = "function";
    } else if (/^[A-Z][A-Z0-9_-]{2,}$/.test(token)) {
      tokenClass = "constant";
    } else if (/^\d/.test(token)) {
      tokenClass = "number";
    } else if (/^[=()+,\[\]:]$/.test(token)) {
      tokenClass = "operator";
    } else if (codeKeywords.has(lowerToken)) {
      tokenClass = "keyword";
    }

    result += `<span class="code-token ${tokenClass}">${escapeCodeHtml(token)}</span>`;
    lastIndex = offset + token.length;
    return token;
  });

  result += escapeCodeHtml(value.slice(lastIndex));
  return result;
};

const initArticleToc = () => {
  const article = document.querySelector(".article-layout");
  const rail = article?.querySelector(".article-rail");
  const prose = article?.querySelector(".prose");

  if (!article || !rail || !prose) {
    return;
  }

  const headings = Array.from(prose.querySelectorAll("h2, h3"));

  if (!headings.length || rail.querySelector(".article-toc")) {
    return;
  }

  const reservedIds = new Set(
    Array.from(document.querySelectorAll("[id]"))
      .filter((element) => !headings.includes(element))
      .map((element) => element.id),
  );
  const usedIds = new Set();

  const getUniqueId = (heading, index) => {
    const base = heading.id || createSlug(heading.textContent, `section-${index + 1}`);
    let id = base;
    let count = 2;

    while (reservedIds.has(id) || usedIds.has(id)) {
      id = `${base}-${count}`;
      count += 1;
    }

    usedIds.add(id);
    return id;
  };

  const toc = document.createElement("nav");
  const title = document.createElement("p");
  const list = document.createElement("ol");
  const links = new Map();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  toc.className = "article-toc";
  toc.setAttribute("aria-label", isEnglish ? "Article table of contents" : "Mục lục bài viết");
  title.className = "article-toc-title";
  title.textContent = isEnglish ? "In this post" : "Trong bài này";

  headings.forEach((heading, index) => {
    const id = getUniqueId(heading, index);
    const item = document.createElement("li");
    const link = document.createElement("a");

    heading.id = id;
    heading.tabIndex = -1;
    heading.classList.add("is-anchor-heading");
    heading.title = isEnglish ? "Click to copy this section URL" : "Bấm để lấy liên kết tới mục này";

    item.className = `article-toc-item article-toc-item-${heading.tagName.toLowerCase()}`;
    link.href = `#${id}`;
    link.textContent = heading.textContent.trim();
    link.dataset.tocTarget = id;
    links.set(id, link);

    heading.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) {
        return;
      }

      history.pushState(null, "", `${location.pathname}${location.search}#${id}`);
      links.forEach((tocLink) => tocLink.classList.remove("is-active"));
      link.classList.add("is-active");
    });

    item.append(link);
    list.append(item);
  });

  toc.append(title, list);
  rail.append(toc);

  const setActiveLink = (id) => {
    links.forEach((link) => link.classList.toggle("is-active", link.dataset.tocTarget === id));
  };

  const getScrollOffset = () => {
    const header = document.querySelector(".site-header");

    if (!header) {
      return 24;
    }

    const headerStyle = window.getComputedStyle(header);

    if (headerStyle.position !== "sticky" && headerStyle.position !== "fixed") {
      return 24;
    }

    return Math.ceil(header.getBoundingClientRect().bottom + 34);
  };

  const scrollToHeading = (target, { updateHash = true, focus = false } = {}) => {
    const top = target.getBoundingClientRect().top + window.scrollY - getScrollOffset();

    if (updateHash) {
      history.pushState(null, "", `${location.pathname}${location.search}#${target.id}`);
    }

    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    if (focus) {
      target.focus({ preventScroll: true });
    }

    setActiveLink(target.id);
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.getElementById(link.dataset.tocTarget);

      if (!target) {
        return;
      }

      event.preventDefault();
      scrollToHeading(target, { focus: false });
    });
  });

  setActiveLink(headings[0].id);

  const scrollToCurrentHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;

    if (!target || !headings.includes(target)) {
      return;
    }

    window.requestAnimationFrame(() => {
      scrollToHeading(target, { updateHash: false, focus: false });
    });
  };

  scrollToCurrentHash();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    }, {
      rootMargin: "-18% 0px -68% 0px",
      threshold: 0,
    });

    headings.forEach((heading) => observer.observe(heading));
  }

  window.addEventListener("hashchange", scrollToCurrentHash);
};

const writeClipboard = async (value) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const field = document.createElement("textarea");
  field.value = value;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.top = "-999px";
  document.body.append(field);
  field.select();
  document.execCommand("copy");
  field.remove();
};

const initCodeBlocks = () => {
  document.querySelectorAll(".prose pre").forEach((pre) => {
    if (pre.closest(".code-shell")) {
      return;
    }

    const code = pre.querySelector("code");
    const rawCode = code ? code.textContent : pre.textContent;
    const wrapper = document.createElement("div");
    const button = document.createElement("button");
    const copyLabel = isEnglish ? "Copy" : "Sao chép";
    const copiedLabel = isEnglish ? "Copied" : "Đã chép";

    wrapper.className = "code-shell";
    button.className = "code-copy";
    button.type = "button";
    button.textContent = copyLabel;
    button.setAttribute("aria-label", isEnglish ? "Copy code" : "Sao chép code");

    if (code) {
      code.innerHTML = highlightCode(rawCode);
    }

    pre.before(wrapper);
    wrapper.append(pre, button);

    button.addEventListener("click", async () => {
      try {
        await writeClipboard(rawCode);
        button.textContent = copiedLabel;
        window.setTimeout(() => {
          button.textContent = copyLabel;
        }, 1400);
      } catch {
        button.textContent = isEnglish ? "Failed" : "Lỗi";
      }
    });
  });
};

const initMotion = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    return;
  }

  const motionSelectors = [
    ".site-search",
    ".hero-copy > *",
    ".hero-aside",
    ".ticker",
    ".page-heading",
    ".split-section",
    ".manifesto",
    ".site-footer",
    ".article-header",
    ".archive-toolbar",
    ".archive .entry",
    ".project-detail",
    ".vibe-card",
    ".github-overview",
    ".github-section",
    ".about-grid",
    ".records-heading",
    ".records-tools",
    ".record-item",
    ".achievement-hero",
    ".achievement-story",
    ".timeline-section",
  ];

  const items = Array.from(document.querySelectorAll(motionSelectors.join(",")));

  if (!items.length) {
    return;
  }

  items.forEach((item, index) => {
    item.classList.add("motion-item");
    item.style.setProperty("--motion-order", String(Math.min(index % 6, 5)));
  });

  document.documentElement.classList.add("motion-ready");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.08,
  });

  items.forEach((item) => observer.observe(item));
};

initLanguageSwitch();
initSiteSearch();
initAchievementFilters();
initCanvaEmbeds();
initCodeBlocks();
initArticleToc();
initMotion();
