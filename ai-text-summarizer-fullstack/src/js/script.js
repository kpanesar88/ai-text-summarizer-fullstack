import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

document.addEventListener('DOMContentLoaded', async () => {
    // Start the timer for pipeline initialization
    console.time('Pipeline Initialization');

    // Initialize the summarization pipeline from the transformers library
    const summarizer = await pipeline("summarization");

    // End the timer for pipeline initialization
    console.timeEnd('Pipeline Initialization');

    // Get references to DOM elements
    const btn1 = document.getElementById('process-text'); // Button to trigger summarization
    const output = document.getElementById('summary-output'); // Element to display the summary
    const article = document.getElementById('text-output-area'); // Text area or input where user enters text

    // Define the function to summarize text
    async function summarizeText() {
        // Start the timer for the entire summarization process
        console.time('Total Time');

        // Start the timer for getting text from the input
        console.time('Get Text');
        const text = article.value; // Retrieve the text from the input element
        console.timeEnd('Get Text');

        // Start the timer for the summarization process
        console.time('Start Summarization');
        const result = await summarizer(text); // Perform summarization
        console.timeEnd('Start Summarization');

        // Start the timer for generating the summary
        console.time('Generate Summary');
        const summary = result[0]?.summary_text || "No summary available"; // Extract the summary text
        console.timeEnd('Generate Summary');

        // Start the timer for updating the UI with the summary
        console.time('Update UI');
        output.innerHTML = summary; // Display the summary in the output element
        console.timeEnd('Update UI');

        // End the timer for the total process
        console.timeEnd('Total Time');
    }

    // Add event listener to the button to trigger the summarization function on click
    btn1.addEventListener('click', summarizeText);
});
