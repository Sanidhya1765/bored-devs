#!/usr/bin/env node

import * as p from '@clack/prompts';
import color from 'picocolors';
import { setTimeout } from 'timers/promises'

let correctTotal = 0;

async function askQuestion(question, answers, correctAnswerIndex) {
    const options = []
    answers.forEach((answer) => {
        options.push({ value: answer, label: answer })
    });

    const answer = await p.select({
        message: question,
        initialValue: answers[0],
        options: options,
    });

    const s = p.spinner();
    s.start();
    await setTimeout(1000);
    s.stop();

    if (answer === answers[correctAnswerIndex]) {
        correctTotal++;
    }
}

class Question {
    constructor(question, answersArray, correctAnswerIndex) {
        this.question = question;
        this.answers = answersArray;
        this.correctAnswerIndex = correctAnswerIndex;
    }
}

async function main() {

    p.intro(`${color.bgRed(color.black(`Welcome to the ${color.bold(`Fizzy Games`)} 🥌🥌`))}`)

    const question1 = new Question(
        "💻 Is HTML a language?",
        ["Yes", "No"],
        1,
    );

    const question2 = new Question(
        "🗓️ When was JavaScript Created?",
        ["1940", "2003", "1995", "2010"],
        2,
    );

    const question3 = new Question(
        "🤝 What is the most popular programming language?",
        ["Pyhton", "JavaScript", "Java", "C"],
        1,
    );

    const question4 = new Question(
        "🌏 How many programmers are there in the world?",
        ["20 million", "17 million", "12 million", "26 million"],
        3,
    );

    const question5 = new Question(
        "(●'◡'●) Who is the best coding YouTuber?",
        ["FireShip", "Traversy Media", "Web Dev Simplified", "CodeStackr"],
        0,
    );

    const allQuestions = [question1, question2, question3, question4, question5];

    const readyToPlay = await p.select({
        message: "No cheating. 5 questions, Results at the end, Ready to play?",
        initialValue: "Yes",
        options: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" }],
    });

    if (readyToPlay === "Yes") {
        // Begin trivia game
        for (const question of allQuestions) {
            await askQuestion(question.question, question.answers, question.correctAnswerIndex);
        }

        // Decide what ending screen to show based on how many questions user answered correctly
        p.outro(`${color.bgRed(color.black(`You got ${color.bold(correctTotal)} questions correct!`))}`)
        
        if (correctTotal === 5) {
            const s = p.spinner();
            s.start("Generating gift card code...");
            await setTimeout(5000);
            s.stop();
            p.outro(`${color.bgWhite(color.black(`Code: ${color.bold("")}`))}`);
        } else {
            const otherSpinner = p.spinner();
            otherSpinner.start();
            await setTimeout(3000);
            otherSpinner.stop();
            p.outro(`${color.bgRed(color.black('You need 5 correct answers to get the code 🤫'))}`)
        }
    }

    p.outro(`${color.bgCyan(color.black('Thank you for playing the Sanidhya Games wait for!! to play more game   :)  I am 11 year old developer from India  :)  Credit:- Sanidhya Jha any questions contact me on github https://github.com/Sanidhya1765 '))}`)
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
