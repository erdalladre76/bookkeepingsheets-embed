import re
from num2words import num2words as nw

def year(y):
    y = int(y)
    return nw(y, to="year")

def money(m):
    s = m.group(1).replace(",", "")
    if "." in s:
        d, c = s.split(".")
        d, c = int(d), int(c)
        out = nw(d).replace(",","") + (" dollar" if d == 1 else " dollars")
        if c:
            out += " and " + nw(c) + " cents"
        return out
    d = int(s)
    return nw(d).replace(",","") + (" dollar" if d == 1 else " dollars")

def num(m):
    return numstr(m.group(0))

def numstr(s):
    s = s.replace(",", "")
    if "." in s:
        a, b = s.split(".")
        if b == "5" and len(b) == 1:
            return nw(int(a)) + " point five"
        return nw(int(a)) + " point " + " ".join(nw(int(ch)) for ch in b)
    return nw(int(s)).replace(",","")

MONTHS = "January|February|March|April|May|June|July|August|September|October|November|December"

def norm(t):
    t = t.replace("bookkeepingsheets.com", "bookkeeping sheets dot com")
    t = re.sub(r"1099-NEC", "ten ninety-nine N E C", t)
    t = re.sub(r"1099-MISC", "ten ninety-nine misc", t)
    t = re.sub(r"1099-K", "ten ninety-nine K", t)
    t = re.sub(r"1099s\b", "ten ninety-nines", t)
    t = re.sub(r"\b1099\b", "ten ninety-nine", t)
    t = re.sub(r"Form 1040", "Form ten forty", t)
    t = re.sub(r"Form 8949", "Form eighty-nine forty-nine", t)
    t = re.sub(r"\bW-4\b", "W four", t)
    t = re.sub(r"\bCP2000\b", "C P two thousand", t)
    t = re.sub(r"Schedule SE", "Schedule S E", t)
    t = re.sub(r"\bSE\b", "S E", t)
    t = re.sub(r"(\d+)\.5 cents", lambda m: nw(int(m.group(1))) + " and a half cents", t)
    t = re.sub(r"(%s) (\d{1,2}), (\d{4})" % MONTHS,
               lambda m: m.group(1) + " " + nw(int(m.group(2)), to="ordinal") + ", " + year(m.group(3)), t)
    t = re.sub(r"\$(\d{1,3}(?:,\d{3})+(?:\.\d\d)?|\d+(?:\.\d\d)?)", money, t)
    t = re.sub(r"([\d.]+)%", lambda m: numstr(m.group(1)) + " percent", t)
    t = re.sub(r"\b(19|20)\d\d\b", lambda m: year(m.group(0)), t)
    t = re.sub(r"\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?", num, t)
    t = t.replace("&", "and")
    return t

if __name__ == "__main__":
    import sys
    print(norm(sys.argv[1]))
