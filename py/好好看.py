#!/usr/bin/python
# -*- coding: utf-8 -*-
import re
import json
import time
import hashlib
import threading
import urllib.parse
import concurrent.futures as cf
import requests
from base.spider import Spider

PIC = "http://vres.cyscyy.com"
UA = "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36"

# Names / keywords to skip (search engines, known bad lines)
SKIP = ("搜索", "百度", "搜狗", "神马", "360", "baidu", "google", "sogou", "kuaishou", "快手")
WM = ("kkys", "kekys", "可可影视")


class Spider(Spider):
    def getName(self):
        return "好好看"

    def init(self, extend=""):
        try:
            ext = json.loads(extend)
            self.host = ext.get("host", "https://www.hhkan2.com").rstrip("/")
        except Exception:
            self.host = "https://www.hhkan2.com"
        self.headers = {"User-Agent": UA}
        self.s = requests.Session()
        self.s.headers.update(self.headers)
        self.s.headers["Accept-Encoding"] = "gzip, deflate"
        self.categories = [
            {"type_id": "new", "type_name": "更新推薦"},
            {"type_id": "1", "type_name": "电影"},
            {"type_id": "2", "type_name": "剧集"},
            {"type_id": "3", "type_name": "动漫"},
            {"type_id": "4", "type_name": "综艺"},
            {"type_id": "6", "type_name": "短剧"},
        ]
        self._tok = ""
        self._tok_t = 0
        self._fcache = {}
        self._filters_built = False
        self._lock = threading.Lock()
        self._pool = cf.ThreadPoolExecutor(8)

    # ------------------------------------------------------------------
    # CDN / request helpers
    # ------------------------------------------------------------------
    def _solve(self, html):
        m = re.search(r"'([0-9A-F]{40})'", html)
        if not m:
            return
        c = m.group(1)
        n1 = int(c[0], 16)
        i = 0
        while True:
            d = hashlib.sha1((c + str(i)).encode()).digest()
            if d[n1] == 0xB0 and d[n1 + 1] == 0x0B:
                break
            i += 1
        domain = self.host.split("//")[-1]
        self.s.cookies.set("cdndefend_js_cookie", c + str(i), domain=domain)

    def _get(self, url, timeout=20):
        try:
            u = url if url.startswith("http") else self.host + url
            r = self.s.get(u, timeout=timeout)
            tries = 0
            while "cdndefend" in r.text[:3000] and tries < 3:
                with self._lock:
                    r = self.s.get(u, timeout=timeout)
                    if "cdndefend" in r.text[:3000]:
                        self._solve(r.text)
                        self._tok = ""
                        r = self.s.get(u, timeout=timeout)
                tries += 1
            return r.text
        except Exception:
            return ""

    def _pic(self, u):
        if not u:
            return ""
        return PIC + u if u.startswith("/") else u

    def _clean(self, s):
        return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()

    def _is_skip(self, name):
        t = (name or "").lower()
        if any(w in t for w in WM):
            return True
        if any(k in t for k in SKIP):
            return True
        return False

    # ------------------------------------------------------------------
    # List parsing
    # ------------------------------------------------------------------
    def _items(self, html):
        out = []
        seen = set()
        for blk in re.findall(r'<div class="module-item">.*?</div>\s*</a>\s*</div>', html, re.S):
            mid = re.search(r'href="/detail/(\d+)\.html"', blk)
            if not mid or mid.group(1) in seen:
                continue
            seen.add(mid.group(1))
            cov = next((x for x in re.findall(r'data-original="([^"]+)"', blk) if x.startswith("/vod1")), "")
            tit = re.findall(r'<div class="v-item-title">([^<]+)</div>', blk)
            rem = re.search(r'<div class="v-item-bottom">\s*<span>\s*([^<]+?)\s*</span>', blk)
            out.append({
                "vod_id": mid.group(1),
                "vod_name": tit[0].strip() if tit else "",
                "vod_pic": self._pic(cov),
                "vod_remarks": rem.group(1) if rem else "",
            })
        return out

    # ------------------------------------------------------------------
    # Token & filters (from 好好看 – working)
    # ------------------------------------------------------------------
    def _token(self):
        if not self._tok or time.time() - self._tok_t > 1800:
            h = self._get("/")
            m = re.search(r'/search\?k=[^&]+&(?:amp;)?t=([^"&]+)', h)
            self._tok = m.group(1) if m else ""
            self._tok_t = time.time()
        return self._tok

    def _build_filters(self, tid):
        html = self._get(f"/show/{tid}-----1-1.html")
        fmap = {"类型": "cls", "地区": "area", "语言": "lang", "年份": "year", "排序": "sort"}
        fl = []
        for name, body in re.findall(
            r'<div class="filter-row-side">\s*<strong>([^:]+):</strong>.*?<div class="filter-row-main">(.*?)</div>\s*</div>',
            html, re.S
        ):
            key = fmap.get(name.strip())
            if not key:
                continue
            vals, seenl = [], set()
            for href, txt in re.findall(r'<a\s+href="(/show/[^"]+)"\s+class="filter-item[^"]*">([^<]+)</a>', body):
                t = txt.strip()
                if t in seenl:
                    continue
                seenl.add(t)
                segs = href[len("/show/"):].split(".")[0].split("-")
                v = ""
                if key == "sort":
                    v = segs[5] if len(segs) == 7 else "1"
                else:
                    idx = {"cls": 1, "area": 2, "lang": 3, "year": 4}[key]
                    v = urllib.parse.unquote(segs[idx]) if len(segs) == 7 else ""
                vals.append({
                    "n": t if t != "全部" else ("综合" if key == "sort" else "全部"),
                    "v": v,
                })
            if vals:
                fl.append({"key": key, "name": name.strip(), "value": vals})
        order = ["sort", "cls", "area", "lang", "year"]
        fl.sort(key=lambda x: order.index(x["key"]) if x["key"] in order else 9)
        return fl

    def _ensure_filters(self):
        if self._filters_built:
            return
        # only build filters for normal category ids (skip "new")
        tids = [c["type_id"] for c in self.categories if str(c["type_id"]).isdigit()]
        futs = {tid: self._pool.submit(self._build_filters, tid) for tid in tids}
        for tid, f in futs.items():
            try:
                self._fcache[tid] = f.result()
            except Exception:
                self._fcache[tid] = []
        self._fcache["new"] = []  # no filters for 更新推薦
        self.filters = self._fcache
        self._filters_built = True

    # ------------------------------------------------------------------
    # Home / Category / Search
    # ------------------------------------------------------------------
    def homeContent(self, filter):
        html = self._get("/")
        self._ensure_filters()
        hot = []
        seen = set()
        for blk in re.findall(r'<div class="module-item">.*?</div>\s*</a>\s*</div>', html, re.S):
            mid = re.search(r'href="/detail/(\d+)\.html"', blk)
            if not mid or mid.group(1) in seen:
                continue
            seen.add(mid.group(1))
            tit = re.findall(r'<div class="v-item-title">([^<]+)</div>', blk)
            cov = next((x for x in re.findall(r'data-original="([^"]+)"', blk) if x.startswith("/vod1")), "")
            if tit:
                hot.append({
                    "vod_id": mid.group(1),
                    "vod_name": tit[0].strip(),
                    "vod_pic": self._pic(cov),
                })
        return {
            "class": self.categories,
            "list": hot[:40],
            "filters": self._fcache,
        }

    def categoryContent(self, tid, pg, filter, extend):
        pg = int(pg or 1)
        # 更新推薦 / 今日更新
        if str(tid) == "new":
            html = self._get(f"/new/{pg}.html")
            lst = self._items(html)
            pagecount = pg + 1 if "page-item-next" in html else pg
            return {
                "page": pg,
                "pagecount": pagecount,
                "limit": len(lst),
                "total": pagecount * max(len(lst), 1),
                "list": lst,
            }
        extend = extend or {}
        cls = urllib.parse.quote(extend.get("cls", ""))
        area = urllib.parse.quote(extend.get("area", ""))
        lang = urllib.parse.quote(extend.get("lang", ""))
        year = extend.get("year", "")
        sort = extend.get("sort", "1")
        url = f"/show/{tid}-{cls}-{area}-{lang}-{year}-{sort}-{pg}.html"
        html = self._get(url)
        lst = self._items(html)
        pagecount = pg + 1 if "page-item-next" in html else pg
        return {
            "page": pg,
            "pagecount": pagecount,
            "limit": len(lst),
            "total": pagecount * max(len(lst), 1),
            "list": lst,
        }

    def searchContent(self, key, quick, pg="1"):
        url = f"/search?k={urllib.parse.quote(key)}&page={pg}&t={self._token()}"
        html = self._get(url)
        out = []
        seen = set()
        for m in re.finditer(
            r'href="/detail/(\d+)\.html" class="search-result-item">(.*?)(?=<a href="/detail/|<div class="pagenation)',
            html, re.S
        ):
            vid, blk = m.group(1), m.group(2)
            if vid in seen:
                continue
            seen.add(vid)
            nm = re.search(r'<div class="title">([^<]+)</div>', blk) or re.search(r'title="([^"]+)"', blk)
            cov = re.search(r'data-original="(/vod1[^"]+)"', blk)
            tg = re.search(r'<div class="tags">(.*?)</div>', blk, re.S)
            tvals = [t.strip() for t in re.findall(r"<span>([^<]+)</span>", tg.group(1))] if tg else []
            out.append({
                "vod_id": vid,
                "vod_name": nm.group(1).strip() if nm else "",
                "vod_pic": self._pic(cov.group(1)) if cov else "",
                "vod_remarks": "/".join(tvals[:2]),
            })
        pagecount = int(pg) + 1 if "page-item-next" in html else int(pg)
        return {"list": out, "page": int(pg), "pagecount": pagecount}

    # ------------------------------------------------------------------
    # Detail – full sources (inspired by 电影侠)
    # ------------------------------------------------------------------
    def detailContent(self, ids):
        vid = str(ids[0])
        html = self._get(f"/detail/{vid}.html")
        if not html:
            return {"list": []}

        # Basic meta
        name = re.search(r"<title>([^<]+?)-[^<]*</title>", html)
        cov = re.search(r'class="detail-pic">\s*<img[^>]+data-original="([^"]+)"', html)
        tags = [t.strip() for t in re.findall(r'class="detail-tags-item">([^<]+)</a>', html)]
        rows = dict(re.findall(
            r'class="detail-info-row-side">([^:]+):</div>\s*<div class="detail-info-row-main">(.*?)</div>',
            html, re.S
        ))

        def rowtxt(k):
            v = rows.get(k, "")
            return "/".join(re.findall(r">([^<>]+)</a>", v)) or re.sub(r"<[^>]+>|\s+", " ", v).strip()

        desc = re.search(r'<div class="detail-desc">.*?<p>(.*?)</p>', html, re.S)

        vod = {
            "vod_id": vid,
            "vod_name": name.group(1).strip() if name else "",
            "vod_pic": self._pic(cov.group(1)) if cov else "",
            "type_name": ",".join(tags),
            "vod_year": next((t for t in tags if re.match(r"^(19|20)\d{2}", t)), ""),
            "vod_area": next(
                (t for t in tags if t.endswith(("大陆", "中国大陆", "香港", "台湾"))
                 or t in ("美国", "韩国", "日本", "泰国", "英国", "法国", "德国", "印度")),
                "",
            ),
            "vod_director": rowtxt("导演"),
            "vod_actor": rowtxt("演员"),
            "vod_content": re.sub(r"<[^>]+>|\s+", " ", desc.group(1)).strip() if desc else "",
        }

        # Prefer loading a play page – it usually contains the complete source list + sublabels
        play_links = list(dict.fromkeys(re.findall(r'href="(/play/%s-\d+-\d+\.html)"' % vid, html)))
        plays, urls = [], []

        if play_links:
            ph = self._get(play_links[0])
            if ph:
                # Build source names (label + optional sublabel)
                names = []
                for it in re.findall(r'<a[^>]*class="source-item[^"]*"[^>]*>(.*?)</a>', ph, re.S):
                    lb = re.search(r'source-item-label[^>]*>([^<]+)<', it)
                    sb = re.search(r'source-item-sublabel[^>]*>([^<]+)<', it)
                    lb = self._clean(lb.group(1)) if lb else ""
                    sb = self._clean(sb.group(1)) if sb else ""
                    if lb and sb:
                        names.append(f"{lb}({sb})")
                    else:
                        names.append(lb or f"线路{len(names)+1}")

                epl = re.findall(r'<div class="episode-list"[^>]*>(.*?)</div>', ph, re.S)
                for i, el in enumerate(epl[:len(names)]):
                    nm = names[i] if i < len(names) else f"线路{i+1}"
                    if self._is_skip(nm):
                        continue
                    eps = []
                    for eu, ein in re.findall(
                        r'<a[^>]*href="(/play/\d+-\d+-\d+\.html)"[^>]*>(.*?)</a>', el, re.S
                    ):
                        en = self._clean(ein) or f"第{len(eps)+1}集"
                        eps.append(f"{en}${eu}")
                    if eps:
                        plays.append(nm)
                        urls.append("#".join(eps))

        # Fallback: parse directly from detail page (original 好好看 style)
        if not plays:
            labels = [
                l.strip()
                for l in re.findall(
                    r'class="source-item[^"]*">\s*<span class="source-item-label">([^<]+)</span>',
                    html,
                )
            ]
            lists = re.findall(r'<div class="episode-list"[^>]*>(.*?)</div>', html, re.S)
            for idx, blk in enumerate(lists[:len(labels)]):
                nm = labels[idx] if idx < len(labels) else f"线路{idx+1}"
                if self._is_skip(nm):
                    continue
                eps = re.findall(
                    r'href="(/play/\d+-\d+-\d+\.html)"[^>]*>\s*(?:<span>)?\s*([^<]+?)\s*(?:</span>)?\s*</a>',
                    blk,
                )
                if not eps:
                    continue
                plays.append(nm)
                urls.append("#".join(f"{e[1].strip()}${e[0]}" for e in eps))

        # Last-resort: just collect all play links under one line
        if not plays and play_links:
            plays = ["线路1"]
            urls = ["#".join(f"第{i+1}集${u}" for i, u in enumerate(play_links))]

        # Prefer better quality lines first (蓝光 / 4K / 超清 …)
        if plays:
            def sort_key(item):
                name = item[0]
                if "4K" in name or "蓝光" in name and "高清" in name:
                    return 0
                if "蓝光" in name or "超清" in name:
                    return 1
                if "高清" in name:
                    return 2
                return 3
            paired = sorted(zip(plays, urls), key=sort_key)
            plays = [p for p, _ in paired]
            urls = [u for _, u in paired]

        vod["vod_play_from"] = "$$$".join(plays)
        vod["vod_play_url"] = "$$$".join(urls)
        return {"list": [vod]}

    # ------------------------------------------------------------------
    # Player
    # ------------------------------------------------------------------
    def playerContent(self, flag, id, vipFlags):
        u = id if id.startswith("http") else (id if id.startswith("/") else "/" + id)
        html = self._get(u)
        url = ""

        # Common patterns
        for pat in (
            r'playSource\s*=\s*\{[\s\S]*?src:\s*"([^"]+)"',
            r'playSource\s*\.\s*src\s*=\s*["\']([^"\']+)["\']',
            r'src:\s*"([^"]+\.(?:m3u8|mp4)[^"]*)"',
            r'src\s*:\s*["\'](https?://[^"\']+\.(?:m3u8|mp4)[^"\']*)["\']',
        ):
            m = re.search(pat, html or "", re.I)
            if m:
                url = m.group(1).replace("\\/", "/")
                break

        # Fallback: try other episodes of the same video if current one is empty
        if not url:
            vm = re.search(r"/play/(\d+)-", u)
            if vm:
                vid = vm.group(1)
                dh = self._get(f"/detail/{vid}.html")
                for lu in re.findall(r'href="(/play/%s-\d+-\d+\.html)"' % vid, dh or ""):
                    if lu in u:
                        continue
                    ph2 = self._get(lu)
                    m2 = re.search(r'src:\s*"([^"]+\.(?:m3u8|mp4)[^"]*)"', ph2 or "")
                    if m2:
                        url = m2.group(1).replace("\\/", "/")
                        break

        return {
            "parse": 0,
            "url": url,
            "header": json.dumps({"User-Agent": UA, "Referer": self.host + "/"}),
        }
