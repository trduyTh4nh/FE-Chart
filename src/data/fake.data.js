const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const dataCategory = [
    { id: 1, name_cate: "A", color: "#E87722" },
    { id: 2, name_cate: "B", color: "#6ECEB2" },
    { id: 3, name_cate: "C", color: "#FED141" },

];

const dataSample = Array.from({ length: 20 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (5 - index) * 10);

    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    
    // const category = getRandomElement(dataCategory); 
    return {
        month: formattedDate,
        A: getRandomInt(50, 250),
        B: getRandomInt(50, 250),
        C: getRandomInt(50, 250),
       
    };
});

export {
    dataSample,
    dataCategory
}
