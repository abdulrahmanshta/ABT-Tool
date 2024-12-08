
document.getElementById('generate-btn').addEventListener('click', async () => {
    const topic = document.getElementById('topic').value.trim();
    const keywords = document.getElementById('keywords').value.trim();

    if (!topic) {
        alert("يرجى إدخال موضوع المقال!");
        return;
    }

    const prompt = `
    اكتب مقالًا احترافيًا باللغة العربية عن: "${topic}".
    ${
        keywords
        ? `يجب أن يحتوي المقال على الكلمات المفتاحية التالية: ${keywords}.`
        : ""
    }
    يجب أن يتضمن المقال:
    - مقدمة قوية.
    - نقاط رئيسية (عناوين فرعية).
    - خاتمة ملخصة.
    `;

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 1000,
                temperature: 0.7
            })
        });

        const data = await response.json();
        const article = data.choices[0].text;

        document.getElementById('article').value = article;
        document.getElementById('results').style.display = 'block';

    } catch (error) {
        console.error('Error:', error);
        alert("حدث خطأ أثناء توليد المقال. يرجى المحاولة لاحقًا.");
    }
});
