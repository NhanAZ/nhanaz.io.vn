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
    excerpt: "Phân tích thuế bảo trì của Minecraft Bedrock qua PocketMine-MP, NetherGames, Zeqa, Endstone và những con đường sống khác nhau của server độc lập.",
    keywords: "Minecraft Bedrock PocketMine-MP PMMP NetherGames Zeqa ZeqaMine-PM WaterdogPE InPvP Mineville Mojang Microsoft BDS Bedrock Dedicated Server debug symbols Endstone LeviLamina Dragonfly Geyser Allay PowerNukkitX Cloudburst Galaxite Lifeboat Information wants to be free server độc lập",
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
    title: "PocketMine-MP là gì? Lịch sử PMMP từ 2012 đến 2026",
    type: "Bài viết",
    url: "/posts/pocketmine-mp-la-gi/",
    date: "2026-06-30",
    excerpt: "Hồ sơ gần mười bốn năm của PocketMine-MP, từ Realms, Shoghi, thời kỳ fork và đại tu API đến áp lực Bedrock, vai trò của Mojang và ngày PMMP dừng hỗ trợ.",
    keywords: "PocketMine-MP PMMP PocketMine Realms PocketMine là gì lịch sử PocketMine-MP PocketMine-MP đã chết PMMP dừng hỗ trợ Mojang Shoghi Cervantes shoghicp dktapps Dylan driesboy Minecraft Bedrock Minecraft Pocket Edition server plugin PHP Poggit API 2 API 3 API 4 API 5 Genisys ClearSky ImagicalMine Steadfast Lifeboat debugging symbols fork lịch sử",
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
    excerpt: "An analysis of Bedrock's maintenance tax through PocketMine-MP, NetherGames, Zeqa, Endstone, and the different survival paths available to independent servers.",
    keywords: "Minecraft Bedrock PocketMine-MP PMMP NetherGames Zeqa ZeqaMine-PM WaterdogPE InPvP Mineville Mojang Microsoft BDS Bedrock Dedicated Server debug symbols Endstone LeviLamina Dragonfly Geyser Allay PowerNukkitX Cloudburst Galaxite Lifeboat Information wants to be free independent servers",
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
    url: "/en/posts/minecraft-since-2015/",
    date: "2026-07-01",
    excerpt: "From YouTube, Minecraft PE and MCPE Master to server lists, staff roles, command blocks, PocketMine-MP and Information Technology.",
    keywords: "Minecraft 2015 Minecraft PE MCPE Master Multiplayer Master Omlet Arcade FunCraft SurvivalCraft MineFRK FCA LOR PocketMine-MP PMMP server list command block Information Technology",
  },
  {
    title: "Hello internet, I rebuilt this little home",
    type: "Writing",
    url: "/en/posts/hello-internet/",
    date: "2026-06-29",
    excerpt: "The opening post for nhanaz.io.vn, my home on the internet.",
    keywords: "internet personal blog digital home",
  },
  {
    title: "Who does Zalo PC backup encryption protect?",
    type: "Technical writing",
    url: "/en/posts/reverse-engineering-zalo-pc-backup/",
    date: "2026-06-30",
    excerpt: "A technical look at .zl.zip, uin in Zalo process memory, AES-256-CBC, TAR, and the practical limits of backup encryption.",
    keywords: "NhanAZ Zalo PC Zalo backup reverse engineering application security AES-256-CBC ReadProcessMemory TAR digital forensics uin integrity",
  },
  {
    title: "What Is PocketMine-MP? Complete PMMP History, 2012-2026",
    type: "Writing",
    url: "/en/posts/what-is-pocketmine-mp/",
    date: "2026-06-30",
    excerpt: "Nearly fourteen years of PocketMine-MP, from Realms, Shoghi, forks and API rebuilds to Bedrock pressure, Mojang's role and the end of PMMP support.",
    keywords: "PocketMine-MP PMMP PocketMine Realms what is PocketMine PocketMine-MP history PocketMine-MP dead PMMP end of support Mojang Shoghi Cervantes shoghicp dktapps Dylan driesboy Minecraft Bedrock Minecraft Pocket Edition server plugin PHP Poggit API 2 API 3 API 4 API 5 Genisys ClearSky ImagicalMine Steadfast Lifeboat debugging symbols fork history official website",
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
const ARTICLE_COMMENTS_CONFIG = {
  repo: "NhanAZ/nhanaz.io.vn",
  repoId: "R_kgDOMOlsIA",
  category: "General",
  categoryId: "DIC_kwDOMOlsIM4DA7S2",
  themes: {
    light: "https://nhanaz.io.vn/assets/css/giscus.css?v=20260711-02",
    dark: "https://nhanaz.io.vn/assets/css/giscus-dark.css?v=20260711-01",
  },
};
const ARTICLE_VIEWS_CONFIG = {
  endpoint: "https://api.counterapi.dev/v1",
  snapshot: "/assets/data/article-stats.json",
  namespace: "nhanaz-io-vn",
  revisitWindow: 8 * 60 * 60 * 1000,
  productionHosts: new Set(["nhanaz.io.vn", "www.nhanaz.io.vn"]),
};

const getArticleCommentsTheme = () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  return window.location.protocol === "https:"
    ? ARTICLE_COMMENTS_CONFIG.themes[theme]
    : theme;
};

