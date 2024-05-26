var rule={
	title:'if101[飞]',
	// host:'https://olevod.live',
	//host:'https://olevod.io',
	host:'https://olevod6.com',
	homeUrl:'/index.php/label/rankweek.html', // 人气排行榜周榜
	url:'/index.php/vod/show/id/fyfilter.html',
	filterable:1,//是否启用分类筛选,
	filter_url:'{{fl.cateId}}{{fl.area}}{{fl.by or "/by/time"}}{{fl.class}}{{fl.lang}}{{fl.letter}}/page/fypage{{fl.year}}',
	filter: {
		"1":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"1"},{"n":"冒险","v":"6"},{"n":"剧情","v":"7"},{"n":"动作","v":"8"},{"n":"动画电影","v":"9"},{"n":"同性","v":"10"},{"n":"喜剧","v":"11"},{"n":"奇幻","v":"12"},{"n":"恐怖","v":"20"},{"n":"悬疑","v":"21"},{"n":"惊悚","v":"22"},{"n":"战争","v":"23"},{"n":"歌舞","v":"24"},{"n":"灾难","v":"25"},{"n":"爱情","v":"26"},{"n":"犯罪","v":"27"},{"n":"科幻","v":"28"},{"n":"经典","v":"29"},{"n":"网络电影","v":"30"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"大陆","v":"/area/大陆"},{"n":"香港","v":"/area/香港"},{"n":"台湾","v":"/area/台湾"},{"n":"欧美","v":"/area/欧美"},{"n":"韩国","v":"/area/韩国"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2024","v":"/year/2024"},{"n":"2023","v":"/year/2023"},{"n":"2022","v":"/year/2022"},{"n":"2021","v":"/year/2021"},{"n":"2020","v":"/year/2020"},{"n":"2019","v":"/year/2019"},{"n":"2018","v":"/year/2018"},{"n":"2017","v":"/year/2017"},{"n":"2016","v":"/year/2016"},{"n":"2015","v":"/year/2015"},{"n":"2014","v":"/year/2014"},{"n":"2013","v":"/year/2013"},{"n":"2012","v":"/year/2012"},{"n":"2011","v":"/year/2011"},{"n":"2010","v":"/year/2010"},{"n":"2009","v":"/year/2009"},{"n":"2008","v":"/year/2008"},{"n":"2007","v":"/year/2007"},{"n":"2006","v":"/year/2006"},{"n":"2005","v":"/year/2005"},{"n":"2004","v":"/year/2004"},{"n":"2003","v":"/year/2003"},{"n":"2002","v":"/year/2002"},{"n":"2001","v":"/year/2001"},{"n":"2000","v":"/year/2000"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"/lang/国语"},{"n":"英语","v":"/lang/英语"},{"n":"粤语","v":"/lang/粤语"},{"n":"韩语","v":"/lang/韩语"},{"n":"日语","v":"/lang/日语"}]},{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"/letter/A"},{"n":"B","v":"/letter/B"},{"n":"C","v":"/letter/C"},{"n":"D","v":"/letter/D"},{"n":"E","v":"/letter/E"},{"n":"F","v":"/letter/F"},{"n":"G","v":"/letter/G"},{"n":"H","v":"/letter/H"},{"n":"I","v":"/letter/I"},{"n":"J","v":"/letter/J"},{"n":"K","v":"/letter/K"},{"n":"L","v":"/letter/L"},{"n":"M","v":"/letter/M"},{"n":"N","v":"/letter/N"},{"n":"O","v":"/letter/O"},{"n":"P","v":"/letter/P"},{"n":"Q","v":"/letter/Q"},{"n":"R","v":"/letter/R"},{"n":"S","v":"/letter/S"},{"n":"T","v":"/letter/T"},{"n":"U","v":"/letter/U"},{"n":"V","v":"/letter/V"},{"n":"W","v":"/letter/W"},{"n":"X","v":"/letter/X"},{"n":"Y","v":"/letter/Y"},{"n":"Z","v":"/letter/Z"},{"n":"0-9","v":"/letter/0-9"}]},{"key":"by","name":"排序","value":[{"n":"全部","v":""},{"n":"最新","v":"/by/time"},{"n":"最热","v":"/by/hits"},{"n":"评分","v":"/by/score"}]}],
		"2":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"2"},{"n":"国产剧","v":"16"},{"n":"韩剧","v":"15"},{"n":"欧美剧","v":"13"},{"n":"港剧","v":"32"},{"n":"日剧","v":"14"},{"n":"台剧","v":"33"},{"n":"泰剧","v":"31"},{"n":"新马剧","v":"34"},{"n":"其它剧","v":"35"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"大陆","v":"/area/大陆"},{"n":"香港","v":"/area/香港"},{"n":"台湾","v":"/area/台湾"},{"n":"日本","v":"/area/日本"},{"n":"韩国","v":"/area/韩国"},{"n":"欧美","v":"/area/欧美"},{"n":"泰国","v":"/area/泰国"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2024","v":"/year/2024"},{"n":"2023","v":"/year/2023"},{"n":"2022","v":"/year/2022"},{"n":"2021","v":"/year/2021"},{"n":"2020","v":"/year/2020"},{"n":"2019","v":"/year/2019"},{"n":"2018","v":"/year/2018"},{"n":"2017","v":"/year/2017"},{"n":"2016","v":"/year/2016"},{"n":"2015","v":"/year/2015"},{"n":"2014","v":"/year/2014"},{"n":"2013","v":"/year/2013"},{"n":"2012","v":"/year/2012"},{"n":"2011","v":"/year/2011"},{"n":"2010","v":"/year/2010"},{"n":"2009","v":"/year/2009"},{"n":"2008","v":"/year/2008"},{"n":"2007","v":"/year/2007"},{"n":"2006","v":"/year/2006"},{"n":"2005","v":"/year/2005"},{"n":"2004","v":"/year/2004"},{"n":"2003","v":"/year/2003"},{"n":"2002","v":"/year/2002"},{"n":"2001","v":"/year/2001"},{"n":"2000","v":"/year/2000"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"/lang/国语"},{"n":"英语","v":"/lang/英语"},{"n":"粤语","v":"/lang/粤语"},{"n":"韩语","v":"/lang/韩语"},{"n":"日语","v":"/lang/日语"}]},{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"/letter/A"},{"n":"B","v":"/letter/B"},{"n":"C","v":"/letter/C"},{"n":"D","v":"/letter/D"},{"n":"E","v":"/letter/E"},{"n":"F","v":"/letter/F"},{"n":"G","v":"/letter/G"},{"n":"H","v":"/letter/H"},{"n":"I","v":"/letter/I"},{"n":"J","v":"/letter/J"},{"n":"K","v":"/letter/K"},{"n":"L","v":"/letter/L"},{"n":"M","v":"/letter/M"},{"n":"N","v":"/letter/N"},{"n":"O","v":"/letter/O"},{"n":"P","v":"/letter/P"},{"n":"Q","v":"/letter/Q"},{"n":"R","v":"/letter/R"},{"n":"S","v":"/letter/S"},{"n":"T","v":"/letter/T"},{"n":"U","v":"/letter/U"},{"n":"V","v":"/letter/V"},{"n":"W","v":"/letter/W"},{"n":"X","v":"/letter/X"},{"n":"Y","v":"/letter/Y"},{"n":"Z","v":"/letter/Z"},{"n":"0-9","v":"/letter/0-9"}]},{"key":"by","name":"排序","value":[{"n":"全部","v":""},{"n":"最新","v":"/by/time"},{"n":"最热","v":"/by/hits"},{"n":"评分","v":"/by/score"}]}],
		"3":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"3"},{"n":"欧美动漫","v":"36"},{"n":"日本动漫","v":"37"},{"n":"韩国动漫","v":"38"},{"n":"国产动漫","v":"39"},{"n":"新马泰动漫","v":"40"},{"n":"港台动漫","v":"41"},{"n":"其他动漫","v":"42"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"大陆","v":"/area/大陆"},{"n":"香港","v":"/area/香港"},{"n":"台湾","v":"/area/台湾"},{"n":"日本","v":"/area/日本"},{"n":"韩国","v":"/area/韩国"},{"n":"欧美","v":"/area/欧美"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2024","v":"/year/2024"},{"n":"2023","v":"/year/2023"},{"n":"2022","v":"/year/2022"},{"n":"2021","v":"/year/2021"},{"n":"2020","v":"/year/2020"},{"n":"2019","v":"/year/2019"},{"n":"2018","v":"/year/2018"},{"n":"2017","v":"/year/2017"},{"n":"2016","v":"/year/2016"},{"n":"2015","v":"/year/2015"},{"n":"2014","v":"/year/2014"},{"n":"2013","v":"/year/2013"},{"n":"2012","v":"/year/2012"},{"n":"2011","v":"/year/2011"},{"n":"2010","v":"/year/2010"},{"n":"2009","v":"/year/2009"},{"n":"2008","v":"/year/2008"},{"n":"2007","v":"/year/2007"},{"n":"2006","v":"/year/2006"},{"n":"2005","v":"/year/2005"},{"n":"2004","v":"/year/2004"},{"n":"2003","v":"/year/2003"},{"n":"2002","v":"/year/2002"},{"n":"2001","v":"/year/2001"},{"n":"2000","v":"/year/2000"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"/year/国语"},{"n":"英语","v":"/year/英语"},{"n":"粤语","v":"/year/粤语"},{"n":"韩语","v":"/year/韩语"},{"n":"日语","v":"/year/日语"}]},{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"/letter/A"},{"n":"B","v":"/letter/B"},{"n":"C","v":"/letter/C"},{"n":"D","v":"/letter/D"},{"n":"E","v":"/letter/E"},{"n":"F","v":"/letter/F"},{"n":"G","v":"/letter/G"},{"n":"H","v":"/letter/H"},{"n":"I","v":"/letter/I"},{"n":"J","v":"/letter/J"},{"n":"K","v":"/letter/K"},{"n":"L","v":"/letter/L"},{"n":"M","v":"/letter/M"},{"n":"N","v":"/letter/N"},{"n":"O","v":"/letter/O"},{"n":"P","v":"/letter/P"},{"n":"Q","v":"/letter/Q"},{"n":"R","v":"/letter/R"},{"n":"S","v":"/letter/S"},{"n":"T","v":"/letter/T"},{"n":"U","v":"/letter/U"},{"n":"V","v":"/letter/V"},{"n":"W","v":"/letter/W"},{"n":"X","v":"/letter/X"},{"n":"Y","v":"/letter/Y"},{"n":"Z","v":"/letter/Z"},{"n":"0-9","v":"/letter/0-9"}]},{"key":"by","name":"排序","value":[{"n":"全部","v":""},{"n":"最新","v":"/by/time"},{"n":"最热","v":"/by/hits"},{"n":"评分","v":"/by/score"}]}],
		"4":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"4"},{"n":"国产综艺","v":"46"},{"n":"港台综艺","v":"48"},{"n":"欧美综艺","v":"43"},{"n":"日本综艺","v":"44"},{"n":"韩国综艺","v":"45"},{"n":"新马泰综艺","v":"47"},{"n":"其他综艺","v":"49"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"大陆","v":"/area/大陆"},{"n":"日本","v":"/area/日本"},{"n":"韩国","v":"/area/韩国"},{"n":"欧美","v":"/area/欧美"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2024","v":"/year/2024"},{"n":"2023","v":"/year/2023"},{"n":"2022","v":"/year/2022"},{"n":"2021","v":"/year/2021"},{"n":"2020","v":"/year/2020"},{"n":"2019","v":"/year/2019"},{"n":"2018","v":"/year/2018"},{"n":"2017","v":"/year/2017"},{"n":"2016","v":"/year/2016"},{"n":"2015","v":"/year/2015"},{"n":"2014","v":"/year/2014"},{"n":"2013","v":"/year/2013"},{"n":"2012","v":"/year/2012"},{"n":"2011","v":"/year/2011"},{"n":"2010","v":"/year/2010"},{"n":"2009","v":"/year/2009"},{"n":"2008","v":"/year/2008"},{"n":"2007","v":"/year/2007"},{"n":"2006","v":"/year/2006"},{"n":"2005","v":"/year/2005"},{"n":"2004","v":"/year/2004"},{"n":"2003","v":"/year/2003"},{"n":"2002","v":"/year/2002"},{"n":"2001","v":"/year/2001"},{"n":"2000","v":"/year/2000"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"/lang/国语"},{"n":"英语","v":"/lang/英语"},{"n":"粤语","v":"/lang/粤语"},{"n":"韩语","v":"/lang/韩语"},{"n":"日语","v":"/lang/日语"}]},{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"/letter/A"},{"n":"B","v":"/letter/B"},{"n":"C","v":"/letter/C"},{"n":"D","v":"/letter/D"},{"n":"E","v":"/letter/E"},{"n":"F","v":"/letter/F"},{"n":"G","v":"/letter/G"},{"n":"H","v":"/letter/H"},{"n":"I","v":"/letter/I"},{"n":"J","v":"/letter/J"},{"n":"K","v":"/letter/K"},{"n":"L","v":"/letter/L"},{"n":"M","v":"/letter/M"},{"n":"N","v":"/letter/N"},{"n":"O","v":"/letter/O"},{"n":"P","v":"/letter/P"},{"n":"Q","v":"/letter/Q"},{"n":"R","v":"/letter/R"},{"n":"S","v":"/letter/S"},{"n":"T","v":"/letter/T"},{"n":"U","v":"/letter/U"},{"n":"V","v":"/letter/V"},{"n":"W","v":"/letter/W"},{"n":"X","v":"/letter/X"},{"n":"Y","v":"/letter/Y"},{"n":"Z","v":"/letter/Z"},{"n":"0-9","v":"/letter/0-9"}]},{"key":"by","name":"排序","value":[{"n":"全部","v":""},{"n":"最新","v":"/by/time"},{"n":"最热","v":"/by/hits"},{"n":"评分","v":"/by/score"}]}]
	},
	filter_def:{
		1:{cateId:'1'},
		2:{cateId:'2'},
		3:{cateId:'3'},
		4:{cateId:'4'},
		53:{cateId:'53'},
		50:{cateId:'50'},
		51:{cateId:'51'}
	},
	searchable:2,//是否启用全局搜索,
	quickSearch:0,//是否启用快速搜索,
	headers:{
		'User-Agent':'MOBILE_UA',
	},
    class_name:'电影',
    class_url:'1',
	// class_parse:'.conch-nav&&li:gt(1):lt(9);a&&Text;a&&href;.*/(.*?).html',
	class_parse:'.conch-nav&&li:gt(1):lt(8);a&&Text;a&&href;/(\\d+).html',
	// cate_exclude:'直播',
	play_parse:true,
	lazy:`js:
		var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
		var url = html.url;
		if (html.encrypt == "1") {
			url = unescape(url)
		} else if (html.encrypt == "2") {
			url = unescape(base64Decode(url))
		}
		if (/m3u8|mp4/.test(url)) {
			input = url
		} else {
			input
		}
	`,
	limit:6,
	// double:true, // 推荐内容是否双层定位
	// 推荐:'body&&.hl-list-wrap;ul&&li;*;*;*;*',
	推荐:'.hl-rank-list&&.hl-list-item;*;*;.hl-item-hits&&Text;*',
	一级:'.hl-vod-list&&li;a&&title;.hl-lazy&&data-original;.hl-pic-text&&Text;a&&href',
	二级:{
		"title":"h2&&Text;li.hl-col-xs-12--em:eq(6)&&Text",
		"img":".hl-lazy&&data-original",
		"desc":"li.hl-col-xs-12:eq(1)&&Text;;;li.hl-col-xs-12--em:eq(2)&&Text;li.hl-col-xs-12--em:eq(3)&&Text",
		"content":".hl-content-text&&Text",
		"tabs":".hl-from-list&&li",
		"lists":".hl-plays-list:eq(#id) li"
	},

	// searchUrl:'/index.php/vod/search.html?wd=**',
	searchUrl:'/index.php/ajax/suggest?mid=1&wd=**&limit=50',
	detailUrl:'/index.php/vod/detail/id/fyid.html', //非必填,二级详情拼接链接
	// 搜索:'.hl-list-wrap&&.hl-item-pic;*;*;*;*',
	搜索:'json:list;name;pic;;id',
}