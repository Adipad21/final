const getMatch = async () => {
    const url = "https://adipad21.github.io/csce242/projects/part5/match.json";

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

const showMatch = async () => {
    const matches = await getMatch();
     
    matches.forEach((match) => {
        document.getElementById("matches-section").append(getMatchSection(match));
    });
};

const getMatchSection = (match) => {
    const section = document.createElement("section");
    section.classList.add("match");

    const title = document.createElement("h2");
    title.innerHTML = `Match: ${match.match_id}`;
    section.appendChild(title);

    const attach = document.createElement("section");
    attach.classList.add("attach");

    const article_new = document.createElement("article");
    const day = document.createElement("h4");
    day.innerHTML = `${match.day}`;
    article_new.appendChild(day);
    const date = document.createElement("h4");
    date.innerHTML = `${match.month} ${match.date}, ${match.year}`;
    article_new.appendChild(date);
    const time = document.createElement("h4");
    time.innerHTML = match.time;
    article_new.appendChild(time);


    const teamPlans = document.createElement("section");
    teamPlans.classList.add("team-plans");
    const vs = document.createElement("article");
    vs.classList.add("versus"); 
    vs.innerHTML = "vs"; 

    match.teams.forEach((team, index) => {
        const teamArticle = document.createElement("article");
        const teamName = document.createElement("h3");
        teamName.innerHTML = team.name;

        const teamLogo = document.createElement("img");
        teamLogo.src = `images/${team.logo}`;

        teamArticle.appendChild(teamLogo);
        teamArticle.appendChild(teamName);
        teamPlans.appendChild(teamArticle);

        if (index === 0) {
            teamPlans.appendChild(vs);
        }
    });

    const article = document.createElement("article");
    const venue = document.createElement("h4");
    venue.innerHTML = `Venue: ${match.venue}`;
    article.appendChild(venue);
    

    attach.appendChild(article_new);
    attach.appendChild(teamPlans);
    attach.appendChild(article);
    section.appendChild(attach);
    return section;
};

showMatch();
