// 简单的token计算方法
export function estimateTokenCount(text: string): number {
  // 英文单词和标点符号大约是1个token
  // 中文字符大约是2个token
  const chineseChars = text.match(/[\u4e00-\u9fff]/g)?.length || 0;
  const otherChars = text.length - chineseChars;
  return chineseChars * 2 + otherChars;
}