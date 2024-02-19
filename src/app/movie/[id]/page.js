import React from 'react';
import styles from "@/app/styles/common.module.css"
import Image from "next/image";

const Page = async ({params}) => {
    const id = params.id;
    const url = `https://netflix54.p.rapidapi.com/title/details/?ids=${id}&lang=en`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '99bee56d33msh1c2e96c4d1eb751p167c93jsnd9898e8d5dfd',
            'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
        }
    };

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        if (data && data.length > 0) {
            const main_data = data[0].details;

            return (
                <div className={styles.container}>
                    <h2 className={styles.movie_title}> Netflix \ <span> {main_data.type} </span></h2>
                    <div className={styles.card_section}>
                        <div>
                            <Image src={main_data.backgroundImage.url} alt={main_data.title} width={600} height={300}/>
                        </div>
                        <div>
                            <h1>{main_data.title}</h1>
                            <p>{main_data.synopsis}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            // Handle case where data is empty or does not have expected structure
            return <div>No data available</div>;
        }
    } catch (error) {
        // Handle fetch or JSON parsing errors
        console.error('Error fetching data:', error);
        return <div>Error fetching data</div>;
    }
};

export default Page;
