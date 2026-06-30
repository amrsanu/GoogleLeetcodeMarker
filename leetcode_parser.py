import re
import json

def parse_leetcode_questions(html):
    # Regex to match each question block
    pattern = re.compile(
        r'<a href="(?P<href>[^"]+)"[^>]*>.*?<div class="ellipsis line-clamp-1">(?P<title>.*?)</div>.*?<p class="mx-0 text-\[14px\] text-sd-(?P<difficulty>\w+)[^"]*">(?P<diff_label>.*?)</p>',
        re.DOTALL
    )
    questions = []
    for match in pattern.finditer(html):
        href = match.group('href')
        title = match.group('title').strip()
        difficulty = match.group('diff_label').strip()
        questions.append({
            "title": title,
            "link": f"https://leetcode.com{href}",
            "difficulty": difficulty
        })
    return questions

if __name__ == "__main__":
    with open("leetcode_snippet.html", "r", encoding="utf-8") as f:
        html = f.read()
    questions = parse_leetcode_questions(html)
    with open("leetcode_questions.json", "w", encoding="utf-8") as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)
    print(f"Extracted {len(questions)} questions to leetcode_questions.json")