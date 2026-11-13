"""Собирает index.html из src/: python3 build.py"""
import pathlib
d=pathlib.Path(__file__).parent/"src"
content=["g1", "g2", "g3", "g4", "g5", "v1", "v2", "v3", "v4", "v5", "v6", "w_a1", "w_a2a", "w_a2b", "w_b1a", "w_b1b", "w_b1c", "w_b2", "w_x1", "w_x2", "w_x3", "w_x4", "u1", "u2", "m1", "m2"]
app=["a1","a2","a3","a4","a5"]
t=(d/"template.html").read_text(encoding="utf-8")
c="\n".join((d/"content"/f"{f}.js").read_text(encoding="utf-8") for f in content)
a="\n".join((d/"app"/f"{f}.js").read_text(encoding="utf-8") for f in app)
out=t.replace("/*CONTENT*/",c).replace("/*APP*/",a)
(d.parent/"index.html").write_text(out,encoding="utf-8")
print("index.html:",len(out),"bytes")
