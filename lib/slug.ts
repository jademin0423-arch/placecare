import { legacySlugs } from "@/data/legacySlugs";

/**
 * 키워드를 영문 slug로 변환 (legacySlug 제외)
 */
export function generateSlug(keyword: string): string {
  // 한글을 영문으로 변환하는 간단한 매핑
  const mapping: Record<string, string> = {
    "대구": "daegu",
    "라모르": "lamour",
    "김포": "gimpo",
    "하우투": "howto",
    "서울": "seoul",
    "신혼여행": "honeymoon",
    "혼수": "wedding-gift",
    "박람회": "fair",
    "웨딩박람회": "wedding-fair",
    "강릉": "gangneung",
    "범계": "beomgye",
    "명동": "myeongdong",
    "제주": "jeju",
    "팜투어": "farmtour",
    "허니문": "honeymoon",
    "청주": "cheongju",
    "에이스웨딩": "ace-wedding",
    "대전": "daejeon",
    "NC백화점": "nc-department-store",
    "대형": "large",
    "브라이덜": "bridal",
    "블랑쉬": "blanc",
    "평택": "pyeongtaek",
    "웨딩드레스": "wedding-dress",
    "페어": "fair",
    "직거래": "direct",
    "청담": "cheongdam",
    "컨벤션센터": "convention-center",
    "DCC": "dcc",
    "당진": "dangjin",
    "aT센터": "at-center",
    "웨딩페스티벌": "wedding-festival",
    "춘천": "chuncheon",
    "더테라리움": "the-terrarium",
    "수원": "suwon",
    "웨딩크라우드": "wedding-cloud",
    "웨딩컴퍼니엘": "wedding-company-l",
    "현대": "hyundai",
    "프리미엄": "premium",
    "시흥": "siheung",
    "오스코": "osco",
    "초대형": "super-large",
    "다이렉트": "direct",
    "결혼준비": "wedding-preparation",
    "광명": "gwangmyeong",
    "AK": "ak",
    "인천": "incheon",
    "라마다호텔": "ramada-hotel",
    "익산": "iksan",
    "웨스턴라이프호텔": "western-life-hotel",
    "광주": "gwangju",
    "SHOW": "show",
    "군산": "gunsan",
    "웨딩스퀘어": "wedding-square",
    "웨딩홀": "wedding-hall",
    "셀렉": "select",
    "부산": "busan",
    "롯데": "lotte",
    "센텀시티": "centum-city",
    "세텍": "setec",
    "하남": "hanam",
    "패밀리": "family",
    "광교": "gwanggyo",
    "갤러리아": "galleria",
    "웨딩더하기": "wedding-plus",
    "영등포": "yeongdeungpo",
    "의정부": "uijeongbu",
    "성남": "seongnam",
    "용인": "yongin",
    "천안": "cheonan",
    "아산": "asan",
    "컨벤션센터": "convention-center",
    "속초": "sokcho",
    "한국웨딩연합회": "korea-wedding-association",
    "제20회": "20th",
    "원주": "wonju",
    "KNN": "knn",
    "웨딩엑스포": "wedding-expo",
    "용산": "yongsan",
    "라라": "lala",
    "아일랜드유": "island-u",
    "진주": "jinju",
    "창원": "changwon",
    "부천": "bucheon",
    "위드유": "with-u",
    "대구연": "daeguyeon",
    "김대중": "kim-dae-jung",
    "토탈샵": "total-shop",
    "라벨르엘린": "label-lellin",
    "스드메": "sdme",
    "상담예약": "consultation-reservation",
    "더현대": "the-hyundai",
    "부산본점": "busan-main",
    "메쎄": "messe",
    "프리마베라": "prima-vera",
    "송도컨벤시아": "songdo-convensia",
    "더셜리": "the-sherry",
    "2025": "2025",
    "2026": "2026",
    "일정": "schedule",
    "현대백화점": "hyundai-department-store",
    "판교": "pangyo",
    "한나": "hanna",
    "아이파크몰": "ipark-mall",
    "충주": "chungju",
    "일산킨텍스": "ilsan-kintex",
    "최대규모": "largest",
    "프라이빗": "private",
    "평일": "weekday",
    "더블혜택": "double-benefit",
    "신세계백화점": "shinsegae-department-store",
    "안산": "ansan",
    "타임빌라스": "time-villas",
    "드메르": "dmer",
    "전주": "jeonju",
    "견적비교": "estimate-comparison",
  };

  // 키워드를 소문자로 변환하고 공백/특수문자 처리
  let slug = keyword
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-가-힣]/g, "");

  // 한글 키워드가 매핑에 있으면 영문으로 변환 시도
  for (const [korean, english] of Object.entries(mapping)) {
    if (slug.includes(korean)) {
      slug = slug.replace(new RegExp(korean, "g"), english);
    }
  }

  // 남은 한글은 제거하고 하이픈 정리
  slug = slug
    .replace(/[가-힣]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  // legacySlug와 충돌 확인
  if (legacySlugs.includes(slug)) {
    // 충돌 시 타임스탬프 추가
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  return slug || "wedding-fair";
}

