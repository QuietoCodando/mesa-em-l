from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

logo_path = Path(r"G:\.shortcut-targets-by-id\1NZMnd11tQ_REUUU5BG1I0wAMHOFsKtUx\CaosTF\30-produtos\caostf-site\public\logo.jpg")
out = Path(r"C:\Users\lucas\workspace_maker\moveis\og-mesa-em-l.jpg")
W, H = 1200, 630
bg = (20, 19, 17)
img = Image.new("RGB", (W, H), bg)
d = ImageDraw.Draw(img)

# warm radial glow
for r in range(520, 0, -8):
    a = int(18 * (1 - r / 520))
    d.ellipse((170 - r, 250 - r, 170 + r, 250 + r), fill=(20 + a, 19 + a // 2, 17))

logo = Image.open(logo_path).convert("RGB").resize((300, 300), Image.LANCZOS)
img.paste(logo, (80, 80))

def font(name, size):
    p = Path(r"C:\Windows\Fonts") / name
    return ImageFont.truetype(str(p), size)

f_title = font("georgia.ttf", 78)
f_sub = font("georgia.ttf", 34)
f_small = font("arial.ttf", 24)
f_foot = font("arial.ttf", 20)

x = 440
d.text((x, 140), "Mesa em L", font=f_title, fill=(240, 233, 223))
d.text((x, 238), "proposta CaosTF", font=f_sub, fill=(217, 154, 78))
d.text((x, 310), "3D · medidas · furos · acabamento", font=f_small, fill=(169, 157, 141))
d.text((x, 350), "sob medida, para o seu espaço", font=f_small, fill=(169, 157, 141))
d.line((x, 430, x + 520, 430), fill=(70, 62, 52), width=2)
d.text((x, 460), "caostf.com.br", font=f_foot, fill=(120, 110, 96))

img.save(out, quality=88)
print(out, out.stat().st_size, img.size)
