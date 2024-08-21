import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

document.addEventListener('DOMContentLoaded', async () => {
    // Start the timer for pipeline initialization
    console.time('Pipeline Initialization');
    const summarizer = await pipeline("summarization");
    console.timeEnd('Pipeline Initialization');

    const btn1 = document.getElementById('process-text');
    const output = document.getElementById('summary-output');
    const article = document.getElementById('text-output-area');

    async function summarizeText() {
        // Start the timer for the whole process
        console.time('Total Time');

        // Start the timer for getting text
        console.time('Get Text');
        const text = article.value; // Assuming text-output-area is a <textarea> or <input>
        console.timeEnd('Get Text');

        // Start the timer for summarizing text
        console.time('Start Summarization');
        const result = await summarizer(text);
        console.timeEnd('Start Summarization');

        // Optionally, if the summarization process has multiple steps, you can add more detailed timing here.
        console.time('Generate Summary');
        const summary = result[0]?.summary_text || "No summary available";
        console.timeEnd('Generate Summary');

        // Start the timer for updating UI
        console.time('Update UI');
        output.innerHTML = summary;
        console.timeEnd('Update UI');

        // End the total timer
        console.timeEnd('Total Time');
    }

    btn1.addEventListener('click', summarizeText);
});