const LANGUAGE_READING_POSITION_KEY = "nhanaz-language-reading-position";
const LANGUAGE_READING_POSITION_TTL = 2 * 60 * 1000;

const clampReadingProgress = (value) => Number.isFinite(value)
  ? Math.min(1, Math.max(0, value))
  : 0;

const getDocumentTop = (element) => element.getBoundingClientRect().top + window.scrollY;

const getReadingReferenceY = () => {
  const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom || 0;
  const preferred = window.innerHeight * 0.34;
  return Math.min(window.innerHeight - 24, Math.max(headerBottom + 32, preferred));
};

const getProseItems = (prose) => Array.from(prose.children)
  .filter((element) => element.getBoundingClientRect().height > 0);

const captureLanguageReadingPosition = (targetPath) => {
  const targetUrl = new URL(targetPath, window.location.origin);
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const referenceY = getReadingReferenceY();
  const anchorY = window.scrollY + referenceY;
  const state = {
    version: 1,
    createdAt: Date.now(),
    sourcePath: `${window.location.pathname}${window.location.search}`,
    targetPath: `${targetUrl.pathname}${targetUrl.search}`,
    referenceRatio: clampReadingProgress(referenceY / window.innerHeight),
    pageProgress: maxScroll ? clampReadingProgress(window.scrollY / maxScroll) : 0,
  };
  const prose = document.querySelector(".article-layout .prose");

  if (!prose) {
    return state;
  }

  const proseTop = getDocumentTop(prose);
  const proseBottom = proseTop + prose.getBoundingClientRect().height;

  if (anchorY < proseTop || anchorY > proseBottom) {
    return state;
  }

  const items = getProseItems(prose);
  const headings = items.filter((element) => element.matches("h2, h3"));
  let itemIndex = -1;
  let itemDistance = Number.POSITIVE_INFINITY;

  items.forEach((item, index) => {
    const top = getDocumentTop(item);
    const bottom = top + item.getBoundingClientRect().height;
    const distance = anchorY < top ? top - anchorY : (anchorY > bottom ? anchorY - bottom : 0);

    if (distance < itemDistance) {
      itemDistance = distance;
      itemIndex = index;
    }
  });

  const item = items[itemIndex];
  const itemTop = item ? getDocumentTop(item) : proseTop;
  const itemHeight = item?.getBoundingClientRect().height || 1;
  let sectionIndex = -1;

  headings.forEach((heading, index) => {
    if (getDocumentTop(heading) <= anchorY) {
      sectionIndex = index;
    }
  });

  const encodedHashId = window.location.hash.replace(/^#/, "");
  const hashId = typeof decodeURIComponent === "function"
    ? decodeURIComponent(encodedHashId)
    : encodedHashId;
  const hashSectionIndex = hashId
    ? headings.findIndex((heading) => heading.id === hashId)
    : -1;
  const hashSectionTop = hashSectionIndex >= 0 ? getDocumentTop(headings[hashSectionIndex]) : 0;
  const hashSectionBottom = hashSectionIndex >= 0 && headings[hashSectionIndex + 1]
    ? getDocumentTop(headings[hashSectionIndex + 1])
    : proseBottom;
  const hashLead = Math.max(160, window.innerHeight * 0.6);
  const hashIsCurrent = hashSectionIndex >= 0
    && anchorY + hashLead >= hashSectionTop
    && anchorY < hashSectionBottom;
  const resolvedSectionIndex = hashIsCurrent ? hashSectionIndex : sectionIndex;

  const sectionTop = resolvedSectionIndex >= 0 ? getDocumentTop(headings[resolvedSectionIndex]) : proseTop;
  const sectionBottom = headings[resolvedSectionIndex + 1]
    ? getDocumentTop(headings[resolvedSectionIndex + 1])
    : proseBottom;

  return {
    ...state,
    itemCount: items.length,
    itemIndex,
    itemTag: item?.tagName || "",
    itemProgress: clampReadingProgress((anchorY - itemTop) / itemHeight),
    sectionCount: headings.length,
    sectionIndex: resolvedSectionIndex,
    sectionProgress: clampReadingProgress((anchorY - sectionTop) / Math.max(1, sectionBottom - sectionTop)),
    proseProgress: clampReadingProgress((anchorY - proseTop) / Math.max(1, proseBottom - proseTop)),
  };
};

const storeLanguageReadingPosition = (targetPath) => {
  try {
    const state = captureLanguageReadingPosition(targetPath);
    const prose = document.querySelector(".article-layout .prose");
    const items = prose ? getProseItems(prose) : [];
    const headings = items.filter((element) => element.matches("h2, h3"));
    const referenceY = getReadingReferenceY();
    const anchorY = window.scrollY + referenceY;
    const hashId = window.location.hash.replace(/^#/, "");
    const hashIndex = headings.findIndex((heading) => heading.id === hashId);
    const hashTop = hashIndex >= 0 ? getDocumentTop(headings[hashIndex]) : 0;
    const hashBottom = hashIndex >= 0 && headings[hashIndex + 1]
      ? getDocumentTop(headings[hashIndex + 1])
      : (prose ? getDocumentTop(prose) + prose.getBoundingClientRect().height : 0);

    const hashLead = Math.max(160, window.innerHeight * 0.6);

    if (hashIndex >= 0 && anchorY + hashLead >= hashTop && anchorY < hashBottom) {
      state.sectionCount = headings.length;
      state.sectionIndex = hashIndex;
      state.itemCount = -1;
      state.itemIndex = -1;
      state.itemTag = "";
    }

    window.sessionStorage.setItem(LANGUAGE_READING_POSITION_KEY, JSON.stringify(state));
  } catch {
    // Language switching still works when browser storage is unavailable.
  }
};

const readLanguageReadingPosition = () => {
  try {
    const serialized = window.sessionStorage.getItem(LANGUAGE_READING_POSITION_KEY);
    window.sessionStorage.removeItem(LANGUAGE_READING_POSITION_KEY);
    return serialized ? JSON.parse(serialized) : null;
  } catch {
    return null;
  }
};

const restoreLanguageReadingPosition = () => {
  const state = readLanguageReadingPosition();
  const currentPath = `${window.location.pathname}${window.location.search}`;

  if (
    !state
    || state.version !== 1
    || state.targetPath !== currentPath
    || !Number.isFinite(state.createdAt)
    || Date.now() - state.createdAt > LANGUAGE_READING_POSITION_TTL
  ) {
    return;
  }

  const prose = document.querySelector(".article-layout .prose");
  const items = prose ? getProseItems(prose) : [];
  const headings = items.filter((element) => element.matches("h2, h3"));

  const resolveTargetAnchorY = () => {
    // Prefer the matching content block, then its section, then overall reading progress.
    if (
      state.itemCount === items.length
      && Number.isInteger(state.itemIndex)
      && items[state.itemIndex]
      && items[state.itemIndex].tagName === state.itemTag
    ) {
      const item = items[state.itemIndex];
      return getDocumentTop(item)
        + item.getBoundingClientRect().height * clampReadingProgress(state.itemProgress);
    }

    if (
      prose
      && state.sectionCount === headings.length
      && Number.isInteger(state.sectionIndex)
      && state.sectionIndex >= -1
      && state.sectionIndex < headings.length
    ) {
      const proseTop = getDocumentTop(prose);
      const proseBottom = proseTop + prose.getBoundingClientRect().height;
      const sectionTop = state.sectionIndex >= 0 ? getDocumentTop(headings[state.sectionIndex]) : proseTop;
      const sectionBottom = headings[state.sectionIndex + 1]
        ? getDocumentTop(headings[state.sectionIndex + 1])
        : proseBottom;
      return sectionTop
        + (sectionBottom - sectionTop) * clampReadingProgress(state.sectionProgress);
    }

    if (prose && Number.isFinite(state.proseProgress)) {
      const proseTop = getDocumentTop(prose);
      return proseTop
        + prose.getBoundingClientRect().height * clampReadingProgress(state.proseProgress);
    }

    return null;
  };

  const restore = () => {
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const referenceY = clampReadingProgress(state.referenceRatio) * window.innerHeight;
    const targetAnchorY = resolveTargetAnchorY();
    const targetTop = targetAnchorY === null
      ? maxScroll * clampReadingProgress(state.pageProgress)
      : targetAnchorY - referenceY;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;

    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, Math.min(maxScroll, Math.max(0, targetTop)));
    document.documentElement.style.scrollBehavior = previousScrollBehavior;

    if (
      state.sectionCount === headings.length
      && Number.isInteger(state.sectionIndex)
      && headings[state.sectionIndex]?.id
    ) {
      history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#${headings[state.sectionIndex].id}`,
      );
    }
  };

  let readingResumed = false;
  const markReadingResumed = () => {
    readingResumed = true;
  };

  window.addEventListener("wheel", markReadingResumed, { passive: true, once: true });
  window.addEventListener("touchstart", markReadingResumed, { passive: true, once: true });
  window.addEventListener("pointerdown", markReadingResumed, { passive: true, once: true });
  window.addEventListener("keydown", markReadingResumed, { once: true });

  window.requestAnimationFrame(() => {
    restore();
    window.requestAnimationFrame(restore);
  });

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      if (!readingResumed) {
        window.requestAnimationFrame(restore);
      }
    });
  }
};

