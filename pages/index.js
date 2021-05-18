import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { generateBars } from "../utils/generateBars";

export default function Home() {
    const [percentage, setPercentage] = useState(50);
    const [maxBlocks, setMaxBlocks] = useState(6);
    const bars = generateBars(percentage, maxBlocks);

    const onPercentageChange = (event) => {
        const newPercentage = +event.target.value;
        if (0 <= newPercentage && newPercentage <= 100) {
            setPercentage(event.target.value);
        } else {
            alert("Percentage should be 0 to 100.");
        }
    };

    const onMaxBlocksChange = (event) => {
        setMaxBlocks(event.target.value);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Unicode Progress Bars</title>
                <meta name="description" content="Unicode progress bars" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Unicode Progress Bars</h1>
                <br />
                <form>
                    <input
                        name="percentage"
                        type="number"
                        min="0"
                        max="100"
                        value={percentage}
                        onChange={onPercentageChange}
                    />
                    <input
                        name="maxBlocks"
                        type="number"
                        min="1"
                        max="100"
                        value={maxBlocks}
                        onChange={onMaxBlocksChange}
                    />
                </form>

                <p className={styles.description}>
                    {bars.map((bar, index) => (
                        <code key={index}>{bar}</code>
                    ))}
                </p>
            </main>

            <footer className={styles.footer}>Made with love 💖</footer>
        </div>
    );
}
