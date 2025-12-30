// 이미지 목록 (public/imge/ 폴더의 모든 이미지)
export const IMAGES = [
  "/imge/20250917_112053_1.png",
  "/imge/20250917_112053_2.png",
  "/imge/20250917_112053_3.png",
  "/imge/20250917_112053_4.png",
  "/imge/20250917_112053_5.png",
  "/imge/20250917_112854_1.png",
  "/imge/20250917_112854_2.png",
  "/imge/20250917_112854_3.png",
  "/imge/20250917_112854_4.png",
  "/imge/20250917_112854_5.png",
  "/imge/20250917_112854_6.png",
  "/imge/20250918_122214_1.png",
  "/imge/20250918_122214_2.png",
  "/imge/20250918_122214_3.png",
  "/imge/20250918_122214_4.png",
  "/imge/20250918_122214_5.png",
  "/imge/20250918_122214_6.png",
  "/imge/20250920_154349_1.png",
  "/imge/20250920_154349_2.png",
  "/imge/20250920_154349_3.png",
  "/imge/20250920_154349_4.png",
  "/imge/20250920_154349_5.png",
  "/imge/20250920_154349_6.png",
  "/imge/20250920_155055_1.png",
  "/imge/20250920_155055_2.png",
  "/imge/20250920_155055_3.png",
  "/imge/20250920_155055_4.png",
  "/imge/20250920_155055_5.png",
  "/imge/20250920_155055_6.png",
  "/imge/20250920_155055_7.png",
  "/imge/20250921_203234_1.png",
  "/imge/20250921_203234_4.png",
  "/imge/20250921_204517_1.png",
  "/imge/20250921_204517_2.png",
  "/imge/20250921_204517_3.png",
  "/imge/20250921_204517_4.png",
  "/imge/20250921_204540_1.png",
  "/imge/20250923_212233_2.png",
  "/imge/20250923_212233_4.png",
  "/imge/20250923_212233_5.png",
  "/imge/20250923_212233_6.png",
  "/imge/20250923_212233_7.png",
  "/imge/20250924_152220_2.png",
  "/imge/20250924_152220_3.png",
  "/imge/20250924_152220_4.png",
  "/imge/20250924_152220_5.png",
  "/imge/20250924_152919_1.png",
  "/imge/20250924_152919_2.png",
  "/imge/20250924_152919_3.png",
  "/imge/20250924_152919_4.png",
  "/imge/20250924_152919_5.png",
  "/imge/20250925_205839_1.png",
  "/imge/20250925_205839_6.png",
  "/imge/20250925_205839_7.png",
  "/imge/20250925_212846_9.png",
  "/imge/20250928_193217_1.png",
  "/imge/20250928_193217_3.png",
  "/imge/20250928_193217_5.png",
  "/imge/20250928_193217_6.png",
  "/imge/20250928_193217_7.png",
  "/imge/20250928_195326_4.png",
  "/imge/20250928_195326_6.png",
  "/imge/20250928_200053_2.png",
  "/imge/20250928_200053_3.png",
  "/imge/20250928_200053_4.png",
  "/imge/20250928_200053_5.png",
  "/imge/20250928_200053_6.png",
  "/imge/20250928_200824_4.png",
  "/imge/20250928_200824_5.png",
  "/imge/20250928_200824_6.png",
  "/imge/20250928_200824_7.png",
  "/imge/20250928_200824_8.png",
  "/imge/568762912459e51e2cbac9155f241418_9DtR7U6Yvf.jpg",
  "/imge/changwon-wedding-expo-consulting-booth-04.png",
  "/imge/changwon-wedding-expo-free-invitation-03.png",
  "/imge/changwon-wedding-expo-location-schedule-02.png",
  "/imge/changwon-wedding-expo-overview-01.png",
  "/imge/changwon-wedding-expo-planning-after-05.png",
  "/imge/changwon-wedding-expo-thumbnail-01.png",
  "/imge/ChatGPT Image 2025년 12월 14일 오후 10_00_55.png",
  "/imge/gimpo-howto-wedding-expo-consultation.webp.png",
  "/imge/gimpo-howto-wedding-expo-hall-view.png",
  "/imge/gimpo-howto-wedding-expo-hero.png",
  "/imge/gimpo-howto-wedding-expo-overview.png",
  "/imge/gimpo-howto-wedding-expo.png",
  "/imge/gimpo-wedding-planning-couple.webp.png",
];

/**
 * slug 기반으로 이미지를 선택 (빌드 시점 고정)
 */
export function selectImagesForSlug(slug: string, count: number = 4): string[] {
  // slug를 숫자로 변환 (간단한 해시)
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // 시드 기반 셔플
  const shuffled = [...IMAGES];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.abs(hash + i) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, Math.min(count, IMAGES.length));
}

/**
 * 이미지 alt 텍스트 생성 (키워드 기반, 자연어)
 */
export function generateImageAlt(keyword: string, index: number, total: number): string {
  const contexts = [
    `${keyword} 관련 정보를 확인하는 예비부부`,
    `${keyword} 준비 과정에서 참고할 수 있는 체크리스트`,
    `${keyword} 방문 시 확인해야 할 주요 사항`,
    `${keyword} 일정 및 혜택 안내`,
    `${keyword} 관련 상담 및 예약 정보`,
  ];
  
  return contexts[index % contexts.length];
}

