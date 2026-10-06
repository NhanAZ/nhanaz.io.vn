# Bản nghe của bài viết

Bản Việt dùng VieNeu-TTS v3 Turbo với preset Thái Sơn, giọng nam miền Nam kể chuyện đã được NhanAZ chọn sau khi nghe mẫu. Bản Anh dùng Kokoro v1.0 với Heart, giọng nữ tiếng Anh Mỹ. File tạo sẵn nên người đọc không cần tài khoản, API key hay cài thêm công cụ. Trình phát không dùng giọng của thiết bị.

## Dùng hằng ngày

Sau khi thêm hoặc sửa bài, chạy từ thư mục project.

```powershell
npm run audio
npm run audio:check
```

Lệnh đầu tự tìm bài mới hoặc bài đã đổi, giữ lại các đoạn audio trong cache và tạo lại phần cần thiết. Lệnh kiểm tra đối chiếu nội dung, cấu hình và checksum file, không nạp mô hình. Khi chỉ cần một bài hoặc một ngôn ngữ.

```powershell
npm run audio -- --article dang-chet-va-quyen-giet
npm run audio -- --language en
```

Công cụ mặc định tạo các đoạn độc lập bằng hai worker, mỗi worker dùng tối đa hai luồng CPU. Thứ tự ghép vẫn theo bài viết, chỉ cập nhật manifest sau khi hoàn thành cả bài. Máy ít RAM có thể chạy `npm run audio -- --workers 1`. Các đoạn trùng nhau chỉ tạo một lần và vẫn được đọc ở đủ các vị trí trong bài.

