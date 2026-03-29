

async function getShows() {
    document.body.classList.add('shows__loading')
    const data = await fetch("https://api.jikan.moe/v4/top/anime?type=ona");
    const pData = await data.json();
    const grid = document.querySelector(".shows__grid");


    pData.data.sort((a, b) => b.popularity - a.popularity);

    pData.data.forEach(show => {
        const card = document.createElement("div");
        card.classList.add("show__card");
        card.setAttribute("onclick", `showTheShow(${show.mal_id})`);

        card.innerHTML = `
            <img src="${show.images.jpg.image_url}" alt="${show.title}">
            <h3>${show.title}</h3>
            <p>⭐ ${show.score ?? "N/A"}</p>
        `;
        grid.appendChild(card);
    });
    document.body.classList.remove('shows__loading')
    console.log(pData);
}

function focusSearch() {
    const clicked = document.querySelector(".search__input--field");
    clicked.scrollIntoView({ behavior: "smooth", block: "center" });
    clicked.focus();
}

function showTheShow(id) {
    localStorage.setItem("mal_id", id);
    window.location.href = `${window.location.origin}/show.html`;
}




function searchShows() {
    const input = document.querySelector(".search__input--field")
    const button = document.querySelector(".input__button")
    
    const performSearch = function() {
        let hasResults = false;
        const header = document.querySelector(".landing__header");
        const showContent = document.querySelector(".shows__content");
        const existingNoShow = showContent.querySelector(".shows__none");

        if (existingNoShow) existingNoShow.remove();
        if (header) header.style.display = "none";

        document.body.classList.add('shows__loading');
        const cards = document.querySelectorAll(".show__card");
        cards.forEach(card => {
            const title = card.querySelector("h3").textContent;
            if (title.toLowerCase().includes(input.value.toLowerCase())) {
                hasResults = true;
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        setTimeout(() => {
            document.body.classList.remove('shows__loading');

            if (!hasResults) {
                const noShow = document.createElement('div');
                noShow.classList.add("shows__none");
                noShow.innerHTML = `<h4 class='shows__none--text'>No Matches!</h4>`;
                showContent.appendChild(noShow);
            }
        }, 500);
    }

    button.addEventListener("click", function(event) {
        event.preventDefault();
        performSearch();
    })
    
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            performSearch();
        }
    })
}

function resetShows() {
    let timer;
    const input = document.querySelector(".search__input--field");
    input.addEventListener("input", function() {
        clearTimeout(timer);

        if (input.value === "") {
            timer = setTimeout(function() {
                const existingNoShow = document.querySelector(".shows__none");
                const header = document.querySelector(".landing__header");
                header.style.display = "block";
                if (existingNoShow) existingNoShow.remove();

                getShows();
            }, 1000);
        }
    });
}

resetShows();

searchShows();

getShows();


