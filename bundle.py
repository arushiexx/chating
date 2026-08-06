import base64
import os

os.chdir("C:\\Users\\Atul gupta\\Downloads\\influencer-bio")

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()
    
with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

with open("script.js", "r", encoding="utf-8") as f:
    js = f.read()

def get_b64(path):
    if not os.path.exists(path): return ""
    with open(path, "rb") as f:
        return "data:image/jpeg;base64," + base64.b64encode(f.read()).decode()

pic1 = get_b64("assets/pic1.jpeg")
pic2 = get_b64("assets/pic2.jpeg")
pic3 = get_b64("assets/pic3.jpeg")
qr = get_b64("assets/qr-code.jpeg")

html = html.replace('assets/pic1.jpeg', pic1)
html = html.replace('assets/pic2.jpeg', pic2)
html = html.replace('assets/pic3.jpeg', pic3)
html = html.replace('assets/qr-code.jpeg', qr)

html = html.replace('<link rel="stylesheet" href="style.css">', f'<style>{css}</style>')
html = html.replace('<script src="script.js"></script>', f'<script>{js}</script>')

with open("index_single.html", "w", encoding="utf-8") as f:
    f.write(html)