const initArticleReadingProgress = () => {
  const prose = document.querySelector("main > article > .article-layout .prose");

  if (!prose || document.querySelector("[data-article-reading-progress]")) {
    return;
  }

  const progress = document.createElement("div");
  const fill = document.createElement("span");
  let frame = 0;

  progress.className = "article-reading-progress";
  progress.dataset.articleReadingProgress = "";
  progress.setAttribute("role", "progressbar");
  progress.setAttribute("aria-label", isEnglish ? "Article reading progress" : "Tiến độ đọc bài viết");
  progress.setAttribute("aria-valuemin", "0");
  progress.setAttribute("aria-valuemax", "100");
  progress.setAttribute("aria-valuenow", "0");
  fill.setAttribute("aria-hidden", "true");
  progress.append(fill);
  document.body.append(progress);

  const sync = () => {
    frame = 0;

    const proseTop = getDocumentTop(prose);
    const proseBottom = proseTop + prose.getBoundingClientRect().height;
    const referenceY = getReadingReferenceY();
    const start = proseTop - referenceY;
    const end = proseBottom - referenceY;
    const value = end > start
      ? clampReadingProgress((window.scrollY - start) / (end - start))
      : 1;
    const percent = Math.round(value * 100);

    fill.style.transform = `scaleX(${value})`;
    progress.setAttribute("aria-valuenow", String(percent));
  };

  const queueSync = () => {
    if (frame) {
      return;
    }

    frame = window.requestAnimationFrame(sync);
  };

  sync();
  window.addEventListener("scroll", queueSync, { passive: true });
  window.addEventListener("resize", queueSync);
  window.addEventListener("load", queueSync, { once: true });

  if (document.fonts?.ready) {
    document.fonts.ready.then(queueSync).catch(() => {});
  }
};

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
  link.addEventListener("click", () => storeLanguageReadingPosition(targetPath));
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
  const headingSections = new Map();
  const sections = [];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const headingScrollGap = 34;
  const activeHeadingLead = 28;
  let activeTocId = null;
  let currentSection = null;
  let revealFrame = 0;
  let scrollFrame = 0;

  toc.className = "article-toc";
  toc.setAttribute("aria-label", isEnglish ? "Article table of contents" : "Mục lục bài viết");
  title.className = "article-toc-title";
  title.textContent = isEnglish ? "In this post" : "Trong bài này";
  list.className = "article-toc-list";

  headings.forEach((heading, index) => {
    const id = getUniqueId(heading, index);
    const item = document.createElement("li");
    const link = document.createElement("a");
    const isSectionHeading = heading.tagName === "H2";

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
      setActiveLink(id);
    });

    item.append(link);

    if (isSectionHeading) {
      const childList = document.createElement("ol");

      item.classList.add("article-toc-section");
      currentSection = {
        childList,
        hasChildren: false,
        item,
        link,
      };
      sections.push(currentSection);
      headingSections.set(id, currentSection);
      list.append(item);
      return;
    }

    if (!currentSection) {
      headingSections.set(id, null);
      list.append(item);
      return;
    }

    if (!currentSection.hasChildren) {
      currentSection.hasChildren = true;
      currentSection.childList.className = "article-toc-children";
      currentSection.childList.hidden = true;
      currentSection.link.setAttribute("aria-expanded", "false");
      currentSection.item.append(currentSection.childList);
    }

    headingSections.set(id, currentSection);
    currentSection.childList.append(item);
  });

  toc.append(title, list);
  rail.append(toc);

  const setOpenSection = (activeSection) => {
    sections.forEach((section) => {
      if (!section.hasChildren) {
        return;
      }

      const isOpen = section === activeSection;

      section.item.classList.toggle("is-open", isOpen);
      section.link.setAttribute("aria-expanded", String(isOpen));
      section.childList.hidden = !isOpen;
    });
  };

  const revealActiveLink = (link) => {
    window.cancelAnimationFrame(revealFrame);
    revealFrame = window.requestAnimationFrame(() => {
      if (!link || rail.scrollHeight <= rail.clientHeight + 1) {
        return;
      }

      const railRect = rail.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const header = document.querySelector(".site-header");
      const headerStyle = header ? window.getComputedStyle(header) : null;
      const headerIsSticky = headerStyle?.position === "sticky" || headerStyle?.position === "fixed";
      const headerBottom = headerIsSticky ? header.getBoundingClientRect().bottom : 0;
      const visibleTop = Math.max(
        railRect.top + 18,
        headerBottom + (headerIsSticky ? headingScrollGap + activeHeadingLead : 0),
      );
      const visibleBottom = Math.min(railRect.bottom, window.innerHeight) - 18;
      const delta = linkRect.top - visibleTop;

      if (visibleBottom <= visibleTop) {
        return;
      }

      if (Math.abs(delta) < 1) {
        return;
      }

      rail.scrollTo({
        top: rail.scrollTop + delta,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  };

  const setActiveLink = (id, { reveal = true } = {}) => {
    if (id === activeTocId) {
      return;
    }

    activeTocId = id;
    const activeLink = links.get(id) || null;
    const activeSection = activeLink ? headingSections.get(id) : null;

    links.forEach((link, targetId) => {
      const isActive = targetId === id;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    setOpenSection(activeSection);

    if (reveal) {
      revealActiveLink(activeLink);
    }
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

    return Math.ceil(header.getBoundingClientRect().bottom + headingScrollGap);
  };

  const scrollToHeading = (target, { updateHash = true, focus = false } = {}) => {
    if (updateHash) {
      history.pushState(null, "", `${location.pathname}${location.search}#${target.id}`);
    }

    setActiveLink(target.id);

    const top = target.getBoundingClientRect().top + window.scrollY - getScrollOffset();

    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    if (focus) {
      target.focus({ preventScroll: true });
    }
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

  const scrollToCurrentHash = () => {
    const encodedId = location.hash.slice(1);
    const id = typeof decodeURIComponent === "function"
      ? decodeURIComponent(encodedId)
      : encodedId;
    const target = id ? document.getElementById(id) : null;

    if (!target || !headings.includes(target)) {
      return;
    }

    window.requestAnimationFrame(() => {
      scrollToHeading(target, { updateHash: false, focus: false });
    });
  };

  const syncActiveHeading = () => {
    const readingLine = getScrollOffset() + activeHeadingLead;
    let activeHeading = null;

    headings.forEach((heading) => {
      if (heading.getBoundingClientRect().top <= readingLine) {
        activeHeading = heading;
      }
    });

    if (
      !activeHeading
      && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
    ) {
      activeHeading = headings[headings.length - 1];
    }

    setActiveLink(activeHeading?.id || "");
  };

  const queueActiveHeadingSync = () => {
    if (scrollFrame) {
      return;
    }

    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      syncActiveHeading();
    });
  };

  syncActiveHeading();
  scrollToCurrentHash();

  if (document.readyState !== "complete") {
    window.addEventListener("load", scrollToCurrentHash, { once: true });
  }

  window.addEventListener("scroll", queueActiveHeadingSync, { passive: true });
  window.addEventListener("resize", queueActiveHeadingSync);
  window.addEventListener("hashchange", scrollToCurrentHash);
};

const initEntryPriorities = () => {
  document.querySelectorAll("[data-entry-priority-list]").forEach((list) => {
    const entries = Array.from(list.querySelectorAll(":scope > .entry"));

    const sortedEntries = entries
      .map((entry, index) => {
        const priority = Number.parseInt(entry.dataset.priority || "0", 10);
        const publishedAt = Date.parse(entry.querySelector("time")?.dateTime || "");

        return {
          entry,
          index,
          priority: Number.isFinite(priority) ? priority : 0,
          publishedAt: Number.isFinite(publishedAt) ? publishedAt : 0,
        };
      })
      .sort((a, b) =>
        b.priority - a.priority || b.publishedAt - a.publishedAt || a.index - b.index,
      );

    sortedEntries.forEach(({ entry }) => list.append(entry));
  });
};

const initArticleComments = () => {
  const articleLayout = document.querySelector("main > article > .article-layout");

  if (!articleLayout || articleLayout.parentElement?.querySelector(":scope > .article-comments")) {
    return;
  }

  const section = document.createElement("section");
  const rail = document.createElement("div");
  const label = document.createElement("p");
  const body = document.createElement("div");
  const header = document.createElement("header");
  const title = document.createElement("h2");
  const description = document.createElement("p");
  const embed = document.createElement("div");
  const giscusTarget = document.createElement("div");
  const loader = document.createElement("div");
  const loaderBar = document.createElement("span");
  const loaderText = document.createElement("p");
  const script = document.createElement("script");
  let commentsLoaded = false;

  const markCommentsLoaded = () => {
    if (commentsLoaded) {
      return;
    }

    commentsLoaded = true;
    embed.classList.add("is-loaded");
    watchGiscusFrame.disconnect();
    window.removeEventListener("message", handleGiscusMessage);
    loader.setAttribute("aria-hidden", "true");
    loader.removeAttribute("role");
    loader.removeAttribute("aria-live");
  };

  const watchGiscusFrame = new MutationObserver(() => {
    const frame = embed.querySelector("iframe.giscus-frame, iframe");

    if (!frame || frame.dataset.commentsWatched) {
      return;
    }

    frame.dataset.commentsWatched = "true";
    frame.addEventListener("load", markCommentsLoaded, { once: true });
    window.setTimeout(() => {
      if (frame.isConnected) {
        markCommentsLoaded();
      }
    }, 1600);
  });

  const handleGiscusMessage = (event) => {
    if (event.origin !== "https://giscus.app" || !event.data?.giscus) {
      return;
    }

    markCommentsLoaded();
    window.removeEventListener("message", handleGiscusMessage);
  };

  const syncCommentsTheme = () => {
    const frame = embed.querySelector("iframe.giscus-frame, iframe");
    if (!frame?.contentWindow) {
      return;
    }

    frame.contentWindow.postMessage({
      giscus: {
        setConfig: {
          theme: getArticleCommentsTheme(),
        },
      },
    }, "https://giscus.app");
  };

  section.className = "article-comments";
  section.setAttribute("aria-labelledby", "article-comments-title");
  rail.className = "article-comments-rail";
  label.className = "article-comments-label";
  label.textContent = "GitHub Discussions";
  body.className = "article-comments-body";
  header.className = "article-comments-header";
  title.id = "article-comments-title";
  title.textContent = isEnglish ? "Comments" : "Bình luận";
  description.textContent = isEnglish
    ? "Add a thought, correction, or question here. The conversation is stored publicly on GitHub Discussions."
    : "Có điều muốn thêm, sửa hoặc hỏi tiếp thì để lại ở đây. Phần trao đổi được lưu công khai trên GitHub Discussions.";
  embed.className = "article-comments-embed";
  giscusTarget.className = "article-comments-giscus giscus";
  loader.className = "article-comments-loader";
  loader.setAttribute("role", "status");
  loader.setAttribute("aria-live", "polite");
  loaderText.textContent = isEnglish ? "Loading comments..." : "Đang tải bình luận...";

  script.src = "https://giscus.app/client.js";
  script.dataset.repo = ARTICLE_COMMENTS_CONFIG.repo;
  script.dataset.repoId = ARTICLE_COMMENTS_CONFIG.repoId;
  script.dataset.category = ARTICLE_COMMENTS_CONFIG.category;
  script.dataset.categoryId = ARTICLE_COMMENTS_CONFIG.categoryId;
  script.dataset.mapping = "pathname";
  script.dataset.strict = "1";
  script.dataset.reactionsEnabled = "1";
  script.dataset.emitMetadata = "0";
  script.dataset.inputPosition = "top";
  script.dataset.theme = getArticleCommentsTheme();
  script.dataset.lang = isEnglish ? "en" : "vi";
  script.dataset.loading = "lazy";
  script.crossOrigin = "anonymous";
  script.async = true;
  script.addEventListener("error", () => {
    embed.classList.add("has-error");
    watchGiscusFrame.disconnect();
    window.removeEventListener("message", handleGiscusMessage);
    loaderText.textContent = isEnglish
      ? "Comments could not be loaded. Please refresh the page."
      : "Chưa tải được bình luận. Bạn thử tải lại trang nhé.";
  }, { once: true });

  rail.append(label);
  header.append(title, description);
  loader.append(loaderBar, loaderText);
  body.append(header, embed);
  section.append(rail, body);
  articleLayout.after(section);
  watchGiscusFrame.observe(giscusTarget, { childList: true });
  window.addEventListener("message", handleGiscusMessage);
  window.addEventListener("site:theme-change", syncCommentsTheme);
  embed.append(loader);
  giscusTarget.append(script);
  embed.append(giscusTarget);
};

const initArticleViews = () => {
  const metaList = document.querySelector("main > article > .article-header .article-meta ul");

  if (!metaList || metaList.querySelector("[data-article-views]")) {
    return;
  }

  const vietnameseAlternate = document.querySelector('link[rel="alternate"][hreflang="vi"]');
  const canonical = document.querySelector('link[rel="canonical"]');
  let articlePath;

  try {
    articlePath = new URL(
      vietnameseAlternate?.href || canonical?.href || window.location.href,
      window.location.origin,
    ).pathname;
  } catch {
    return;
  }

  const articleMatch = articlePath.match(/^\/posts\/([^/]+)\/?$/);

  if (!articleMatch) {
    return;
  }

  const counterName = `article-${articleMatch[1].toLowerCase().replace(/[^a-z0-9-]+/g, "-")}`;
  const storageKey = `nhanaz-article-view-${counterName}`;
  const item = document.createElement("li");
  const numberFormat = new Intl.NumberFormat(isEnglish ? "en-US" : "vi-VN");

  const renderCount = (count, { isSnapshot = false } = {}) => {
    const label = isEnglish
      ? (count === 1 && !isSnapshot ? "view" : "views")
      : "lượt xem";

    item.textContent = `${numberFormat.format(count)}${isSnapshot ? "+" : ""} ${label}`;
    item.classList.remove("is-loading", "has-error");
    item.setAttribute(
      "aria-label",
      isSnapshot
        ? (isEnglish
          ? `This article had at least ${count} views in the latest daily snapshot`
          : `Bài viết này có ít nhất ${count} lượt xem trong bản đếm gần nhất`)
        : (isEnglish ? `This article has ${count} views` : `Bài viết này có ${count} lượt xem`),
    );
    if (isSnapshot) {
      item.title = isEnglish
        ? "Latest daily snapshot. Live counting may be blocked by the browser."
        : "Bản đếm gần nhất trong ngày. Trình duyệt có thể đang chặn bộ đếm trực tiếp.";
    } else {
      item.removeAttribute("title");
    }
    item.removeAttribute("role");
    item.removeAttribute("aria-live");
  };

  const renderError = () => {
    item.textContent = isEnglish ? "Views unavailable" : "Chưa đếm được";
    item.classList.remove("is-loading");
    item.classList.add("has-error");
    item.setAttribute(
      "aria-label",
      isEnglish ? "View count is currently unavailable" : "Bộ đếm lượt xem hiện chưa khả dụng",
    );
  };

  const readLastVisit = () => {
    try {
      return Number(window.localStorage.getItem(storageKey)) || 0;
    } catch {
      return 0;
    }
  };

  const writeLastVisit = (timestamp) => {
    try {
      window.localStorage.setItem(storageKey, String(timestamp));
    } catch {
      // Counting still works when storage is unavailable.
    }
  };

  const loadSnapshotCount = async () => {
    const response = await fetch(ARTICLE_VIEWS_CONFIG.snapshot, {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`View snapshot returned ${response.status}`);
    }

    const payload = await response.json();
    const count = Number(payload?.counts?.[counterName]);

    if (!Number.isSafeInteger(count) || count < 0) {
      throw new Error("View snapshot does not contain this article");
    }

    renderCount(count, { isSnapshot: true });
  };

  const loadCount = async () => {
    const now = Date.now();
    const lastVisit = readLastVisit();
    const isRecentVisit = lastVisit > 0 && now - lastVisit < ARTICLE_VIEWS_CONFIG.revisitWindow;
    const shouldIncrement = ARTICLE_VIEWS_CONFIG.productionHosts.has(window.location.hostname)
      && !isRecentVisit
      && !navigator.webdriver;
    const counterUrl = [
      ARTICLE_VIEWS_CONFIG.endpoint,
      encodeURIComponent(ARTICLE_VIEWS_CONFIG.namespace),
      encodeURIComponent(counterName),
    ].join("/");
    const requestUrl = shouldIncrement ? `${counterUrl}/up` : `${counterUrl}/`;

    try {
      const response = await fetch(requestUrl, {
        cache: "no-store",
        mode: "cors",
      });
      const payload = await response.json();

      if (!response.ok) {
        if (response.status === 400 && payload?.message === "record not found") {
          renderCount(0);
          return;
        }

        throw new Error(`View counter returned ${response.status}`);
      }

      const count = Number(payload.count);

      if (!Number.isFinite(count) || count < 0) {
        throw new Error("View counter returned an invalid count");
      }

      if (shouldIncrement) {
        writeLastVisit(now);
      }

      renderCount(count);
    } catch {
      try {
        await loadSnapshotCount();
      } catch {
        renderError();
      }
    }
  };

  item.className = "article-view-count is-loading";
  item.dataset.articleViews = "";
  item.textContent = isEnglish ? "Counting views..." : "Đang đếm lượt xem...";
  item.setAttribute("role", "status");
  item.setAttribute("aria-live", "polite");
  metaList.classList.add("has-view-count");
  metaList.append(item);

  if (document.visibilityState === "hidden") {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        loadCount();
      }
    }, { once: true });
  } else {
    loadCount();
  }
};

const writeClipboard = async (value) => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Some browsers expose the API but still deny writes. Fall back below.
    }
  }

  const field = document.createElement("textarea");
  field.value = value;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.top = "-999px";
  document.body.append(field);

  let copied = false;
  try {
    field.select();
    copied = document.execCommand("copy");
  } finally {
    field.remove();
  }

  if (!copied) {
    throw new Error("Clipboard write failed");
  }
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
initEntryPriorities();
initCanvaEmbeds();
initCodeBlocks();
initArticleToc();
restoreLanguageReadingPosition();
initArticleReadingProgress();
initArticleViews();
initArticleComments();
initMotion();
