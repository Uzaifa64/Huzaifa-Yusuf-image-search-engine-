
        const accessKey = "9A22W9k6tuuqLrc8u2WZ1HVIsqSWXbmsLJqDa1F5J2Y";
        const searchForm = document.getElementById('search-form');
        const searchBox = document.getElementById("search-box");
        const searchResult = document.getElementById("search-result");
        const showMoreBtn = document.getElementById("show-more-btn");

        let keyword = "";
        let page = 1;

        async function searchImages() {
            keyword = searchBox.value;
            if (!keyword.trim()) {
                searchResult.innerHTML = `<p style="text-align:center; width:100%;">Please enter a search term.</p>`;
                return;
            }
            
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                const data = await response.json();

                if (page === 1) {
                    searchResult.innerHTML = "";
                }

                const results = data.results;

                if (results.length === 0) {
                    searchResult.innerHTML = `<p style="text-align:center; width:100%;">No results found for "${keyword}". Try another search.</p>`;
                    showMoreBtn.style.display = "none";
                    return;
                }

                results.forEach((result) => {
                    const resultItem = document.createElement("div");
                    resultItem.className = "result-item";
                    
                    const image = document.createElement("img");
                    image.src = result.urls.small;
                    image.alt = result.alt_description || "Search result image";
                    
                    const imageLink = document.createElement("a");
                    imageLink.href = result.links.html;
                    imageLink.target = "_blank";
                    imageLink.appendChild(image);
                    
                    const overlay = document.createElement("div");
                    overlay.className = "result-overlay";
                    overlay.innerHTML = `<p>By ${result.user.name}</p>`;
                    
                    resultItem.appendChild(imageLink);
                    resultItem.appendChild(overlay);
                    searchResult.appendChild(resultItem);
                });

                showMoreBtn.style.display = "block";
            } catch (error) {
                console.error("Error fetching images:", error);
                searchResult.innerHTML = `<p style="text-align:center; width:100%;">An error occurred while searching. Please try again.</p>`;
                showMoreBtn.style.display = "none";
            }
        }

        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            page = 1;
            searchImages();
        });

        showMoreBtn.addEventListener("click", () => {
            page++;
            searchImages();
        });