Sau khi workflow được push lên `main`, GitHub Actions cũng tự tạo audio khi bài Việt, bài Anh hoặc cấu hình đọc thay đổi. Workflow kiểm tra toàn bộ bản ghi trước khi bot commit riêng `assets/audio/`. Repo này đang public, nên standard GitHub-hosted runner được miễn phí theo [chính sách GitHub Actions](https://docs.github.com/en/actions/concepts/billing-and-usage). Bot dispatch workflow kiểm tra tĩnh sau khi push vì commit bằng `GITHUB_TOKEN` không tự kích hoạt workflow push khác.

Việc tạo audio mất thời gian CPU. Workflow có giới hạn thời gian của GitHub, còn công cụ local không đặt giới hạn độ dài bài. Nếu job bị ngắt, chạy lại để tiếp tục từ cache. Không chuyển sang runner trả phí để tránh chờ. Audio vẫn dùng dung lượng và băng thông hosting như những tài nguyên khác của website.

Bước tạo có trần 300 phút trong job 350 phút để còn thời gian lưu cache nếu bước đó bị ngắt. Các đoạn đã tạo được lưu cả khi bước tạo lỗi, bản ghi của bài chỉ được publish sau khi ghép xong toàn bài.

Phát hành website qua kết nối Git hiện có của Vercel, để Vercel lấy source từ repo và chạy `scripts/build-vercel.mjs`. Bộ MP3 của nhiều bài dài có thể vượt 100 MB, trong khi [giới hạn upload source bằng Vercel CLI trên Hobby](https://vercel.com/docs/limits#static-file-uploads) là 100 MB. Không dùng CLI để upload nguyên repo kèm audio. [Deployment Storage](https://vercel.com/docs/deployment-storage) cũng có quota, nên miễn phí tạo giọng không có nghĩa dung lượng và băng thông hosting vô hạn.

## Cài công cụ một lần

Cần Python 3.12, Node theo phiên bản project và kết nối mạng cho lần tải mô hình đầu tiên. Không cần GPU hay FFmpeg cài toàn hệ thống. `imageio-ffmpeg` cung cấp FFmpeg trong môi trường riêng.

```powershell
py -3.12 -m venv outputs/audio-venv
.\outputs\audio-venv\Scripts\python.exe -m pip install -r scripts/audio-requirements.txt
npm run audio
```

Trên Linux, tạo môi trường bằng `python3.12 -m venv outputs/audio-venv`. Đường dẫn Python của môi trường là `outputs/audio-venv/bin/python`. Wrapper tự chọn môi trường local nếu có. Có thể đặt `ARTICLE_AUDIO_PYTHON` để dùng Python khác. `outputs/` là thư mục cache bị Git bỏ qua, không đưa môi trường Python, mô hình hoặc WAV trung gian vào commit.

Để thử phát và tua trên local, chạy `npm run serve` rồi mở `http://127.0.0.1:4174`. Server này hỗ trợ HTTP Range để trình duyệt tua tới một phần bất kỳ của MP3, không cần thư viện ngoài. Một static server không hỗ trợ Range có thể làm trình duyệt tua về đầu file dù player đã gửi đúng thời gian.

## Cách tạo và phát

- Đọc tiêu đề, đoạn giới thiệu và các block của `.prose` theo đúng thứ tự. Đọc tên liên kết, không đọc URL đằng sau nó. Đọc nội dung bảng theo hàng. Với code block, nói ngắn rằng đoạn mã nằm trên trang, không đánh vần mã nguồn.
- Bảng `pronunciation` trong `scripts/article-audio.json` chỉ đổi cách phát âm trong audio, không sửa chữ của bài. Khi điều chỉnh tên riêng hoặc thuật ngữ, nghe lại mẫu có từ đó.
- Mỗi đoạn có cache riêng dựa trên văn bản và cấu hình giọng. Mô hình xử lý các đoạn nhỏ, file được ghép dần ra đĩa. Không cắt bớt phần cuối vì bài dài và không giữ toàn bộ một bài dài trong RAM.
- Audio được chia thành các phần khoảng 15 phút để mỗi file nằm dưới giới hạn kích thước Git. Trình phát nối tiếp các phần, tua theo tổng thời gian của bài và cho chọn đề mục. Vị trí đề mục là thời gian audio, độc lập với URL hash của mục lục.
- Trình phát chỉ tải MP3 sau khi người đọc bấm phát hoặc tua. Khi nội dung trên trang không khớp bản ghi, nó hiển thị trạng thái đang cập nhật thay vì đọc nội dung cũ.
- Tên MP3 chứa hash của nội dung, nên có thể cache dài trên Vercel và trình duyệt. Manifest được kiểm tra lại khi mở trang để bài đã sửa nhận bản nghe mới.
- Không có lịch sử nghe, tracking mới, micro, API tạo giọng lúc người dùng bấm nghe hoặc giọng thiết bị làm fallback. Vị trí và tốc độ đọc chỉ ở bộ nhớ của trang đang mở.

## Mô hình và quyền sử dụng

[VieNeu-TTS](https://github.com/pnnbao97/VieNeu-TTS) và [VieNeu-TTS-v3-Turbo](https://huggingface.co/pnnbao-ump/VieNeu-TTS-v3-Turbo) được phát hành theo Apache 2.0. Model card xác nhận preset có sự đồng ý của người nói và cho phép dùng audio tạo ra, kể cả thương mại. Project chỉ dùng preset có sẵn, không nhân bản giọng một người khác. Revision mô hình và codec được chốt trong cấu hình. Do SDK chỉ nhận codec qua alias `main`, công cụ trỏ alias trong cache riêng của project tới revision đã chọn và nạp SDK ở chế độ offline. Nó không sửa cache Hugging Face chung của máy.

[Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) dùng Apache 2.0. [kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx) dùng MIT. File mô hình và bộ giọng được tải từ release chính thức, kiểm tra SHA-256 trước khi nạp. Không phân phối model weights trong website.

Codec cho bản Việt là [MOSS-Audio-Tokenizer-Nano-ONNX](https://huggingface.co/OpenMOSS-Team/MOSS-Audio-Tokenizer-Nano-ONNX) của OpenMOSS Team, cũng dùng Apache 2.0. Nguồn và revision của codec được giữ cùng cấu hình mô hình.

TTS vẫn có thể đọc sai tên riêng, số hoặc một câu khó. Bộ tạo phát hiện file rỗng, lỗi số và checksum sai, nhưng những kiểm tra đó không thay thế việc nghe. Khi đổi giọng, mô hình, bảng phát âm hoặc cách chia câu, nghe lại đoạn đầu, giữa và cuối của một bài ngắn cùng một bài dài ở cả Việt và Anh trước khi bàn giao.
