import React from "react";

/**
 * Splits paragraph text into balanced phrases / clauses (~40-90 chars)
 * respecting punctuation, clauses, parentheses, bold markers, and proper nouns.
 */
export function splitIntoBalancedPhrases(text: string): string[] {
  const sentences: string[] = [];
  let sStart = 0;
  let inB = false;
  let pDepth = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === "*" && text[i + 1] === "*") {
      inB = !inB;
      i++;
    } else if (text[i] === "(") {
      pDepth++;
    } else if (text[i] === ")") {
      pDepth = Math.max(0, pDepth - 1);
    } else if ((text[i] === "." || text[i] === "!" || text[i] === "?") && !inB && pDepth === 0) {
      if (i === text.length - 1 || /\s/.test(text[i + 1])) {
        sentences.push(text.slice(sStart, i + 1).trim());
        sStart = i + 1;
      }
    }
  }
  const remSentence = text.slice(sStart).trim();
  if (remSentence) sentences.push(remSentence);

  const phrases: string[] = [];

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (trimmed.length <= 80) {
      phrases.push(trimmed);
      continue;
    }

    let parenDepth = 0;
    let inBold = false;
    const candidates: number[] = [];

    for (let i = 0; i < trimmed.length; i++) {
      if (trimmed[i] === "*" && trimmed[i + 1] === "*") {
        inBold = !inBold;
        i++;
        continue;
      }
      if (trimmed[i] === "(") parenDepth++;
      else if (trimmed[i] === ")") parenDepth = Math.max(0, parenDepth - 1);
      else if ((trimmed[i] === "," || trimmed[i] === ";" || trimmed[i] === "—") && parenDepth === 0 && !inBold) {
        const left = trimmed.slice(0, i + 1).trim();
        const right = trimmed.slice(i + 1).trim();
        const isCityCountry = /San Salvador,\s*$/i.test(left) && /^El Salvador/i.test(right);
        if (!isCityCountry && left.length >= 35 && right.length >= 35) {
          candidates.push(i);
        }
      }
    }

    if (candidates.length === 0) {
      phrases.push(trimmed);
      continue;
    }

    let lastIdx = 0;
    for (const splitIdx of candidates) {
      const piece = trimmed.slice(lastIdx, splitIdx + 1).trim();
      const remaining = trimmed.slice(splitIdx + 1).trim();
      if (piece.length >= 40 && remaining.length >= 35) {
        phrases.push(piece);
        lastIdx = splitIdx + 1;
      }
    }
    const rem = trimmed.slice(lastIdx).trim();
    if (rem) phrases.push(rem);
  }

  return phrases;
}

/** Renders markdown bold **text** as semantic styled strong tags */
export function renderFormattedPhrase(phrase: string): React.ReactNode {
  const parts = phrase.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
