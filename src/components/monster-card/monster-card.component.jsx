const MonsterCard = ({monster}) => {
    console.log(monster);
    return (
        <div>
            <img
                alt={`monster ${monster.name}`}
                src={`https://image.tmdb.org/t/p/w500/${monster.poster_path}`}
            />
            {/* <h2>{monster.title}</h2> */}
            {/* <p>{monster.email}</p> */}
        </div>
    );
};

export default MonsterCard;
