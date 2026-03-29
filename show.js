async function getShow() {
    const id = localStorage.getItem("mal_id");
    const data = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const pData = await data.json();
    const content = document.querySelector(".row");

    content.innerHTML =`
        <header class="show__header">
            <h2 class="show__title">${pData.data.title}</h2>
            <button class="back__btn" onclick="window.history.back()">Back</button>
        </header>
        <div class="show__content">
            <img src="${pData.data.images.jpg.image_url}" alt="${pData.data.title}">
            <div class="show__details">
                <p><strong>Rating:</strong> ${pData.data.score ?? "N/A"}</p>
                <p><strong>Episodes:</strong> ${pData.data.episodes ?? "N/A"}</p>
                <p><strong>Status:</strong> ${pData.data.status}</p>
                <p><strong>Aired:</strong> ${pData.data.aired.string}</p>
                <p><strong>URL:</strong> <a href="${pData.data.url}" target="_blank">MyAnimeListPage</a></p>
            </div>
            <div class="show__synopsis">
                <p><strong>Synopsis:</strong> ${pData.data.synopsis}</p>
            </div>
        </div>
    `;


}

getShow();
