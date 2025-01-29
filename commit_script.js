const { execSync } = require("child_process");

// Function to generate a random past date within the last year
function getRandomPastDate() {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - Math.floor(Math.random() * 365)); 
    return pastDate.toISOString().slice(0, 19).replace("T", " "); // Format: YYYY-MM-DD HH:mm:ss
}

// Number of commits (250+)
const NUM_COMMITS = 250;

for (let i = 0; i < NUM_COMMITS; i++) {
    const commitDate = getRandomPastDate();
    console.log(`Creating commit for date: ${commitDate}`);

    try {
        // Correctly set commit date for Git Bash
        const command = `GIT_COMMITTER_DATE="${commitDate}" GIT_AUTHOR_DATE="${commitDate}" git commit --allow-empty -m "Commit on ${commitDate}" --date "${commitDate}"`;
        execSync(command, { stdio: "inherit", shell: true });
    } catch (error) {
        console.error(`Error creating commit on ${commitDate}:`, error);
    }
}

// Push commits to GitHub
console.log("Pushing commits to GitHub...");
execSync("git push origin main --force", { stdio: "inherit" });

console.log("✅ All commits pushed successfully! Check your GitHub contribution graph.");
