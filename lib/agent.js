/**
 * A tiny, deterministic stand-in for a real agent. It inspects the prompt and
 * returns a structured reply plus a few simple "insights". This keeps the lab
 * runnable end to end without any external API keys.
 */
export function runAgent(prompt) {
  const text = String(prompt);
  const words = text.trim().split(/\s+/).filter(Boolean);
  const characters = text.length;

  let intent = "statement";
  if (/\?\s*$/.test(text.trim())) {
    intent = "question";
  } else if (/^(hi|hello|hey|안녕)/i.test(text.trim())) {
    intent = "greeting";
  } else if (/!\s*$/.test(text.trim())) {
    intent = "exclamation";
  }

  const reply = buildReply(intent, words);

  return {
    reply,
    intent,
    insights: {
      words: words.length,
      characters,
      reversed: words.slice().reverse().join(" "),
    },
    receivedAt: new Date().toISOString(),
  };
}

function buildReply(intent, words) {
  switch (intent) {
    case "greeting":
      return "안녕하세요! Agent Lab에 오신 것을 환영합니다.";
    case "question":
      return `좋은 질문이에요. "${words.length}" 단어로 된 질문을 받았습니다.`;
    case "exclamation":
      return "에너지가 느껴지네요! 계속 진행해 보세요.";
    default:
      return `메시지를 받았습니다. 단어 ${words.length}개를 처리했어요.`;
  }
}
